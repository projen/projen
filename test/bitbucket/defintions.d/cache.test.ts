import { Cache } from '../../../src/bitbucket/definitions.d/cache';
import { Component } from '../../../src/component';
import { TestProject } from '../../util';


test('render simple cache', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const cache = new Cache( comp, 'test', {
    path: '/foo/bar',
  } );

  expect( cache._render() ).toStrictEqual('/foo/bar');
});