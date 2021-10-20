import { ConstructLibraryCdk8s, ConstructLibraryCdk8sOptions } from '../src/cdk8s-construct';
import { LogLevel } from '../src/logger';
import { synthSnapshot, mkdtemp } from './util';

test ('constructs version defined', () => {
  const project = new TestCdk8sConstructsProject({
    cdk8sVersion: '1.0.0-beta.18',
    name: 'project',
    defaultReleaseBranch: 'main',
    releaseWorkflow: true,
    constructsVersion: '3.3.75',
    repositoryUrl: 'github.com/test/test',
    author: 'test',
    authorAddress: 'test@test.com',
  });

  const output = synthSnapshot(project);


  expect(output['package.json'].peerDependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.18',
    'cdk8s-plus-17': '^1.0.0-beta.18',
    'constructs': '^3.3.75',
  });

});

test ('constructs version undefined', () => {
  const project = new TestCdk8sConstructsProject({
    cdk8sVersion: '1.0.0-beta.11',
    name: 'project',
    defaultReleaseBranch: 'main',
    releaseWorkflow: true,
    repositoryUrl: 'github.com/test/test',
    author: 'test',
    authorAddress: 'test@test.com',
  });

  const output = synthSnapshot(project);

  expect(output['package.json'].peerDependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.11',
    'cdk8s-plus-17': '^1.0.0-beta.11',
    'constructs': '^3.2.34',
  });


});

test ('constructs version pinning', () => {
  const project = new TestCdk8sConstructsProject({
    cdk8sVersion: '1.0.0-beta.18',
    name: 'project',
    defaultReleaseBranch: 'main',
    releaseWorkflow: true,
    constructsVersion: '3.3.75',
    constructsVersionPinning: true,
    repositoryUrl: 'github.com/test/test',
    author: 'test',
    authorAddress: 'test@test.com',
  });

  const output = synthSnapshot(project);

  expect(output['package.json'].peerDependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.18',
    'cdk8s-plus-17': '^1.0.0-beta.18',
    'constructs': '3.3.75',
  });

});

test ('cdk8sPlusVersion undefined', () => {
  const project = new TestCdk8sConstructsProject({
    cdk8sVersion: '1.0.0-beta.11',
    name: 'project',
    defaultReleaseBranch: 'main',
    releaseWorkflow: true,
    repositoryUrl: 'github.com/test/test',
    author: 'test',
    authorAddress: 'test@test.com',
    constructsVersion: '3.3.75',
  });

  const output = synthSnapshot(project);

  expect(output['package.json'].peerDependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.11',
    'cdk8s-plus-17': '^1.0.0-beta.11',
    'constructs': '^3.3.75',
  });
});

test ('cdk8sPlusVersion defined', () => {
  const project = new TestCdk8sConstructsProject({
    cdk8sVersion: '1.0.0-beta.11',
    name: 'project',
    defaultReleaseBranch: 'main',
    cdk8sPlusVersion: '1.0.0-beta.10',
    releaseWorkflow: true,
    repositoryUrl: 'github.com/test/test',
    author: 'test',
    authorAddress: 'test@test.com',
    constructsVersion: '3.3.75',
  });

  const output = synthSnapshot(project);

  expect(output['package.json'].peerDependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.11',
    'cdk8s-plus-17': '^1.0.0-beta.10',
    'constructs': '^3.3.75',
  });
});

test ('cdk8sPlusVersion pinning', () => {
  const project = new TestCdk8sConstructsProject({
    cdk8sVersion: '1.0.0-beta.11',
    name: 'project',
    defaultReleaseBranch: 'main',
    cdk8sPlusVersion: '1.0.0-beta.10',
    cdk8sPlusVersionPinning: true,
    releaseWorkflow: true,
    repositoryUrl: 'github.com/test/test',
    author: 'test',
    authorAddress: 'test@test.com',
    constructsVersion: '3.3.75',
  });

  const output = synthSnapshot(project);

  expect(output['package.json'].peerDependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.11',
    'cdk8s-plus-17': '1.0.0-beta.10',
    'constructs': '^3.3.75',
  });
});

class TestCdk8sConstructsProject extends ConstructLibraryCdk8s {
  constructor(options: ConstructLibraryCdk8sOptions) {
    super({
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
      ...options,
    });
  }
}