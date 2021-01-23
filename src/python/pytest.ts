import { Component } from '../component';
import { TaskCategory } from '../tasks';
import { PythonProject } from './python-project';

export interface PytestOptions {
  /**
   * Pytest version
   *
   * @default "6.2.1"
   */
  readonly version?: string;
}

export class Pytest extends Component {
  constructor(project: PythonProject, options: PytestOptions) {
    super(project);

    const version = options.version ?? '6.2.1';

    project.depsManager?.addTestDependency(`pytest@${version}`);

    project.addTask('test', {
      description: 'Runs tests',
      category: TaskCategory.TEST,
      exec: 'pytest',
    });

    // TODO: add sample tests with `SampleDir`
  }
}