import { ConstructLibrary, ConstructLibraryOptions } from './construct-lib';

export interface ConstructLibraryCdk8sOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "^1.0.0-beta.10"
   * @featured
   */
  readonly cdk8sVersion: string;

  /**
   * constructs verion
   *
   * @default "^3.2.34"
   */

  readonly constructsVersion?: string;

  /**
   * cdk8s-plus-17 version
   *
   * @default "cdk8sVersion"
   */

  readonly cdk8sPlusVersion?: string

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

  /**
   * The cdk8s-plus-17 version this app is using.
   */

  public readonly cdk8sPlusVersion: string;

  constructor(options: ConstructLibraryCdk8sOptions) {
    super(options);

    this.cdk8sVersion = options.cdk8sVersionPinning ? options.cdk8sVersion : `^${options.cdk8sVersion}`;

    if (options.constructsVersion) {
      this.constructsVersion = options.constructsVersionPinning ? options.constructsVersion: `^${options.constructsVersion}`;
    } else {
      this.constructsVersion = '^3.2.34';
    }


    if (!! options.cdk8sPlusVersion) {
      this.cdk8sPlusVersion = options.cdk8sPlusVersionPinning ? options.cdk8sPlusVersion : `^${options.cdk8sPlusVersion}`;
    } else {
      this.cdk8sPlusVersion = this.cdk8sVersion
    }

    this.addPeerDeps(
      `constructs@${this.constructsVersion}`,
      `cdk8s@${this.cdk8sVersion}`,
      `cdk8s-plus-17@${this.cdk8sPlusVersion}`,
    );
  }
}