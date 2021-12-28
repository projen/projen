import { CiConfiguration } from '../../src/gitlab';
import { TestProject } from '../util';


test('throws when adding an existing service with same name and alias', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  c.addServices('foo', { name: 'bar' });
  // THEN
  expect(() => c.addServices('bar')).toThrow(/GitLab CI already contains/);
  expect(() => c.addServices('foo')).toThrow(/GitLab CI already contains/);
  expect(() => c.addServices('baz', 'baz')).toThrow(/GitLab CI already contains/);
});

test('does not throw when adding an services with same name and different alias', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  c.addServices({ name: 'foo', alias: 'foobar' });
  // THEN
  expect(() => c.addServices('foo', { name: 'foo', alias: 'baz' })).not.toThrow(/GitLab CI already contains/);
});


