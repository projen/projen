import * as path from "path";
import * as fs from "fs-extra";
import * as semver from "semver";
import * as yargs from "yargs";
import * as inventory from "../../inventory";
import * as logging from "../../logging";
import { InitProjectOptionHints } from "../../option-hints";
import { Projects } from "../../projects";
import { exec, execCapture, getGitVersion, isTruthy } from "../../util";
import { tryProcessMacro } from "../macros";
import { installPackage, renderInstallCommand } from "../util";

class Command implements yargs.CommandModule {
  public readonly command = "new [PROJECT-TYPE-NAME] [OPTIONS]";
  public readonly describe = "Creates a new projen project";

  public builder(args: yargs.Argv) {
    args.positional("PROJECT-TYPE-NAME", {
      describe:
        "optional only when --from is used and there is a single project type in the external module",
      type: "string",
    });
    args.option("synth", {
      type: "boolean",
      default: true,
      desc: "Synthesize after creating .projenrc.js",
    });
    args.option("comments", {
      type: "boolean",
      default: true,
      desc: "Include commented out options in .projenrc.js (use --no-comments to disable)",
    });
    args.option("from", {
      type: "string",
      alias: "f",
      desc: 'External jsii npm module to create project from. Supports any package spec supported by npm (such as "my-pack@^2.0")',
    });
    args.option("git", {
      type: "boolean",
      default: true,
      desc: "Run `git init` and create an initial commit (use --no-git to disable)",
    });
    args.example(
      "projen new awscdk-app-ts",
      'Creates a new project of built-in type "awscdk-app-ts"'
    );
    args.example(
      "projen new --from projen-vue@^2",
      'Creates a new project from an external module "projen-vue" with the specified version'
    );

    for (const type of inventory.discover()) {
      args.command(type.pjid, type.docs ?? "", {
        builder: (cargs) => {
          cargs.showHelpOnFail(false);

          for (const option of type.options ?? []) {
            if (
              option.simpleType !== "string" &&
              option.simpleType !== "number" &&
              option.simpleType !== "boolean" &&
              option.kind !== "enum" &&
              !isPrimitiveArrayOption(option)
            ) {
              /**
               * Currently we only support these field types as command line options:
               * - primitives (string, number, boolean)
               * - lists of primitives
               * - enums
               */
              continue;
            }

            let desc = [option.docs?.replace(/\ *\.$/, "") ?? ""];

            const required = !option.optional;
            let defaultValue;

            if (option.default && option.default !== "undefined") {
              if (!required) {
                // if the field is not required, just describe the default but don't actually assign a value
                desc.push(
                  `[default: ${option.default
                    .replace(/^\ *-/, "")
                    .replace(/\.$/, "")
                    .trim()}]`
                );
              } else {
                // if the field is required and we have a @default, then assign
                // the value here so it appears in `--help`
                defaultValue = renderDefault(process.cwd(), option.default);
              }
            }

            cargs.option(option.switch, {
              group: required ? "Required:" : "Optional:",
              type: argType(option),
              description: desc.join(" "),
              required,
              // yargs behaves differently for arrays if the defaultValue property is present or not
              ...(defaultValue ? { default: defaultValue } : {}),
            });
          }

          return cargs;
        },
        handler: (argv) => initProject(process.cwd(), type, argv),
      });
    }

    return args;
  }

  public async handler(args: any) {
    // handle --from which means we want to first install a jsii module and then
    // create a project defined within this module.
    if (args.from) {
      return initProjectFromModule(process.cwd(), args.from, args);
    }

    // project type is defined but was not matched by yargs, so print the list of supported types
    if (args.projectTypeName) {
      console.log(
        `Invalid project type ${args.projectTypeName}. Supported types:`
      );
      for (const pjid of inventory.discover().map((x) => x.pjid)) {
        console.log(`  ${pjid}`);
      }
      return;
    }

    // Handles the use case that nothing was specified since PROJECT-TYPE is now an optional positional parameter
    yargs.showHelp();
  }
}

/**
 * Returns the yargs option type for a given project option
 */
function argType(
  option: inventory.InventoryProjectOption
): "string" | "boolean" | "number" | "array" {
  if (option.kind === "enum") {
    return "string";
  }

  if (isPrimitiveArrayOption(option)) {
    return "array";
  }

  return option.simpleType as "string" | "boolean" | "number";
}

/**
 * Checks if the given option is a primitive array
 */
function isPrimitiveArrayOption(
  option: inventory.InventoryProjectOption
): boolean {
  return Boolean(
    option.jsonLike &&
      option.type.collection?.kind === "array" &&
      option.type.collection.elementtype.primitive &&
      ["string", "number"].includes(
        option.type.collection.elementtype.primitive
      )
  );
}

/**
 * Given a value from "@default", processes macros and returns a stringified
 * (quoted) result.
 *
 * @returns a javascript primitive (could be a string, number or boolean)
 */
function renderDefault(cwd: string, value: string) {
  return tryProcessMacro(cwd, value) ?? JSON.parse(value);
}

/**
 * Converts yargs command line switches to project type props.
 * @param type Project type
 * @param argv Command line switches
 */
