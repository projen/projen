import { synthSnapshot, TestProject } from '../util';

test("throws if github isn't configured for the project", () => {

  expect(() => {
    new TestProject({
      parent: new TestProject({}),
      outdir: './relative',
      autoApprove: true,
    });
  }).toThrowError('GitHub must be configured to enable auto approvals');
});

test("throws if projen secret isn't configure for the project", () => {

  expect(() => {
    new TestProject({ autoApprove: true });
  }).toThrowError('Projen secret must be configured to enable auto approvals');
});

test('default for project is true when secret is defined', () => {
  const project = new TestProject({ projenSecret: 'PROJEN_SECRET' });
  expect(project.autoApprove).toBeDefined();
});

test('default for project is false when secret is undefined', () => {
  const project = new TestProject({});
  expect(project.autoApprove).toBeUndefined();
});

test('auto approve can be disabled', () => {
  const project = new TestProject({ autoApprove: false });
  expect(project.autoApprove).toBeUndefined();
});

test('default options', () => {

  const project = new TestProject({ projenSecret: 'PROJEN_SECRET', autoApprove: true });
  expect(project.autoApprove).toBeDefined();
  expect(synthSnapshot(project)).toMatchSnapshot();

});

test('custom options', () => {

  const project = new TestProject({
    projenSecret: 'PROJEN_SECRET',
    autoApproveOptions: {
      label: 'custom-auto-approve',
    },
  });
  expect(project.autoApprove).toBeDefined();
  expect(synthSnapshot(project)).toMatchSnapshot();

});