import { JsiiProject } from './jsii-project';

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
      exec: 'jsii-docgen',
    });

    // spawn docgen after compilation (requires the .jsii manifest).
    project.postcompileTask.spawn(docgen);
    project.gitignore.include('/API.md');
  }
}