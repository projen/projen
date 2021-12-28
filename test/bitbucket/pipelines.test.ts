import { Pipelines } from '../../src/bitbucket/pipelines';
import { Component } from '../../src/component';
import { TestProject } from '../util';


test('render empty', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  expect( pipelines._render() ).toStrictEqual( undefined );
});


test('render with a default pipeline', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  pipelines.addDefault()
    .addStep()
    .addScriptLine( 'ls -al');

  expect( pipelines._render() ).toStrictEqual( {
    default: [
      {
        step: {
          script: [
            'ls -al',
          ],
        },
      },
    ],
  } );
});

test('render with a branch pipeline', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  pipelines.addBranch( 'foo/*')
    .addStep()
    .addScriptLine( 'ls -al');

  expect( pipelines._render() ).toStrictEqual( {
    branches: {
      'foo/*': [
        {
          step: {
            script: [
              'ls -al',
            ],
          },
        },
      ],
    },
  } );
});

test('render with a bookmark pipeline', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  pipelines.addBookmark( 'foo')
    .addStep()
    .addScriptLine( 'ls -al');

  expect( pipelines._render() ).toStrictEqual( {
    bookmarks: {
      foo: [
        {
          step: {
            script: [
              'ls -al',
            ],
          },
        },
      ],
    },
  } );
});

test('render with a tag pipeline', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  pipelines.addTag( 'foo')
    .addStep()
    .addScriptLine( 'ls -al');

  expect( pipelines._render() ).toStrictEqual( {
    tags: {
      foo: [
        {
          step: {
            script: [
              'ls -al',
            ],
          },
        },
      ],
    },
  } );
});

test('render with a pull request pipeline', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  pipelines.addPullRequest( 'foo/*')
    .addStep()
    .addScriptLine( 'ls -al');

  expect( pipelines._render() ).toStrictEqual( {
    tags: {
      'foo/*': [
        {
          step: {
            script: [
              'ls -al',
            ],
          },
        },
      ],
    },
  } );
});

test('render with a custom pipeline', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const pipelines = new Pipelines( comp );

  pipelines.addCustom( 'foo')
    .addStep()
    .addScriptLine( 'ls -al');

  expect( pipelines._render() ).toStrictEqual( {
    custom: {
      foo: [
        {
          step: {
            script: [
              'ls -al',
            ],
          },
        },
      ],
    },
  } );
});