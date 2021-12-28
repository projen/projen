import { Definitions } from '../../src/bitbucket/definitions';
import { Component } from '../../src/component';
import { TestProject } from '../util';


test('render empty', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const definitions = new Definitions( comp );

  expect( definitions._render() ).toStrictEqual( undefined );
});


test('render with a service', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const definitions = new Definitions( comp );

  definitions.addService( 'test', {
    image: 'foo:bar',
  });

  expect( definitions._render() ).toStrictEqual( {
    services: {
      test: {
        image: 'foo:bar',
      },
    },
  });
});

test('render with a cache', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const definitions = new Definitions( comp );

  definitions.addCache( 'test', {
    path: '/foo/bar',
  });

  expect( definitions._render() ).toStrictEqual( {
    caches: {
      test: '/foo/bar',
    },
  });
});