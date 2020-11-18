import { StartEntryCategory } from './start';
import { TypeScriptProject } from './typescript';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptProject) {
    project.addDevDeps('typedoc');
    project.addScript('docgen', 'typedoc --out ' + project.docsDirectory, {
      startDesc: `Generate TypeScript API reference ${project.docsDirectory}`,
      startCategory: StartEntryCategory.RELEASE,
    });
  }
}
