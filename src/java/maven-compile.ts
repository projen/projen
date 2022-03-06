import { Construct } from "constructs";
import { Component } from "../component";
import { Project } from "../project";
import { Pom } from "./pom";

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
  constructor(scope: Construct, pom: Pom, options: MavenCompileOptions = {}) {
    super(scope, "MavenCompile");

    Project.of(this).gitignore.exclude("target");

    pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
      configuration: {
        source: options.source ?? "1.8",
        target: options.target ?? "1.8",
      },
    });

    Project.of(this).compileTask.exec("mvn compiler:compile");
  }
}
