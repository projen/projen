import { Cache } from '../../../src/bitbucket/definitions.d/cache';
import { Step, Parallel } from '../../../src/bitbucket/pipelines.d/step';
import { Component } from '../../../src/component';
import { TestProject } from '../../util';


test('render step with no script', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp );

  const exec = ( () => {
    step._render();
  });

  expect( exec ).toThrow( Error );
});

test('render step with script line', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp )
    .addScriptLine( 'ls -al' );


  expect( step._render() ).toStrictEqual( {
    script: [
      'ls -al',
    ],
  });
});

test('render step with script pipe', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with after-script pipe', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp )
    .addScriptPipe( 'foo:bar' )
    .addAfterScriptPipe( 'foo:foobar' );

  expect( step._render() ).toStrictEqual( {
    'script': [
      {
        pipe: 'foo:bar',
      },
    ],
    'after-script': [
      {
        pipe: 'foo:foobar',
      },
    ],
  });
});

test('render step with script pipe and line', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp )
    .addScriptPipe( 'foo:bar' )
    .addScriptLine( 'ls -al');


  expect( step._render() ).toStrictEqual( {
    script: [
      {
        pipe: 'foo:bar',
      },
      'ls -al',
    ],
  });
});

test('render step with artifacts', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp, {
    artifacts: [
      'docs/**',
    ],
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    artifacts: [
      'docs/**',
    ],
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with name', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp, {
    name: 'foobar',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    name: 'foobar',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with cache', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const step = new Step( comp, {
    caches: [
      'node',
    ],
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    caches: ['node'],
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with dynamic cache', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const cache = new Cache( comp, 'foo', {
    path: '/foo/bar',
  });

  // @ts-ignore
  const step = new Step( comp, {
    caches: [
      'node',
      cache,
    ],
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    caches: ['node', 'foo'],
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with runner labels', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    runsOn: [
      'foobar',
    ],
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    'runs-on': ['foobar'],
    'script': [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with image', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    image: 'foobar',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    image: 'foobar',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with auto trigger', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    trigger: 'auto',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    trigger: 'auto',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with manual trigger', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    trigger: 'manual',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    trigger: 'manual',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render step with faulty trigger', () => {

  const project = new TestProject();
  const comp = new Component( project );

  const exec = ( () => {
    // @ts-ignore
    const step = new Step( comp, {
      trigger: 'foo',
    } );
  });

  expect( exec ).toThrow( Error );
});


test('render step with test deployment', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    deployment: 'test',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    deployment: 'test',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with staging deployment', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    deployment: 'staging',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    deployment: 'staging',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with production deployment', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    deployment: 'production',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    deployment: 'production',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with faulty deployment', () => {

  const project = new TestProject();
  const comp = new Component( project );

  const exec = ( () => {
    // @ts-ignore
    const step = new Step( comp, {
      deployment: 'foo',
    } );
  });

  expect( exec ).toThrow( Error );
});


test('render step with 2x sizing', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    size: '2x',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    size: '2x',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with 4x sizing', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    size: '4x',
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    size: '4x',
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with faulty sizing', () => {

  const project = new TestProject();
  const comp = new Component( project );

  const exec = ( () => {
    // @ts-ignore
    const step = new Step( comp, {
      size: '8x',
    } );
  });

  expect( exec ).toThrow( Error );
});


test('render step with timeout', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    maxTime: 5,
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    'max-time': 5,
    'script': [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with faulty timeout', () => {

  const project = new TestProject();
  const comp = new Component( project );

  const exec = ( () => {
    // @ts-ignore
    const step = new Step( comp, {
      maxTime: -1,
    } );
  });

  expect( exec ).toThrow( Error );

  const exec2 = ( () => {
    // @ts-ignore
    const step = new Step( comp, {
      maxTime: 121,
    } );
  });

  expect( exec2 ).toThrow( Error );
});


test('render step with clone', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    clone: {
      enabled: true,
    },
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    clone: {
      enabled: true,
    },
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with oidc', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    oidc: true,
  } )
    .addScriptPipe( 'foo:bar' );


  expect( step._render() ).toStrictEqual( {
    oidc: true,
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});


test('render step with conditions', () => {

  const project = new TestProject();
  const comp = new Component( project );


  // @ts-ignore
  const step = new Step( comp, {
    changesetIncludePaths: [
      'test/**',
    ],
  } )
    .addScriptPipe( 'foo:bar' );

  expect( step._render() ).toStrictEqual( {
    condition: {
      changesets: {
        includePaths: [
          'test/**',
        ],
      },
    },
    script: [
      {
        pipe: 'foo:bar',
      },
    ],
  });
});

test('render parallelization with two steps', () => {

  const project = new TestProject();
  const comp = new Component( project );

  // @ts-ignore
  const parallel = new Parallel(comp);

  parallel.addStep()
    .addScriptPipe( 'foo:bar' );

  parallel.addStep()
    .addScriptPipe( 'foo:foobar' );

  expect( parallel._render() ).toStrictEqual([
    {
      step: {
        script: [
          {
            pipe: 'foo:bar',
          },
        ],
      },
    },
    {
      step: {
        script: [
          {
            pipe: 'foo:foobar',
          },
        ],
      },
    },
  ]);
});