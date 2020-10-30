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
  const baseOption = {
    path: ['myOption'],
    name: 'myOption',
    switch: 'my-option',
    type: 'boolean',
  };
  expect(() => throwIfNotRenderable(baseOption)).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: 'undefined' })).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: '$BASEDIR' })).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: '{ "a": 3 }' })).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: '2048' })).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: 'true' })).not.toThrowError();

  expect(() => throwIfNotRenderable({ ...baseOption, default: 'MyEnum.OptionA', type: 'MyEnum' })).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: 'MyEnum.OptionA' })).toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: 'MyEnum.OptionA', type: 'BaseEnum' })).toThrowError();

  expect(() => throwIfNotRenderable({ ...baseOption, default: 'current year', isDefaultDescription: true })).not.toThrowError();
  expect(() => throwIfNotRenderable({ ...baseOption, default: 'current year' })).toThrowError();
});

test('all default values in docstrings are renderable JS values', () => {
  result.forEach((project) => {
    project.options.forEach((option) => {
      expect(() => throwIfNotRenderable(option)).not.toThrowError();
    });
  });
});

function throwIfNotRenderable(option: inventory.ProjectOption) {
  return (option.default === undefined) ||
    (option.default === 'undefined') ||
    (option.default.startsWith('$')) ||
    (option.type && option.default.startsWith(option.type)) ||
    option.isDefaultDescription ||
    JSON.parse(option.default);
};
