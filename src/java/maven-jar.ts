import { Component } from '../component';
import { Project } from '../project';
import { Task, TaskCategory } from '../tasks';
import { Pom } from './pom';

/**
 * Options for `MavenJar`.
 */
export interface MavenJarOptions {
  /**
   * Include sources in jar.
   * @default true
   */
  readonly sources?: boolean;

  /**
   * Where to place the package output?
   * @default "dist/java"
   */
  readonly outdir?: string;

  /**
   * Include javadocs in jar.
   * @default true
   */
  readonly javadocs?: boolean;

  /**
   * Exclude source files from docs.
   * @default []
   */
  readonly javadocsExclude?: string[];
}

/**
 * Configures a maven project to produce a .jar archive with sources and javadocs.
 */
export class MavenJar extends Component {

  /**
   * A task which deploys the package to `outdir` as a local maven repository.
   */
  public readonly deployTask: Task;

  /**
   * Creates jars in the `target/` directory.
   */
  public readonly packageTask: Task;

  constructor(project: Project, pom: Pom, options: MavenJarOptions = {}) {
    super(project);

    pom.addPlugin('org.apache.maven.plugins/maven-jar-plugin@3.2.0', {
      configuration: {
        archive: {
          index: true,
          manifest: {
            addDefaultImplementationEntries: true,
            addDefaultSpecificationEntries: true,
          },
        },
      },
    });

    if (options.sources ?? true) {
      pom.addPlugin('org.apache.maven.plugins/maven-source-plugin@3.2.1', {
        executions: [
          { id: 'attach-sources', goals: ['jar'] },
        ],
      });
    }

    if (options.javadocs ?? true) {
      pom.addPlugin('org.apache.maven.plugins/maven-javadoc-plugin@3.2.0', {
        executions: [
          { id: 'attach-javadocs', goals: ['jar'] },
        ],
        configuration: {
          failOnError: false,
          show: 'protected',
          sourceFileExcludes: { exclude: options.javadocsExclude },
          detectJavaApiLink: false, // https://stackoverflow.com/a/61884267
          additionalJOptions: {
            additionalJOption: [
              '-J-XX:+TieredCompilation',
              '-J-XX:TieredStopAtLevel=1',
            ],
          },
        },
      });
    }

    const env = {
      MAVEN_OPTS: '-XX:+TieredCompilation -XX:TieredStopAtLevel=1',
    };

    const outdir = options.outdir ?? 'dist/java';
    this.deployTask = project.addTask('deploy', {
      category: TaskCategory.RELEASE,
      description: `Creates a java deployment package under ${outdir}`,
      env,
    });
    this.deployTask.exec(`mkdir -p ${outdir}`);
    this.deployTask.exec(`mvn deploy -D=altDeploymentRepository=local::default::file:///$PWD/${outdir}`);

    this.packageTask = project.addTask('package', {
      description: 'Produces jar files under target/',
      category: TaskCategory.RELEASE,
      exec: 'mvn package',
      env,
    });

    project.gitignore.exclude(outdir);
  }
}