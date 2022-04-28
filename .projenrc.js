const { cdk, JsonFile, TextFile } = require("./lib");
const { PROJEN_MARKER } = require("./lib/common");

const project = new cdk.JsiiProject({
  name: "projen",
  description: "CDK for software projects",
  repository: "https://github.com/projen/projen.git",

  authorName: "Amazon Web Services",
  authorUrl: "https://aws.amazon.com",
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

  pullRequestTemplateContents: [
    "---",
    "By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.",
  ],

  bundledDeps: [
    "conventional-changelog-config-spec",
    "yaml@2.0.0-11",
    "fs-extra",
    "yargs",
    "case",
    "glob@^7",
    "semver",
    "chalk",
    "@iarna/toml",
    "xmlbuilder2",
    "ini",
    "shx",
  ],

  devDeps: [
    "@types/conventional-changelog-config-spec",
    "@types/fs-extra@^8",
    "@types/yargs",
    "@types/glob",
    "@types/semver",
    "@types/ini",
    "markmac",
    "esbuild",
    "all-contributors-cli",
    "wireit",
  ],

  depsUpgradeOptions: {
    // markmac depends on projen, we are excluding it here to avoid a circular update loop
    exclude: ["markmac"],
  },

  projenDevDependency: false, // because I am projen
  releaseToNpm: true,
  minNodeVersion: "12.7.0",
  workflowNodeVersion: "12.22.0", // required by @typescript-eslint/eslint-plugin@5.5.0

  codeCov: true,
  prettier: true,
  defaultReleaseBranch: "main",
  gitpod: true,
  devContainer: true,
  // since this is projen, we need to always compile before we run
  projenCommand: "/bin/bash ./projen.bash",

  // cli tests need projen to be compiled
  compileBeforeTest: true,

  // makes it very hard to iterate with jest --watch
  jestOptions: {
    coverageText: false,
  },

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

  releaseFailureIssue: true,

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["cdklabs-automation"] },

  docgenFilePath: "docs/api/API.md",
});

// this script is what we use as the projen command in this project
// it will compile the project if needed and then run the cli.
new TextFile(project, "projen.bash", {
  lines: [
    "#!/bin/bash",
    `# ${PROJEN_MARKER}`,
    "set -euo pipefail",
    "if [ ! -f lib/cli/index.js ]; then",
    '  echo "bootstrapping..."',
    "  npx jsii --silence-warnings=reserved-word --no-fix-peer-dependencies",
    "fi",
    "exec bin/projen $@",
  ],
});
project.npmignore.exclude("/projen.bash");

project.addExcludeFromCleanup("test/**"); // because snapshots include the projen marker...
project.gitignore.include("templates/**");
project.gitignore.exclude("/.idea");

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
project.npmignore.exclude("/.markdownlint.json");

project.vscode.launchConfiguration.addConfiguration({
  type: "pwa-node",
  request: "launch",
  name: "projen CLI",
  skipFiles: ["<node_internals>/**"],
  program: "${workspaceFolder}/lib/cli/index.js",
  outFiles: ["${workspaceFolder}/lib/**/*.js"],
});

project.github.mergify.addRule({
  name: "Label core contributions",
  actions: {
    label: {
      add: ["contribution/core"],
    },
  },
  conditions: ["author~=^(eladb|Chriscbr)$", "label!=contribution/core"],
});

project.gitpod.addCustomTask({
  name: "Setup",
  init: "yarn install",
  prebuild: "bash ./projen.bash",
  command: "npx projen build",
});

const setup = project.addTask("devenv:setup");
setup.exec("yarn install");
setup.spawn(project.buildTask);
project.devContainer.addTasks(setup);
project.npmignore.exclude("/.devcontainer.json");

project.addTask("contributors:update", {
  exec: 'all-contributors check | grep "Missing contributors" -A 1 | tail -n1 | sed -e "s/,//g" | xargs -n1 | grep -v "[bot]" | xargs -n1 -I{} all-contributors add {} code',
});
project.npmignore.exclude("/.all-contributorsrc");

project.npmignore.exclude("/scripts/");
project.npmignore.exclude("/ARCHITECTURE.md");
project.npmignore.exclude("/CODE_OF_CONDUCT.md");
project.npmignore.exclude("/CONTRIBUTING.md");
project.npmignore.exclude("/VISION.md");
project.npmignore.exclude("/SECURITY.md");
project.npmignore.exclude("/.gitattributes");
project.npmignore.exclude("/.gitpod.yml");

function setupIntegTest() {
  const pythonCompatTask = project.addTask("integ:python-compat", {
    exec: "scripts/python-compat.sh",
    description:
      "Checks that projen's submodule structure does not cause import failures for python. Expects python to be installed and projen to be fully built.",
  });
  const integTask = project.addTask("integ", {
    description: "Run integration tests",
  });
  integTask.spawn(project.compileTask);
  integTask.spawn(project.tasks.tryFind("package:python"));
  integTask.spawn(pythonCompatTask);

  project.buildWorkflow.addPostBuildJobTask(integTask, {
    tools: { python: { version: "3.x" }, go: { version: "1.16.x" } },
  });
}

