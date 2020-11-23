import * as TOML from '@iarna/toml';
import { TomlFile } from '../src';
import { synthSnapshot, TestProject } from './util';

test('toml object can be mutated before synthesis', () => {
  const prj = new TestProject();

  const obj: any = {
    hello: 'world',
  };

  new TomlFile(prj, 'my/toml/file.toml', { obj });

  // mutate obj (should be reflected in the output)
  obj.anotherField = {
    foo: 1234,
  };

  const out = synthSnapshot(prj);
  expect(TOML.parse(out['my/toml/file.toml'])).toStrictEqual({
    hello: 'world',
    anotherField: { foo: 1234 },
  });
});
