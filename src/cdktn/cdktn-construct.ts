import * as semver from "semver";
import type { ConstructLibraryOptions } from "../cdk";
import { ConstructLibrary } from "../cdk";

export interface ConstructLibraryCdktnOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   * @default "^0.24.0"
   * @featured
   */
  readonly cdktnVersion: string;

  /**
   * Construct version to use
   * @default "^10.7.0"
   */
  readonly constructsVersion?: string;
}

/**
 * CDKTN construct library project
 *
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within CDK Terrain (CDKTN), a community-driven fork of CDKTF.
 * Provides a friendly workflow and automatic publishing to the construct catalog.
 *
 * Learn more at https://cdktn.io/
 *
 * @pjid cdktn-construct
 */
export class ConstructLibraryCdktn extends ConstructLibrary {
  constructor(options: ConstructLibraryCdktnOptions) {
    super(options);

    if (!options.cdktnVersion) {
      throw new Error("Required field cdktnVersion is not specified.");
    }

    function getDefaultConstructVersion() {
      const semverCdktnVersion = semver.coerce(options.cdktnVersion);
      if (semverCdktnVersion && semver.lte(semverCdktnVersion, "0.24.0")) {
        return "^10.5.1";
      }

      return "^10.7.0";
    }

    const ver = options.cdktnVersion;
    const constructVersion =
      options.constructsVersion ?? getDefaultConstructVersion();

    this.addPeerDeps(`constructs@${constructVersion}`, `cdktn@${ver}`);
    this.addKeywords("cdktn");
  }
}
