import type { Project } from "../src";
import { DependencyType, JsonFile, TaskShell, TextFile } from "../src";
import { PROJEN_MARKER } from "../src/common";
import { TaskWorkflow } from "../src/github";
import type { NodeProject } from "../src/javascript";
import {
  UpgradeDependencies,
  UpgradeDependenciesSchedule,
} from "../src/javascript";
import type { TypeScriptProject } from "../src/typescript";

export * from "./windows-build";
export * from "./json2jsii";
export * from "./jsonConst";
export * from "./integ-versions";
export * from "./integ-test";
export * from "./integ-harness";

/**
 * Add a task to bundle the run-task script needed for "projen eject"
 *
 * @param project The project to add the task to
 */
export function setupBundleTaskRunner(project: Project) {
  // build `run-task` script needed for "projen eject" functionality
  // @TODO: use project.bundler.addBundle instead - currently it's too inflexible on where the output goes
  //
  // We intentionally do NOT mark "*/package.json" as external. Bundling it
  // inlines projen's version (read by src/common.ts) directly into the script,
  // so the ejected scripts/run-task.cjs does not depend on a sibling
  // package.json existing at runtime - which it doesn't for non-node projects.
  // See projen#3679.
  const taskRunnerPath = "lib/run-task.cjs";
  const task = project.addTask("bundle:task-runner", {
    description: 'Bundle the run-task.cjs script needed for "projen eject"',
    exec:
      `esbuild src/cli/task-runtime.ts ` +
      `--outfile=${taskRunnerPath} ` +
      `--bundle ` +
      `--platform=node ` +
      `--format=cjs ` +
      `--banner:js="#!/usr/bin/env node" ` +
      `--footer:js="TaskRuntime.main();"`,
  });
  project.postCompileTask.spawn(task);
}

/**
 * Setup the projen bootstrap script
 *
 * @param project The project to add the tasks to
 * @param bootstrapScriptFile The path to the bootstrap script
 */
export function setupProjenBootstrap(
  project: TypeScriptProject,
  bootstrapScriptFile: string,
) {
  const deps = project.runner.configFor(bootstrapScriptFile);
  const checkDeps = deps.dependencies
    .map((d) => `existsSync("node_modules/${d.name}")`)
    .join(" && ");

  // this script is what we use as the projen command in this project
  // it will compile the project if needed and then run the cli.
  const bootstrapScript = new TextFile(project, bootstrapScriptFile, {
    executable: true,
    marker: true,
    lines: `#!/usr/bin/env node
// ${PROJEN_MARKER}

const { existsSync } = require("fs");
const { execSync } = require("child_process");

function execCommand(command) {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(\`Failed to execute command: \${command}\`, error);
    process.exit(1);
  }
}

const isBuild = existsSync("lib/cli/index.js");
const hasJsii = existsSync("node_modules/.bin/jsii");
const hasDeps = ${checkDeps};
const needsBootstrapping = !isBuild || !hasDeps;

const installCommand = "${project.package.installCommand}";
const buildCommand = "npx jsii --silence-warnings=reserved-word --no-fix-peer-dependencies";

function bootstrap() {
  console.info("bootstrapping...");

  if (!hasDeps || !hasJsii) {
    execCommand(installCommand);
  }

  if (!isBuild) {
    execCommand(buildCommand);
  }
}

if (needsBootstrapping) {
  bootstrap();
}

const args = process.argv.slice(2).join(" ");
execCommand(\`node bin/projen \${args}\`);
`.split("\n"),
  });

  project.npmignore?.exclude(`/${bootstrapScript.path}`);
}

/**
 * Add a task to check licenses
 *
 * @param project The project to add the task to
 */
export function setupCheckLicenses(project: NodeProject) {
  if (project.github) {
    const installCiTask = project.tasks.tryFind("install:ci");
    const checkLicensesTask = project.tasks.tryFind("check-licenses");

    if (installCiTask && checkLicensesTask) {
      // Run license checker as a separate CI job
      new TaskWorkflow(project.github, {
        name: "check-licenses",
        jobId: "check-licenses",
        triggers: {
          pullRequest: {},
          workflowDispatch: {},
          mergeGroup: {},
          push: { branches: ["main"] },
        },
        permissions: {},
        preBuildSteps: [
          {
            name: "Install dependencies",
            run: project.runTaskCommand(installCiTask),
          },
        ],
        task: checkLicensesTask,
      });
    }
  }
}

/**
 * Add a task to generate API docs
 *
 * @param project The project to add the task to
 */
