import { JsiiProject } from './jsii-project';
import { StartEntryCategory } from './start';

/**
 * Creates an API.md file based on the jsii manifest:
 * - Adds a `docgen` script to package.json
 * - Runs `jsii-docgen` after compilation
 * - Enforces that API.md is checked in
 */
export class JsiiDocgen {
  constructor(project: JsiiProject) {
    project.addDevDeps('jsii-docgen');

    project.addCommand('docgen', 'jsii-docgen', {
      description: 'Generate API.md from .jsii manifest',
      category: StartEntryCategory.RELEASE,
    });
    project.compileCmd.add('jsii-docgen');
    project.gitignore.include('/API.md');

    project.addTip('`API.md` includes the API reference for your library');
  }
}