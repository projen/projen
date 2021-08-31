import * as TOML from '@iarna/toml';
import { TomlFile } from '..';
import { synthSnapshot, TestProject } from '../test-utils';

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

test('toml file can contain projen marker', () => {
  const prj = new TestProject();

  const obj: any = {};

  new TomlFile(prj, 'my/toml/file-marker.toml', { obj, marker: true });

  const output = synthSnapshot(prj)['my/toml/file-marker.toml'];

  const firstLine = output.split('\n')[0];

  expect(firstLine).toBe(`# ${TomlFile.PROJEN_MARKER}`);
});
