const { awscdk, Semver } = require('projen');

const project = new awscdk.ConstructLibraryAws({
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

  cdkVersion: '1.75.0',
  cdkDependencies: [
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-ecs-patterns',
    '@aws-cdk/aws-elasticloadbalancingv2',
    '@aws-cdk/aws-events',
    '@aws-cdk/aws-events-targets',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-rds',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-sqs',
    '@aws-cdk/core',
  ],

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
