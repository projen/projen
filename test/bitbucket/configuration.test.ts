import { Bitbucket } from '../../src/bitbucket/bitbucket';
import { synthSnapshot, TestProject } from '../util';


test('configuration', () => {

  const project = new TestProject();

  const bitbucket = new Bitbucket( project );

  const conf = bitbucket.pipelinesYaml;

  conf.definitions.addCache( 'foo', {
    path: 'foobar',
  } );

  const defaultPipeline = conf.pipelines.addDefault( {} );

  defaultPipeline.addStep( {
    name: 'test',
  } )
    .addLine( 'ls -al' )
    .addPipe( 'foofoo' );

  const snps = synthSnapshot( project );

  expect( snps['bitbucket-pipelines.yml'] ).toMatchSnapshot();
});