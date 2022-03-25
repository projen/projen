import { TypeScriptProject, TypeScriptProjectOptions } from "../typescript";
import { ActionMetadata } from "./metadata-model";

export interface GithubActionTypeScriptOptions
  extends TypeScriptProjectOptions {
  readonly metadata: ActionMetadata;
}

/**
 * Create a GitHub action with TypeScript
 *
 * @pjid github-action-ts
 */
export class GithubActionTypeScriptProject extends TypeScriptProject {
  constructor(options: GithubActionTypeScriptOptions) {
    super(options);

    // standard GitHub action packages
    this.addDeps("@actions/core", "@actions/github");

    // package as a single runnable .js file in /dist
    this.addDevDeps("@vercel/ncc");
    this.packageTask.reset("ncc build --source-map --license licenses.txt");

    this.package.addField("main", "lib/index.js");
    this.addGitIgnore("!/dist/");
    this.annotateGenerated("/dist/**");
  }
}
