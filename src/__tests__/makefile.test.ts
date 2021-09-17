import { FileBase, Makefile } from '..';
import { synthSnapshot, TestProject } from './util';

test('makefile synthesizes correctly', () => {
  // GIVEN
  const prj = new TestProject();

  // WHEN
  new Makefile(prj, 'Makefile', {
    all: ['one', 'two', 'three'],
    rules: [
      {
        targets: ['one'],
        recipe: ['touch one'],
        phony: false,
      },
      {
        targets: ['two', 'three'],
        prerequisites: ['one'],
        recipe: ['touch $@'],
      },
      {
        targets: ['clean'],
        recipe: ['rm -f one two three'],
        phony: true,
      },
    ],
  });

  // THEN
  expect(synthSnapshot(prj).Makefile).toStrictEqual([
    `# ${FileBase.PROJEN_MARKER}`,
    '',
    '.PHONY: all',
    'all: one two three',
    '',
    'one:',
    '\ttouch one',
    '',
    'two three: one',
    '\ttouch $@',
    '',
    '.PHONY: clean',
    'clean:',
    '\trm -f one two three',
    '', // new line at end of file
  ].join('\n'));
});

test('makefile synthesizes correctly using imperative API', () => {
  // GIVEN
  const prj = new TestProject();

  // WHEN
  new Makefile(prj, 'Makefile')
    .addRule({
      targets: ['one'],
      recipe: ['touch one'],
      phony: false,
    })
    .addRules(
      {
        targets: ['two', 'three'],
        prerequisites: ['one'],
        recipe: ['touch $@'],
      },
      {
        targets: ['clean'],
        recipe: ['rm -f one two three'],
        phony: true,
      },
    )
    .addAll('one')
    .addAlls('two', 'three');

  // THEN
  expect(synthSnapshot(prj).Makefile).toStrictEqual([
    `# ${FileBase.PROJEN_MARKER}`,
    '',
    '.PHONY: all',
    'all: one two three',
    '',
    'one:',
    '\ttouch one',
    '',
    'two three: one',
    '\ttouch $@',
    '',
    '.PHONY: clean',
    'clean:',
    '\trm -f one two three',
    '', // new line at end of file
  ].join('\n'));
});

test('makefile rules can have descriptions', () => {
  // GIVEN
  const prj = new TestProject();

  // WHEN
  new Makefile(prj, 'Makefile', {
    all: ['one', 'two', 'three'],
    rules: [
      {
        targets: ['one'],
        recipe: ['touch one'],
        phony: false,
        description: 'update a file',
      },
      {
        targets: ['two', 'three'],
        prerequisites: ['one'],
        recipe: ['touch $@'],
        description: 'update two files',
      },
      {
        targets: ['clean'],
        recipe: ['rm -f one two three'],
        phony: true,
        description: 'clean up all files',
      },
    ],
  });

  // THEN
  expect(synthSnapshot(prj).Makefile).toStrictEqual([
    `# ${FileBase.PROJEN_MARKER}`,
    '',
    '.PHONY: all',
    'all: one two three',
    '',
    'one:                          ## update a file',
    '\ttouch one',
    '',
    'two three: one                ## update two files',
    '\ttouch $@',
    '',
    '.PHONY: clean',
    'clean:                        ## clean up all files',
    '\trm -f one two three',
    '', // new line at end of file
  ].join('\n'));
});


test('makefiles can specify a prelude section', () => {
  // GIVEN
  const prj = new TestProject();

  // WHEN
  new Makefile(prj, 'Makefile', {
    all: ['one', 'two', 'three'],
    rules: [
      {
        targets: ['one'],
        recipe: ['touch one'],
        phony: false,
      },
    ],
    prelude: [
      '# author: Pancakes the Otter',
      '# here is an extra target',
      '',
      '.POSIX',
    ],
  });

  // THEN
  expect(synthSnapshot(prj).Makefile).toStrictEqual([
    `# ${FileBase.PROJEN_MARKER}`,
    '',
    '# author: Pancakes the Otter',
    '# here is an extra target',
    '',
    '.POSIX',
    '',
    '.PHONY: all',
    'all: one two three',
    '',
    'one:',
    '\ttouch one',
    '', // new line at end of file
  ].join('\n'));
});
