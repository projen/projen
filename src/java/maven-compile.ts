import { Pom } from "./pom";
import { Component } from "../component";
import { Project } from "../project";

/**
 * Options for `MavenCompile`.
 */
export interface MavenCompileOptions {
  /**
   * Source language version.
   *
   * @default "1.8"
   */
  readonly source?: string;

  /**
   * Target JVM version.
   *
   * @default "1.8"
   */
  readonly target?: string;
}

/**
 * Adds the maven-compiler plugin to a POM file and the `compile` task.
 */
export class MavenCompile extends Component {
  constructor(project: Project, pom: Pom, options: MavenCompileOptions = {}) {
    super(project);

    project.gitignore.exclude("target");

    pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
      configuration: {
        source: options.source ?? "1.8",
        target: options.target ?? "1.8",
      },
    });

    project.compileTask.exec("mvn compiler:compile");
  }
}
