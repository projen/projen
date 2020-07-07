import { Construct } from 'constructs';
import { TypeScriptLibraryProject } from './typescript';
import { Semver } from './semver';

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen extends Construct {
  constructor(project: TypeScriptLibraryProject) {
    super(project, 'typedoc');

    project.addDevDependencies({ typedoc: Semver.caret('0.17.8') });
    project.addScripts({
      docgen: 'typedoc --out ' + project.docsDirectory,
    }); 
  }
}
