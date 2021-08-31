import { AwsCdkTypeScriptApp } from '../awscdk-app-ts';
import { mkdtemp, synthSnapshot } from '../test-utils';

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
