import { join } from "path";
import { writeFileSync } from "fs-extra";
import { CdkConfigCommonOptions } from ".";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { PythonProject, PythonProjectOptions } from "../python";
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from "./awscdk-deps";
import { AwsCdkDepsPy } from "./awscdk-deps-py";
import { CdkConfig } from "./cdk-config";
import { CdkTasks } from "./cdk-tasks";

/**
// no projen
yarn
yarn build && yarn bump --release-as 0.51.0
yarn link

// no final
yarn unlink

// no projeto de teste
mkdir marcio
cd marcio
npm init
yarn link projen
alias pj="node_modules/projen/bin/projen"
// alias pj="/home/marcio/marciocadev/dev/projen/bin/projen"
pj new awscdk-app-py
yarn link projen
*/

export interface AwsCdkPythonAppOptions
  extends PythonProjectOptions,
    CdkConfigCommonOptions,
    AwsCdkDepsCommonOptions {
  /**
   * The CDK app's entrypoint (relative to the source directory, which is
   * "src" by default).
   *
   * @default "app.py"
   */
  readonly appEntrypoint?: string;
}

/**
 * AWS CDK app in Python
 *
 * @pjid awscdk-app-py
 */
export class AwsCdkPythonApp extends PythonProject {
  /**
   * Common CDK tasks.
   */
  public readonly cdkTasks: CdkTasks;

  /**
   * cdk.json configuration.
   */
  public readonly cdkConfig: CdkConfig;

  public readonly cdkDeps: AwsCdkDeps;

  /**
   * The CDK app entrypoint
   */
  public readonly appEntrypoint: string;

  /**
   * The CDK version this app is using.
   */
  public get cdkVersion() {
    return this.cdkDeps.cdkVersion;
  }

  constructor(options: AwsCdkPythonAppOptions) {
    super({
      ...options,
      sample: false,
    });

    this.cdkDeps = new AwsCdkDepsPy(this, {
      dependencyType: DependencyType.RUNTIME,
      ...options,
    });
    this.appEntrypoint = options.appEntrypoint ?? "app.py";

    // CLI
    //this.addDevDependency(`aws-cdk==${this.cdkDeps.cdkVersion}`);

    // no compile step because we do all of it in typescript directly
    this.compileTask.reset();

    this.cdkTasks = new CdkTasks(this);

    // add synth to the build
    this.postCompileTask.spawn(this.cdkTasks.synthSilent);

    this.cdkConfig = new CdkConfig(this, {
      app: `python ${this.appEntrypoint}`,
      featureFlags: this.cdkDeps.cdkMajorVersion < 2,
      ...options,
    });

    if (options.sample ?? true) {
      new SampleCode(this, this.cdkDeps.cdkMajorVersion);
    }
  }
}

class SampleCode extends Component {
  private readonly appProject: AwsCdkPythonApp;

  constructor(
    project: AwsCdkPythonApp,
    private readonly cdkMajorVersion: number
  ) {
    super(project);
    this.appProject = project;
  }

  public synthesize(): void {
    const srcImports = new Array<string>();
    if (this.cdkMajorVersion < 2) {
      srcImports.push("#!/usr/bin/env python3");
      srcImports.push("import os");
    } else {
      srcImports.push("#!/usr/bin/env python3");
      srcImports.push("import os");
      srcImports.push("from aws_cdk import Stack, App, Environment");
      srcImports.push("from constructs import Construct");
    }

    const srcCode = `${srcImports.join("\n")}

class MyStack(Stack):

  def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
    super().__init__(scope, construct_id, **kwargs)

    # The code that defines your stack goes here

environment = Environment(account=os.getenv('CDK_DEFAULT_ACCOUNT'), region=os.getenv('CDK_DEFAULT_REGION'))
app = App()
MyStack(app, "MyStack", env=environment)
app.synth()
    `;

    writeFileSync(join("./", this.appProject.appEntrypoint), srcCode);
  }
}
