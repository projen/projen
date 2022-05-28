import { Component } from "../component";
import { IResolvable } from "../file";
import { Project } from "../project";

/**
 * Manages GitHub actions used in GitHub workflows.
 */
export class Actions extends Component {
  private readonly actions: Record<string, ActionMetadata> = {};
  constructor(project: Project) {
    super(project);
  }

  /**
   * Add an action.
   *
   * Expects a fully qualified action, like "actions/checkout@v2". If
   * an action with the same version has already been specified, it will be
   * overridden.
   */
  public addAction(actionVersion: string): ActionMetadata {
    const [name, version] = actionVersion.split("@");
    if (!version) {
      throw new Error(
        `Action "${actionVersion}" needs to be tagged with a version, like "actions/checkout@v3".`
      );
    }

    const existing = this.actions[name];

    const action = { name, version };
    this.actions[name] = action;

    return existing;
  }

  /**
   * Retrieve a registered GitHub Action, throwing if no action with that
   * name is registered.
   */
  public getAction(actionName: string): ActionMetadata {
    const action = this.tryGetAction(actionName);
    if (!action) {
      throw new Error(
        `No action with name ${actionName} found. Add an action with addAction()`
      );
    }
    return action;
  }

  /**
   * Retrieve a registered GitHub action, returning `undefined` if no action
   * with that name is registered.
   */
  public tryGetAction(actionName: string): ActionMetadata | undefined {
    return this.actions[actionName];
  }

  /**
   * Returns a lazy value that will resolve to "actionName@version" based on the
   * version registered in Actions.
   *
   * If no version is registered for the given action name, either `fallback`
   * will be used if provided, or the function will throw.
   */
  public use(actionName: string, fallbackVersion?: string): string {
    const lazy: IResolvable = {
      toJSON: () => {
        if (fallbackVersion) {
          const version = this.tryGetAction(actionName)?.version;
          return `${actionName}@${version ?? fallbackVersion}`;
        } else {
          const version = this.getAction(actionName).version;
          return `${actionName}@${version}`;
        }
      },
    };
    return lazy as unknown as string;
  }
}

export interface ActionMetadata {
  readonly name: string;
  readonly version: string;
}
