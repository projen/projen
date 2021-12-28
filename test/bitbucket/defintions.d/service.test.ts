import { Service } from '../../../src/bitbucket/definitions.d/service';
import { Component } from '../../../src/component';
import { TestProject } from '../../util';


test('render simple service', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const service = new Service( comp, 'test', {
    name: 'test',
    image: 'foo:bar',
  } );

  expect( service._render() ).toStrictEqual({
    image: 'foo:bar',
  });
});


test('render simple service with variables', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const service = new Service( comp, 'test', {
    name: 'test',
    image: 'foo:bar',
    variables: {
      FOO: 'bar',
    },
  } );

  expect( service._render() ).toStrictEqual({
    image: 'foo:bar',
    variables: {
      FOO: 'bar',
    },
  });
});


test('render with memory', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const service = new Service( comp, 'test', {
    name: 'test',
    image: 'foo:bar',
    memory: 24,
  } );

  expect( service._render() ).toStrictEqual({
    image: 'foo:bar',
    memory: 24,
  });
});