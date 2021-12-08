import { ConstructLibraryCdk8s } from '../src/cdk8s';
import { synthSnapshot } from './util';

test ('constructs version defined', () => {
  const project = new ConstructLibraryCdk8s({
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
    cdk8s: '^1.0.0-beta.18',
    constructs: '^3.3.75',
  });

});

test ('constructs version undefined', () => {
  const project = new ConstructLibraryCdk8s({
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
    cdk8s: '^1.0.0-beta.11',
    constructs: '^3.2.34',
  });


});

test ('constructs version pinning', () => {
  const project = new ConstructLibraryCdk8s({
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
    cdk8s: '^1.0.0-beta.18',
    constructs: '3.3.75',
  });

});

test ('cdk8sPlusVersion undefined', () => {
  const project = new ConstructLibraryCdk8s({
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
    cdk8s: '^1.0.0-beta.11',
    constructs: '^3.3.75',
  });
});
