import { ConstructLibraryOptions, ConstructLibrary } from './construct-lib';
import { Semver } from './semver';

/**
 * Options for the construct-lib-aws project.
 */
export interface AwsCdkConstructLibraryOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.60.0"
   */
  readonly cdkVersion: string;

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
 * AWS CDK construct library project
 *
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within the AWS CDK with a friendly workflow and automatic publishing to
 * the construct catalog.
 *
 * ```ts
 * const project = new ConstructLibraryAws({
 *   name: 'cdk-watchful',
 *   description: 'Watching your CDK apps since 2019',
 *   jsiiVersion: Semver.caret('1.7.0'),
 *   authorName: 'Elad Ben-Israel',
 *   authorEmail: 'elad.benisrael@gmail.com',
 *   repository: 'https://github.com/eladb/cdk-watchful.git',
 *   keywords: [
 *     "cloudwatch",
 *     "monitoring"
 *   ],
 *
 *   catalog: {
 *     twitter: 'emeshbi'
 *   },
 *
 *   // creates PRs for projen upgrades
 *   projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
 *
 *   cdkVersion: '1.54.0',
 *   cdkDependencies: [
 *     "@aws-cdk/aws-apigateway",
 *     "@aws-cdk/aws-cloudwatch",
 *     "@aws-cdk/aws-cloudwatch-actions",
 *     "@aws-cdk/aws-dynamodb",
 *     "@aws-cdk/aws-ecs",
 *     "@aws-cdk/aws-ecs-patterns",
 *     "@aws-cdk/aws-elasticloadbalancingv2",
 *     "@aws-cdk/aws-events",
 *     "@aws-cdk/aws-events-targets",
 *     "@aws-cdk/aws-lambda",
 *     "@aws-cdk/aws-rds",
 *     "@aws-cdk/aws-sns",
 *     "@aws-cdk/aws-sns-subscriptions",
 *     "@aws-cdk/aws-sqs",
 *     "@aws-cdk/core"
 *   ],
 *   devDependencies: {
 *     "aws-sdk": Semver.caret("2.708.0")
 *   },
 *
 *   // jsii publishing
 *
 *   java: {
 *     javaPackage: 'com.github.eladb.watchful',
 *     mavenGroupId: 'com.github.eladb',
 *     mavenArtifactId: 'cdk-watchful'
 *   },
 *   python: {
 *     distName: 'cdk-watchful',
 *     module: 'cdk_watchful'
 *   }
 * });
 *
 * project.synth();
 * ```
 *
 * @pjid awscdk-construct
 */
export class AwsCdkConstructLibrary extends ConstructLibrary {
  /**
   * The target CDK version for this library.
   */
  public readonly version: Semver;

  constructor(options: AwsCdkConstructLibraryOptions) {
    super({
      ...options,
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
    });

    this.version = Semver.caret(options.cdkVersion);

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

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions extends AwsCdkConstructLibraryOptions { }

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary { }
