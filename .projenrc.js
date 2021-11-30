const { JsiiProject, JsonFile, TextFile, NodePackageManager } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  description: 'CDK for software projects',
  repository: 'https://github.com/projen/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',
  keywords: [
    'scaffolding',
    'cicd',
    'project',
    'management',
    'generator',
    'cdk',
  ],

  pullRequestTemplateContents: [
    '---',
    'By submitting this pull request, I confirm that my contribution is made under the terms of the Apache 2.0 license.',
  ],

  bundledDeps: [
    'conventional-changelog-config-spec',
    'yaml',
    'fs-extra',
    'yargs',
    'case',
    'glob@^7',
    'semver',
    'chalk',
    '@iarna/toml',
    'xmlbuilder2',
    'ini',
    'shx',
  ],

  devDeps: [
    '@types/conventional-changelog-config-spec',
    '@types/fs-extra@^8',
    '@types/yargs',
    '@types/glob',
    '@types/semver',
    '@types/ini',
    'markmac',
    'all-contributors-cli',
  ],

  projenDevDependency: false, // because I am projen
  releaseToNpm: true,
  minNodeVersion: '12.7.0',
  workflowNodeVersion: '12.13.0', // required by jest

  codeCov: true,
  defaultReleaseBranch: 'main',
  gitpod: true,
  devContainer: true,
  // since this is projen, we need to always compile before we run
  projenCommand: '/bin/bash ./projen.bash',

  // cli tests need projen to be compiled
  compileBeforeTest: true,

  // makes it very hard to iterate with jest --watch
  jestOptions: {
    coverageText: false,
  },

  publishToMaven: {
    javaPackage: 'io.github.cdklabs.projen',
    mavenGroupId: 'io.github.cdklabs',
    mavenArtifactId: 'projen',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },

  publishToPypi: {
    distName: 'projen',
    module: 'projen',
  },
  releaseFailureIssue: true,

  // Disabled due to cycles between main module and submodules
  // publishToGo: {
  //   moduleName: 'github.com/projen/projen-go',
  // },

  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ['cdklabs-automation'], secret: 'GITHUB_TOKEN' },

  depsUpgradeOptions: {
    workflowOptions: {
      secret: 'PROJEN_GITHUB_TOKEN',
    },
  },
});

// this script is what we use as the projen command in this project
// it will compile the project if needed and then run the cli.
new TextFile(project, 'projen.bash', {
  lines: [
    '#!/bin/bash',
    `# ${TextFile.PROJEN_MARKER}`,
    'set -euo pipefail',
    'if [ ! -f lib/cli/index.js ]; then',
    '  echo "bootstrapping..."',
    '  npx jsii --silence-warnings=reserved-word --no-fix-peer-dependencies',
    'fi',
    'exec bin/projen $@',
  ],
});
project.npmignore.exclude('/projen.bash');

project.addExcludeFromCleanup('test/**'); // because snapshots include the projen marker...
project.gitignore.include('templates/**');

// expand markdown macros in readme
const macros = project.addTask('readme-macros');
macros.exec('mv README.md README.md.bak');
macros.exec('cat README.md.bak | markmac > README.md');
macros.exec('rm README.md.bak');
project.postCompileTask.spawn(macros);

new JsonFile(project, '.markdownlint.json', {
  obj: {
    'default': true,
    'commands-show-output': false,
    'line-length': {
      line_length: 200,
    },
  },
});
project.npmignore.exclude('/.markdownlint.json');

project.vscode.launchConfiguration.addConfiguration({
  type: 'pwa-node',
  request: 'launch',
  name: 'projen CLI',
  skipFiles: [
    '<node_internals>/**',
  ],
  program: '${workspaceFolder}/lib/cli/index.js',
  outFiles: [
    '${workspaceFolder}/lib/**/*.js',
  ],
});

project.github.mergify.addRule({
  name: 'Label core contributions',
  actions: {
    label: {
      add: ['contribution/core'],
    },
  },
  conditions: [
    'author~=^(eladb|Chriscbr)$',
    'label!=contribution/core',
  ],
});

project.gitpod.addCustomTask({
  name: 'Setup',
  init: 'yarn install',
  prebuild: 'bash ./projen.bash',
  command: 'npx projen build',
});

const setup = project.addTask('devenv:setup');
setup.exec('yarn install');
setup.spawn(project.buildTask);
project.devContainer.addTasks(setup);
project.npmignore.exclude('/.devcontainer.json');

project.addTask('contributors:update', {
  exec: 'all-contributors check | grep "Missing contributors" -A 1 | tail -n1 | sed -e "s/,//g" | xargs -n1 | grep -v "\[bot\]" | xargs -n1 -I{} all-contributors add {} code',
});
project.npmignore.exclude('/.all-contributorsrc');

project.npmignore.exclude('/scripts/');
project.npmignore.exclude('/ARCHITECTURE.md');
project.npmignore.exclude('/CODE_OF_CONDUCT.md');
project.npmignore.exclude('/CONTRIBUTING.md');
project.npmignore.exclude('/VISION.md');
project.npmignore.exclude('/SECURITY.md');
project.npmignore.exclude('/.gitattributes');
project.npmignore.exclude('/.gitpod.yml');

// Workaround for @types/jsdom issues due to upgrade to jest@27.4.0 as mentioned in https://github.com/projen/projen/issues/1264#issuecomment-982365744
if (project.package.packageManager === NodePackageManager.YARN) {
  project.package.addField('resolutions', {
    'jest-environment-jsdom': '27.3.1',
  });
}

project.synth();
