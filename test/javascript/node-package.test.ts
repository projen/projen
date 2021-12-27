import { NodePackage } from '../../src/javascript/node-package';
import { synthSnapshot, TestProject } from '../util';

test('all bugs field present', () => {
  const project = new TestProject();

  new NodePackage(project, {
    bugsEmail: 'bugs@foobar.local',
    bugsUrl: 'bugs.foobar.local',
  });

  expect(synthSnapshot(project)[ 'package.json'].bugs).toMatchSnapshot();
});

test('no bugs field present', () => {
  const project = new TestProject();

  new NodePackage(project, {});

  const snps = synthSnapshot(project);

  expect(snps[ 'package.json'].bugs).toMatchSnapshot();

  expect(snps[ 'package.json'].bugs).toStrictEqual( undefined );
});

test('single bugs field present', () => {
  const project = new TestProject();

  const _email = 'bugs@foobar.local';

  new NodePackage(project, {
    bugsEmail: _email,
  });

  const snps = synthSnapshot(project);

  expect(snps[ 'package.json'].bugs).toMatchSnapshot();

  expect(snps[ 'package.json'].bugs.url).toStrictEqual( undefined );
  expect(snps[ 'package.json'].bugs.email).toStrictEqual( _email );
});