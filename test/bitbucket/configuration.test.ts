import { PipelinesYaml } from '../../src/bitbucket/configuration';
import { synthSnapshot, TestProject } from '../util';


test('render empty', () => {

  const project = new TestProject();

  const conf = new PipelinesYaml( project );


  expect( conf._render() ).toStrictEqual (undefined);

  const snps = synthSnapshot( project );

  expect( snps['bitbucket-pipelines.yml'] ).toStrictEqual(undefined);
});


test('render biased', () => {

  const project = new TestProject();

  const conf = new PipelinesYaml( project );
  conf.definitions.addCache( 'test', {
    path: '/foo/bar',
  });

  expect( conf._render() ).toStrictEqual({
    definitions: {
      caches: {
        test: '/foo/bar',
      },
    },
  });

  const snps = synthSnapshot( project );

  expect( snps['bitbucket-pipelines.yml'] ).toMatchSnapshot();
});

test('render with options', () => {

  const project = new TestProject();

  const conf = new PipelinesYaml( project, {
    options: {
      maxTime: 60,
    },
  } );

  expect( conf._render() ).toStrictEqual({
    options: {
      'max-time': 60,
    },
  });

  const snps = synthSnapshot( project );

  expect( snps['bitbucket-pipelines.yml'] ).toMatchSnapshot();
});

test('render with clone options', () => {

  const project = new TestProject();

  const conf = new PipelinesYaml( project, {
    clone: {
      lfs: true,
    },
  } );

  expect( conf._render() ).toStrictEqual({
    clone: {
      lfs: true,
    },
  });

  const snps = synthSnapshot( project );

  expect( snps['bitbucket-pipelines.yml'] ).toMatchSnapshot();
});

test('render with image', () => {

  const project = new TestProject();

  const conf = new PipelinesYaml( project, {
    image: 'foo:bar',
  } );

  expect( conf._render() ).toStrictEqual({
    image: 'foo:bar',
  });

  const snps = synthSnapshot( project );

  expect( snps['bitbucket-pipelines.yml'] ).toMatchSnapshot();
});