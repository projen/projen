import { CdktnDeps } from "./cdktn-deps";
import type { CdktnDepsCommonOptions } from "./cdktn-deps";
import type { ConstructLibraryOptions } from "../cdk";
import { ConstructLibrary } from "../cdk";
import { DependencyType } from "../dependencies";

/**
 * Options for `ConstructLibraryCdktn`.
 */
export interface ConstructLibraryCdktnOptions
  extends ConstructLibraryOptions, CdktnDepsCommonOptions {}

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
  public readonly cdktnDeps: CdktnDeps;

  constructor(options: ConstructLibraryCdktnOptions) {
    super(options);

    this.cdktnDeps = new CdktnDeps(this, {
      // preserve the exact version requirement written before caret ranges
      // became the default, so existing projects don't see a diff in their
      // peerDependencies on the next synth
      cdktnVersionPinning: true,
      // since we are a library, dependencies should be added as peers
      dependencyType: DependencyType.PEER,
      ...options,
    });

    this.addKeywords("cdktn");
    this.addKeywords("terraform");
  }

  /**
   * The target CDKTN version for this library.
   */
  public get cdktnVersion() {
    return this.cdktnDeps.cdktnVersion;
  }
}
