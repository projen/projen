import { TypeScriptProject } from './typescript';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptProject) {
    project.addDevDeps('typedoc@^0.20.35');

    const docgen = project.addTask('docgen', {
      description: `Generate TypeScript API reference ${project.docsDirectory}`,
      exec: 'typedoc --out ' + project.docsDirectory,
    });

    project.buildTask.spawn(docgen);
  }
}
