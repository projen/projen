import { ObjectFile } from '../src';
import { synthSnapshot, TestProject } from './util';

class ChildObjectFile extends ObjectFile {}

test('json object can be mutated before synthesis', () => {
  const prj = new TestProject();

  const obj: any = {
    hello: 'world',
  };

  new ChildObjectFile(prj, 'my/object/file.json', { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  expect(synthSnapshot(prj)['my/object/file.json']).toStrictEqual({
    hello: 'world',
    anotherField: { foo: 1234 },
  });
});