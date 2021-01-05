import { join } from 'path';
import { Component } from '../component';
import { Project } from '../project';
import { SampleDir } from '../sample-file';
import { TaskCategory } from '../tasks';
import { Pom } from './pom';

export interface JunitCommonOptions {

}

export interface JunitOptions extends JunitCommonOptions {
  /**
   * Java package.
   */
  readonly package: string;

  /**
   * Java pom.
   */
  readonly pom: Pom;

  /**
   * Junit version
   *
   * @default "5.7.0"
   */
  readonly version?: string;
}

export class Junit extends Component {
  constructor(project: Project, options: JunitOptions) {
    super(project);

    const pom = options.pom;
    const version = options.version ?? '5.7.0';

    pom.addTestDependency(`org.junit.jupiter/junit-jupiter-api@${version}`);
    pom.addTestDependency(`org.junit.jupiter/junit-jupiter-engine@${version}`);

    project.addTask('test', {
      description: 'Runs tests',
      category: TaskCategory.TEST,
      exec: 'mvn test',
    });

    const pkg = options.package.split('.');
    new SampleDir(project, join('src', 'test', 'java', ...pkg), {
      files: {
        'MyTest.java': [
          ...options.package ? [`package ${options.package};`] : [],
          '',
          'import org.junit.jupiter.api.Test;',
          '',
          'public class MyTest {',
          '  @Test',
          '  public void testHello() {',
          '    System.out.println("Hello, world!");',
          '  }',
          '}',
        ].join('\n'),
      },
    });
  }
}