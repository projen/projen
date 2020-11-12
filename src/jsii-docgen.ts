import { JsiiProject } from './projects/jsii-project';
import { Semver } from './semver';
import { StartEntryCategory } from './start';

/**
 * Creates an API.md file based on the jsii manifest:
 * - Adds a `docgen` script to package.json
 * - Runs `jsii-docgen` after compilation
 * - Enforces that API.md is checked in
 */
export class JsiiDocgen {
  constructor(project: JsiiProject) {
    project.addDevDependencies({ 'jsii-docgen': Semver.caret('1.3.2') });
    project.addScript('docgen', 'jsii-docgen', {
      startDesc: 'Generate API.md from .jsii manifest',
      startCategory: StartEntryCategory.RELEASE,
    });
    project.addCompileCommand('jsii-docgen');
    project.gitignore.include('/API.md');

    project.addTip('`API.md` includes the API reference for your library');
  }
}