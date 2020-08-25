import { NodeProject, NodeProjectOptions } from './node-project';
import { JsonFile } from './json';
import { Semver } from './semver';
import { Component } from './component';
import * as path from 'path';

export interface LernaProjectOptions extends NodeProjectOptions {
  /**
   * Specify a specific client to run commands with (this can also be specified on a per command basis).
   * Change to "npm" to run all commands with npm.
   *
   * @default 'yarn'
   */
  readonly npmClient?: string;

  /**
   * Enables integration with Yarn Workspaces (available since yarn@0.27+).
   *
   * @default true
   */
  readonly useWorkspaces?: boolean;

  /**
   * Packages to create
   *
   * @default []
   */
  readonly packages?: LernaPackage[];

  /**
   * Version of lerna to use
   *
   * @default '^3.22.1'
   */
  readonly lernaVersion?: Semver;
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

/**
 * lerna monorepo project
 * @pjid lerna
 */
export class LernaProject extends NodeProject {
  private readonly packages: Package[];
  private readonly lernaJson: any;
  private readonly workspaces: Array<string>;
  private readonly noHoistPatterns: Array<string>;

  constructor(options: LernaProjectOptions) {
    super({ ...options, private: true });
    this.packages = new Array<Package>();
    this.workspaces = new Array<string>();
    this.noHoistPatterns = new Array<string>();

    this.addDevDependencies({ lerna: options.lernaVersion ?? Semver.caret('3.22.1') });

    const useWorkspaces = options.useWorkspaces ?? true;

    this.lernaJson = {
      npmClient: options.npmClient ?? 'yarn',
      useWorkspaces,
      version: '0.0.0',
    };

    new JsonFile(this, 'lerna.json', {
      obj: this.lernaJson,
    });

    for (const pack of options.packages || []) {
      this.addPackage(pack.project, pack.location);
    }

    if (useWorkspaces)
      this.addFields({
        workspaces: {
          packages: this.workspaces,
          nohoist: this.noHoistPatterns,
        },
      });
  }

  /**
   * Adds a workspace to the yarn workspaces list.
   * @param pattern The pattern to add.
   */
  public addWorkspace(pattern: string) {
    if (!this.workspaces.includes(pattern)) this.workspaces.push(pattern);
  }

  /**
   * Adds a package to the project.
   * @param project The `NodeProject` to add.
   * @param location The path to add the project to.
   */
  public addPackage(project: NodeProject, location: string = 'packages') {
    const path = `${location}/${project.manifest.name}`;
    this.addWorkspace(path);
    this.packages.push(new Package(this, project, path));
  }

  /**
   * This can be used to opt out of hoisting for certain dependencies.
   * @param project The project containing a non-hoistable dependency.
   * @param dependency The dependency within the project to opt out of hoisting for.
   */
  public noHoist(
    project: NodeProject | string,
    dependency: NodeProject | string,
  ) {
    const packageName = project instanceof NodeProject ? project.manifest.name : project;
    const depName = dependency instanceof NodeProject ? dependency.manifest.name : dependency;
    const entry = `${packageName}/${depName}`;
    if (!this.noHoistPatterns.includes(entry)) this.noHoistPatterns.push(entry);
  }
}

class Package extends Component {
  private readonly nodeProject: NodeProject;
  private readonly path: string;

  constructor(parent: LernaProject, project: NodeProject, path: string) {
    super(parent);
    this.nodeProject = project;
    this.path = path;
  }

  public _synthesize(outdir: string) {
    const location = path.join(outdir, this.path);
    this.nodeProject.synth(location);
  }
}
