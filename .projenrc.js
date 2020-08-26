const { JsiiProject, Semver } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  description: 'A new generation of project generators',
  repository: 'https://github.com/eladb/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',
  dependencies: {
    'yaml': Semver.caret('1.10.0'),
    'fs-extra': Semver.caret('9.0.1'),
    'yargs': Semver.caret('15.4.1'),
    'decamelize': Semver.caret('4.0.0'),
    'glob': Semver.caret('7.1.6')
  },
  devDependencies: {
    '@types/fs-extra': Semver.caret('8.0.1'),
    '@types/yargs': Semver.caret('15.0.5'),
    '@types/glob': Semver.caret('7.1.3'),
  },
  bundledDependencies: [
    'yaml', 'fs-extra', 'yargs', 'decamelize', 'glob'
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
