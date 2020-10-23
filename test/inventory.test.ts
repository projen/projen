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
