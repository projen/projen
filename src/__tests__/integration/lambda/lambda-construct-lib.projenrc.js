const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: 'lambda-construct-lib',
  authorName: 'Amazon Web Services',
  defaultReleaseBranch: 'main',
  repository: 'https://github.com/projen/projen.git',
  cdkVersion: '1.110.0'
});

project.synth();

