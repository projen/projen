import * as semver from "semver";
import { AutoDiscover } from "./auto-discover";
import { ConstructLibrary, ConstructLibraryOptions } from "../cdk";

export interface ConstructLibraryCdk8sOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.4.10"
   * @featured
   */
  readonly cdk8sVersion: string;

  /**
   * constructs verion
   *
   * @default "3.3.196"
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

  /**
   * Automatically adds an `cdk8s.IntegrationTest` for each `.integ.ts` app
   * in your test directory. If this is disabled, you can manually add an
   * `cdk8s.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;
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

    const cdk8sVersion = semver.parse(options.cdk8sVersion);
    if (!cdk8sVersion) {
      throw new Error(
        `"cdk8sVersion" cannot be parsed as a semver version: ${options.cdk8sVersion}`,
      );
    }

    this.cdk8sVersion = options.cdk8sVersionPinning
      ? options.cdk8sVersion
      : `^${options.cdk8sVersion}`;

    const defaultConstructsVersion =
      cdk8sVersion.major === 1 ? "3.3.196" : "10.0.0";
    const resolvedConstructsVersion =
      options.constructsVersion ?? defaultConstructsVersion;
    const resolvedMajorConstructVersion = semver.parse(
      resolvedConstructsVersion,
    )?.major;

    if (!resolvedMajorConstructVersion) {
      throw new Error(
        `"constructsVersion" cannot be parsed as a semver version: ${options.constructsVersion}`,
      );
    }

    switch (cdk8sVersion.major) {
      case 1:
        if (resolvedMajorConstructVersion !== 3) {
          throw new Error("cdk8s 1.x requires constructs 3.x");
        }
        break;
      case 2:
        if (resolvedMajorConstructVersion !== 10) {
          throw new Error("cdk8s 2.x requires constructs 10.x");
        }
        break;
    }

    this.constructsVersion = options.constructsVersionPinning
      ? resolvedConstructsVersion
      : `^${resolvedConstructsVersion}`;

    this.addPeerDeps(
      `constructs@${this.constructsVersion}`,
      `cdk8s@${this.cdk8sVersion}`,
    );

    new AutoDiscover(this, {
      testdir: this.testdir,
      tsconfigPath: this.tsconfigDev.fileName,
      integrationTestAutoDiscover: options.integrationTestAutoDiscover ?? true,
    });
  }
}
