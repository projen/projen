import { Cdk8sTypeScriptAppOptions, Cdk8sTypeScriptApp } from '../cdk8s-app-ts';
import { LogLevel } from '../logger';
import { synthSnapshot, mkdtemp } from './util';

test ('test if cdk8s synth is possible', () => {
  const project = new TestCdk8sAppProject({
    cdk8sVersion: '1.0.0-beta.11',
    name: 'project',
    defaultReleaseBranch: 'main',
    releaseWorkflow: true,
  });

  const output = synthSnapshot(project);


  // expect a synth script
  expect(output['package.json'].scripts.synth).toContain(
    'npx projen synth',
  );

  // expect a synth task
  expect(output['.projen/tasks.json'].tasks.synth.steps).toStrictEqual([{
    exec: 'cdk8s synth',
  }]);

  // expect build step to contain synth
  expect(output['.projen/tasks.json'].tasks.build.steps).toStrictEqual([
    {
      exec: 'npx projen',
    },
    {
      spawn: 'test',
    },
    {
      spawn: 'compile',
    },
    {
      spawn: 'synth',
    },
  ]);

  expect(output['package.json'].dependencies).toStrictEqual({
    'cdk8s': '^1.0.0-beta.11',
    'cdk8s-plus-17': '^1.0.0-beta.11',
    'constructs': '^3.2.34',
  });

});


class TestCdk8sAppProject extends Cdk8sTypeScriptApp {
  constructor(options: Cdk8sTypeScriptAppOptions) {
    super({
      outdir: mkdtemp(),
      logging: {
        level: LogLevel.OFF,
      },
      ...options,
    });
  }
}