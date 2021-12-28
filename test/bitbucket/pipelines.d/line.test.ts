import { Line } from '../../../src/bitbucket/pipelines.d/line';
import { Component } from '../../../src/component';
import { TestProject } from '../../util';


test('render line', () => {

  const project = new TestProject();
  const comp = new Component( project );

  const value = 'foobar';

  // @ts-ignore
  const line = new Line( comp, value );

  expect( line._render() ).toStrictEqual( value );
});