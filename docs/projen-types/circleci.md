# CircleCi

CircleCi uses `.circleci/config.yml` to specify the configuration of a pipeline. 
Configuration reference can be found [here](https://circleci.com/docs/2.0/configuration-reference).

Initial configuration can be created through options of [CircleCiProps](/src/circleci/model.ts).
Additionally, you can add workflows or orbs later to your pipeline.
For full configuration example checkout [Circleci Tests](/test/cirlceci/circleci.test.ts)

```js
const { circleci, typescript } = require('projen');

const project = new typescript.TypeScriptProject({
    name: 'projen-example',
    defaultReleaseBranch: 'main',
});

const c = new circleci.Circleci(project, {
    orbs: {
        node: 'circleci/node@5.0.1',
    },
    jobs: [
        {
            identifier: "release",
            resourceClass: circleci.ResourceClass.SMALL,
            docker: [{
                image: "cimg/node:lts"
            }],
            steps: [
                "checkout",
                {run: {command: "npx semantic-release"}},
            ]
        },
        {
            identifier: 'integ-test',
            docker: [{
                image: "cimg/golang:lts"
            }],
            steps: [
                "checkout",
                {
                    "go/test": {
                        covermode: "atomic",
                        failfast: true,
                        race: true,
                    },
                }
            ]
        }
    ],
    workflows: [
        {
            identifier: 'build',
            jobs: [
                {
                    identifier: 'node/test',
                    orbParameters: {
                        "test-results-for": "jest"
                    }
                },
                {
                    identifier: "release",
                    filters: circleci.FilterMainBranchOnly,
                }
            ],
        },
    ],
});
c.addOrb("go", "circleci/go@1.7.1")
c.addWorkflow({
    identifier: 'nightly',
    triggers: [
        {
            schedule: {
                cron: '0 0 * * *',
                filters: circleci.FilterMainBranchOnly,
            }
        }
    ],
    jobs: [
        {
            identifier: 'integ-test'
        }
    ]
})
project.synth();
```
