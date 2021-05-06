import { ConstructLibrary, ConstructLibraryOptions } from "./construct-lib";

export interface ConstructLibraryCdk8sOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.0.0-beta.10"
   * @featured
   */
  readonly cdk8sVersion: string;
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
  constructor(options: ConstructLibraryCdk8sOptions) {
    super(options);

    const ver = options.cdk8sVersion;

    this.addPeerDeps(
      "constructs@^3.2.34",
      `cdk8s@^${ver}`,
      `cdk8s-plus-17@^${ver}`
    );
  }
}
