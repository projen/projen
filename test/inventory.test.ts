import * as inventory from '../src/inventory';

const result = inventory.discover();

test('project id', () => {
  expect(result.map(x => x.pjid).sort()).toStrictEqual([
    'construct-lib-aws',
    'jsii',
    'node',
    'project',
    'ts',
  ]);
})

test('inventory', () => {
  expect(result).toMatchSnapshot();
});

