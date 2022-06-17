# GitLab

[GitLab CI/CD](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html) uses a `.gitlab-ci.yml` file located at the root of your repository to specify continuous integration and continuous deployment processes. GitLab CI configuration files can be split into multiple files using the [include](https://docs.gitlab.com/ee/ci/yaml/#include) fields in order to increase readability or reduce duplication of the same configuration in multiple places.

## Creating a configuration

We support the creation of GitLab CI/CD Configurations through a `CiConfiguration` class and a higher level `GitlabConfiguration` and `NestedConfiguration` classes. To create a GitLab configuration you must first create a [project](./project.md) to assign the configuration to.

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

## Sequences

Sequences are not part of the standard Gitlab CI definition, but are a powerful addition of the projen Gitlab library.
They allow you to bundle multiple jobs for:

* applying common configuration to them.
* re-using the jobs within a pipeline, e.g. running the same kind of jobs for multiple stages.
* providing pipeline snippets, consisting of multiple jobs doing a specific job, in your own library.

Let's show a short example, how how Sequences work:

```typescript
import { GitlabConfiguration, Image, Sequence } from "../../src/gitlab"
import { synthSnapshot, TestProject } from '../util'

test("create documentation example project", () => {


    class PublishApp extends Sequence {
        public constructor(environment: string) {
            super()
            this.stageToPrepend = environment
            this.addChildren({
                job1: { script: ["build my app"], stage: "build" },
                job2: { script: [`upload to ${environment}`], stage: "deploy" }
            })
        }
    }

    const project = new TestProject()
    const config = new GitlabConfiguration(project)

    const publish_dev = new PublishApp("dev")
    const publish_prd = new PublishApp("prd")

    const buildImage: Image = { name: "mycompany/buildimage:latest" }
    publish_dev.imageToInit = buildImage
    publish_prd.imageToInit = buildImage

    publish_dev.tagsToAdd = ["dev-runner"]
    publish_prd.tagsToAdd = ["prd-runner"]

    config.addJobs({ dev: publish_dev, prd: publish_prd })

    expect(synthSnapshot(project)[".gitlab-ci.yml"]).toMatchSnapshot();
})
```

We have wrapped the code of the `projen.ts` into a Jest test file. This allows us and you to simply generate a snapshot file with the contents of the `.gitlab-ci.yaml` by running:

```sh
npx jest test/gitlab/docs-sequence.test.ts -t 'create documentation example project' -u
```

The resulting pipeline should look like following:

```yaml
stages:
  - devbuild
  - devdeploy
  - prdbuild
  - prddeploy
dev_job1:
  image:
    name: mycompany/buildimage:latest
  script:
    - build my app
  stage: devbuild
  tags:
    - dev-runner
dev_job2:
  image:
    name: mycompany/buildimage:latest
  script:
    - upload to dev
  stage: devdeploy
  tags:
    - dev-runner
prd_job1:
  image:
    name: mycompany/buildimage:latest
  script:
    - build my app
  stage: prdbuild
  tags:
    - prd-runner
prd_job2:
  image:
    name: mycompany/buildimage:latest
  script:
    - upload to prd
  stage: prddeploy
  tags:
    - prd-runner
```

Let's sum up some aspects of sequences we have used in this example:

* We have provided a reusable sequence of jobs by providing the `PublishApp` class.
  The jobs within that sequence do a common task: building and publishing our application.
  Those jobs are re-usable because we spent our sequence class a configurable interface by the constructor arguments.
  We also could have created a function returning a sequence, but a class is mostly a better choice as it provides
  more possibilities, like storing additional information or publishing parts of the contents.
* We used the common configuration interface of the sequence to modify the contained jobs.
  We do this without taking care of which jobs are inside the sequence.
  So we conveniently configured the the stage, build image and tags.
* The sequence takes care of preventing naming conflicts between jobs, by namespacing the jobs depending on the sequence they are in.

The configuration interface of sequences allows to modify all properties of the contained jobs.
For this the sequence provide methods that starts with the name of the job property and end with following names:

* `*ToInit` - Set a value for that property on every job whose value hasn't been set before.
* `*ToReplace` - Replaces the property value on every job.
* `*ToAdd` - Adds a value to a job property where possible, like on `Job.artifacts`.
* `*ToPrepend` - Inserts a value before any existing values of that job property where possible, like on `Job.script`.
* `*ToAppend` - Inserts a value after any existing values of that job property where possible, like on `Job.script`.

For more information on the configuration interface please consult the Sequences constructor API interface.

The good things don't end here: Sequences could not only contain jobs but sequences itself.
This allows you to compose your pipeline of multiple job sequences vertically and horizontally.
Modifications are applied recursively to all jobs in all sequences.
Especially this allows you to use predefined sequences of others and apply your configurations as needed.
