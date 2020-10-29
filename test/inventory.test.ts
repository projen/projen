import * as path from 'path';
import * as inventory from '../src/inventory';

const result = inventory.discover();

test('project id', () => {
  expect(result.map(x => x.pjid).sort()).toContain('jsii');
  expect(result.map(x => x.pjid).sort()).toContain('awscdk-construct');
  expect(result.map(x => x.pjid).sort()).toContain('typescript');
});

test('inventory', () => {
  expect(result).toMatchSnapshot();
});

test('remote discover project id simulation', () => {
  const remoteDiscoverResult = inventory.discover(path.join(__dirname, '..'));
  expect(remoteDiscoverResult.map(x => x.pjid).sort()).toContain('jsii');
  expect(remoteDiscoverResult.map(x => x.pjid).sort()).toContain('awscdk-construct');
  expect(remoteDiscoverResult.map(x => x.pjid).sort()).toContain('typescript');
});

test('renderable default values simulation', () => {
  expect(() => throwIfNotRenderable(undefined)).not.toThrowError(); // the docstring has no default value
  expect(() => throwIfNotRenderable('undefined')).not.toThrowError(); // the default value is 'undefined'
  expect(() => throwIfNotRenderable('$BASEDIR')).not.toThrowError();
  expect(() => throwIfNotRenderable('{ "a": 3 }')).not.toThrowError();
  expect(() => throwIfNotRenderable('"MyEnum.OptionA"')).not.toThrowError();
  expect(() => throwIfNotRenderable('2048')).not.toThrowError();
  expect(() => throwIfNotRenderable('true')).not.toThrowError();

  expect(() => throwIfNotRenderable('MyEnum.OptionA')).toThrowError();
  expect(() => throwIfNotRenderable('current year')).toThrowError();
});

test('all default values in docstrings are renderable JS values', () => {
  result.forEach((project) => {
    project.options.forEach((option) => {
      expect(() => throwIfNotRenderable(option.default)).not.toThrowError();
    });
  });
});

function throwIfNotRenderable(value?: string) {
  return (value === undefined) ||
    (value === 'undefined') ||
    (value.startsWith('$')) ||
    JSON.parse(value);
};
