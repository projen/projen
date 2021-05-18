import { synthSnapshot, TestProject } from './util';

const CODE_OWNERS_FILE = '.github/CODEOWNERS';

test('default', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.github?.addCodeOwners();

  // THEN
  expect(synthSnapshot(project)[CODE_OWNERS_FILE]).toStrictEqual('');
});

test('custom content', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.github?.addCodeOwners(
    'hello',
    'world',
    '',
    'foobar',
  );

  // THEN
  expect(synthSnapshot(project)[CODE_OWNERS_FILE]).toStrictEqual([
    'hello',
    'world',
    '',
    'foobar',
  ].join('\n'));
});
