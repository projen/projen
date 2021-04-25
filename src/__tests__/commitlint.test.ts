import { TypeScriptProject } from '..';
import { LogLevel } from '../logger';
import { mkdtemp, synthSnapshot } from './util';

test('commit lint config', () => {
  // GIVEN
  const project = new TypeScriptProject({
    outdir: mkdtemp(),
    name: 'test',
    logging: { level: LogLevel.OFF },
    defaultReleaseBranch: 'main',
    commitlint: true,
  });

  // THEN
  expect(synthSnapshot(project)['commitlint.config.js']).toMatchSnapshot();
  expect(synthSnapshot(project)['.husky/commit-msg']).toMatchSnapshot();
});