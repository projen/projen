import { Eslint, NodeProject } from '..';
import { LogLevel } from '../logger';
import { mkdtemp, synthSnapshot } from '../_test-utils';

test('devdirs', () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test',
    logging: { level: LogLevel.OFF },
    defaultReleaseBranch: 'master',
  });

  // WHEN
  new Eslint(project, {
    devdirs: ['foo', 'bar'],
    dirs: ['mysrc'],
  });

  // THEN
  expect(synthSnapshot(project)['.eslintrc.json']).toMatchSnapshot();
});

describe('prettier', () => {
  test('snapshot', () => {
    // GIVEN
    const project = new NodeProject({
      outdir: mkdtemp(),
      name: 'test',
      logging: { level: LogLevel.OFF },
      defaultReleaseBranch: 'master',
    });

    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    // THEN
    expect(synthSnapshot(project)['.eslintrc.json']).toMatchSnapshot();
  });

  test('error on formatting when enabled', () => {
    // GIVEN
    const project = new NodeProject({
      outdir: mkdtemp(),
      name: 'test',
      logging: { level: LogLevel.OFF },
      defaultReleaseBranch: 'master',
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    // THEN
    expect(eslint.rules).toHaveProperty('prettier/prettier', ['error']);
  });
});
