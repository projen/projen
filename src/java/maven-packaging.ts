import { Pom } from "./pom";
import { Component } from "../component";
import { Project } from "../project";

/**
 * Options for `MavenPackage`.
 */
export interface MavenPackagingOptions {
  /**
   * Include sources jar in package.
   * @default true
   */
  readonly sources?: boolean;

  /**
   * Where to place the package output?
   * @default "dist/java"
   */
  readonly distdir?: string;

  /**
   * Include javadocs jar in package.
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
export class MavenPackaging extends Component {
  /**
   * The directory containing the package output, relative to the project outdir
   */
  public readonly distdir: string;

  constructor(project: Project, pom: Pom, options: MavenPackagingOptions = {}) {
    super(project);

    pom.addPlugin("org.apache.maven.plugins/maven-jar-plugin@3.2.0", {
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
      pom.addPlugin("org.apache.maven.plugins/maven-source-plugin@3.2.1", {
        executions: [{ id: "attach-sources", goals: ["jar"] }],
      });
    }

    if (options.javadocs ?? true) {
      pom.addPlugin("org.apache.maven.plugins/maven-javadoc-plugin@3.2.0", {
        executions: [{ id: "attach-javadocs", goals: ["jar"] }],
        configuration: {
          failOnError: false,
          show: "protected",
          sourceFileExcludes: { exclude: options.javadocsExclude },
          detectJavaApiLink: false, // https://stackoverflow.com/a/61884267
          additionalJOptions: {
            additionalJOption: [
              "-J-XX:+TieredCompilation",
              "-J-XX:TieredStopAtLevel=1",
            ],
          },
        },
      });
    }

    const env = {
      MAVEN_OPTS: "-XX:+TieredCompilation -XX:TieredStopAtLevel=1",
    };

    this.distdir = options.distdir ?? "dist/java";

    for (const [k, v] of Object.entries(env)) {
      this.project.packageTask.env(k, v);
    }
    this.project.packageTask.exec(`mkdir -p ${this.distdir}`);
    this.project.packageTask.exec(
      `mvn deploy -D=altDeploymentRepository=local::default::file:///$PWD/${this.distdir}`
    );

    project.gitignore.exclude(this.distdir);
  }
}
