const { JsiiProject, Semver } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  commitPackageJson: true, // otherwise its very hard to bootstrap this specific project
  jsiiVersion: Semver.caret('1.5.0'),
  description: 'A new generation of project generators',
  repository: 'https://github.com/eladb/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',
  bin: {
    projen: 'bin/projen'
  },
  dependencies: {
    constructs: Semver.pinned('2.0.1'),
    yaml: Semver.caret('1.9.2')
  },
  peerDependencies: {
    constructs: Semver.pinned('2.0.1'),
  },
  bundledDependencies: [ 'yaml' ],
  projenDevDependency: false, // because I am projen
  workflowBootstrapSteps: [
    { run: `yarn bootstrap` }
  ],
  minNodeVersion: Semver.caret('10.20.1')
});

project.addScripts({
  bootstrap: 'yarn install && yarn compile && yarn projen'
});

project.synth();
