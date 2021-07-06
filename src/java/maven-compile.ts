import { Component } from '../component';
import { Project } from '../project';
import { Task } from '../tasks';
import { Pom } from './pom';

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
  public readonly compileTask: Task;

  constructor(project: Project, pom: Pom, options: MavenCompileOptions = {}) {
    super(project);

    project.gitignore.exclude('target');

    pom.addPlugin('org.apache.maven.plugins/maven-compiler-plugin@3.8.1', {
      configuration: {
        source: options.source ?? '1.8',
        target: options.target ?? '1.8',
      },
    });

    this.compileTask = project.addTask('compile', {
      description: 'Compile the main source files',
      exec: 'mvn compiler:compile',
    });
  }
}