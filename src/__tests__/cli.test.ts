import { join } from 'path';
import { writeFileSync } from 'fs-extra';
import { directorySnapshot, execProjenCLI, mkdtemp } from './util';

test('the "--rc" option can be used to specify projenrc location', () => {
  const dir1 = mkdtemp();
  const dir2 = mkdtemp();

  const rcfile = join(dir1, 'custom-projenrc.js');
  writeFileSync(rcfile, "new (require('projen').Project)({ name: 'foo' }).synth()");

  execProjenCLI(dir2, ['--rc', rcfile]);
  expect(directorySnapshot(dir2)).toMatchSnapshot();
});