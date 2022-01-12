import { TypeScriptProject } from "../typescript";

/**
  Adds a simple Typescript documentation generator
 */
export class TypedocDocgen {
  constructor(project: TypeScriptProject) {
    project.addDevDeps("typedoc@^0.21.4");

    const docgen = project.addTask("docgen", {
      description: `Generate TypeScript API reference ${project.docsDirectory}`,
      exec: `typedoc ${project.srcdir} --disableSources --out ${project.docsDirectory}`,
    });

    // spawn after a successful compile
    project.postCompileTask.spawn(docgen);
  }
}
