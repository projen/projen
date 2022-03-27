const { circleci, typescript, LogLevel } = require('projen');

const project = new typescript.TypeScriptProject({
  name: 'projen-example',
  defaultReleaseBranch: 'main',
  logging: {
    level: LogLevel.DEBUG,
  },
  github: false,
  eslint: false,
  license: false,
  sampleCode: false,
  npmignoreEnabled: false,

});

// project.addGitIgnore("/yarn.lock")
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

project.synth();
