import { TypeScriptLibraryProject } from './typescript';
import { Semver } from './semver';
import { StartEntryCategory } from './start';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptLibraryProject) {
    project.addDevDependencies({ typedoc: Semver.caret('0.17.8') });
    project.addScript('docgen', 'typedoc --out ' + project.docsDirectory);
    project.start?.addEntry('docgen', {
      desc: `Generate TypeScript API reference ${project.docsDirectory}`,
      category: StartEntryCategory.RELEASE,
    });
  }
}
