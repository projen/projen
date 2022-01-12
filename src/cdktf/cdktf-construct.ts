import { ConstructLibrary, ConstructLibraryOptions } from "../cdk";

export interface ConstructLibraryCdktfOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   * @default "0.4.0"
   * @featured
   */
  readonly cdktfVersion: string;
}

/**
 * CDKTF construct library project
 *
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within the CDK for Terraform (CDKTF), with a friendly workflow and
 * automatic publishing to the construct catalog.
 *
 * @pjid cdktf-construct
 */
export class ConstructLibraryCdktf extends ConstructLibrary {
  constructor(options: ConstructLibraryCdktfOptions) {
    super(options);

    if (!options.cdktfVersion) {
      throw new Error("Required field cdktfVersion is not specified.");
    }

    const ver = options.cdktfVersion;

    this.addPeerDeps("constructs@^10", `cdktf@^${ver}`);
  }
}
