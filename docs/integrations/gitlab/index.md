# GitLab Integration

[GitLab CI/CD](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html) uses a `.gitlab-ci.yml` file located at the root of your repository to specify continuous integration and continuous deployment processes. GitLab CI configuration files can be split into multiple files using the [include](https://docs.gitlab.com/ee/ci/yaml/#include) fields in order to increase readability or reduce duplication of the same configuration in multiple places.

## Creating a configuration

We support the creation of GitLab CI/CD Configurations through a `CiConfiguration` class and a higher level `GitlabConfiguration` and `NestedConfiguration` classes. To create a GitLab configuration you must first create a [project](../../concepts/projects/index.md) to assign the configuration to.

When using GitLab for CI, the `.gitlab-ci.yml` is always located at the root of the project while other configuration files are located in the `.gitlab\ci-templates\` subdirectory.

```js
const { typescript, gitlab } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'my-project',
});
const gitlabMain = new gitlab.GitlabConfiguration(project,
  {
    jobs: {
      myJob: {
        script: 'echo Hello',
      },
    },
  });
gitlabMain.createNestedTemplates({
  myNestedTemplate: {
    jobs: {
      myOtherJob: {
        script: 'echo World!',
      },
    },
  },
});
project.synth();
```

This creates the following directory structure.

```shell
├── .gitlab-ci.yml
└── .gitlab
    └── ci-templates
         └── mynestedtemplate.yml
```

## Updating Nested Configurations

You can modify a `NestedConfiguration` through the `nestedTemplates` property of a `GitlabConfiguration`.

```js
const { typescript, gitlab } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'my-project',
});
const gitlabMain = new gitlab.GitlabConfiguration(project,
  {
    jobs: {
      myJob: {
        script: 'echo Hello',
      },
    },
  });
gitlabMain.createNestedTemplates({
  myNestedTemplate: {},
});
gitlabMain.nestedTemplates.myNestedTemplate.addStages('stage');
project.synth();
```
