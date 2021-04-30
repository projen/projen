import * as path from 'path';
import * as fs from 'fs-extra';
import * as semver from 'semver';
import { Component } from './component';
import { JsonFile } from './json';
import { TaskCategory } from './tasks';
import { TypeScriptAppProject, TypeScriptProjectOptions } from './typescript';

export enum CdkApprovalLevel {
  /**
   * Approval is never required
   */
  NEVER = 'never',
  /**
   * Requires approval on any IAM or security-group-related change
   */
  ANY_CHANGE = 'any-change',
  /**
   * Requires approval when IAM statements or traffic rules are added; removals don't require approval
   */
  BROADENING = 'broadening',
}
export interface AwsCdkTypeScriptAppOptions extends TypeScriptProjectOptions {
  /**
   * AWS CDK version to use.
   *
   * @default "1.95.2"
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
   * @default CdkApprovalLevel.BROADENING
   */
  readonly requireApproval?: CdkApprovalLevel;

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
  public readonly cdkVersion: string;

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

    // encode a hidden assumption further down the chain
    if (this.srcdir !== 'src') {
      throw new Error('sources are expected under the "src" directory');
    }

    // encode a hidden assumption further down the chain
    if (this.testdir !== 'test') {
      throw new Error('test sources are expected under the "test" directory');
    }

    this.appEntrypoint = options.appEntrypoint ?? 'main.ts';

    this.cdkVersion = options.cdkVersionPinning ? options.cdkVersion : `^${options.cdkVersion}`;

    // CLI
    this.addDevDeps(this.formatModuleSpec('aws-cdk'));
    this.addCdkDependency('@aws-cdk/assert');

    const cdkMajorVersion = semver.minVersion(this.cdkVersion)?.major ?? 1;
    if (cdkMajorVersion < 2) {
      this.addCdkDependency('@aws-cdk/core');
    } else {
      this.addCdkDependency('aws-cdk-lib');
      this.addDeps('constructs@^10.0.5');
    }

    this.addCdkDependency(...options.cdkDependencies ?? []);

    const synth = this.addTask('synth', {
      description: 'Synthesizes your cdk app into cdk.out (part of "yarn build")',
      category: TaskCategory.BUILD,
      exec: 'cdk synth',
    });

    this.addTask('deploy', {
      description: 'Deploys your CDK app to the AWS cloud',
      category: TaskCategory.RELEASE,
      exec: 'cdk deploy',
    });

    this.addTask('destroy', {
      description: 'Destroys your cdk app in the AWS cloud',
      category: TaskCategory.RELEASE,
      exec: 'cdk destroy',
    });

    this.addTask('diff', {
      description: 'Diffs the currently deployed app against your code',
      category: TaskCategory.MISC,
      exec: 'cdk diff',
    });

    // no compile step because we do all of it in typescript directly
    this.compileTask.reset();

    this.removeScript('watch'); // because we use ts-node

    // add synth to the build
    this.buildTask.spawn(synth);

    this.cdkConfig = {
      app: `npx ts-node --prefer-ts-exts ${path.join(this.srcdir, this.appEntrypoint)}`,
    };

    if (options.context) {
      this.cdkConfig.context = { ...options.context };
    }

    if (options.requireApproval) {
      this.cdkConfig.requireApproval = options.requireApproval;
    }

    this.gitignore.exclude('cdk.out/');
    this.gitignore.exclude('.cdk.staging/');
    this.gitignore.exclude('.parcel-cache/');

    this.npmignore?.exclude('cdk.out/');
    this.npmignore?.exclude('.cdk.staging/');

    if (this.tsconfig) {
      this.tsconfig.exclude.push('cdk.out');
    }

    this.addDevDeps('ts-node');

    new JsonFile(this, 'cdk.json', {
      obj: this.cdkConfig,
    });

    if (options.sampleCode ?? true) {
      new SampleCode(this, cdkMajorVersion);
    }
  }

  /**
   * Adds an AWS CDK module dependencies
   * @param modules The list of modules to depend on
   */
  public addCdkDependency(...modules: string[]) {
    if (modules.length === 0) {
      return;
    }
    this.addDeps(...modules.map(m => this.formatModuleSpec(m)));
  }

  private formatModuleSpec(module: string): string {
    return `${module}@${this.cdkVersion}`;
  }
}

class SampleCode extends Component {
  private readonly appProject: AwsCdkTypeScriptApp;
  constructor(project: AwsCdkTypeScriptApp, private readonly cdkMajorVersion: number) {
    super(project);
    this.appProject = project;
  }

  public synthesize() {
    const outdir = this.project.outdir;
    const srcdir = path.join(outdir, this.appProject.srcdir);
    if (fs.pathExistsSync(srcdir) && fs.readdirSync(srcdir).filter(x => x.endsWith('.ts'))) {
      return;
    }

    const srcImports = new Array<string>();
    if (this.cdkMajorVersion < 2) {
      srcImports.push('import { App, Construct, Stack, StackProps } from \'@aws-cdk/core\';');
    } else {
      srcImports.push('import { App, Stack, StackProps } from \'aws-cdk-lib\';');
      srcImports.push('import { Construct } from \'constructs\';');
    }

    const srcCode = `${srcImports.join('\n')}

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

    const testImports = new Array<string>();
    if (this.cdkMajorVersion < 2) {
      testImports.push('import { App } from \'@aws-cdk/core\';');
    } else {
      testImports.push('import { App } from \'aws-cdk-lib\';');
    }


    const appEntrypointName = path.basename(this.appProject.appEntrypoint, '.ts');
    const testCode = `import '@aws-cdk/assert/jest';
${testImports.join('\n')}
import { MyStack } from '../src/${appEntrypointName}';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  expect(stack).not.toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});`;

    fs.mkdirpSync(testdir);
    fs.writeFileSync(path.join(testdir, `${appEntrypointName}.test.ts`), testCode);
  }
}
