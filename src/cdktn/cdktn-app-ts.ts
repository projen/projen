import * as fs from "node:fs";
import * as path from "node:path";
import { CdktnConfig } from "./cdktn-config";
import type { CdktnConfigCommonOptions } from "./cdktn-config";
import { CdktnDeps } from "./cdktn-deps";
import type { CdktnDepsCommonOptions } from "./cdktn-deps";
import { CdktnTasks } from "./cdktn-tasks";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import type { TypeScriptProjectOptions } from "../typescript";
import { TypeScriptAppProject } from "../typescript";
import { TypeScriptRunner } from "../typescript/typescript-runner";
import { dirContainsFile } from "../util/fs";

export interface CdktnTypeScriptAppOptions
  extends
    TypeScriptProjectOptions,
    CdktnDepsCommonOptions,
    CdktnConfigCommonOptions {
  /**
   * The CDKTN app's entrypoint (relative to the source directory, which is
   * "src" by default).
   *
   * @default "main.ts"
   */
  readonly appEntrypoint?: string;

  /**
   * The command line to execute in order to synthesize the CDKTN application
   * (language specific).
   */
  readonly app?: string;
}

/**
 * CDKTN app in TypeScript.
 *
 * CDKTN (CDK Terrain) is a community-driven fork of CDK for Terraform (CDKTF).
 * Learn more at https://cdktn.io/
 *
 * @pjid cdktn-app-ts
 */
export class CdktnTypeScriptApp extends TypeScriptAppProject {
  /**
   * The CDKTN app entrypoint.
   */
  public readonly appEntrypoint: string;

  /**
   * Common CDKTN tasks.
   */
  public readonly cdktnTasks: CdktnTasks;

  /**
   * cdktf.json configuration.
   */
  public readonly cdktnConfig: CdktnConfig;

  public readonly cdktnDeps: CdktnDeps;

  constructor(options: CdktnTypeScriptAppOptions) {
    super({
      ...options,
      // Default to native Node.js TypeScript runner with type transformation via amaro
      runner:
        options.runner ?? TypeScriptRunner.nodejs({ transformTypes: true }),
      sampleCode: false,
    });

    this.cdktnDeps = new CdktnDeps(this, {
      dependencyType: DependencyType.RUNTIME,
      ...options,
    });
    this.appEntrypoint = options.appEntrypoint ?? "main.ts";

    // no compile step because we do all of it in typescript directly
    this.compileTask.reset();

    this.cdktnTasks = new CdktnTasks(this);

    // call get command before build
    this.preCompileTask.spawn(this.cdktnTasks.get);

    // add synth to the build
    this.postCompileTask.spawn(this.cdktnTasks.synthSilent);

    this.cdktnConfig = new CdktnConfig(this, {
      terraformProviders: options.terraformProviders,
      terraformModules: options.terraformModules,
      context: options.context,
      cdktnOut: options.cdktnOut,
      projectId: options.projectId,
      sendCrashReports: options.sendCrashReports,
      app: this.getCdktnApp(options),
    });

    this.tsconfig?.addExclude(this.cdktnConfig.cdktnOut);

    this.gitignore.exclude(".terraform/");
    this.gitignore.exclude(".terraform.lock.hcl");
    this.gitignore.exclude("*.tfstate*");
    this.gitignore.exclude("*.tfvars*");

    this.npmignore?.exclude(`${this.cdktnConfig.cdktnOut}/`);
    this.npmignore?.exclude(".gen/");

    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }
  }

  private getCdktnApp(options: CdktnTypeScriptAppOptions): string {
    if (options.app && options.appEntrypoint) {
      throw new Error("Only one of 'app' or 'appEntrypoint' can be specified");
    }

    // prefer an explicitly provided app command
    if (options.app) {
      return options.app;
    }

    const appEntrypoint = path.posix.join(this.srcdir, this.appEntrypoint);

    // Use the project's runner to produce the app command
    const { dependencies, steps } = this.runner.configFor(appEntrypoint);

    // Register any runner dependencies
    for (const dep of dependencies) {
      this.deps.requestDependency(dep);
    }

    // Convert the last step's execArgs into a shell command string for cdktf.json
    const runStep = steps[steps.length - 1];
    if (runStep.execArgs) {
      return runStep.execArgs.join(" ");
    }

    // Fallback: direct node invocation
    return `node ${appEntrypoint}`;
  }
}

class SampleCode extends Component {
  private readonly appProject: CdktnTypeScriptApp;

  constructor(project: CdktnTypeScriptApp) {
    super(project);
    this.appProject = project;
  }

  public synthesize() {
    const outdir = this.project.outdir;
    const srcdir = path.join(outdir, this.appProject.srcdir);

    // Don't generate the sample app if the user already has TypeScript source
    // files in the source directory - we don't want to pollute something they
    // have worked on. We check recursively so that an existing entrypoint
    // located in a subdirectory (e.g. an `appEntrypoint` of "bin/main.ts") is
    // also detected. As an extra safeguard, never overwrite an existing
    // entrypoint file.
    const entrypointPath = path.join(srcdir, this.appProject.appEntrypoint);
    if (!dirContainsFile(srcdir, ".ts") && !fs.existsSync(entrypointPath)) {
      const srcCode = `import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktn';

export class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here...
  }
}

const app = new App();
new MyStack(app, '${this.project.name}');
app.synth();`;

      // create the entrypoint's directory (which may be a subdirectory of `srcdir`) before writing the file.
      fs.mkdirSync(path.dirname(entrypointPath), { recursive: true });
      fs.writeFileSync(entrypointPath, srcCode);
    }

    const testdir = path.join(outdir, this.appProject.testdir);
    const appEntrypointName = path.basename(
      this.appProject.appEntrypoint,
      ".ts",
    );
    const testPath = path.join(testdir, `${appEntrypointName}.test.ts`);

    // import path to the stack, preserving any subdirectory in the entrypoint
    // (e.g. "bin/main.ts" -> "../src/bin/main") and using posix separators.
    const entrypointImport = this.appProject.appEntrypoint
      .replace(/\.ts$/, "")
      .split(path.sep)
      .join(path.posix.sep);

    // Likewise, don't generate the sample test if the user already has
    // TypeScript files in the test directory, and never overwrite an existing
    // test file.
    if (!dirContainsFile(testdir, ".ts") && !fs.existsSync(testPath)) {
      const testCode = `import "cdktn/lib/testing/adapters/jest";
import { Testing } from 'cdktn';
import { MyStack } from '../${this.appProject.srcdir}/${entrypointImport}';

test('Snapshot', () => {
  const app = Testing.app();
  const stack = new MyStack(app, 'test');

  expect(Testing.synth(stack)).toMatchSnapshot();
});`;

      fs.mkdirSync(path.dirname(testPath), { recursive: true });
      fs.writeFileSync(testPath, testCode);
    }
  }
}
