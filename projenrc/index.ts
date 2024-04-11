import {
  DependencyType,
  JsonFile,
  TextFile,
  cdk,
  github,
  javascript,
} from "../src";
import { PROJEN_MARKER } from "../src/common";

export function setupIntegTest(project: cdk.JsiiProject) {
  const packagePythonTask = project.tasks.tryFind("package:python");

  const pythonCompatTask = project.addTask("integ:python-compat", {
    exec: "scripts/python-compat.sh",
    description:
      "Checks that projen's submodule structure does not cause import failures for python. Expects python to be installed and projen to be fully built.",
  });
  const integTask = project.addTask("integ", {
    description: "Run integration tests",
  });
  integTask.spawn(project.compileTask);
  if (packagePythonTask) {
    integTask.spawn(packagePythonTask);
  }
  integTask.spawn(pythonCompatTask);

  if (project.buildWorkflow) {
    project.buildWorkflow.addPostBuildJobTask(integTask, {
      tools: { python: { version: "3.x" }, go: { version: "1.16.x" } },
    });
  }
}

export function setupBundleTaskRunner(project: cdk.JsiiProject) {
  // build `run-task` script needed for "projen eject" functionality
  // TODO: use project.bundler.addBundle instead - currently it's too inflexible on where the output goes
  const taskRunnerPath = "lib/run-task.js";
  const task = project.addTask("bundle:task-runner", {
    description: 'Bundle the run-task script needed for "projen eject"',
    exec:
      `esbuild src/task-runtime.ts ` +
      `--outfile=${taskRunnerPath} ` +
      `--bundle ` +
      `--platform=node ` +
      `--external:"*/package.json" ` +
      `--banner:js="#!/usr/bin/env node" ` +
      `--footer:js="const runtime = new TaskRuntime(\\".\\");\nruntime.runTask(process.argv[2]);"`,
  });
  project.postCompileTask.spawn(task);
}

export function setupBootstrap(
  project: cdk.JsiiProject,
  bootstrapScriptFile: string
) {
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
const hasTsNode = existsSync("node_modules/.bin/ts-node");
const needsBootstrapping = !isBuild || !hasTsNode;

const installCommand = "yarn install --frozen-lockfile --check-files --non-interactive";
const buildCommand = "npx jsii --silence-warnings=reserved-word --no-fix-peer-dependencies";

function bootstrap() {
  console.info("bootstrapping...");

  if (!hasTsNode || !hasJsii) {
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
  if (project.npmignore) {
    project.npmignore.exclude(`/${bootstrapScript.path}`);
  }
}

export function setupCheckLicenses(project: cdk.JsiiProject) {
  if (project.github) {
    const installCiTask = project.tasks.tryFind("install:ci");
    const checkLicensesTask = project.tasks.tryFind("check-licenses");

    if (installCiTask && checkLicensesTask) {
      // Run license checker as a separate CI job
      new github.TaskWorkflow(project.github, {
        name: "check-licenses",
        jobId: "check-licenses",
        triggers: {
          pullRequest: {},
          workflowDispatch: {},
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

export function setupDocs(project: cdk.JsiiProject) {
  const docgenTask = project.tasks.tryFind("docgen");

  if (docgenTask) {
    docgenTask.reset(
      "jsii-docgen .jsii -o docs/api/projen --split-by-submodule"
    );
  }

  // ignoring the entire docusaurus folder because it's not needed in the published package
  if (project.npmignore) {
    project.npmignore.exclude("/docusaurus/");
  }
}

export function setupUpgrade(project: cdk.JsiiProject) {
  // Upgrade Dependencies in two parts:
  // a) Upgrade bundled dependencies as a releasable fix
  // b) Upgrade devDependencies as a chore
  new javascript.UpgradeDependencies(project, {
    taskName: "upgrade-bundled",
    types: [DependencyType.BUNDLED],
    semanticCommit: "fix",
    pullRequestTitle: "upgrade bundled dependencies",
    workflowOptions: {
      labels: ["auto-approve"],
      // Run projen's daily upgrade (and release) acyclic to the schedule that projects are on so they get updates faster
      schedule: javascript.UpgradeDependenciesSchedule.expressions([
        "0 12 * * *",
      ]),
    },
  });
  new javascript.UpgradeDependencies(project, {
    taskName: "upgrade",
    exclude: [
      // exclude the bundled deps
      ...project.deps.all
        .filter((d: any) => d.type === DependencyType.BUNDLED)
        .map((d: any) => d.name),
      // constructs version constraint should not be changed
      "constructs",
      // markmac depends on projen, we are excluding it here to avoid a circular update loop
      "markmac",
    ],
    workflowOptions: {
      labels: ["auto-approve"],
    },
  });
}

export function setupFileExclusions(project: cdk.JsiiProject) {
  project.gitignore.include("test/inventory/**");
  project.gitignore.exclude("/.idea");
  project.gitignore.exclude("**/.tool-versions");
}

export function setupMarkdown(project: cdk.JsiiProject) {
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
  if (project.npmignore) {
    project.npmignore.exclude("/.markdownlint.json");
  }
}

export function setupVscode(project: cdk.JsiiProject) {
  if (project.vscode) {
    project.vscode.launchConfiguration.addConfiguration({
      type: "pwa-node",
      request: "launch",
      name: "projen CLI",
      skipFiles: ["<node_internals>/**"],
      program: "${workspaceFolder}/lib/cli/index.js",
      outFiles: ["${workspaceFolder}/lib/**/*.js"],
    });
  }
}

export function setupMergify(project: cdk.JsiiProject) {
  if (project.github && project.github.mergify) {
    project.github.mergify.addRule({
      name: "Label core contributions",
      actions: {
        label: {
          add: ["contribution/core"],
        },
      },
      conditions: ["author~=^(eladb|Chriscbr)$", "label!=contribution/core"],
    });
  }
}

export function setupGitpod(project: cdk.JsiiProject) {
  if (project.gitpod) {
    project.gitpod.addCustomTask({
      name: "Setup",
      init: "yarn install",
      prebuild: "bash ./projen.bash",
      command: "npx projen build",
    });
  }
}

export function setupDevcontainer(project: cdk.JsiiProject) {
  const setup = project.addTask("devenv:setup");
  setup.exec("yarn install");
  setup.spawn(project.buildTask);
  if (project.devContainer) {
    project.devContainer.addTasks(setup);
  }
  if (project.npmignore) {
    project.npmignore.exclude("/.devcontainer.json");
  }
}

export function setupAllContributors(project: cdk.JsiiProject) {
  project.addTask("contributors:update", {
    exec: 'all-contributors check | grep "Missing contributors" -A 1 | tail -n1 | sed -e "s/,//g" | xargs -n1 | grep -v "\\[bot\\]" | grep -v "cdklabs-automation" | xargs -n1 -I{} all-contributors add {} code',
  });
  if (project.npmignore) {
    project.npmignore.exclude("/.all-contributorsrc");
  }
}

export function setupNpmignore(project: cdk.JsiiProject) {
  if (project.npmignore) {
    project.npmignore.exclude("/docs/");
    project.npmignore.exclude("/logo/");
    project.npmignore.exclude("/rfcs/");
    project.npmignore.exclude("/scripts/");
    project.npmignore.exclude("/ARCHITECTURE.md");
    project.npmignore.exclude("/CODE_OF_CONDUCT.md");
    project.npmignore.exclude("/CONTRIBUTING.md");
    project.npmignore.exclude("/VISION.md");
    project.npmignore.exclude("/SECURITY.md");
    project.npmignore.exclude("/.gitpod.yml");
  }
}
