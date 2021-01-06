import { Component } from '../component';
import { Project } from '../project';
import { Task, TaskCategory } from '../tasks';
import { Pom } from './pom';

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

export class MavenCompile extends Component {
  public readonly compileTask: Task;
  public readonly testCompileTask: Task;

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
      category: TaskCategory.BUILD,
      exec: 'mvn compiler:compile',
    });

    this.testCompileTask = project.addTask('test:compile', {
      description: 'Compile the test source files',
      category: TaskCategory.TEST,
      exec: 'mvn compiler:testCompile',
    });
  }
}