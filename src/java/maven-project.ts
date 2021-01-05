import { Project, ProjectOptions } from '../project';
import { Junit, JunitOptions } from './junit';
import { MavenCompile, MavenCompileOptions } from './maven-compile';
import { MavenJar, MavenJarOptions } from './maven-jar';
import { MavenSample } from './maven-sample';
import { MavenVersions } from './maven-versions';
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
   * Final artifact output directory.
   *
   * @default "dist/java"
   */
  readonly dist?: string;

  /**
   * Include sample code and test if the relevant directories don't exist.
   */
  readonly sample?: boolean;

  /**
   * Include javadocs in package.
   * @default true
   */
  readonly javadocs?: boolean;

  /**
   * Javadocs options.
   * @default - defaults
   */
  readonly jarOptions?: MavenJarOptions;

  /**
   * Compile options.
   * @default - defaults
   */
  readonly compileOptions?: MavenCompileOptions;
}

/**
 * @pjid maven
 */
export class MavenProject extends Project {
  public readonly pom: Pom;
  public readonly junit: Junit;
  public readonly jar: MavenJar;
  public readonly compile: MavenCompile;
  public readonly versions: MavenVersions;

  public readonly package: string;
  public readonly dist: string;

  constructor(options: MavenProjectOptions) {
    super(options);

    this.package = options.package ?? options.groupId;
    this.dist = options.dist ?? 'dist/java';

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

    // platform independent build
    this.pom.addProperty('project.build.sourceEncoding', 'UTF-8');

    this.gitignore.exclude('.classpath');
    this.gitignore.exclude('.project');
    this.gitignore.exclude('.settings');

    this.compile = new MavenCompile(this, this.pom, options.compileOptions);
    this.jar = new MavenJar(this, this.pom, options.jarOptions);
    this.versions = new MavenVersions(this, this.pom);

    this.pom.addPlugin('org.apache.maven.plugins/maven-enforcer-plugin@3.0.0-M3', {
      executions: [{ id: 'enforce-maven', goals: ['enforce'] }],
      configuration: {
        rules: [
          { requireMavenVersion: [{ version: '3.6' }] },
        ],
      },
    });

    const buildTask = this.addTask('build', { description: 'Full CI build' });
    buildTask.spawn(this.jar.deployTask);
  }
}