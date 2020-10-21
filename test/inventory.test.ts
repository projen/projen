import * as path from 'path';
import * as fs from 'fs-extra';
import * as inventory from '../src/inventory';

const result = inventory.discover();
const simulatedExternalJsiiTypes: { [name: string]: inventory.JsiiType } = fs.readJsonSync(path.join(__dirname, '..', '.jsii')).types;

test('project id', () => {
  expect(result.map(x => x.pjid).sort()).toContain('jsii');
  expect(result.map(x => x.pjid).sort()).toContain('awscdk-construct');
  expect(result.map(x => x.pjid).sort()).toContain('typescript');
});

test('inventory', () => {
  expect(result).toMatchSnapshot();
});

test('remote discover project id simulation', () => {
  const remoteDiscoverResult = inventory.discover(simulatedExternalJsiiTypes);
  expect(remoteDiscoverResult.map(x => x.pjid).sort()).toContain('jsii');
  expect(remoteDiscoverResult.map(x => x.pjid).sort()).toContain('awscdk-construct');
  expect(remoteDiscoverResult.map(x => x.pjid).sort()).toContain('typescript');
});
