const { JsiiProject, Semver } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  jsiiVersion: Semver.caret('1.5.0'),
  description: 'A new generation of project generators',
  repository: 'https://github.com/eladb/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',
  dependencies: {
    constructs: Semver.pinned('2.0.1'),
    yaml: Semver.caret('1.9.2'),
    'fs-extra': Semver.caret('9.0.1'),
    yargs: Semver.caret('15.4.0')
  },
  peerDependencies: {
    constructs: Semver.pinned('2.0.1')
  },
  devDependencies: {
    '@types/fs-extra': Semver.caret('8.0.1'),
    '@types/yargs': Semver.caret('15.0.5')
  },
  bundledDependencies: [ 'yaml', 'fs-extra', 'yargs' ],
  projenDevDependency: false, // because I am projen
  workflowBootstrapSteps: [
    { run: `yarn bootstrap` }
  ]
});

project.addScripts({
  bootstrap: 'yarn install && yarn compile && yarn projen'
});
project.gitignore.comment('templates must live in the repo');
project.gitignore.include('templates/**');

project.synth();
