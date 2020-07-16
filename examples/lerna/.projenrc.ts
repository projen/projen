import { LernaProject, Jest, JsiiProject, Semver, TypescriptConfig } from '../../lib';

const common = require('./projen-common');

// monorepo
const cdk8sProject = new LernaProject({
  name: 'cdk8s',
  outdir: 'example-output'
});
new Jest(cdk8sProject, {
  typescript: new TypescriptConfig(cdk8sProject, {
    compilerOptions: {}
  })
});
cdk8sProject.addScripts({
  bump: 'tools/bump.sh',
  build: 'lerna run build',
  test: 'lerna run test',
  package: 'lerna run package && tools/collect-dist.sh',
  integ: 'test/run-against-dist test/test-all.sh',
  'integ:update': 'UPDATE_SNAPSHOTS=1 yarn integ',
  'release-github': 'tools/release-github.sh'
})
cdk8sProject.addDevDependencies({
  'changelog-parser': Semver.caret('2.8.0'),
  lerna: Semver.caret('3.20.2'),
  'standard-version': Semver.caret('7.1.0'),
  semver: Semver.pinned('7.3.2'),
  'jsii-release': Semver.caret('0.1.9')
});

// cdk8s Package
const cdk8sPackage = new JsiiProject({
  name: 'cdk8s',
  description: 'Cloud Development Kit for Kubernetes',
  stability: 'experimental',

  ...common.options,

  // dependencies
  jsiiVersion: Semver.caret(common.versions.jsii),
  peerDependencies: {
    'constructs': Semver.pinned(common.versions.constructs),
  },
  dependencies: {
    'follow-redirects': Semver.caret('1.11.0'),
    'json-stable-stringify': Semver.caret('1.0.1'),
    'yaml': Semver.caret('1.7.2'),
  },
  bundledDependencies: [
    'yaml',
    'json-stable-stringify',
    'follow-redirects'
  ],
  devDependencies: {
    '@types/follow-redirects': Semver.caret('1.8.0'),
    '@types/json-stable-stringify': Semver.caret('1.0.32'),
    '@types/yaml': Semver.caret('1.2.0'),
    'constructs': Semver.caret(common.versions.constructs),
    'json-schema-to-typescript': Semver.caret('8.0.1'),
  },

  // jsii configuration
  java: {
    javaPackage: 'org.cdk8s',
    mavenGroupId: 'org.cdk8s',
    mavenArtifactId: 'cdk8s'
  },
  python: {
    distName: 'cdk8s',
    module: 'cdk8s'
  },
  dotnet: {
    dotNetNamespace: 'Org.Cdk8s',
    packageId: 'Org.Cdk8s'
  }
});

common.fixup(cdk8sPackage);
// _loadurl.js is written in javascript so we need to commit it and also copy it
// after compilation to the `lib/` directory.
cdk8sPackage.gitignore.include('/src/_loadurl.js');
cdk8sPackage.addCompileCommand('cp src/_loadurl.js lib/');

// cdk8s-plus
const cdk8sDependency = Semver.caret('0.0.0')

const cdk8sPlusPackage = new JsiiProject({
  name: 'cdk8s-plus',
  description: 'High level abstractions on top of cdk8s',
  stability: 'experimental',

  ...common.options,

  // dependencies
  jsiiVersion: Semver.caret(common.versions.jsii),
  peerDependencies: {
    constructs: Semver.caret(common.versions.constructs),
    cdk8s: cdk8sDependency,
  },
  dependencies: {
    minimatch: Semver.caret('3.0.4'),
    cdk8s: cdk8sDependency
  },
  bundledDependencies: ['minimatch'],
  devDependencies: {
    '@types/minimatch': Semver.caret('3.0.3'),
  },

  // jsii configuration
  java: {
    javaPackage: 'org.cdk8s.plus',
    mavenGroupId: 'org.cdk8s',
    mavenArtifactId: 'cdk8s-plus'
  },
  python: {
    distName: 'cdk8s-plus',
    module: 'cdk8s_plus'
  },
  dotnet: {
    dotNetNamespace: 'Org.Cdk8s.Plus',
    packageId: 'Org.Cdk8s.Plus'
  }
});

common.fixup(cdk8sPlusPackage);

cdk8sProject.addPackage(cdk8sPlusPackage);
cdk8sProject.addPackage(cdk8sPackage);
cdk8sProject.noHoist(cdk8sPackage, 'yaml');
cdk8sProject.noHoist(cdk8sPackage, 'yaml/**');
cdk8sProject.noHoist(cdk8sPackage, 'json-stable-stringify');
cdk8sProject.noHoist(cdk8sPackage, 'json-stable-stringify/**');
cdk8sProject.noHoist(cdk8sPackage, 'follow-redirects');
cdk8sProject.noHoist(cdk8sPackage, 'follow-redirects/**');
cdk8sProject.noHoist(cdk8sPlusPackage, 'minimatch');
cdk8sProject.noHoist(cdk8sPlusPackage, 'minimatch/**');

cdk8sProject.synth();
