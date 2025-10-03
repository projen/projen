import * as fs from "fs";
import * as path from "path";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import {
  NodePackageManager,
  RunBundleTask,
  TypeScriptModuleResolution,
  TypescriptConfigOptions,
} from "../javascript";
import { TypeScriptAppProject, TypeScriptProjectOptions } from "../typescript";
import { deepMerge } from "../util";
import { AutoDiscover } from "./auto-discover";
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from "./awscdk-deps";
import { AwsCdkDepsJs } from "./awscdk-deps-js";
import { CdkConfig, CdkConfigCommonOptions } from "./cdk-config";
import { CdkTasks } from "./cdk-tasks";
import { IntegRunner } from "./integ-runner";
import { LambdaFunctionCommonOptions } from "./lambda-function";

export interface AwsCdkTypeScriptAppOptions
  extends TypeScriptProjectOptions,
    CdkConfigCommonOptions,
    AwsCdkDepsCommonOptions {
  /**
   * The CDK app's entrypoint (relative to the source directory, which is
   * "src" by default).
   *
   * @default "main.ts"
   */
  readonly appEntrypoint?: string;
  /**
   * The command line to execute in order to synthesize the CDK application
   * (language specific).
   */
  readonly app?: string;
  /**
   * Automatically adds an `awscdk.LambdaFunction` for each `.lambda.ts` handler
   * in your source tree. If this is disabled, you can manually add an
   * `awscdk.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly lambdaAutoDiscover?: boolean;

  /**
   * Automatically adds an `cloudfront.experimental.EdgeFunction` for each
   * `.edge-lambda.ts` handler in your source tree. If this is disabled, you can
   * manually add an `awscdk.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly edgeLambdaAutoDiscover?: boolean;

  /**
   * Automatically adds an `awscdk.LambdaExtension` for each `.lambda-extension.ts`
   * entrypoint in your source tree. If this is disabled, you can manually add an
   * `awscdk.AutoDiscover` component to your project
   *
   * @default true
   */
  readonly lambdaExtensionAutoDiscover?: boolean;

  /**
   * Automatically discovers and creates integration tests for each `.integ.ts`
   * file in under your test directory.
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;

  /**
   * Enable experimental support for the AWS CDK integ-runner.
   *
   * @default false
   * @experimental
   */
  readonly experimentalIntegRunner?: boolean;

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
  public get cdkVersion() {
    return this.cdkDeps.cdkVersion;
  }

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
    // CDK default compiler options
    const cdkDefaultCompilerOptions: TypescriptConfigOptions["compilerOptions"] =
      {
        target: "ES2022",
        module: "NodeNext",
        moduleResolution: TypeScriptModuleResolution.NODE_NEXT,
        lib: ["es2022"],
        declaration: true,
        strict: true,
        noImplicitAny: true,
        strictNullChecks: true,
        noImplicitThis: true,
        alwaysStrict: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: false,
        inlineSourceMap: true,
        inlineSources: true,
        experimentalDecorators: true,
        strictPropertyInitialization: false,
        typeRoots: ["./node_modules/@types"],
      };

    let finalCompilerOptions = cdkDefaultCompilerOptions;
    if (options.tsconfig?.compilerOptions) {
      // Deep merge user's `compilerOptions` onto CDK-specific defaults.
      finalCompilerOptions = deepMerge(
        [cdkDefaultCompilerOptions, options.tsconfig.compilerOptions],
        { destructive: true }
      );
    }

    // CDK default exclude
    const cdkDefaultExclude = ["node_modules", "cdk.out"];
    let finalExclude = cdkDefaultExclude;
    if (options.tsconfig?.exclude) {
      // Merge and deduplicate user's `exclude` with CDK-specific defaults.
      finalExclude = [
        ...new Set([...cdkDefaultExclude, ...options.tsconfig.exclude]),
      ];
    }

    /**
     * The final `tsconfig` object passed to the superclass.
     * It incorporates AWS CDK defaults (derived from `cdkDefaultCompilerOptions` and `cdkDefaultExclude` above)
     * and any user-provided overrides. The aim is to align with the standard CDK `tsconfig.json`:
     * @see https://github.com/aws/aws-cdk-cli/blob/main/packages/aws-cdk/lib/init-templates/app/typescript/tsconfig.json
     */
    const tsconfigToSuper: TypescriptConfigOptions = {
      ...options.tsconfig, // Pass through any other top-level tsconfig options from user
      compilerOptions: finalCompilerOptions,
      exclude: finalExclude,
    };

    super({
      ...options,
      sampleCode: false,
      bundlerOptions: {
        ...options.bundlerOptions,
        // we invoke the "bundle" task as part of the build step in cdk.json so
        // we don't want it to be added to the pre-compile phase.
        runBundleTask: RunBundleTask.MANUAL,
      },
      tsconfig: tsconfigToSuper,
    });
    this.cdkDeps = new AwsCdkDepsJs(this, {
      dependencyType: DependencyType.RUNTIME,
      ...options,
    });
    this.appEntrypoint = options.appEntrypoint ?? "main.ts";

    // CLI
    this.addDevDeps(`aws-cdk@${this.cdkDeps.cdkCliVersion}`);

    // no compile step because we do all of it in typescript directly
    this.compileTask.reset();

    this.cdkTasks = new CdkTasks(this);

    // add synth to the build
    this.postCompileTask.spawn(this.cdkTasks.synthSilent);

    const tsConfigFile = this.tsconfig?.fileName;
    if (!tsConfigFile) {
      throw new Error("Expecting tsconfig.json");
    }

    this.cdkConfig = new CdkConfig(this, {
      featureFlags: options.featureFlags ?? this.cdkDeps.cdkMajorVersion < 2,
      cdkMajorVersion: this.cdkDeps.cdkMajorVersion,
      buildCommand: this.runTaskCommand(this.bundler.bundleTask),
      watchIncludes: [`${this.srcdir}/**/*.ts`, `${this.testdir}/**/*.ts`],
      watchExcludes: [
        "README.md",
        "cdk*.json",
        "**/*.d.ts",
        "**/*.js",
        "tsconfig.json",
        "package*.json",
        "yarn.lock",
        "node_modules",
      ],
      ...options,
      app: this.getCdkApp(options),
    });

    this.gitignore.exclude(".parcel-cache/");

    this.npmignore?.exclude(`${this.cdkConfig.cdkout}/`);
    this.npmignore?.exclude(".cdk.staging/");

    if (this.tsconfig) {
      this.tsconfig.exclude.push(this.cdkConfig.cdkout);
    }

    this.addDevDeps("ts-node");
    if (options.sampleCode ?? true) {
      new SampleCode(this, this.cdkDeps.cdkMajorVersion);
    }

    new AutoDiscover(this, {
      srcdir: this.srcdir,
      testdir: this.testdir,
      lambdaOptions: options.lambdaOptions,
      tsconfigPath: this.tsconfigDev.fileName,
      cdkDeps: this.cdkDeps,
      lambdaAutoDiscover: options.lambdaAutoDiscover ?? true,
      edgeLambdaAutoDiscover: options.edgeLambdaAutoDiscover ?? true,
      lambdaExtensionAutoDiscover: options.lambdaExtensionAutoDiscover ?? true,
      integrationTestAutoDiscover: options.integrationTestAutoDiscover ?? true,
    });

    if (options.experimentalIntegRunner) {
      new IntegRunner(this);
    }
  }

  /**
   * Adds an AWS CDK module dependencies
   * @param modules The list of modules to depend on
   */
  public addCdkDependency(...modules: string[]) {
    return this.cdkDeps.addV1Dependencies(...modules);
  }

  private getCdkApp(options: AwsCdkTypeScriptAppOptions): string {
    if (options.app && options.appEntrypoint) {
      throw new Error("Only one of 'app' or 'appEntrypoint' can be specified");
    }

    // prefer an explicitly provided app command
    if (options.app) {
      return options.app;
    }

    const appEntrypoint = path.posix.join(this.srcdir, this.appEntrypoint);

    const tsNodeConfig = this.tsconfig?.fileName
      ? ` -P ${this.tsconfig?.fileName}`
      : "";
    const tsNodeApp = `ts-node${tsNodeConfig} --prefer-ts-exts ${appEntrypoint}`;

    switch (this.package.packageManager) {
      case NodePackageManager.BUN:
        const bunTsConfig = this.tsconfig?.fileName
          ? ` --tsconfig-override=${this.tsconfig?.fileName}`
          : "";
        const bunEntrypoint = ensureRelativePathPrefix(appEntrypoint);

        // https://bun.sh/docs/cli/run
        // bun can run ts files directly
        return `bun run${bunTsConfig} ${bunEntrypoint}`;
      case NodePackageManager.PNPM:
      case NodePackageManager.YARN_CLASSIC:
      case NodePackageManager.YARN:
      case NodePackageManager.YARN_BERRY:
      case NodePackageManager.YARN2:
        // use npx with also for yarn & pnpm due to reported issues
        // @see https://github.com/projen/projen/issues/4180
        return `npx ${tsNodeApp}`;
      default:
        return `npx ${tsNodeApp}`;
    }
  }
}

