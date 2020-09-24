import * as inventory from '../src/inventory';

const result = inventory.discover();

test('project id', () => {
  expect(result.map(x => x.pjid).sort()).toContain('jsii');
  expect(result.map(x => x.pjid).sort()).toContain('awscdk-construct');
  expect(result.map(x => x.pjid).sort()).toContain('typescript');
})

test('inventory', () => {
  expect(result).toMatchSnapshot();
});

