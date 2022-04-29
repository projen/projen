import { Component } from "../component";
import { Project } from "../project";
import { NodePackageManager } from "./node-package";
import { determineLockfile } from "./util";

export interface WireitOptions {
  /**
   * The Node Package Manager used to execute scripts
   *
   * @default NodePackageManager.YARN
   */
  readonly packageManager?: NodePackageManager;
}

export class Wireit extends Component {
  public static of(project: Project): Wireit | undefined {
    const isWireit = (c: Component): c is Wireit => c instanceof Wireit;
    return project.components.find(isWireit);
  }

  private readonly packageManager: NodePackageManager;

  constructor(project: Project, options: WireitOptions) {
    super(project);

    this.packageManager = options.packageManager ?? NodePackageManager.YARN;

    project.addGitIgnore(".wireit");
  }

  public renderConfig(): any {
    const tasks: { [name: string]: WireitTaskSpec } = {};
    for (const task of this.project.tasks.all) {
      tasks[task.name] = {
        command: task.steps.join(" && "),
        clean: task.clean,
        files: task.inputs,
        output: task.outputs,
        dependencies: task.dependencies,
        packageLocks: [determineLockfile(this.packageManager)],
      };
    }
    return tasks;
  }
}

export interface WireitTaskSpec {
  readonly command?: string;
  readonly dependencies?: string[];
  readonly files?: string[];
  readonly output?: string[];
  readonly clean?: boolean;
  readonly packageLocks?: string[];
}
