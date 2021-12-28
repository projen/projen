import { Pipeline } from '../../../src/bitbucket/pipelines.d/pipeline';
import { Component } from '../../../src/component';
import { TestProject } from '../../util';


//test('render step with no script', () => {
//
//  const project = new TestProject();
//  const comp = new Component( project );
//
//  // @ts-ignore
//  const step = new Step( comp );
//
//  const exec = ( () => {
//    step._render()
//  })
//
//  expect( exec ).toThrow( Error );
//});

test('render pipeline with no steps', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipeline = new Pipeline( comp );


  expect( pipeline._render() ).toStrictEqual( undefined );
});

test('render pipeline with single step', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipeline = new Pipeline( comp );

  pipeline.addStep()
    .addScriptLine( 'ls -al' );

  expect( pipeline._render() ).toStrictEqual( [
    {
      step: {
        script: [
          'ls -al',
        ],
      },
    },
  ] );
});

test('render pipeline with two parallelized steps', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipeline = new Pipeline( comp );

  const parallel = pipeline.addParallel();

  parallel.addStep()
    .addScriptLine( 'ls -al' );

  parallel.addStep()
    .addScriptLine( 'echo no' );

  expect( pipeline._render() ).toStrictEqual( [
    {
      parallel: [
        {
          step: {
            script: [
              'ls -al',
            ],
          },
        },
        {
          step: {
            script: [
              'echo no',
            ],
          },
        },
      ],
    },
  ] );
});