function commandLineToProps(
  cwd: string,
  type: inventory.InventoryProjectType,
  argv: Record<string, unknown>
): Record<string, any> {
  const props: Record<string, any> = {};

  // initialize props with default values
  for (const prop of type.options) {
    if (prop.default && prop.default !== "undefined" && !prop.optional) {
      props[prop.name] = renderDefault(cwd, prop.default);
    }
  }

  for (const [arg, value] of Object.entries(argv)) {
    for (const prop of type.options) {
      if (prop.switch === arg) {
        let curr = props;
        const queue = [...prop.path];
        while (true) {
          const p = queue.shift();
          if (!p) {
            break;
          }
          if (queue.length === 0) {
            curr[p] = value;
          } else {
            curr[p] = curr[p] ?? {};
            curr = curr[p];
          }
        }
      }
    }
  }

  return props;
}

/**
 * Generates a new project from an external module.
 *
 * @param spec The name of the external module to load
 * @param args Command line arguments (incl. project type)
 */
async function initProjectFromModule(baseDir: string, spec: string, args: any) {
  const projenVersion = args.projenVersion ?? "latest";
  const installCommand = renderInstallCommand(
    baseDir,
    `projen@${projenVersion}`
  );
  if (args.projenVersion) {
    exec(installCommand, { cwd: baseDir });
  } else {
    // do not overwrite existing installation
    exec(
      `npm ls --prefix="${baseDir}" --depth=0 --pattern projen || ${installCommand}`,
      { cwd: baseDir }
    );
  }

  const moduleName = installPackage(baseDir, spec);

  // Find the just installed package and discover the rest recursively from this package folder
  const moduleDir = path.dirname(
    require.resolve(`${moduleName}/.jsii`, {
      paths: [baseDir],
    })
  );

  // Only leave projects from the main (requested) package
  const projects = inventory
    .discover(moduleDir)
    .filter((x) => x.moduleName === moduleName); // Only list project types from the requested 'from' module

  if (projects.length < 1) {
    throw new Error(
      `No projects found after installing ${spec}. The module must export at least one class which extends projen.Project`
    );
  }

  const requested = args.projectTypeName;
  const types = projects.map((p) => p.pjid);

  // if user did not specify a project type but the module has more than one, we need them to tell us which one...
  if (!requested && projects.length > 1) {
    throw new Error(
      `Multiple projects found after installing ${spec}: ${types.join(
        ","
      )}. Please specify a project name.\nExample: npx projen new --from ${spec} ${
        types[0]
      }`
    );
  }

  // if user did not specify a type (and we know we have only one), the select it. otherwise, search by pjid.
  const type = !requested
    ? projects[0]
    : projects.find((p) => p.pjid === requested);
  if (!type) {
    throw new Error(
      `Project type ${requested} not found. Found ${types.join(",")}`
    );
  }

  for (const option of type.options ?? []) {
    if (
      option.simpleType !== "string" &&
      option.simpleType !== "number" &&
      option.simpleType !== "boolean"
    ) {
      continue; // we don't support non-primitive fields as command line options
    }

    if (args[option.name] !== undefined) {
      if (option.simpleType === "number") {
        args[option.name] = parseInt(args[option.name]);
        args[option.switch] = args[option.name];
      } else if (option.simpleType === "boolean") {
        const raw = args[option.name];
        const safe = typeof raw === "string" ? isTruthy(raw) : raw;
        args[option.name] = safe;
        args[option.switch] = safe;
      }
      continue; // do not overwrite passed arguments
    }

    if (option.default && option.default !== "undefined") {
      if (!option.optional) {
        const defaultValue = renderDefault(baseDir, option.default);
        args[option.name] = defaultValue;
        args[option.switch] = defaultValue;
      }
    }
  }

  // include a dev dependency for the external module
  args.devDeps = [spec];
  args["dev-deps"] = [spec];

  await initProject(baseDir, type, args);
}

/**
 * Generates a new project.
 * @param type Project type
 * @param args Command line arguments
 * @param additionalProps Additional parameters to include in .projenrc.js
 */
async function initProject(
  baseDir: string,
  type: inventory.InventoryProjectType,
  args: any
) {
  // convert command line arguments to project props using type information
  const props = commandLineToProps(baseDir, type, args);

  Projects.createProject({
    dir: props.outdir ?? baseDir,
    projectFqn: type.fqn,
    projectOptions: props,
    optionHints: args.comments
      ? InitProjectOptionHints.FEATURED
      : InitProjectOptionHints.NONE,
    synth: args.synth,
    post: args.post,
  });

  if (fs.existsSync(path.join(baseDir, "package.json")) && args.post) {
    exec("npm run eslint --if-present", { cwd: baseDir });
  }

  if (args.git) {
    const git = (cmd: string) => exec(`git ${cmd}`, { cwd: baseDir });
    const gitversion: string = getGitVersion(
      execCapture("git --version", { cwd: baseDir }).toString()
    );
    logging.debug("system using git version ", gitversion);
    if (gitversion && semver.gte(gitversion, "2.28.0")) {
      git("init -b main");
      git("add .");
      git('commit --allow-empty -m "chore: project created with projen"');
      logging.debug("default branch name set to main");
    } else {
      git("init");
      git("add .");
      git('commit --allow-empty -m "chore: project created with projen"');
      logging.debug(
        "older version of git detected, changed default branch name to main"
      );
      git("branch -M main");
    }
  }
}

export default new Command();
