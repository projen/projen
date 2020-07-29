import { TypeScriptLibraryProject } from './typescript';
import { Semver } from './semver';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptLibraryProject) {
    project.addDevDependencies({ typedoc: Semver.caret('0.17.8') });
    project.replaceScript('docgen', 'typedoc --out ' + project.docsDirectory);
  }
}
