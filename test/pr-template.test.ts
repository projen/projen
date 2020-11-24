import { PullRequestTemplate } from '../src/pr-template';
import { synthSnapshot, TestProject } from './util';

const PULL_REQUEST_TEMPLATE_FILE = '.github/pull_request_template.md';

test('default', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new PullRequestTemplate(project);

  // THEN
  expect(synthSnapshot(project, PULL_REQUEST_TEMPLATE_FILE)).toStrictEqual({
    '.github/pull_request_template.md': 'Fixes #',
  });
});

test('custom content', () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  new PullRequestTemplate(project, {
    lines: [
      'hello',
      'world',
      '',
      'foobar',
    ],
  });

  // THEN
  expect(synthSnapshot(project, PULL_REQUEST_TEMPLATE_FILE)).toStrictEqual({
    '.github/pull_request_template.md': [
      'hello',
      'world',
      '',
      'foobar',
    ].join('\n'),
  });
});