/**
 * Ensures a path is properly prefixed with './' if it's a relative path
 * @param {string} filePath - The path to normalize
 * @returns {string} - The normalized path
 */
function ensureRelativePathPrefix(filePath: string) {
  // If it's already an absolute path, return as is
  if (path.isAbsolute(filePath)) {
    return filePath;
  }

  // If it already starts with ./ or ../, return as is
  if (filePath.startsWith("./") || filePath.startsWith("../")) {
    return filePath;
  }

  // Otherwise, add ./ prefix
  return `./${filePath}`;
}

class SampleCode extends Component {
  private readonly appProject: AwsCdkTypeScriptApp;

  constructor(
    project: AwsCdkTypeScriptApp,
    private readonly cdkMajorVersion: number
  ) {
    super(project);
    this.appProject = project;
  }

  public synthesize() {
    const outdir = this.project.outdir;
    const srcdir = path.join(outdir, this.appProject.srcdir);
    if (
      fs.existsSync(srcdir) &&
      fs.readdirSync(srcdir).filter((x) => x.endsWith(".ts"))
    ) {
      return;
    }

    const srcImports = new Array<string>();
    if (this.cdkMajorVersion < 2) {
      srcImports.push(
        "import { App, Construct, Stack, StackProps } from '@aws-cdk/core';"
      );
    } else {
      srcImports.push("import { App, Stack, StackProps } from 'aws-cdk-lib';");
      srcImports.push("import { Construct } from 'constructs';");
    }

    const srcCode = `${srcImports.join("\n")}

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

new MyStack(app, '${this.project.name}-dev', { env: devEnv });
// new MyStack(app, '${this.project.name}-prod', { env: prodEnv });

app.synth();`;

    fs.mkdirSync(srcdir, { recursive: true });
    fs.writeFileSync(path.join(srcdir, this.appProject.appEntrypoint), srcCode);

    const testdir = path.join(outdir, this.appProject.testdir);
    if (
      fs.existsSync(testdir) &&
      fs.readdirSync(testdir).filter((x) => x.endsWith(".ts"))
    ) {
      return;
    }

    const testImports = new Array<string>();
    if (this.cdkMajorVersion < 2) {
      testImports.push("import { App } from '@aws-cdk/core';");
      testImports.push("import { Template } from '@aws-cdk/assertions';");
    } else {
      testImports.push("import { App } from 'aws-cdk-lib';");
      testImports.push("import { Template } from 'aws-cdk-lib/assertions';");
    }

    const appEntrypointName = path.basename(
      this.appProject.appEntrypoint,
      ".ts"
    );
    const testCode = `${testImports.join("\n")}
import { MyStack } from '../${this.appProject.srcdir}/${appEntrypointName}';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});`;

    fs.mkdirSync(testdir, { recursive: true });
    fs.writeFileSync(
      path.join(testdir, `${appEntrypointName}.test.ts`),
      testCode
    );
  }
}
