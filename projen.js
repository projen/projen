const { JsiiProject } = require('./lib/jsii-project');
const { Semver } = require('./lib/semver');

const lib = new JsiiProject({
  name: 'projen',
  jsiiVersion: Semver.caret('1.5.0'),
  version: '0.1.0',
  description: 'A new generation of a project generator',
  repository: 'https://github.com/eladb/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',
  peerDependencies: {
    constructs: Semver.caret('3.0.3'),
  },
});

lib.synth();
