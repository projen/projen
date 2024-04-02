import {
  cdk,
  github,
  javascript,
  JsonFile,
  ProjectTree,
  TextFile,
  ReleasableCommits,
  DependencyType,
} from "./src";
import { PROJEN_MARKER } from "./src/common";

const bootstrapScriptFile = "projen.js";

const project = new cdk.JsiiProject({
  name: "projen",
  description: "CDK for software projects",
  repositoryUrl: "https://github.com/projen/projen.git",

  author: "Amazon Web Services",
  authorAddress: "https://aws.amazon.com",
  authorOrganization: true,

  stability: "experimental",
  keywords: [
    "scaffolding",
    "cicd",
    "project",
    "management",
    "generator",
    "cdk",
  ],

  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement:
        "By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.",
      contributorStatementOptions: {
        exemptUsers: ["cdklabs-automation", "dependabot[bot]"],
      },
    },
  },

  jsiiVersion: "5.3.x",
  typescriptVersion: "5.3.x",

  deps: ["constructs@^10.0.0"],

  bundledDeps: [
    "conventional-changelog-config-spec",
    "yaml@^2.2.2",
    "yargs",
    "case",
    "glob@^8",
    "semver",
    "chalk",
    "@iarna/toml",
    "xmlbuilder2",
    "ini",
    "shx",
    "fast-json-patch",
    "comment-json@4.2.2",
  ],

  devDeps: [
    "@types/conventional-changelog-config-spec",
    "@types/yargs",
    "@types/glob",
    "@types/semver",
    "@types/ini",
    "markmac",
    "esbuild",
    "all-contributors-cli",
  ],

  peerDeps: ["constructs@^10.0.0"],

  depsUpgrade: false, // configured below

  projenDevDependency: false, // because I am projen
  releaseToNpm: true,
  minNodeVersion: "16.0.0", // Do not change this before a version has been EOL for a while

  buildWorkflowOptions: {
    jobStrategy: {
      matrix: {
        domain: {
          node: [
            { version: "18.14.2" },
            { version: "18.18" },
            { version: "18.20" }, // some tools behave differently in 18.20 than 18.18
            { version: "20" },
          ],
        },
        include: [
          {
            node: { version: "18.14.2" },
            release: true,
          },
        ],
      },
    },
    nodeVersion: "${{ matrix.node.version }}",
    uploadArtifactsVariable: "matrix.release",
  },
  workflowNodeVersion: "18.14.2",

  codeCov: true,
  prettier: true,
  defaultReleaseBranch: "main",
  gitpod: true,
  devContainer: true,
  // since this is projen, we need to always compile before we run
  projenCommand: `node ./${bootstrapScriptFile}`,
  projenrcTs: true,

  // Disable interop since it's disabled available in jsii
  tsconfigDev: {
    compilerOptions: {
      esModuleInterop: false,
    },
    exclude: ["docusaurus/**/*"],
  },

  jestOptions: {
    // makes it very hard to iterate with jest --watch
    coverageText: false,
    jestConfig: {
      // By default jest will try to use all CPU cores on the running machine.
      // But some of our integration tests spawn child processes - so by
      // creating one jest worker per test, some of the child processes will get
      // starved of CPU time and sometimes hang or timeout. This should
      // help mitigate that.
      maxWorkers: "50%",
    },
  },

  // To reduce the release frequency we only release features and fixes
  // This is important because PyPI has limits on the total storage amount used, and extensions need to be manually requested
  releasableCommits: ReleasableCommits.featuresAndFixes(),

  publishToMaven: {
    javaPackage: "io.github.cdklabs.projen",
    mavenGroupId: "io.github.cdklabs",
    mavenArtifactId: "projen",
    mavenEndpoint: "https://s01.oss.sonatype.org",
  },
  publishToPypi: {
    distName: "projen",
    module: "projen",
  },
  publishToGo: {
    moduleName: "github.com/projen/projen-go",
  },
  npmProvenance: true,

  releaseFailureIssue: true,

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["cdklabs-automation"] },
  checkLicenses: {
    allow: ["MIT", "ISC", "BSD", "BSD-2-Clause", "BSD-3-Clause", "Apache-2.0"],
  },
});

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

const docgenTask = project.tasks.tryFind("docgen");

if (docgenTask) {
  docgenTask.reset("jsii-docgen .jsii -o docs/api/projen --split-by-submodule");
}

// ignoring the entire docusaurus folder because it's not needed in the published package
if (project.npmignore) {
  project.npmignore.exclude("/docusaurus/");
}

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

project.addExcludeFromCleanup("test/**"); // because snapshots include the projen marker...
project.gitignore.include("test/inventory/**");
project.gitignore.exclude("/.idea");
project.gitignore.exclude("**/.tool-versions");

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

if (project.gitpod) {
  project.gitpod.addCustomTask({
    name: "Setup",
    init: "yarn install",
    prebuild: "bash ./projen.bash",
    command: "npx projen build",
  });
}

const setup = project.addTask("devenv:setup");
setup.exec("yarn install");
setup.spawn(project.buildTask);
if (project.devContainer) {
  project.devContainer.addTasks(setup);
}
if (project.npmignore) {
  project.npmignore.exclude("/.devcontainer.json");
}

project.addTask("contributors:update", {
  exec: 'all-contributors check | grep "Missing contributors" -A 1 | tail -n1 | sed -e "s/,//g" | xargs -n1 | grep -v "\\[bot\\]" | grep -v "cdklabs-automation" | xargs -n1 -I{} all-contributors add {} code',
});
if (project.npmignore) {
  project.npmignore.exclude("/.all-contributorsrc");
}

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

function setupIntegTest() {
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

// build `run-task` script needed for "projen eject" functionality
function setupBundleTaskRunner() {
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

setupIntegTest();
setupBundleTaskRunner();

// we are projen, so re-synth after compiling.
// fixes feedback loop where projen contibutors run "build"
// but not all files are updated
if (project.defaultTask) {
  project.postCompileTask.spawn(project.defaultTask);
}

new ProjectTree(project);

project.synth();
