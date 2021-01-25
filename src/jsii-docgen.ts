import { JsiiProject } from './jsii-project';
import { TaskCategory } from './tasks';

/**
 * Creates an API.md file based on the jsii manifest:
 * - Adds a `docgen` script to package.json
 * - Runs `jsii-docgen` after compilation
 * - Enforces that API.md is checked in
 */
export class JsiiDocgen {
  constructor(project: JsiiProject) {
    project.addDevDeps('jsii-docgen');

    const docgen = project.addTask('docgen', {
      description: 'Generate API.md from .jsii manifest',
      category: TaskCategory.RELEASE,
      exec: 'jsii-docgen',
    });

    project.compileTask.spawn(docgen);
    project.gitignore.include('/API.md');
  }
}