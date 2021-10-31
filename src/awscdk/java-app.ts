import * as semver from 'semver';
import { CdkApprovalLevel } from '..';
import { JavaProject, JavaProjectOptions } from '../java';
import { JsonFile } from '../json';
import { FEATURE_FLAGS } from './internal';

export interface AwsCdkJavaAppOptions extends JavaProjectOptions {
  /**
   * AWS CDK version to use.
   *
   * @default "1.130.0"
   * @featured
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
   * Which AWS CDK modules this app uses. The `core` module is included by
   * default and you can add additional modules here by stating only the package
   * name (e.g. `aws-lambda`).
   *
   * @featured
   */
  readonly cdkDependencies?: string[];

  /**
   * Additional context to include in `cdk.json`.
   *
   * @default - no additional context
   */
  readonly context?: { [key: string]: string };

  /**
   * Include all feature flags in cdk.json
   *
   * @default true
   */
  readonly featureFlags?: boolean;

  /**
   * The name of the Java class with the static `main()` method. This method
   * should call `app.synth()` on the CDK app.
   *
   * @default "org.acme.App"
   */
  readonly mainClass: string;

  /**
   * To protect you against unintended changes that affect your security posture,
   * the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.
   *
   * @default CdkApprovalLevel.BROADENING
   */
  readonly requireApproval?: CdkApprovalLevel;
}

/**
 * AWS CDK app in Java.
 *
 * @pjid awscdk-app-java
 */
export class AwsCdkJavaApp extends JavaProject {
  /**
   * The CDK version this app is using.
   */
  public readonly cdkVersion: string;

  /**
   * The `cdk.json` file.
   */
  public readonly cdkJson: JsonFile;

  /**
   * The name of the main class of the java app.
   */
  public readonly mainClass: string;

  constructor(options: AwsCdkJavaAppOptions) {
    super(options);

    this.mainClass = options.mainClass;
    this.cdkVersion = options.cdkVersionPinning ? options.cdkVersion : `^${options.cdkVersion}`;

    if (!this.cdkVersion) {
      throw new Error('Required field cdkVersion is not specified.');
    }

    const cdkMajorVersion = semver.minVersion(this.cdkVersion)?.major ?? 1;
    if (cdkMajorVersion >= 2) {
      throw new Error('CDKv2 is still not supported');
    }

    this.addCdkDependency('core');
    this.addCdkDependency(...options.cdkDependencies ?? []);

    const synth = this.addTask('synth', {
      description: 'Synthesizes your cdk app into cdk.out (part of "yarn build")',
      exec: 'cdk synth',
    });

    this.addTask('deploy', {
      description: 'Deploys your CDK app to the AWS cloud',
      exec: 'cdk deploy',
    });

    this.addTask('destroy', {
      description: 'Destroys your cdk app in the AWS cloud',
      exec: 'cdk destroy',
    });

    this.addTask('diff', {
      description: 'Diffs the currently deployed app against your code',
      exec: 'cdk diff',
    });

    // add synth to the build
    this.buildTask.spawn(synth);

    const context: Record<string, any> = { ...options.context };
    const fflags = options.featureFlags ?? true;
    if (fflags) {
      for (const flag of FEATURE_FLAGS) {
        context[flag] = true;
      }
    }

    this.cdkJson = new JsonFile(this, 'cdk.json', {
      omitEmpty: true,
      obj: {
        app: `mvn exec:java --quiet -Dexec.mainClass=${this.mainClass}`,
        context: context,
        requireApproval: options.requireApproval,
      },
    });

    this.gitignore.exclude('cdk.out/');
    this.gitignore.exclude('.cdk.staging/');
  }

  /**
   * Adds an AWS CDK module dependencies
   *
   * @param modules The list of modules to depend on (e.g. "core", "aws-lambda", etc)
   */
  public addCdkDependency(...modules: string[]) {
    for (const m of modules) {
      this.addDependency(`software.amazon.awscdk/${m}@${this.cdkVersion}`);
    }
  }
}
