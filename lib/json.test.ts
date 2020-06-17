import { JsonFile } from './json';
import { Project } from './project';
import * as fs from 'fs-extra';

test('json object can be mutated before synthesis', () => {
  const outdir = fs.mkdtempSync('/tmp/projen-test-');
  const prj = new Project({ outdir });

  const obj: any = {
    hello: 'world',
  };
  
  new JsonFile(prj, 'my/json/file.json', { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  prj.synth();

  const actual = JSON.parse(fs.readFileSync(`${outdir}/my/json/file.json`, 'utf-8'));
  expect(actual).toStrictEqual({ 
    hello: 'world',
    anotherField: { foo: 1234 },
  });
});