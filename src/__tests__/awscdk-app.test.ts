import { AwsCdkTypeScriptApp } from '../awscdk-app-ts';
import { mkdtemp, synthSnapshot } from './util';

describe('cdkVersion is >= 2.0.0', () => {
  test('use "aws-cdk-lib" the constructs at ^10.0.5', () => {
    const project = new AwsCdkTypeScriptApp({
      outdir: mkdtemp(),
      cdkVersion: '2.0.0-rc.1',
      defaultReleaseBranch: 'main',
      name: 'test',
    });
    const snap = synthSnapshot(project);
    expect(snap['package.json'].dependencies).toStrictEqual({
      '@aws-cdk/assert': '^2.0.0-rc.1',
      'aws-cdk-lib': '^2.0.0-rc.1',
      'constructs': '^10.0.5',
    });
    expect(snap['src/main.ts'].indexOf('import { App, Stack, StackProps } from \'aws-cdk-lib\'')).not.toEqual(-1);
  });
});


describe('constructs dependency selection', () => {
  test('user-selected', () => {
    // GIVEN
    const project = new AwsCdkTypeScriptApp({
      outdir: mkdtemp(),
      cdkVersion: '1.100.0',
      defaultReleaseBranch: 'main',
      name: 'test',
      deployGroups: {
        dev: 'stacks-dev-*',
        prod: 'stacks-prod-*',
      },
    });

    // WHEN
    const snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']?.scripts['deploy:dev']).toBe('npx projen deploy:dev');
    expect(snapshot['.projen/tasks.json']?.tasks['deploy:dev'].steps[0].exec).toBe('cdk deploy \'stacks-dev-*\'');
  });
});