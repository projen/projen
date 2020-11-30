import { JsonFile } from '../src';
import { synthSnapshot, TestProject } from './util';

test('json object can be mutated before synthesis', () => {
  const prj = new TestProject();

  const obj: any = {
    hello: 'world',
  };

  new JsonFile(prj, 'my/json/file.json', { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  expect(synthSnapshot(prj)['my/json/file.json']).toStrictEqual({
    hello: 'world',
    anotherField: { foo: 1234 },
  });
});