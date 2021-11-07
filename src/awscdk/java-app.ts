import { join } from 'path';
import * as semver from 'semver';
import { SampleDir } from '..';
import { JavaProject, JavaProjectOptions } from '../java';
import { CdkConfig, CdkConfigCommonOptions } from './cdk-config';
import { CdkTasks } from './cdk-tasks';

export interface AwsCdkJavaAppOptions extends JavaProjectOptions, CdkConfigCommonOptions {
  /**
   * AWS CDK version to use (you can use semantic versioning).
   *
   * @default "^1.130.0"
   */
  readonly cdkVersion: string;

  /**
   * Which AWS CDK modules this app uses. The `core` module is included by
   * default and you can add additional modules here by stating only the package
   * name (e.g. `aws-lambda`).
   *
   * @featured
   */
  readonly cdkDependencies?: string[];

  /**
   * The name of the Java class with the static `main()` method. This method
   * should call `app.synth()` on the CDK app.
   *
   * @default "org.acme.App"
   */
  readonly mainClass: string;
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
  public readonly cdkConfig: CdkConfig;

  /**
   * The full name of the main class of the java app (package.Class).
   */
  public readonly mainClass: string;

  /**
   * CDK tasks.
   */
  public readonly cdkTasks: CdkTasks;

  /**
   * The name of the Java package that includes the main class.
   */
  public readonly mainPackage: string;

  /**
   * The name of the Java class with the static `main()` method.
   */
  public readonly mainClassName: string;

  constructor(options: AwsCdkJavaAppOptions) {
    const mainClassComponents = options.mainClass.split('.');
    const mainPackage = mainClassComponents.slice(0, -1);
    const mainClassName = mainClassComponents[mainClassComponents.length - 1];

    super({
      ...options,
      sample: false,
      sampleJavaPackage: mainPackage.join('.'),
    });

    this.mainClass = options.mainClass;
    this.mainPackage = mainPackage.join('.');
    this.mainClassName = mainClassName;
    this.cdkVersion = options.cdkVersion;

    if (!this.cdkVersion) {
      throw new Error('Required field cdkVersion is not specified.');
    }

    const cdkMajorVersion = semver.minVersion(this.cdkVersion)?.major ?? 1;
    if (cdkMajorVersion >= 2) {
      throw new Error('CDKv2 is still not supported');
    }

    this.addCdkDependency('core');
    this.addCdkDependency(...options.cdkDependencies ?? []);

    this.cdkTasks = new CdkTasks(this);
    this.postCompileTask.spawn(this.cdkTasks.synth);

    this.cdkConfig = new CdkConfig(this, {
      app: `mvn exec:java --quiet -Dexec.mainClass=${this.mainClass}`,
      ...options,
    });

    this.addSample();
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

  private addSample() {
    const pkg = this.mainPackage.split('.');
    const javaFile = `${this.mainClassName}.java`;
    new SampleDir(this, join('src', 'main', 'java', ...pkg), {
      files: {
        [javaFile]: [
          `package ${pkg.join('.')};`,
          '',
          'import software.amazon.awscdk.core.App;',
          'import software.amazon.awscdk.core.Stack;',
          '',
          `public class ${this.mainClassName} {`,
          '  public static void main(final String[] args) {',
          '    App app = new App();',
          '    new Stack(app, "MyStack");',
          '    app.synth();',
          '  }',
          '}',
        ].join('\n'),
      },
    });
  }
}
