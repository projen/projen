import * as path from "path";
import { Component } from "../component";
import { Project } from "../project";
import { NodePackageManager } from "./node-package";
import { NodeProject } from "./node-project";
import { determineLockfile } from "./util";

export interface WireitOptions {
  /**
   * The Node Package Manager used to execute scripts
   *
   * @default NodePackageManager.YARN
   */
  readonly packageManager?: NodePackageManager;

  readonly projenCommand?: string;
}

export class Wireit extends Component {
  public static of(project: Project): Wireit | undefined {
    const isWireit = (c: Component): c is Wireit => c instanceof Wireit;
    return project.components.find(isWireit);
  }

  private readonly nodeProject: NodeProject;
  private readonly packageManager: NodePackageManager;

  constructor(project: NodeProject, options: WireitOptions) {
    super(project);

    this.nodeProject = project;
    this.packageManager = options.packageManager ?? NodePackageManager.YARN;

    project.addGitIgnore(".wireit");
  }

  public renderConfig(): any {
    const tasks: { [name: string]: WireitTaskSpec } = {};
    for (const task of this.project.tasks.all) {
      const steps = task.steps.map((step) => {
        let command = "";
        if (step.cwd) {
          command += `cd ${step.cwd} && `;
        }
        if (step.say) {
          command += `echo ${step.say}`;
        }
        if (step.builtin) {
          command += renderBuiltin(step.builtin);
        }
        if (step.exec) {
          command += step.exec;
        }
        if (step.spawn) {
          const subtask = this.nodeProject.tasks.tryFind(step.spawn);
          if (!subtask) {
            throw new Error(
              `Could not find task ${subtask} (spawned by ${task.name})`
            );
          }
          command += this.nodeProject.runTaskCommand(subtask);
        }
        return command;
      });
      tasks[task.name] = {
        command:
          steps.length > 0
            ? steps.join(" && ")
            : // If there is no command and no dependencies, wireit will error, so we add a placeholder command.
            task.dependencies.length === 0
            ? "echo No commands to run."
            : undefined,
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

function renderBuiltin(builtin: string) {
  const moduleRoot = path.dirname(require.resolve("../../package.json"));
  const program = require.resolve(
    path.join(moduleRoot, "lib", `${builtin}.task.js`)
  );
  return `${process.execPath} ${program}`;
}
