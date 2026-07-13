const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-watchful',
  description: 'Watching your CDK apps since 2019',
  defaultReleaseBranch: 'master',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'elad.benisrael@gmail.com',
  repository: 'https://github.com/eladb/cdk-watchful.git',
  keywords: [
    'cloudwatch',
    'monitoring',
  ],

  catalog: {
    twitter: 'emeshbi',
  },

  // creates PRs for projen upgrades
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',

  cdkVersion: '2.189.1',

  devDeps: [
    'aws-sdk',
  ],

  // jsii publishing

  publishToMaven: {
    javaPackage: 'com.github.eladb.watchful',
    mavenGroupId: 'com.github.eladb',
    mavenArtifactId: 'cdk-watchful',
  },

  publishToPypi: {
    distName: 'cdk-watchful',
    module: 'cdk_watchful',
  },

  minNodeVersion: '16.0.0',
});

project.gitignore.exclude('.env', '.idea');
project.gitignore.exclude('example/*.js', 'example/*.d.ts');

project.synth();