// build `run-task` script needed for "projen eject" functionality
function setupBundleTaskRunner() {
  const taskRunnerPath = "lib/run-task.js";
  const task = project.addTask("bundle:task-runner", {
    description: 'Bundle the run-task script needed for "projen eject"',
    exec: `esbuild src/task-runtime.ts --outfile=${taskRunnerPath} --bundle --platform=node --external:"*/package.json"`,
  });
  task.exec(
    `echo "#!/usr/bin/env node" | cat - lib/run-task.js | tee lib/run-task.js > /dev/null`,
    {
      name: "Insert Node shebang to beginning of the file",
    }
  );
  task.exec(
    `echo "const runtime = new TaskRuntime(\\".\\");\nruntime.runTask(process.argv[2]);" >> ${taskRunnerPath}`,
    {
      name: "Add driver code to end of the file",
    }
  );
  project.postCompileTask.spawn(task);
}

setupIntegTest();
setupBundleTaskRunner();

// we are projen, so re-synth after compiling.
// fixes feedback loop where projen contibutors run "build"
// but not all files are updated
project.postCompileTask.spawn(project.defaultTask);

project.gitignore.addPatterns(".wireit");

const packageJson = project.tryFindObjectFile("package.json");

packageJson.addOverride("scripts", {
  build: "wireit",
  bump: "wireit",
  "bundle:task-runner": "wireit",
  clobber: "wireit",
  compat: "wireit",
  compile: "wireit",
  "contributors:update": "wireit",
  default: "wireit",
  "devenv:setup": "wireit",
  docgen: "wireit",
  eject: "wireit",
  eslint: "wireit",
  integ: "wireit",
  "integ:python-compat": "wireit",
  package: "wireit",
  "package-all": "wireit",
  "package:go": "wireit",
  "package:java": "wireit",
  "package:js": "wireit",
  "package:python": "wireit",
  "post-compile": "wireit",
  "post-upgrade": "wireit",
  "pre-compile": "wireit",
  "readme-macros": "wireit",
  release: "wireit",
  test: "wireit",
  "test:update": "wireit",
  "test:watch": "wireit",
  unbump: "wireit",
  upgrade: "wireit",
  watch: "wireit",
  projen: "wireit",
});

project.package.addField("wireit", {
  default: {
    command: "node .projenrc.js",
    files: [".projenrc.js", "package.json"],
    output: [
      ".devcontainer.json",
      ".eslintrc.json",
      ".gitattributes",
      ".github/pull_request_template.md",
      ".github/workflows/auto-approve.yml",
      ".github/workflows/build.yml",
      ".github/workflows/pull-request-lint.yml",
      ".github/workflows/release.yml",
      ".github/workflows/upgrade-main.yml",
      ".gitignore",
      ".gitpod.yml",
      ".markdownlint.json",
      ".mergify.yml",
      ".prettierignore",
      ".prettierrc.json",
      ".projen/deps.json",
      ".projen/tasks.json",
      ".vscode/launch.json",
      "LICENSE",
      "projen.bash",
      "tsconfig.dev.json",
    ],
    clean: true, // ?
    packageLocks: ["yarn.lock"],
  },
  compile: {
    command: "jsii --silence-warnings=reserved-word",
    dependencies: ["default"],
    files: ["src/**/*.ts", "tsconfig.json"],
    output: ["lib/**"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  eslint: {
    command:
      "eslint --ext .ts,.tsx --fix --no-error-on-unmatched-pattern src test build-tools .projenrc.js",
    dependencies: ["compile"],
    files: [
      ".prettierrc.json",
      ".prettierignore",
      ".eslintrc.json",
      "tsconfig.dev.json",
    ],
    output: ["src/**/*.ts", ".projenrc.js"],
    clean: false, // modifies outputs in-place
    packageLocks: ["yarn.lock"],
  },
  docgen: {
    command: "jsii-docgen -o docs/api/API.md",
    dependencies: ["compile"],
    files: [".jsii"],
    output: ["docs/api/API.md"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "readme-macros": {
    command:
      "mv README.md README.md.bak && cat README.md.bak | markmac > README.md && rm README.md.bak",
    dependencies: ["compile"],
    files: ["README.md", "lib/inventory.js"],
    output: ["README.md"],
    clean: false, // modifies outputs in-place
    packageLocks: ["yarn.lock"],
  },
  "bundle:task-runner": {
    command: "/bin/bash ./projen.bash bundle:task-runner",
    dependencies: ["compile"],
    files: ["src/task-runtime.ts"],
    output: ["lib/run-task.js"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "post-compile": {
    dependencies: ["docgen", "readme-macros", "bundle:task-runner", "eslint"],
    files: [],
    output: [],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "package:js": {
    command: "jsii-pacmak -v --target js",
    dependencies: ["compile", "post-compile"],
    files: [],
    output: ["dist/js"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "package:python": {
    command: "jsii-pacmak -v --target python",
    dependencies: ["compile", "post-compile"],
    files: [],
    output: ["dist/python"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "package:java": {
    command: "jsii-pacmak -v --target java",
    dependencies: ["compile", "post-compile"],
    files: [],
    output: ["dist/java"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "package:go": {
    command: "jsii-pacmak -v --target go",
    dependencies: ["compile", "post-compile"],
    files: [],
    output: ["dist/go"],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  "package-all": {
    dependencies: [
      "package:js",
      "package:python",
      "package:java",
      "package:go",
    ],
    files: [],
    output: [],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  package: {
    dependencies: ["package-all"],
    files: [],
    output: [],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
  test: {
    command: "jest --passWithNoTests --all --updateSnapshot",
    dependencies: ["compile", "bundle:task-runner"],
    files: ["test/**/*.ts"],
    output: ["test/**/*.snap"],
    clean: false, // let jest command handle cleanup
    packageLocks: ["yarn.lock"],
  },
  build: {
    dependencies: ["compile", "test", "package"],
    files: [],
    output: [],
    clean: true,
    packageLocks: ["yarn.lock"],
  },
});

project.synth();
