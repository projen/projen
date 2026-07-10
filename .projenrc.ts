import * as path from "path";
import {
  setupProjenBootstrap,
  setupBundleTaskRunner,
  setupCheckLicenses,
  setupDevcontainer,
  setupJsiiDocgen,
  setupGitignore,
  setupGitpod,
  setupMarkdown,
  setupNpmignore,
  setupUpgradeDependencies,
  setupVscode,
  WindowsBuild,
  JsiiFromJsonSchema,
  JsonConst,
  IntegrationTests,
} from "./projenrc";
import {
  AiAgent,
  AiInstructions,
  javascript,
  JsonPatch,
  ReleasableCommits,
} from "./src";
import { JsiiBuild } from "./src/cdk";
import { tryResolveDependencyVersion } from "./src/javascript/util";
import { TypeScriptProject, TypeScriptRunner } from "./src/typescript";

const AUTOMATION_USER = "projen-automation";
const BOOTSTRAP_SCRIPT = "projen.js";

const project = new TypeScriptProject({
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

  githubOptions: {
    mergify: false,
    mergeQueue: true,
    pullRequestLintOptions: {
      contributorStatement:
        "By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.",
      contributorStatementOptions: {
        exemptUsers: [AUTOMATION_USER, "dependabot[bot]"],
      },
    },
    dependencyReview: true,
    dependencyReviewOptions: {
      warnOnly: true,
    },
  },

  typescriptVersion: "6.0.x",

  packageManager: javascript.NodePackageManager.NPM,

  deps: ["constructs@^10.5.0"],

  bundledDeps: [
    "conventional-changelog-config-spec",
    "yaml@^2.2.2",
    "yargs",
    "case",
    "fast-glob",
    "semver",
    "chalk",
    "@iarna/toml",
    "xmlbuilder2",
    "ini",
    "dax",
    "fast-json-patch",
    "comment-json@4.2.2",
    "parse-conflict-json",
  ],

  devDeps: [
    "@types/conventional-changelog-config-spec",
    "@types/yargs",
    "@types/semver",
    "@types/ini",
    "@types/parse-conflict-json",
    "markmac",
    "esbuild",
    "json2jsii",
    // Needed to generate biome config
    "@biomejs/biome@^2",
    // used to get current node versions in tests
    "@jsii/check-node",
    // used to get CDK V2 feature flags
    "aws-cdk-lib",
  ],

  peerDeps: ["constructs@^10.5.0"],

  depsUpgrade: false, // configured below
  auditDeps: true,
  auditDepsOptions: {
    prodOnly: true,
  },
  allowScripts: ["esbuild", "fsevents", "unrs-resolver"], // we need this to build & test projen

  projenDevDependency: false, // because I am projen
  releaseToNpm: true,
  minNodeVersion: "16.0.0", // Do not change this before a version has been EOL for a while
  workflowNodeVersion: "lts/-1", // use the previous lts for builds

  codeCov: true,
  prettier: true,
  gitpod: true,
  devContainer: true,
  // since this is projen, we need to always compile before we run
  projenCommand: `node ./${BOOTSTRAP_SCRIPT}`,
  projenrcTs: true,
  projectTree: true,
  runner: TypeScriptRunner.tsx(),

  tsconfig: {
    compilerOptions: {
      isolatedModules: true,
      target: "ES2022",
      lib: ["es2022"],
      module: "node16",
      esModuleInterop: true,
      skipLibCheck: true,
      noEmitOnError: true,
      stripInternal: false,
    },
  },

  jestOptions: {
    // makes it very hard to iterate with jest --watch
    coverageText: false,
    jestConfig: {
      // Adding text-summary as a replacement for text
      coverageReporters: [
        "json",
        "lcov",
        "clover",
        "cobertura",
        "text-summary",
      ],
      // By default jest will try to use all CPU cores on the running machine.
      // But some of our integration tests spawn child processes - so by
      // creating one jest worker per test, some of the child processes will get
      // starved of CPU time and sometimes hang or timeout. This should
      // help mitigate that.
      maxWorkers: "50%",
      setupFiles: ["./test/jest.setup.js"],
    },
  },

  // To reduce the release frequency we only release features and fixes
  // This is important because PyPI has limits on the total storage amount used, and extensions need to be manually requested
  releasableCommits: ReleasableCommits.featuresAndFixes(),

  releaseEnvironment: "release",
  npmTrustedPublishing: true,
  npmProvenance: true,

  releaseFailureIssue: true,

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: [AUTOMATION_USER] },
  checkLicenses: {
    allow: [
      "MIT",
      "ISC",
      "BSD-2-Clause",
      "BSD-3-Clause",
      "Apache-2.0",
      "Python-2.0",
    ],
  },
});

// We use a custom jsii project for more flexibility
project.with(
  new JsiiBuild({
    jsiiVersion: "6.0.x",
    publishToMaven: {
      javaPackage: "io.github.cdklabs.projen",
      mavenGroupId: "io.github.cdklabs",
      mavenArtifactId: "projen",
    },
    publishToPypi: {
      distName: "projen",
      module: "projen",
      trustedPublishing: true,
    },
    publishToGo: {
      moduleName: "github.com/projen/projen-go",
    },
  }),
);

