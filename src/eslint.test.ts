import { Eslint } from './eslint';
import { JsiiProject } from './jsii-project';
// import { NodeProject } from './node-project';
import { Semver } from './semver';

test('ESLint config can be applied before synthesis', () => {
  const project = new JsiiProject({
    eslint: false,
    name: 'projen',
    jsiiVersion: Semver.caret('1.5.0'),
    description: 'A new generation of project generators',
    repository: 'https://github.com/eladb/projen.git',
    authorName: 'Elad Ben-Israel',
    authorEmail: 'benisrae@amazon.com',
    stability: 'experimental',
    dependencies: {
      'constructs': Semver.pinned('2.0.1'),
      'yaml': Semver.caret('1.9.2'),
      'fs-extra': Semver.caret('9.0.1'),
    },
    peerDependencies: {
      constructs: Semver.pinned('2.0.1'),
    },
    devDependencies: {
      '@types/fs-extra': Semver.caret('8.0.1'),
    },
    bundledDependencies: [ 'yaml', 'fs-extra' ],
    projenDevDependency: false, // because I am projen
    workflowBootstrapSteps: [
      { run: 'yarn bootstrap' },
    ],
  });
  
  new Eslint(project);

  project.synth();
});