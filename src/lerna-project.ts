import { NodeProject, NodeProjectOptions } from './node-project';
import { JsonFile } from './json';
import { Semver } from './semver';
import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * lerna monorepo project
 * @pjid lerna
 */
export class LernaProject extends NodeProject {
  public readonly packages: NodeProject[];
  private readonly lernaJson: any;
  private readonly workspaces: Array<string>;
  private readonly noHoistPatterns: Array<string>;

  constructor(options: LernaProjectOptions) {
    super({...options, private: true});
    this.packages = new Array<NodeProject>();
    this.workspaces = new Array<string>();
    this.noHoistPatterns = new Array<string>();


    this.addDevDependencies({lerna: Semver.caret('3.22.1')});

    this.lernaJson = {
      npmClient: 'yarn',
      useWorkspaces: true,
      version: '0.0.0',
    };

    // New JsonFile for lerna.json
    new JsonFile(this, 'lerna.json', {
      obj: this.lernaJson,
    });

    for (const pack of options.packages || []) {
      this.addPackage(pack.project, pack.location)
    }

    this.addFields({
      workspaces:
        {
          packages: this.workspaces,
          nohoist: this.noHoistPatterns,
        },
    });
  }

  public addWorkspace(pattern: string) {
    if (!this.workspaces.includes(pattern)) this.workspaces.push(pattern);
  }

  public addPackage(project: NodeProject, location?: string) {

    const packageLocation = `${location || 'packages'}`;
    const outputDir = `${packageLocation}/${project.manifest.name}`;
    if (!fs.existsSync(path.join(this.outdir, outputDir))) {
      fs.mkdirpSync(path.join(this.outdir, outputDir));
    }

    try {
      project.synth(path.join(this.outdir, outputDir));
    } catch (e) {
      process.stderr.write(`Error when synthesizing lerna package: ${e}\n`);
      throw e;
    }
    this.addWorkspace(`${packageLocation}/*`);
    this.packages.push(project);
  }

  public noHoist(project: NodeProject | string, dependency: NodeProject | string) {
    const packageName = project instanceof NodeProject ? project.manifest.name : project;
    const depName = dependency instanceof NodeProject ? dependency.manifest.name : dependency;
    const entry = `${packageName}/${depName}`;
    if (!this.noHoistPatterns.includes(entry)) this.noHoistPatterns.push(entry);
  }
}

export interface LernaProjectOptions extends NodeProjectOptions {

  /**
   * Packages to create
   */
  readonly packages?: LernaPackage[];

}

export interface LernaPackage {
  /**
   * Directory in which the package will live.
   * @default 'packages'
   */
  readonly location?: string;

  /**
   * Project instance of the package.
   * e.g: new TypeScriptProject({name: 'my-project'})
   */
  readonly project: NodeProject;
}