import { StartEntryCategory } from './start';
import { TypeScriptProject } from './typescript';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptProject) {
    project.addDevDeps('typedoc');
    project.addCommand('docgen', 'typedoc --out ' + project.docsDirectory, {
      description: `Generate TypeScript API reference ${project.docsDirectory}`,
      category: StartEntryCategory.RELEASE,
    });
  }
}
