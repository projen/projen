import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from '../component';
import { DependencyType } from '../dependencies';
import { TypeScriptAppProject, TypeScriptProjectOptions } from '../typescript';
import { AutoDiscover } from './auto-discover';
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from './awscdk-deps';
import { CdkConfig, CdkConfigCommonOptions } from './cdk-config';
import { CdkTasks } from './cdk-tasks';
import { LambdaFunctionCommonOptions } from './lambda-function';

export interface AwsCdkTypeScriptAppOptions extends TypeScriptProjectOptions, CdkConfigCommonOptions, AwsCdkDepsCommonOptions {
  /**
   * The CDK app's entrypoint (relative to the source directory, which is
   * "src" by default).
   *
   * @default "main.ts"
   */
  readonly appEntrypoint?: string;

  /**
   * Automatically adds an `awscdk.LambdaFunction` for each `.lambda.ts` handler
   * in your source tree. If this is disabled, you can manually add an
   * `awscdk.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly lambdaAutoDiscover?: boolean;

  /**
   * Common options for all AWS Lambda functions.
   *
   * @default - default options
   */
  readonly lambdaOptions?: LambdaFunctionCommonOptions;
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
  public get cdkVersion() { return this.cdkDeps.cdkVersion; }

  /**
   * The CDK app entrypoint
   */
  public readonly appEntrypoint: string;

  /**
   * Common CDK tasks.
   */
  public readonly cdkTasks: CdkTasks;

  /**
   * cdk.json configuration.
   */
  public readonly cdkConfig: CdkConfig;

  public readonly cdkDeps: AwsCdkDeps;

  constructor(options: AwsCdkTypeScriptAppOptions) {
    super({
      ...options,
      sampleCode: false,
      bundlerOptions: {
        ...options.bundlerOptions,

        // we invoke the "bundle" task as part of the build step in cdk.json so
        // we don't want it to be added to the pre-compile phase.
        addToPreCompile: false,
      },
    });

    this.cdkDeps = new AwsCdkDeps(this, {
      dependencyType: DependencyType.RUNTIME,
      ...options,
    });
    this.appEntrypoint = options.appEntrypoint ?? 'main.ts';

    // CLI
    this.addDevDeps(`aws-cdk@${this.cdkDeps.cdkVersion}`);

    // no compile step because we do all of it in typescript directly
    this.compileTask.reset();

    this.cdkTasks = new CdkTasks(this);

    // add synth to the build
    this.postCompileTask.spawn(this.cdkTasks.synth);

    const tsConfigFile = this.tsconfig?.fileName;
    if (!tsConfigFile) {
      throw new Error('Expecting tsconfig.json');
    }

    this.cdkConfig = new CdkConfig(this, {
      app: `npx ts-node -P ${tsConfigFile} --prefer-ts-exts ${path.posix.join(this.srcdir, this.appEntrypoint)}`,
      featureFlags: this.cdkDeps.majorVersion < 2,
      buildCommand: this.runTaskCommand(this.bundler.bundleTask),
      watchIncludes: [
        `${this.srcdir}/**/*.ts`,
        `${this.testdir}/**/*.ts`,
      ],
      watchExcludes: [
        'README.md',
        'cdk*.json',
        '**/*.d.ts',
        '**/*.js',
        'tsconfig.json',
        'package*.json',
        'yarn.lock',
        'node_modules',
      ],
      ...options,
    });

    this.gitignore.exclude('.parcel-cache/');

    this.npmignore?.exclude(`${this.cdkConfig.cdkout}/`);
    this.npmignore?.exclude('.cdk.staging/');

    if (this.tsconfig) {
      this.tsconfig.exclude.push(this.cdkConfig.cdkout);
    }

    this.addDevDeps('ts-node@^9');
    if (options.sampleCode ?? true) {
      new SampleCode(this, this.cdkDeps.majorVersion);
    }

    const lambdaAutoDiscover = options.lambdaAutoDiscover ?? true;
    if (lambdaAutoDiscover) {
      new AutoDiscover(this, {
        srcdir: this.srcdir,
        testdir: this.testdir,
        lambdaOptions: options.lambdaOptions,
        tsconfigPath: this.tsconfigDev.fileName,
        cdkDeps: this.cdkDeps,
      });
    }
  }

  /**
   * Adds an AWS CDK module dependencies
   * @param modules The list of modules to depend on
   */
  public addCdkDependency(...modules: string[]) {
    return this.cdkDeps.addCdkDependencies(...modules);
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
