import * as path from "path";
import * as vm from "vm";
import { cliPrompts } from "./cli/prompts";
import { resolveProjectType } from "./inventory";
import { renderJavaScriptOptions } from "./javascript/render-options";
import { InitProjectOptionHints } from "./option-hints";

export interface CreateProjectOptions {
  /**
   * Directory that the project will be generated in.
   */
  readonly dir: string;

  /**
   * Fully-qualified name of the project type (usually formatted
   * as `projen.module.ProjectType`).
   * @example `projen.typescript.TypescriptProject`
   */
  readonly projectFqn: string;

  /**
   * Project options. Only JSON-like values can be passed in (strings,
   * booleans, numbers, enums, arrays, and objects that are not
   * derived from classes).
   *
   * Consult the API reference of the project type you are generating for
   * information about what fields and types are available.
   */
  readonly projectOptions: Record<string, any>;

  /**
   * Should we render commented-out default options in the projenrc file?
   * Does not apply to projenrc.json files.
   *
   * @default InitProjectOptionHints.FEATURED
   */
  readonly optionHints?: InitProjectOptionHints;

  /**
   * Should we call `project.synth()` or instantiate the project (could still
   * have side-effects) and render the .projenrc file.
   *
   * @default true
   */
  readonly synth?: boolean;

  /**
   * Should we execute post synthesis hooks? (usually package manager install).
   *
   * @default true
   */
  readonly post?: boolean;
}

/**
 * Programmatic API for projen.
 */
export class Projects {
  /**
   * Creates a new project with defaults.
   *
   * This function creates the project type in-process (with in VM) and calls
   * `.synth()` on it (if `options.synth` is not `false`).
   *
   * At the moment, it also generates a `.projenrc.js` file with the same code
   * that was just executed. In the future, this will also be done by the project
   * type, so we can easily support multiple languages of projenrc.
   *
   * An environment variable (PROJEN_CREATE_PROJECT=true) is set within the VM
   * so that custom project types can detect whether the current synthesis is the
   * result of a new project creation (and take additional steps accordingly)
   */
  public static async createProject(options: CreateProjectOptions) {
    await createProject(options);
  }

  private constructor() {}
}

function resolveModulePath(moduleName: string) {
  // Default project resolution location
  if (moduleName === "projen") {
    return "./index";
  }

  // External projects need to load the module from the modules directory
  try {
    return path.dirname(
      require.resolve(path.join(moduleName, "package.json"), {
        paths: [process.cwd()],
      })
    );
  } catch (err) {
    throw new Error(
      `External project module '${moduleName}' could not be resolved.`
    );
  }
}

async function createProject(opts: CreateProjectOptions) {
  const projectType = resolveProjectType(opts.projectFqn);
  const mod = resolveModulePath(projectType.moduleName);

  // "dir" is exposed as a top-level option to require users to specify a value for it
  opts.projectOptions.outdir = opts.dir;

  // Generated a random name space for imports used by options
  // This is so we can keep the top-level namespace as clean as possible
  const optionsImports = "_options" + Math.random().toString(36).slice(2);

  const jsTools = await cliPrompts.selectJsTools(projectType.typename);
  // pass the FQN of the project type to the project initializer so it can
  // generate the projenrc file.
  const { renderedOptions, imports } = renderJavaScriptOptions({
    bootstrap: true,
    comments: opts.optionHints ?? InitProjectOptionHints.FEATURED,
    type: projectType,
    args: {
      ...opts.projectOptions,
      eslint: jsTools && jsTools.linter === "eslint",
      prettier: jsTools && jsTools.formatter === "prettier",
      jest: jsTools && jsTools.testTool === "jest",
    },
    omitFromBootstrap: ["outdir"],
    prefixImports: optionsImports,
  });

  const initProjectCode = new Array<string>();

  // generate a random variable name because jest tests appear to share
  // VM contexts, causing
  //
  // > SyntaxError: Identifier 'project' has already been declared
  //
  // errors if this isn't unique
  const varName = "project" + Math.random().toString(36).slice(2);
  initProjectCode.push(
    `const ${varName} = new ${projectType.typename}(${renderedOptions});`
  );

  if (opts.synth ?? true) {
    initProjectCode.push(`${varName}.synth();`);
  }

  const mainModule = await import(mod);
  const ctx = vm.createContext({
    ...mainModule,
    [optionsImports]: {
      ...imports.modules.reduce(
        (optionsContext, currentModule) => ({
          ...optionsContext,
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          [currentModule]: require(resolveModulePath(currentModule)),
        }),
        {}
      ),
    },
  });

  const postSynth = opts.post ?? true;
  process.env.PROJEN_DISABLE_POST = (!postSynth).toString();
  process.env.PROJEN_CREATE_PROJECT = "true";
  vm.runInContext(initProjectCode.join("\n"), ctx);
}
