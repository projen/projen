import * as inventory from '../src/inventory';

test('inventory', () => {
  const result = inventory.discover();
  expect(result).toMatchSnapshot();
});

