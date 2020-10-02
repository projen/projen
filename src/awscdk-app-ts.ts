import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from './component';
import { JsonFile } from './json';
import { Semver } from './semver';
import { StartEntryCategory } from './start';
import { TypeScriptAppProject, TypeScriptProjectOptions } from './typescript';

export interface AwsCdkTypeScriptAppOptions extends TypeScriptProjectOptions {
  /**
   * AWS CDK version to use.
   *
   * @default 1.63.0
   */
  readonly cdkVersion: string;

  /**
   * Which AWS CDK modules (those that start with "@aws-cdk/") this app uses.
   */
  readonly cdkDependencies?: string[];

  /**
   * Additional context to include in `cdk.json`.
   */
  readonly context?: { [key: string]: string };

  /**
   * The CDK app's entrypoint (relative to the source directory, which is
   * "src" by default).
   *
   * @default "main.ts"
   */
  readonly appEntrypoint?: string;

  /**
   * To protect you against unintended changes that affect your security posture,
   * the AWS CDK Toolkit prompts you to approve security-related changes before deploying them.
   *
   * You can change the level of change that requires approval by specifying:
   *
   * never - Approval is never required
   * any-change - Requires approval on any IAM or security-group-related change
   * broadening - Requires approval when IAM statements or traffic rules are added; removals don't require approval
   *
   * @default broadening
   */
  readonly requireApproval?: 'never' | 'any-change' | 'broadening';

}

/**
 * AWS CDK app in TypeScript
 *
 * @pjid awscdk-app-ts
 */
export class AwsCdkTypeScriptApp extends TypeScriptAppProject {
  /**
   * The CDK version this app is using.
   */
  public readonly cdkVersion: Semver;

  /**
   * Contents of `cdk.json`.
   */
  public readonly cdkConfig: any;

  /**
   * The CDK app entrypoint
   */
  public readonly appEntrypoint: string;

  constructor(options: AwsCdkTypeScriptAppOptions) {
    super({
      ...options,
      sampleCode: false,
    });

    if (this.srcdir !== 'src') {
      throw new Error('sources are expected under the "src" directory');
    }

    if (this.testdir !== 'test') {
      throw new Error('test sources are expected under the "test" directory');
    }

    this.appEntrypoint = options.appEntrypoint ?? 'main.ts';

    this.cdkVersion = Semver.caret(options.cdkVersion);

    // CLI
    this.addDevDependencies({ 'aws-cdk': this.cdkVersion });

    this.addCdkDependency('@aws-cdk/assert');
    this.addCdkDependency('@aws-cdk/core');
    this.addCdkDependency(...options.cdkDependencies ?? []);

    this.addScript('cdk', 'cdk');
    this.addScript('synth', 'cdk synth');
    this.addScript('deploy', 'cdk deploy');
    this.addScript('diff', 'cdk diff');

    this.addScript('compile', 'true');
    this.removeScript('watch'); // because we use ts-node
    this.addBuildCommand('yarn synth');

    this.start?.addEntry('synth', {
      desc: 'Synthesizes your cdk app into cdk.out (part of "yarn build")',
      category: StartEntryCategory.BUILD,
    });

    this.start?.addEntry('deploy', {
      desc: 'Deploys your cdk app to the AWS cloud',
      category: StartEntryCategory.RELEASE,
    });

    this.cdkConfig = {
      app: `npx ts-node ${path.join(this.srcdir, this.appEntrypoint)}`,
    };

    if (options.context) {
      this.cdkConfig.context = { ...options.context };
    }

    if (options.requireApproval) {
      this.cdkConfig.requireApproval = options.requireApproval;
    }

    this.addDevDeps('ts-node');

    new JsonFile(this, 'cdk.json', {
      obj: this.cdkConfig,
    });

    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }
  }

  /**
   * Adds an AWS CDK module dependencies
   * @param modules The list of modules to depend on
   */
  public addCdkDependency(...modules: string[]) {
    for (const m of modules) {
      // since synthesis runs at build time, CDK dependencies should be dev-dependencies
      this.addDependencies({ [m]: this.cdkVersion });
    }
  }
}

class SampleCode extends Component {
  private readonly appProject: AwsCdkTypeScriptApp;
  constructor(project: AwsCdkTypeScriptApp) {
    super(project);
    this.appProject = project;
  }

  public synthesize(outdir: string) {
    const srcdir = path.join(outdir, this.appProject.srcdir);
    if (fs.pathExistsSync(srcdir) && fs.readdirSync(srcdir).filter(x => x.endsWith('.ts'))) {
      return;
    }

    const srcCode = `import { App, Construct, Stack, StackProps } from '@aws-cdk/core';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();`;

    fs.mkdirpSync(srcdir);
    fs.writeFileSync(path.join(srcdir, this.appProject.appEntrypoint), srcCode);

    const testdir = path.join(outdir, this.appProject.testdir);
    if (fs.pathExistsSync(testdir) && fs.readdirSync(testdir).filter(x => x.endsWith('.ts'))) {
      return;
    }

    const testCode = `import '@aws-cdk/assert/jest';
import { MyStack } from '../src/main'
import { App } from '@aws-cdk/core';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  expect(stack).not.toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});`;

    fs.mkdirpSync(testdir);
    fs.writeFileSync(path.join(testdir, 'main.test.ts'), testCode);
  }
}