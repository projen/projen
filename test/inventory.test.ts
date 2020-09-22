import * as inventory from '../src/inventory';

const result = inventory.discover();

test('project id', () => {
  expect(result.map(x => x.pjid).sort()).toStrictEqual([
    'aws-construct',
    'jsii',
    'node',
    'project',
    'typescript',
  ]);
})

test('inventory', () => {
  expect(result).toMatchSnapshot();
});

