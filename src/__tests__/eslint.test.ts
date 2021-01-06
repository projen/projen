import { Eslint, NodeProject } from '..';
import { LogLevel } from '../logger';
import { mkdtemp, synthSnapshot } from './util';

test('devdirs', () => {
  // GIVEN
  const project = new NodeProject({
    outdir: mkdtemp(),
    name: 'test',
    logging: { level: LogLevel.OFF },
  });

  // WHEN
  new Eslint(project, {
    devdirs: ['foo', 'bar'],
    dirs: ['mysrc'],
  });

  // THEN
  expect(synthSnapshot(project)['.eslintrc.json']).toMatchSnapshot();
});