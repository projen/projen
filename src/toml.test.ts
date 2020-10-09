import * as os from 'os';
import * as path from 'path';
import * as TOML from '@iarna/toml';
import * as fs from 'fs-extra';
import { Project } from './project';
import { TomlFile } from './toml';

test('toml object can be mutated before synthesis', () => {
  const prj = new Project();

  const obj: any = {
    hello: 'world',
  };

  new TomlFile(prj, 'my/toml/file.toml', { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  const outdir = fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'));
  prj.synth(outdir);

  const actual = TOML.parse(fs.readFileSync(path.join(outdir, 'my/toml/file.toml'), 'utf-8'));
  expect(actual).toStrictEqual({
    hello: 'world',
    anotherField: { foo: 1234 },
  });
});
