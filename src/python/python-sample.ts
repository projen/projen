import { Component } from '../component';
import { Project, ProjectType } from '../project';
import { SampleDir } from '../sample-file';

export interface PythonSampleOptions {
  /**
   * Which type of project this is.
   */
  readonly projectType: ProjectType;
}

/**
 * Python code sample.
 */
export class PythonSample extends Component {
  constructor(project: Project, _options: PythonSampleOptions) {
    super(project);

    new SampleDir(project, 'test', { files: {} });
  }
}