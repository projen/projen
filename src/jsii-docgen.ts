import { JsiiProject } from './jsii-project';
import { Semver } from './semver';

/**
 * Creates an API.md file based on the jsii manifest:
 * - Adds a `docgen` script to package.json
 * - Runs `jsii-docgen` after compilation
 * - Enforces that API.md is checked in
 */
export class JsiiDocgen {
  constructor(project: JsiiProject) {
    project.addDevDependencies({ 'jsii-docgen': Semver.caret('1.3.2') });
    project.replaceScript('docgen', 'jsii-docgen');
    project.addCompileCommand('jsii-docgen');
    project.gitignore.include('/API.md');
  }
}