import { StartEntryCategory } from './start';
import { TypeScriptProject } from './typescript';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptProject) {
    project.addDevDeps('typedoc');
    project.addTask('docgen', {
      description: `Generate TypeScript API reference ${project.docsDirectory}`,
      category: StartEntryCategory.RELEASE,
      exec: 'typedoc --out ' + project.docsDirectory,
    });
  }
}
