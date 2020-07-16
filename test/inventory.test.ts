import * as inventory from '../src/inventory';

const result = inventory.discover();

test('project id', () => {
  expect(result.map(x => x.pjid)).toStrictEqual([
    'jsii',
    'lerna',
    'node',
    'project',
    'ts',
  ]);
})

test('inventory', () => {
  expect(result).toMatchSnapshot();
});

