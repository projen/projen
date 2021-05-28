import { synthSnapshot, TestProject } from './util';

const CODE_OWNERS_FILE = '.github/CODEOWNERS';

test('default', () => {
  // GIVEN
  const project = new TestProject();

  expect(synthSnapshot(project)[CODE_OWNERS_FILE]).toStrictEqual(undefined);
});

test('custom content', () => {
  // GIVEN
  const project = new TestProject({
    codeOwners: {
      owners: [{
        owners: [
          'Hunter-Thompson',
        ],
        patterns: 'src/*',
      }],
    },
  });

  // WHEN
  project.github?.codeOwners?.addOwners({
    owners: [
      'Raoul-Duke',
    ],
    patterns: '*',
  });

  // THEN
  expect(synthSnapshot(project)[CODE_OWNERS_FILE]).toStrictEqual([
    'src/* Hunter-Thompson',
    '* Raoul-Duke',
  ].join('\n'));
});