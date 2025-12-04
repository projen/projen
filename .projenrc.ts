import * as path from "path";
import {
  setupAllContributors,
  setupProjenBootstrap,
  setupBundleTaskRunner,
  setupCheckLicenses,
  setupDevcontainer,
  setupJsiiDocgen,
  setupGitignore,
  setupGitpod,
  setupIntegTest,
  setupMarkdown,
  setupNpmignore,
  setupUpgradeDependencies,
  setupVscode,
  WindowsBuild,
  JsiiFromJsonSchema,
  JsonConst,
} from "./projenrc";
import {
  AiInstructions,
  javascript,
  JsonPatch,
  ProjectTree,
  ReleasableCommits,
} from "./src";
import { JsiiProject } from "./src/cdk";
import { tryResolveDependencyVersion } from "./src/javascript/util";

const bootstrapScriptFile = "projen.js";

const project = new JsiiProject({
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
    mergify: false,
    mergeQueue: true,
    pullRequestLintOptions: {
      contributorStatement:
        "By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.",
      contributorStatementOptions: {
        exemptUsers: ["cdklabs-automation", "dependabot[bot]"],
      },
    },
  },

  jsiiVersion: "5.9.x",
  typescriptVersion: "5.9.x",

  packageManager: javascript.NodePackageManager.NPM,

  deps: ["constructs@^10.0.0"],

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
    "shx",
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
    "all-contributors-cli",
    "json2jsii",
    // Needed to generate biome config
    "@biomejs/biome@^2",
    // used to get current node versions in tests
    "@jsii/check-node",
    // used to get CDK V2 feature flags
    "aws-cdk-lib",
  ],

  peerDeps: ["constructs@^10.0.0"],

  depsUpgrade: false, // configured below
  auditDeps: true,
  auditDepsOptions: {
    prodOnly: true,
  },

  projenDevDependency: false, // because I am projen
  releaseToNpm: true,
  minNodeVersion: "16.0.0", // Do not change this before a version has been EOL for a while
  workflowNodeVersion: "lts/-1", // use the previous lts for builds

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
    },
  },

  // To reduce the release frequency we only release features and fixes
  // This is important because PyPI has limits on the total storage amount used, and extensions need to be manually requested
  releasableCommits: ReleasableCommits.featuresAndFixes(),

  releaseEnvironment: "release",
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
  npmTrustedPublishing: true,
  npmProvenance: true,

  releaseFailureIssue: true,

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ["cdklabs-automation"] },
  checkLicenses: {
    allow: ["MIT", "ISC", "BSD", "BSD-2-Clause", "BSD-3-Clause", "Apache-2.0"],
  },
});

// Trusted Publishing requires npm 11 which is available by default in node 24
project.github
  ?.tryFindWorkflow("release")
  ?.file?.patch(
    JsonPatch.replace("/jobs/release_npm/steps/0/with/node-version", "24.x")
  );

// cannot upgrade xmlbuilder2 to v4 as it drops node versions < 20
// instead we force js-yaml to a fixed version
project.package.addField("overrides", {
  xmlbuilder2: {
    "js-yaml": "^3.14.2",
  },
});

setupCheckLicenses(project);

setupUpgradeDependencies(project);

setupJsiiDocgen(project);

setupProjenBootstrap(project, bootstrapScriptFile);

// because snapshots include the projen marker...
project.addExcludeFromCleanup("test/**");

setupGitignore(project);

setupMarkdown(project);

setupVscode(project);

setupGitpod(project);

setupDevcontainer(project);

setupAllContributors(project);

setupNpmignore(project);

setupIntegTest(project);

setupBundleTaskRunner(project);

new JsiiFromJsonSchema(project, {
  structName: "BiomeConfiguration",
  schemaPath: require.resolve("@biomejs/biome/configuration_schema.json"),
  filePath: path.join("src", "javascript", "biome", "biome-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "PyprojectToml",
  schemaPath: "schemas/pyproject.json",
  filePath: path.join("src", "python", "pyproject-toml.ts"),
  transform: (schema) => (
    (schema.properties.tool.properties = Object.fromEntries(
      Object.entries(schema.properties.tool.properties).map(
        ([tool, def]) => (delete (def as any).$ref, [tool, def])
      )
    )),
    schema
  ),
});

new JsiiFromJsonSchema(project, {
  structName: "UvConfiguration",
  schemaPath: "schemas/uv.json",
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
  structName: "RuffConfiguration",
  schemaPath: "schemas/ruff.json",
  filePath: path.join("src", "python", "ruff-config.ts"),
  transform: (schema) => (
    (schema.definitions.ImportSection = { type: "string" }), schema
  ),
});

new JsiiFromJsonSchema(project, {
  structName: "BlackConfiguration",
  schemaPath: "schemas/partial-black.json",
  filePath: path.join("src", "python", "black-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "MypyConfiguration",
  schemaPath: "schemas/partial-mypy.json",
  filePath: path.join("src", "python", "mypy-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "TyConfiguration",
  schemaPath: "schemas/ty.json",
  filePath: path.join("src", "python", "ty-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "HatchConfiguration",
  schemaPath: "schemas/hatch.json",
  filePath: path.join("src", "python", "hatch-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "SetuptoolsConfiguration",
  schemaPath: "schemas/partial-setuptools.json",
  filePath: path.join("src", "python", "setuptools-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "PoetryConfiguration",
  schemaPath: "schemas/partial-poetry.json",
  filePath: path.join("src", "python", "poetry-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "PdmConfiguration",
  schemaPath: "schemas/partial-pdm.json",
  filePath: path.join("src", "python", "pdm-config.ts"),
  transform: (schema) => (
    delete schema.properties.scripts.properties._, schema
  ),
});

new JsiiFromJsonSchema(project, {
  structName: "PyrightConfiguration",
  schemaPath: "schemas/partial-pyright.json",
  filePath: path.join("src", "python", "pyright-config.ts"),
});

new JsiiFromJsonSchema(project, {
  structName: "PytestConfiguration",
  schemaPath: "schemas/partial-pytest.json",
  filePath: path.join("src", "python", "pytest-config.ts"),
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

new ProjectTree(project);

new AiInstructions(project);

project.synth();
