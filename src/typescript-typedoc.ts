import { TypeScriptProject } from './projects/typescript';
import { Semver } from './semver';
import { StartEntryCategory } from './start';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptProject) {
    project.addDevDependencies({ typedoc: Semver.caret('0.17.8') });
    project.addScript('docgen', 'typedoc --out ' + project.docsDirectory, {
      startDesc: `Generate TypeScript API reference ${project.docsDirectory}`,
      startCategory: StartEntryCategory.RELEASE,
    });
  }
}
