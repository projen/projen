const { cdk } = require('projen');

const common = require('./cdk8s.common');

const project = new cdk.JsiiProject({
  name: 'cdk8s',
  description: 'Cloud Development Kit for Kubernetes',
  defaultReleaseBranch: 'master',
  stability: common.options.stability,

  // without this, the version of 'constructs' would need to be controlled
  // from this file, since otherwise it would create a 0.0.0 dev dependency.
  peerDependencyOptions: {
    pinnedDevDependency: false,
  },

  ...common.options,

  peerDeps: [
    'constructs',
  ],
  bundledDeps: [
    'yaml',
    'json-stable-stringify',
    'follow-redirects',
    'fast-json-patch',
  ],
  devDeps: [
    'constructs',
    '@types/follow-redirects',
    '@types/json-stable-stringify',
    '@types/yaml',
    'json-schema-to-typescript',
  ],

  // jsii configuration
  publishToMaven: {
    javaPackage: 'org.cdk8s',
    mavenGroupId: 'org.cdk8s',
    mavenArtifactId: 'cdk8s',
  },
  publishToPypi: {
    distName: 'cdk8s',
    module: 'cdk8s',
  },
  publishToNuget: {
    dotNetNamespace: 'Org.Cdk8s',
    packageId: 'Org.Cdk8s',
  },
});

common.fixup(project);

// _loadurl.js is written in javascript so we need to commit it and also copy it
// after compilation to the `lib/` directory.
project.gitignore.include('/src/_loadurl.js');
project.addCompileCommand('cp src/_loadurl.js lib/');

project.synth();