export function setupJsiiDocgen(project: NodeProject) {
  const docgenTask = project.tasks.tryFind("docgen");

  if (docgenTask) {
    docgenTask.reset(
      "jsii-docgen .jsii -o docs/api/projen --split-by-submodule",
    );
  }

  // ignoring the entire docusaurus folder because it's not needed in the published package
  project.npmignore?.exclude("/docusaurus/");
}

/**
 * Add a task to upgrade dependencies
 *
 * @param project The project to add the task to
 */
export function setupUpgradeDependencies(project: NodeProject) {
  const cooldown = 2; //

  // Upgrade Dependencies in two parts:
  // a) Upgrade bundled dependencies as a releasable fix
  // b) Upgrade devDependencies as a chore
  const bundled = new UpgradeDependencies(project, {
    taskName: "upgrade-bundled",
    types: [DependencyType.BUNDLED],
    cooldown,
    semanticCommit: "fix",
    pullRequestTitle: "upgrade bundled dependencies",
    workflowOptions: {
      labels: ["auto-approve"],
      // Run projen's daily upgrade (and release) acyclic to the schedule that projects are on so they get updates faster
      schedule: UpgradeDependenciesSchedule.expressions(["0 12 * * *"]),
    },
  });
  bundled.upgradeTask.shell = TaskShell.system();

  new UpgradeDependencies(project, {
    taskName: "upgrade",
    exclude: [
      // exclude the bundled deps
      ...project.deps.all
        .filter((d: any) => d.type === DependencyType.BUNDLED)
        .map((d: any) => d.name),
      // constructs version constraint should not be changed
      "constructs",
    ],
    cooldown,
    workflowOptions: {
      labels: ["auto-approve"],
    },
  });
}

/**
 * Add only the gitignore inclusions and exclusions rules that are not related to other tools
 *
 * @param project The project to add the rules to
 */
export function setupGitignore(project: Project) {
  project.gitignore.include("/test/inventory/**");
  project.gitignore.exclude("/.idea");
  project.gitignore.exclude("**/.tool-versions");
}

/**
 * Setup markdown readme macros and markdownlint
 *
 * @param project The project to add the rules to
 */
export function setupMarkdown(project: NodeProject) {
  // expand markdown macros in readme
  const macros = project.addTask("readme-macros");
  macros.exec("mv README.md README.md.bak");
  macros.exec("cat README.md.bak | markmac > README.md");
  macros.exec("rm README.md.bak");
  project.postCompileTask.spawn(macros);

  new JsonFile(project, ".markdownlint.json", {
    obj: {
      default: true,
      "commands-show-output": false,
      "line-length": {
        line_length: 200,
      },
    },
  });
  project.npmignore?.exclude("/.markdownlint.json");
}

/**
 * Setup vscode configuration
 *
 * @param project The project to add the configuration to
 */
export function setupVscode(project: NodeProject) {
  project.vscode?.launchConfiguration.addConfiguration({
    type: "pwa-node",
    request: "launch",
    name: "projen CLI",
    skipFiles: ["<node_internals>/**"],
    program: "${workspaceFolder}/lib/cli/index.js",
    outFiles: ["${workspaceFolder}/lib/**/*.js"],
  });
}

/**
 * Setup gitpod configuration
 *
 * @param project The project to add the configuration to
 */
export function setupGitpod(project: NodeProject) {
  project.gitpod?.addCustomTask({
    name: "Setup",
    init: project.package.installCommand,
    command: `${project.projenCommand} ${project.buildTask.name}`,
  });
}

/**
 * Setup devcontainer configuration
 *
 * @param project The project to add the configuration to
 */
export function setupDevcontainer(project: NodeProject) {
  const setup = project.addTask("devenv:setup");
  setup.exec(project.package.installCommand);
  setup.spawn(project.buildTask);
  project.devContainer?.addTasks(setup);

  project.npmignore?.exclude("/.devcontainer.json");
}

/**
 * Add the npmignore rules that are not related to other tools
 *
 * @param project The project to add the rules to
 */
export function setupNpmignore(project: NodeProject) {
  project.npmignore?.exclude("/docs/");
  project.npmignore?.exclude("/logo/");
  project.npmignore?.exclude("/rfcs/");
  project.npmignore?.exclude("/scripts/");
  project.npmignore?.exclude("/schemas/");
  project.npmignore?.exclude("/ARCHITECTURE.md");
  project.npmignore?.exclude("/CODE_OF_CONDUCT.md");
  project.npmignore?.exclude("/CONTRIBUTING.md");
  project.npmignore?.exclude("/VISION.md");
  project.npmignore?.exclude("/SECURITY.md");
  project.npmignore?.exclude("/.gitpod.yml");
}
