import { Eslint, NodeProject } from '../src';
import { mkdtemp, synthSnapshot } from './util';

test('devdirs', () => {
  // GIVEN
  const project = new NodeProject({ outdir: mkdtemp(), name: 'test' });

  // WHEN
  new Eslint(project, {
    devdirs: ['foo', 'bar'],
    dirs: ['mysrc'],
  });

  // THEN
  expect(synthSnapshot(project)['.eslintrc.json']).toMatchSnapshot();
});