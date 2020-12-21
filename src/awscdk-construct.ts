import { Component } from './component';
import { ConstructLibrary, ConstructLibraryOptions } from './construct-lib';

/**
 * Options for the construct-lib-aws project.
 */
export interface AwsCdkConstructLibraryOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.78.0"
   */
  readonly cdkVersion: string;

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
   * Install the @aws-cdk/assert library?
   * @default true
   */
  readonly cdkAssert?: boolean;

  /**
   * AWS CDK modules required for testing.
   */
  readonly cdkTestDependencies?: string[];

  /**
   * Adds `integ:synth`, `integ:deploy`, and `integ:diff` tasks and a sample
   * integration test which can be used to validate this library.
   *
   * @default true
   */
  readonly cdkIntegTest?: boolean;
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

  constructor(options: AwsCdkConstructLibraryOptions) {
    super({
      ...options,
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
    });

    this.cdkVersion = options.cdkVersionPinning ? options.cdkVersion : `^${options.cdkVersion}`;

    this.addPeerDeps('constructs@^3.2.27');

    if (options.cdkAssert ?? true) {
      this.addDevDeps(this.formatModuleSpec('@aws-cdk/assert'));
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
    this.addPeerDeps(...deps.map(m => this.formatModuleSpec(m)));
    this.addDeps(...deps.map(m => this.formatModuleSpec(m)));
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
}

interface IntegrationTestOptions {
  /**
   * The integration test app entrypoint.
   *
   * @default "test/integ.ts"
   */
  readonly entrypoint?: string;
}

class IntegrationTest extends Component {
  public readonly entrypoint: string;

  constructor(project: AwsCdkConstructLibrary, options: IntegrationTestOptions = {}) {
    super(project);

    this.entrypoint = options.entrypoint ?? 'test/integ.ts';

    // install the CLI and ts-node so we can use it to run the test
    project.addCdkTestDependencies('aws-cdk');
    project.addDevDeps('ts-node');

    const app = `ts-node --project ${project.tsconfigTest} ${this.entrypoint}`;
    const args = [
      '--app',
      `"${app}"`,
      '--context',
      '@aws-cdk/core:newStyleStackSynthesis=true',
    ];

    const synth = project.addTask('integ:synth', {
      description: 'Synthesize the integration test app to cdk.out',
    });

    project.gitignore.exclude('cdk.out');
    synth.exec('rm -fr cdk.out');
    synth.exec(`cdk synth ${args}`);

    project.addTask('integ:bootstrap', {
      description: 'Bootstrap AWS environments used by the integration test app',
      exec: `cdk bootstrap ${args}`,
      env: { CDK_NEW_BOOTSTRAP: '1' },
    });

    project.addTask('integ:deploy', {
      description: 'Deploy the integration test app',
      exec: `cdk deploy ${args} *`,
    });

    project.addTask('integ:diff', {
      description: 'Diff integration test app against AWS environment',
      exec: `cdk diff ${args}`,
    });

    project.testTask.spawn(synth);
  }
}

/** @deprecated use `AwsCdkConstructLibraryOptions` */
export interface ConstructLibraryAwsOptions extends AwsCdkConstructLibraryOptions { }

/** @deprecated use `AwsCdkConstructLibrary` */
export class ConstructLibraryAws extends AwsCdkConstructLibrary { }
