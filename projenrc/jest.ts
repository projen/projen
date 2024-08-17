import { TypeScriptProject } from "../src/typescript";

export function setupJest(project: TypeScriptProject) {
  project.addDevDeps("@swc/jest", "@swc/core", "swc_mut_cjs_exports");

  project.addGitIgnore(".swc");

  const testTask = project.tasks.tryFind("test");

  testTask?.prependExec(`tsc --noEmit -p ${project.tsconfigDev.fileName}`);
}
