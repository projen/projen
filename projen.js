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
    yaml: Semver.caret('1.9.2')
  },
  bundledDependencies: [ 'yaml' ],
  peerDependencies: {
    constructs: Semver.caret('2.0.1'),
  },
  projenDevDependency: false, // because I am projen
});

project.synth();
