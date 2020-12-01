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

test('omitEmpty', () => {
  // GIVEN
  const p = new TestProject();

  // WHEN
  new JsonFile(p, 'file.json', {
    omitEmpty: true,
    obj: {
      hello: 1234,
      empty: {},
      array_with_undefined: [undefined, 123, 456],
      child: {
        with: 'hello',
        empty: {
          subchild: {},
        },
        empty_strings_are_not_omitted: '',
        zeros_are_not_omitted: 0,
        empty_array: [],
        array_with_empty_objects: [{}, 123],
        array_with_empty_subobjects: [
          {
            i_am_empty: {},
            i_am_not: 'hi there',
          },
          {
            just: 1234,
          },
        ],
      },
    },
  });

  // THEN
  expect(synthSnapshot(p)['file.json']).toStrictEqual({
    hello: 1234,
    array_with_undefined: [123, 456], // undefined is skipped
    child: {
      with: 'hello',
      empty_strings_are_not_omitted: '',
      zeros_are_not_omitted: 0,
      array_with_empty_objects: [123],
      array_with_empty_subobjects: [
        {
          i_am_not: 'hi there',
        },
        {
          just: 1234,
        },
      ],
    },
  });
});

