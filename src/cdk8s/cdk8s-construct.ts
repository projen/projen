import { ConstructLibrary, ConstructLibraryOptions } from "../cdk";

export interface ConstructLibraryCdk8sOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.0.0-beta.10"
   * @featured
   */
  readonly cdk8sVersion: string;

  /**
   * constructs verion
   *
   * @default "3.2.34"
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

  /**
   * Use pinned version instead of caret version for constructs.
   *
   * You can use this to prevent yarn to mix versions for your consructs package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly constructsVersionPinning?: boolean;

  /**
   * Use pinned version instead of caret version for cdk8s-plus-17.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sPlusVersionPinning?: boolean;
}

/**
 * CDK8s construct library project
 *
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within the CDK for Kubernetes (CDK8s), with a friendly workflow and
 * automatic publishing to the construct catalog.
 *
 * @pjid cdk8s-construct
 */
export class ConstructLibraryCdk8s extends ConstructLibrary {
  /**
   * The CDK8s version this app is using.
   */
  public readonly cdk8sVersion: string;

  /**
   * The constructs version this app is using.
   */
  public readonly constructsVersion: string;

  constructor(options: ConstructLibraryCdk8sOptions) {
    super(options);

    if (!options.cdk8sVersion) {
      throw new Error("Required field cdk8sVersion is not specified.");
    }

    this.cdk8sVersion = options.cdk8sVersionPinning
      ? options.cdk8sVersion
      : `^${options.cdk8sVersion}`;

    if (options.constructsVersion) {
      this.constructsVersion = options.constructsVersionPinning
        ? options.constructsVersion
        : `^${options.constructsVersion}`;
    } else {
      this.constructsVersion = "^3.2.34";
    }

    this.addPeerDeps(
      `constructs@${this.constructsVersion}`,
      `cdk8s@${this.cdk8sVersion}`
    );
  }
}
