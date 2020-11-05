import { AwsCdkTypeScriptApp, CdkApprovalLevel } from '../src/';
import { synthSnapshot } from './util';

test('sample src code synthesises correctly', () => {

  const prj = new AwsCdkTypeScriptApp(
    {
      name: 'newcdkappproject',
      cdkVersion: '1.2.3',
    },
  );

  expect(prj.cdkConfig.context).toBeUndefined;
  expect(prj.cdkConfig.requireApproval).toBeUndefined;
  // there will be console outputs
  console.log = jest.fn();
  console.error = jest.fn();
  const snap = synthSnapshot(prj);

  expect(snap).toMatchSnapshot();


});

test('src dir error', () => {
  expect(() => {
    new AwsCdkTypeScriptApp(
      {
        name: 'newcdkappproject',
        cdkVersion: '1.2.3',
        srcdir: 'main',
      },
    );
  }).toThrow();
});

test('test dir error', () => {
  expect(() => {
    new AwsCdkTypeScriptApp(
      {
        name: 'newcdkappproject',
        cdkVersion: '1.2.3',
        testdir: 'main',
      },
    );
  }).toThrow();
});

test('config test', () => {

  const prj = new AwsCdkTypeScriptApp(
    {
      name: 'newcdkappproject',
      cdkVersion: '1.2.3',
      context: { test: 'value' },
    },
  );

  expect(prj.cdkConfig.context).toBeDefined;

});

test('require approval test', () => {

  const prj = new AwsCdkTypeScriptApp(
    {
      name: 'newcdkappproject',
      cdkVersion: '1.2.3',
      requireApproval: CdkApprovalLevel.NEVER,
    },
  );

  expect(prj.cdkConfig.context).toBeDefined;

});

