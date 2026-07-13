exports.options = {
  minNodeVersion: '12.7.0',
  repository: 'https://github.com/awslabs/cdk8s.git',
  authorName: 'Amazon Web Services',
  authorUrl: 'https://aws.amazon.com',
  authorOrganization: true,
  buildWorkflow: false,
  rebuildBot: false,
  stability: 'experimental',
  release: false,
  dependabot: false,
  githubOptions: { mergify: false },
  compat: false,
  dependabot: false,
  pullRequestTemplate: false,
  keywords: [
    "cdk",
    "kubernetes",
    "k8s",
    "constructs"
  ]
};

// some common fixups for projects
exports.fixup = project => {
  // override the default "build" from projen because currently in this
  // repo it means "compile"
  project.setScript('build', 'yarn compile');

  // // add "compile" after test because the test command deletes lib/ and we run tests *after* build in this repo.
  project.testTask.exec('yarn compile');

  // jsii-release is declared at the root level, we don't need it here.
  project.deps.removeDependency('jsii-release');

  delete project.package.manifest.scripts.bump;
  delete project.package.manifest.scripts.release;
};
