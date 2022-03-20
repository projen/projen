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

console.log(project.deps);

// project.addGitIgnore("/yarn.lock")
const c = new circleci.Circleci(project, {
  enabled: true,
  orbs: {
    hello: 'world:3.0',
  },
  workflows: [
    {
      identifier: 'workflow1',
      jobs: [
        {
          identifier: 'job2',
          context: [
            'npm',
            'github',
          ],
        },
        {
          identifier: 'job2',
          context: [
            'test',
          ],
        },
      ],
    },
  ],
});

project.synth();