project.eslint?.addRules({
  "@typescript-eslint/consistent-type-imports": "error",
  "@typescript-eslint/consistent-type-exports": "error",
  // Centralize all OS-command execution in src/util/exec.ts so command
  // execution goes through a single, consistent set of helpers. Type-only
  // imports are allowed (they have no runtime effect).
  "no-restricted-imports": "off",
  "@typescript-eslint/no-restricted-imports": [
    "error",
    {
      paths: [
        {
          name: "child_process",
          message:
            "Do not import 'child_process' directly. Use the helpers in src/util/exec.ts (e.g. `git.run`).",
          allowTypeImports: true,
        },
        {
          name: "node:child_process",
          message:
            "Do not import 'node:child_process' directly. Use the helpers in src/util/exec.ts (e.g. `git.run`).",
          allowTypeImports: true,
        },
      ],
    },
  ],
});
// Files that need direct child_process access:
// - src/util/exec.ts: the single home for command execution
// - test/cli/run-task.test.ts: spawns the CLI and spies on the task runtime's
//   process execution
// - test/tasks/tasks.test.ts: spies on the task runner's process execution
project.eslint?.addOverride({
  files: [
    "src/util/exec.ts",
    "test/cli/run-task.test.ts",
    "test/tasks/tasks.test.ts",
  ],
  rules: {
    "@typescript-eslint/no-restricted-imports": "off",
  },
});

// The CLI (src/cli) is the runtime entrypoint of projen. It may depend on the
// rest of the library, but nothing in src/ outside of src/cli may depend on the
// CLI (otherwise the library and the CLI become circularly coupled). This is
// enforced for every src file except those inside src/cli itself.
javascript.Eslint.of(project)?.addOverride({
  files: ["src/**/*.ts"],
  excludedFiles: ["src/cli/**/*.ts"],
  rules: {
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src",
            from: "./src/cli",
            message:
              "src/ must not import from src/cli. The CLI may import from the library, but not the other way around.",
          },
        ],
      },
    ],
  },
});

// Trusted Publishing requires npm 11 which is available by default in node 24
project.github
  ?.tryFindWorkflow("release")
  ?.file?.patch(
    JsonPatch.replace("/jobs/release_npm/steps/0/with/node-version", "24.x"),
  );

setupCheckLicenses(project);

setupUpgradeDependencies(project);

setupJsiiDocgen(project);

setupProjenBootstrap(project, BOOTSTRAP_SCRIPT);

// because snapshots include the projen marker...
project.addExcludeFromCleanup("test/**");

setupGitignore(project);

setupMarkdown(project);

setupVscode(project);

setupGitpod(project);

setupDevcontainer(project);

setupNpmignore(project);

// Must run before IntegrationTests so the "bundle:task-runner" task exists when
// the integ workflow jobs are built (the node job runs it before packaging).
setupBundleTaskRunner(project);

new IntegrationTests(project);

new JsiiFromJsonSchema(project, {
  structName: "BiomeConfiguration",
  schemaPath: require.resolve("@biomejs/biome/configuration_schema.json"),
  filePath: path.join("src", "javascript", "biome", "biome-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "PyprojectToml",
  schemaPath: "https://json.schemastore.org/pyproject.json",
  filePath: path.join("src", "python", "pyproject-toml.ts"),
  transform: (schema) => (
    (schema.properties.tool.properties = Object.fromEntries(
      Object.entries(schema.properties.tool.properties).map(
        ([tool, def]) => (delete (def as any).$ref, [tool, def]),
      ),
    )),
    schema
  ),
});

new JsiiFromJsonSchema(project, {
  structName: "UvConfiguration",
  schemaPath: "https://json.schemastore.org/uv.json",
  filePath: path.join("src", "python", "uv-config.ts"),
  transform: (schema) => (
    (schema.properties["cache-dir"].description = schema.properties[
      "cache-dir"
    ].description
      .split("\n")
      .at(0)),
    schema
  ),
});

new JsiiFromJsonSchema(project, {
  structName: "PnpmWorkspaceYamlSchema",
  schemaPath: "https://json.schemastore.org/pnpm-workspace.json",
  filePath: path.join("src", "javascript", "pnpm-workspace-config.ts"),
});

new JsonConst(project, {
  jsonPath: require.resolve("aws-cdk-lib/recommended-feature-flags.json"),
  filePath: path.join("src", "awscdk", "private", "feature-flags-v2.const.ts"),
  comment: `Feature flags as of v${
    tryResolveDependencyVersion("aws-cdk-lib") || "2"
  }`,
});

new WindowsBuild(project);

// we are projen, so re-synth after compiling.
// fixes feedback loop where projen contributors run "build"
// but not all files are updated
if (project.defaultTask) {
  project.postCompileTask.spawn(project.defaultTask);
}

// This is the projen repo itself.
// We cannot report a version here as it would change during the release version bump and cause the tampering check to fail.
// Instead we report the repo as fake version. Has no effect on the published package.
project.node.addMetadata("projen.version", "https://github.com/projen/projen");

new AiInstructions(project, {
  agents: [
    AiAgent.CODEX, // AGENTS.md now supported by most agents
    AiAgent.CLAUDE, // CLAUDE.md
  ],
  instructions: [
    `# Developing projen itself

    - **Avoid running a full build**: It takes a long time. Instead run individual tasks directly.
    - **Run specific tests**: Use \`${project.projenCommand} test test/path-to-test.test.ts\` to run specific test files. Prefer this over running all tests.
    - **Always run the linter**: Use \`${project.projenCommand} eslint\` to ensure any code is formatted correctly and follows best practices. Use often.`,

    `## Integration tests

    - **Integration tests use the packaged build output**: End-to-end behavior that depends on the published artifacts (e.g. \`projen new\`, \`projen eject\`, cross-language synthesis) must be tested via the \`scripts/integ-*.sh\` scripts
    - Wire them through the \`IntegrationTests\` component in \`projenrc/integ-test.ts\`.
    - These tests will be run against the standard build output (the npm tarball in \`dist/js\`, wheels in \`dist/python\`, etc.).
    - Do NOT write Jest tests that rebuild projen or bundle their own artifacts - always consume the build output so the tests exercise what is actually shipped.`,
  ],
});

project.synth();
