import { Project, ProjectOptions } from '../project';
import { Junit, JunitOptions } from './junit';
import { MavenSample } from './maven-sample';
import { Pom } from './pom';

export interface MavenProjectOptions extends ProjectOptions {
  /**
   * @default "org.acme"
   */
  readonly groupId: string;

  /**
   * @default "my-app"
   */
  readonly artifactId: string;

  /**
   * Maven package
   *
   * @default - same as `groupId`
   */
  readonly package?: string;

  /**
   * Include junit tests.
   * @default true
   */
  readonly junit?: boolean;

  /**
   * junit options
   * @default - defaults
   */
  readonly junitOptions?: JunitOptions;

  /**
   * Include sample code and test if the relevant directories don't exist.
   */
  readonly sample?: boolean;
}

/**
 * @pjid maven
 */
export class MavenProject extends Project {
  public readonly pom: Pom;
  public readonly junit: Junit;

  public readonly package: string;

  constructor(options: MavenProjectOptions) {
    super(options);

    this.package = options.package ?? options.groupId;
    this.pom = new Pom(this, {
      groupId: options.groupId,
      artifactId: options.artifactId,
      version: '0.1.0',
    });

    this.junit = new Junit(this, {
      pom: this.pom,
      package: this.package,
      ...options.junitOptions,
    });

    if (options.sample ?? true) {
      new MavenSample(this, {
        package: this.package,
      });
    }

    this.pom.addPlugin('org.apache.maven.plugins/maven-compiler-plugin@3.8.1', {
      source: '1.8',
      target: '1.8',
    });

    // platform independent build
    this.pom.addProperty('project.build.sourceEncoding', 'UTF-8');
  }
}