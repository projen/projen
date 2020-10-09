import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { JsonFile } from './json';
import { Project } from './project';

test('json object can be mutated before synthesis', () => {
  const prj = new Project();

  const obj: any = {
    hello: 'world',
  };

  new JsonFile(prj, 'my/json/file.json', { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  const outdir = fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'));
  prj.synth(outdir);

  const actual = JSON.parse(fs.readFileSync(path.join(outdir, 'my/json/file.json'), 'utf-8'));
  expect(actual).toStrictEqual({
    hello: 'world',
    anotherField: { foo: 1234 },
  });
});