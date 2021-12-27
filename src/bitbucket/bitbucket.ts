import { Component } from '../component';
import { Project } from '../project';
import { PipelinesYaml } from './configuration';


export interface BitbucketOptions {}


export class Bitbucket extends Component {
  /**
     * Returns the `Bitbucket` component of a project or `undefined` if the project
     * does not have a Bitbucket component.
     */
  public static of(project: Project): Bitbucket | undefined {

    const isBitbucket = ( c: Component ): c is Bitbucket => c instanceof Bitbucket;

    return project.components.find( isBitbucket );
  }


  /**
     * The `PipelinesConfiguration` configured on this repository.
     */
  public readonly pipelinesYaml: PipelinesYaml;


  public constructor( project: Project, options: BitbucketOptions = {} ) {

    super( project );

    options = options;

    this.pipelinesYaml = new PipelinesYaml( this );
  }
}