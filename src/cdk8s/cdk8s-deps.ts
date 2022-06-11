import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";

/**
 * Options for `Cdk8sDeps`
 */
export interface Cdk8sDepsCommonOptions {
  /**
   * Minumum version of the CDK8s to depend on. `constructs` library to depend on.
   * 
   * @default "1.5.53"
   */
  readonly cdk8sVersion: string;

  /**
   * Minimum version of the `constructs` library to depend on.
   * 
   * @default "3.3.351"
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDK8s.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sVersionPinning?: boolean;
}

export interface Cdk8sDepsOptions extends Cdk8sDepsCommonOptions {
  /**
   * The type of dependency to use for runtime AWS CDK and `constructs` modules.
   *
   * For libraries, use peer dependencies and for apps use runtime dependencies.
   */
  readonly dependencyType: DependencyType;
}

export interface Cdk8sPackageNames {
  /**
   * Fully qualified name of the core framework package
   */
  readonly cdk8s: string;
  /**
   * Fully qualified name of the constructs library package
   */
  readonly constructs: string;
}

/**
 * Manages dependencies on the CDK8s.
 */
export abstract class Cdk8sDeps extends Component {
  /**
   * The dependency requirement for CDK8s.
   */
  public readonly cdk8sVersion: string;

  private readonly _packageNames: Cdk8sPackageNames;

  constructor(project: Project, options: Cdk8sDepsOptions) {
    super(project);

    this._packageNames = this.packageNames();
  }

  /**
   * Return a configuration object with information about package naming in various languages
   */
   protected abstract packageNames(): Cdk8sPackageNames;
}