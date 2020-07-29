const { JsiiProject, Semver } = require('./lib');

const constructs = Semver.pinned('2.0.1');

const project = new JsiiProject({
  name: 'projen',
  jsiiVersion: Semver.caret('1.5.0'),
  description: 'A new generation of project generators',
  repository: 'https://github.com/eladb/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',
  dependencies: {
    'yaml': Semver.caret('1.9.2'),
    'fs-extra': Semver.caret('9.0.1'),
    'yargs': Semver.caret('15.4.0'),
    'constructs': constructs,
    'decamelize': Semver.caret('4.0.0')
  },
  devDependencies: {
    '@types/fs-extra': Semver.caret('8.0.1'),
    '@types/yargs': Semver.caret('15.0.5')
  },
  peerDependencies: {
    'constructs': constructs
  },
  bundledDependencies: [
    'yaml', 'fs-extra', 'yargs', 'decamelize',
  ],
  projenDevDependency: false, // because I am projen
  workflowBootstrapSteps: [
    { run: `yarn bootstrap` }
  ],
  releaseToNpm: true,
  minNodeVersion: '10.17.0',
  compileBeforeTest: true,
});

project.addScripts({
  bootstrap: 'yarn install && yarn compile && yarn projen'
});
project.gitignore.comment('templates must live in the repo');
project.gitignore.include('templates/**');

project.synth();
