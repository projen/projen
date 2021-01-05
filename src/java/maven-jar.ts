import { Component } from '../component';
import { Project } from '../project';
import { Task, TaskCategory } from '../tasks';
import { Pom } from './pom';

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

export class MavenJar extends Component {

  public readonly packageTask: Task;

  constructor(project: Project, pom: Pom, options: MavenJarOptions = {}) {
    super(project);

    pom.addPlugin('org.apache.maven.plugins/maven-jar-plugin@3.2.0', {
      configuration: {
        archive: [
          { index: true },
          {
            manifest: [
              { addDefaultImplementationEntries: true },
              { addDefaultSpecificationEntries: true },
            ],
          },
        ],
      },
    });

    if (options.sources ?? true) {
      pom.addPlugin('org.apache.maven.plugins/maven-source-plugin@3.2.1', {
        executions: [{ id: 'attach-sources', goals: ['jar'] }],
      });
    }

    if (options.javadocs ?? true) {
      pom.addPlugin('org.apache.maven.plugins/maven-javadoc-plugin@3.2.0', {
        executions: [{ id: 'attach-javadocs', goals: ['jar'] }],
        configuration: {
          failOnError: false,
          show: 'protected',
          sourceFileExcludes: options.javadocsExclude?.map(exclude => ({ exclude })),
          detectJavaApiLink: false, // https://stackoverflow.com/a/61884267
          additionalJOptions: [
            { additionalJOption: '-J-XX:+TieredCompilation' },
            { additionalJOption: '-J-XX:TieredStopAtLevel=1' },
          ],
        },
      });
    }

    const outdir = options.outdir ?? 'dist/java';
    this.packageTask = project.addTask('package', {
      category: TaskCategory.RELEASE,
      description: `Creates a java deployment package under ${outdir}`,
      env: {
        MAVEN_OPTS: '-XX:+TieredCompilation -XX:TieredStopAtLevel=1',
      },
    });
    this.packageTask.exec(`mkdir -p ${outdir}`);
    this.packageTask.exec(`mvn deploy -D=altDeploymentRepository=local::default::file:///$PWD/${outdir}`);
    project.gitignore.exclude(outdir);
  }
}