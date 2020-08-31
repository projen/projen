const { JsiiProject, Semver } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  description: 'A new generation of project generators',
  repository: 'https://github.com/eladb/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',

  bundledDeps: [
    'yaml',
    'fs-extra',
    'yargs',
    'decamelize',
    'glob',
    'inquirer',
  ],

  devDeps: [
    '@types/fs-extra',
    '@types/yargs',
    '@types/glob',
    '@types/inquirer',
  ],

  projenDevDependency: false, // because I am projen
  scripts: {
    bootstrap: [ 'yarn install', 'yarn compile', 'yarn projen' ].join(' && ')
  },
  workflowBootstrapSteps: [
    { run: `yarn bootstrap` }
  ],
  releaseToNpm: true,
  minNodeVersion: '10.17.0',
  compileBeforeTest: true,
});

project.gitignore.include('templates/**');
project.addCompileCommand('yarn projen');

project.synth();
