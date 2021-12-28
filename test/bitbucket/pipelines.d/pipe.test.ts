import { Pipe } from '../../../src/bitbucket/pipelines.d/pipe';
import { Component } from '../../../src/component';
import { TestProject } from '../../util';


test('render pipe with no variables', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const line = new Pipe( comp, 'test' );

  expect( line._render() ).toStrictEqual( { pipe: 'test' } );
});

test('render pipe with variables', () => {

  const project = new TestProject();
  const comp = new Component( project );

  const variables = {
    FOO: 'bar',
    BAR: 'foo',
  };

  // @ts-ignore
  const pipe = new Pipe( comp, 'test', {
    variables: variables,
  } );

  expect( pipe._render() ).toStrictEqual( {
    pipe: 'test',
    variables: variables,
  });
});