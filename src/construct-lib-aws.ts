import { ConstructLibraryOptions, ConstructLibrary } from './construct-lib';
import { Semver } from './semver';

/**
 * Options for the construct-lib-aws project.
 */
export interface ConstructLibraryAwsOptions extends ConstructLibraryOptions {
  /**
   * Minmum target version this library is tested against.
   *
   * @default ConstructLibraryAwsCdk.defaultVersion
   */
  readonly cdkVersion?: string;

  /**
   * Which AWS CDK modules (those that start with "@aws-cdk/") does this library
   * require when consumed?
   */
  readonly cdkDependencies?: string[];

  /**
   * Install the @aws-cdk/assert library?
   * @default true
   */
  readonly cdkAssert?: boolean;

  /**
   * AWS CDK modules required for testing.
   */
  readonly cdkTestDependencies?: string[];
}

/**
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within the AWS CDK with a friendly workflow and automatic publishing to
 * the construct catalog.
 *
 * @pjid construct-lib-aws
 */
export class ConstructLibraryAws extends ConstructLibrary {
  /**
   * The default value for `targetVersion`.
   */
  public static defaultVersion = '1.60.0';

  /**
   * The target CDK version for this library.
   */
  public readonly version: Semver;

  constructor(options: ConstructLibraryAwsOptions) {
    super({
      ...options,
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
    });

    this.version = Semver.caret(options.cdkVersion ?? ConstructLibraryAws.defaultVersion);

    this.addPeerDependencies({ constructs: Semver.caret('3.0.4') });

    if (options.cdkAssert ?? true) {
      this.addDevDependencies({ '@aws-cdk/assert': this.version });
    }

    this.addCdkDependencies(...options.cdkDependencies ?? []);
    this.addCdkTestDependencies(...options.cdkTestDependencies ?? []);
  }

  /**
   * Adds CDK modules as runtime dependencies.
   *
   * Modules are currently added with a caret CDK version both as "dependencies"
   * and "peerDependencies". This is because currently npm would not
   * automatically install peer dependencies that are not declared as concerete
   * dependencies by the consumer, so this is a little npm "hack" so that
   * consumers will not need to depend on them directly if they don't interact
   * with them.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   */
  public addCdkDependencies(...deps: string[]) {
    // this ugliness will go away in cdk v2.0
    for (const dep of deps) {
      this.addPeerDependencies({ [dep]: this.version });
      this.addDependencies({ [dep]: this.version });
    }
  }

  /**
   * Adds CDK modules as test dependencies.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   */
  public addCdkTestDependencies(...deps: string[]) {
    for (const dep of deps) {
      this.addDevDependencies({ [dep]: this.version });
    }
  }
}