import { ConstructLibrary, ConstructLibraryOptions } from './construct-lib';

/**
 * Options for the construct-lib-aws project.
 */
export interface AwsCdkConstructLibraryOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.95.2"
   */
  readonly cdkVersion: string;

  /**
   * Minimum target version of constructs being tested against. If not provided,
   * the default value depends on the configured `cdkVersion`:
   *
   * - For CDK 1.x, the default is "3.2.27"
   * - For CDK 2.x, the default is "10.0.5"
   * - Otherwise, the default is "*"
   *
   * When the default behavior is used, the dependency on `constructs` will only
   * be added as a `peerDependency`. Otherwise, a `devDependency` will also be
   * added, set to the exact version configrued here.
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDK.
   *
   * You can use this to prevent yarn to mix versions for your CDK dependencies and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdkVersionPinning?: boolean;

  /**
   * Which AWS CDK modules (those that start with "@aws-cdk/") does this library
   * require when consumed?
   */
  readonly cdkDependencies?: string[];

  /**
   * If this is enabled (default), all modules declared in `cdkDependencies` will be also added as
   * normal `dependencies` (as well as `peerDependencies`).
   *
   * This is to ensure that downstream consumers actually have your CDK dependencies installed
   * when using npm < 7 or yarn, where peer dependencies are not automatically installed.
   * If this is disabled, `cdkDependencies` will be added to `devDependencies` to ensure
   * they are present during development.
   *
   * @default true
   */
  readonly cdkDependenciesAsDeps?: boolean;

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
  public readonly version: string;

  /**
   * Whether CDK dependencies are added as normal dependencies (and peer dependencies).
   */
  public readonly cdkDependenciesAsDeps: boolean

  constructor(options: AwsCdkConstructLibraryOptions) {
    super({
      ...options,
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
    });

    this.version = options.cdkVersionPinning ? options.cdkVersion : `^${options.cdkVersion}`;
    this.cdkDependenciesAsDeps = options.cdkDependenciesAsDeps ?? true;

    if (options.constructsVersion) {
      this.addPeerDeps(`constructs@^${options.constructsVersion}`);
      this.addDevDeps(`constructs@${options.constructsVersion}`);
    } else if (options.cdkVersion.startsWith('1.')) {
      // CDK 1.x is built on constructs 3.x
      this.addPeerDeps('constructs@^3.2.27');
    } else if (options.cdkVersion.startsWith('2.')) {
      // CDK 2.x is built on constructs 10.x
      this.addPeerDeps('constructs@^10.0.5');
    } else {
      // Otherwise, let the user manage which version they use
      this.addPeerDeps('constructs');
    }

    if (options.cdkAssert ?? true) {
      this.addDevDeps(this.formatModuleSpec('@aws-cdk/assert'));
    }

    this.addCdkDependencies(...options.cdkDependencies ?? []);
    this.addCdkTestDependencies(...options.cdkTestDependencies ?? []);
  }

  /**
   * Adds CDK modules as runtime dependencies.
   *
   * Modules are currently by default added with a caret CDK version both as "dependencies"
   * and "peerDependencies". This is because currently npm would not
   * automatically install peer dependencies that are not declared as concerete
   * dependencies by the consumer, so this is a little npm "hack" so that
   * consumers will not need to depend on them directly if they don't interact
   * with them.
   * See `cdkDependenciesAsDeps` for changing the default behavior.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   */
  public addCdkDependencies(...deps: string[]) {
    // this ugliness will go away in cdk v2.0
    this.addPeerDeps(...deps.map(m => this.formatModuleSpec(m)));

    if (this.cdkDependenciesAsDeps) {
      this.addDeps(...deps.map(m => this.formatModuleSpec(m)));
    } else {
      this.addDevDeps(...deps.map(m => this.formatModuleSpec(m)));
    }
  }

  /**
   * Adds CDK modules as test dependencies.
   *
   * @param deps names of cdk modules (e.g. `@aws-cdk/aws-lambda`).
   */
  public addCdkTestDependencies(...deps: string[]) {
    this.addDevDeps(...deps.map(m => this.formatModuleSpec(m)));
  }

  private formatModuleSpec(module: string): string {
    return `${module}@${this.version}`;
  }
}

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions extends AwsCdkConstructLibraryOptions { }

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary { }
