import { join } from 'path';
import { Component } from '../component';
import { Project } from '../project';
import { SampleDir } from '../sample-file';

export interface MavenSampleOptions {
  /**
   * Project root java package.
   */
  readonly package: string;
}

export class MavenSample extends Component {
  constructor(project: Project, options: MavenSampleOptions) {
    super(project);

    const pkg = options.package.split('.');
    new SampleDir(project, join('src', 'main', 'java', ...pkg), {
      files: {
        'Main.java': [
          ...options.package ? [`package ${options.package};`] : [],
          '',
          'public class Main {',
          '  public static void main(final String[] args) {',
          '    System.out.println("Hello, world!");',
          '  }',
          '}',
        ].join('\n'),
      },
    });
  }
}