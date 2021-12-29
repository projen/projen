import { CiConfiguration } from '../../src/gitlab';
import { TestProject } from '../util';


test('throws when adding an existing service with same name and alias', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  c.addServices({ name: 'bar' });
  // THEN
  expect(() => c.addServices({ name: 'bar' })).toThrowError(/GitLab CI already contains/);
  expect(() => c.addServices({ name: 'foobar' }, { name: 'foobar' })).toThrowError(/GitLab CI already contains/);
});

test('does not throw when adding an services with same name and different alias', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  c.addServices({ name: 'foo', alias: 'foobar' });
  // THEN
  expect(() => c.addServices({ name: 'foo', alias: 'baz' })).not.toThrowError(/GitLab CI already contains/);
});


test('does not throw when adding an valid include', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  // THEN
  expect(() => c.addIncludes({ local: 'foo' })).not.toThrowError(/is not a valid include configuration/);
  expect(() => c.addIncludes({ file: ['foo'], project: 'foo' })).not.toThrowError(/is not a valid include configuration/);
  expect(() => c.addIncludes({ remote: 'foo' })).not.toThrowError(/is not a valid include configuration/);
  expect(() => c.addIncludes({ template: 'foo' })).not.toThrowError(/is not a valid include configuration/);
});

test('throws when adding an invalid include', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  // THEN
  expect(() => c.addIncludes({ file: ['foo'], project: 'foo', local: 'foo' })).toThrow(/is not a valid include configuration/);
});

test('throws when adding an existing includes', () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const c = new CiConfiguration(p, 'foo');
  c.addIncludes({ local: 'foo' }, { file: ['foo'], project: 'foo' }, { remote: 'foo' }, { template: 'foo' });
  // THEN
  expect(() => c.addIncludes({ local: 'foo' })).toThrowError(/already contains one or more templates specified in/);
  expect(() => c.addIncludes({ file: ['foo'], project: 'foo' })).toThrowError(/already contains one or more templates specified in/);
  expect(() => c.addIncludes({ remote: 'foo' })).toThrowError(/already contains one or more templates specified in/);
  expect(() => c.addIncludes({ template: 'foo' })).toThrowError(/already contains one or more templates specified in/);
});


