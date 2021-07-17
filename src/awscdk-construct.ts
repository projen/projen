import * as path from 'path';
import { glob } from 'glob';
import * as semver from 'semver';
import { ConstructLibrary, ConstructLibraryOptions } from './construct-lib';
import { NodeLambdaConstructSourceCode } from './node-lambda-construct-source-code';


/**
 * Options for the construct-lib-aws project.
 */
export interface AwsCdkConstructLibraryOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.95.2"
   * @featured
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
   * @default - When the default behavior is used, the dependency on `constructs` will only
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
   * @featured
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
   * @featured
   */
  readonly cdkTestDependencies?: string[];

  readonly bundleLambda?: boolean;

  readonly bundleLambdaOptions?: BundleLambdaOptions;
}

export interface BundleLambdaOptions {
  /**
   * Suffix to be used to scan for lambda handlers.
   */
  readonly suffix?: string;

  /**
   * Should generate a construct with the name of the lambda.
   */
  readonly generateConstruct?: boolean;
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
  public readonly cdkVersion: string;

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

    this.cdkVersion = options.cdkVersionPinning ? options.cdkVersion : `^${options.cdkVersion}`;
    this.cdkDependenciesAsDeps = options.cdkDependenciesAsDeps ?? true;

    this.logger.info('hello!!!!');
    const cdkMajorVersion = semver.minVersion(this.cdkVersion)?.major ?? 1;
    if (options.constructsVersion) {
      this.addPeerDeps(`constructs@^${options.constructsVersion}`);
      this.addDevDeps(`constructs@${options.constructsVersion}`);
    } else if (cdkMajorVersion === 1) {
      // CDK 1.x is built on constructs 3.x
      this.addPeerDeps('constructs@^3.2.27');
    } else if (cdkMajorVersion == 2) {
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

    if (options.bundleLambda ?? true) {
      this.bundleLambdas(options.bundleLambdaOptions);
    }
  }

  /**
   * @deprecated use `cdkVersion`
   */
  public get version() {
    return this.cdkVersion;
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
    return `${module}@${this.cdkVersion}`;
  }

  /**
   * Enables CDK apps to consume construct library lambdas.
   *
   * @param bundleLambdaOptions Bundle lambda options
   * @private
   */
  private bundleLambdas(bundleLambdaOptions?: BundleLambdaOptions) {
    this.logger.debug('running bundleLambdas');
    const lambdaSuffix = (bundleLambdaOptions?.suffix ?? '.lambda');
    const generateConstruct = bundleLambdaOptions?.generateConstruct ?? true;
    const handlerFilePattern = `${this.srcdir}/**/*${lambdaSuffix}\\.@(ts|js)`;

    this.addDevDeps('aws-sdk'); // common lambda runtime dependency
    this.addDevDeps('esbuild');

    this.eslint?.addOverride({
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
      files: [handlerFilePattern],
    });

    // create bundle compile task for each lambda handler, generate convenience construct
    glob.sync(handlerFilePattern).forEach(file => {
      this.logger.debug(`found lambda handler ${file}`);
      const parsedPath = path.parse(file);
      const bundleDirName = `${parsedPath.name}.bundle`;
      const bundleDir = path.join(parsedPath.dir, `${parsedPath.name}.bundle`);
      const compiledHandlerPath = bundleDir.replace(this.srcdir, this.libdir);
      const constructFilePath = path.join(parsedPath.dir, parsedPath.name.replace(lambdaSuffix, '') + '.ts');

      if (generateConstruct) {
        new NodeLambdaConstructSourceCode(this, constructFilePath, bundleDirName);
      }
      const bundleLambdaTask = this.addTask(`bundleLambda:${file}`, {
        description: `Bundle lambda: ${file}`,
        exec: [
          'esbuild',
          '--bundle',
          file,
          '--target="node14"',
          '--platform="node"',
          `--outfile="${path.join(compiledHandlerPath, 'index.js')}"`,
          '--external:aws-sdk',
        ].join(' '),
      });
      this.compileTask.spawn(bundleLambdaTask);
    });
  }

}

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions extends AwsCdkConstructLibraryOptions {
}

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary {
}
