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
  setupMergify,
  setupNpmignore,
  setupUpgradeDependencies,
  setupVscode,
  WindowsBuild,
} from "./projenrc";
import { ProjectTree, ReleasableCommits } from "./src";
import { JsiiProject } from "./src/cdk";

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

  jsiiVersion: "5.8.x",
  typescriptVersion: "5.8.x",

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
  workflowNodeVersion: "20.9.0",

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

setupCheckLicenses(project);

setupUpgradeDependencies(project);

setupJsiiDocgen(project);

setupProjenBootstrap(project, bootstrapScriptFile);

// because snapshots include the projen marker...
project.addExcludeFromCleanup("test/**");

setupGitignore(project);

setupMarkdown(project);

setupVscode(project);

setupMergify(project);

setupGitpod(project);

setupDevcontainer(project);

setupAllContributors(project);

setupNpmignore(project);

setupIntegTest(project);
setupBundleTaskRunner(project);

new WindowsBuild(project);

// we are projen, so re-synth after compiling.
// fixes feedback loop where projen contibutors run "build"
// but not all files are updated
if (project.defaultTask) {
  project.postCompileTask.spawn(project.defaultTask);
}

new ProjectTree(project);

project.synth();
