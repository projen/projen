import { Construct, IConstruct } from "constructs";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Pytest, PythonProject, PythonProjectOptions } from "../python";
import { SampleDir } from "../sample-file";
import { SourceCode } from "../source-code";
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from "./awscdk-deps";
import { AwsCdkDepsPy } from "./awscdk-deps-py";
import { AwsCdkPytestSample } from "./awscdk-pytest-sample";
import { CdkConfig, CdkConfigCommonOptions } from "./cdk-config";
import { CdkTasks } from "./cdk-tasks";

/**
 * Options for `AwsCdkPythonApp`
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
  /**
   * Python sources directory.
   *
   * @default "tests"
   */
  readonly testdir?: string;
}

/**
 * AWS CDK app in Python
 *
 * @pjid awscdk-app-py
 */
export class AwsCdkPythonApp extends PythonProject {
  /**
   * Returns the immediate AwsCdkPythonApp a construct belongs to.
   * @param construct the construct
   */
  public static ofAwsCdkPythonApp(construct: IConstruct): AwsCdkPythonApp {
    if (construct instanceof AwsCdkPythonApp) {
      return construct;
    }

    const parent = construct.node.scope as Construct;
    if (!parent) {
      throw new Error(
        "cannot find a parent AwsCdkPythonApp (directly or indirectly)"
      );
    }

    return AwsCdkPythonApp.ofAwsCdkPythonApp(parent);
  }
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
   * The directory in which the python tests reside.
   */
  public readonly testdir: string;

  /**
   * The CDK version this app is using.
   */
  public get cdkVersion() {
    return this.cdkDeps.cdkVersion;
  }

  constructor(options: AwsCdkPythonAppOptions) {
    super({ ...options, pytest: false, sample: false });

    this.cdkDeps = new AwsCdkDepsPy(this, {
      dependencyType: DependencyType.RUNTIME,
      ...options,
    });
    this.appEntrypoint = options.appEntrypoint ?? "app.py";
    this.testdir = options.testdir ?? "tests";

    this.cdkTasks = new CdkTasks(this);
    this.postCompileTask.spawn(this.cdkTasks.synthSilent);

    this.cdkConfig = new CdkConfig(this, {
      app: `python ${this.appEntrypoint}`,
      featureFlags: this.cdkDeps.cdkMajorVersion < 2,
      watchIncludes: ["**"],
      watchExcludes: [
        "README.md",
        "cdk*.json",
        "requirements*.txt",
        "source.bat",
        "**/__init__.py",
        "python/__pycache__",
        "tests",
      ],
      ...options,
    });

    const sample = options.sample ?? true;
    const pytest = options.pytest ?? true;

    if (sample) {
      new AppCode(this, "app.py", this.cdkDeps.cdkMajorVersion);
      new MyStackCode(this, this.moduleName, this.cdkDeps.cdkMajorVersion);
    }

    if (pytest) {
      this.pytest = new Pytest(this, options.pytestOptions);
      if (sample) {
        new AwsCdkPytestSample(this, this.pytest.testdir);
      }
    }
  }
}

class AppCode extends Component {
  constructor(scope: Construct, fileName: string, cdkVersion: number) {
    super(scope, "AppCode");

    const project = AwsCdkPythonApp.ofAwsCdkPythonApp(this);

    const src = new SourceCode(this, fileName);

    src.line("import os");
    if (cdkVersion < 2) {
      src.line("from aws_cdk.core import App, Environment");
    } else {
      src.line("from aws_cdk import App, Environment");
    }
    src.line(`from ${project.moduleName}.my_stack import MyStack`);
    src.line("");
    src.line("# for development, use account/region from cdk cli");
    src.open("dev_env = Environment(");
    src.line("account=os.getenv('CDK_DEFAULT_ACCOUNT'),");
    src.line("region=os.getenv('CDK_DEFAULT_REGION'),");
    src.close(")");
    src.line("");
    src.line("app = App()");
    src.line('MyStack(app, "my-stack-dev", env=dev_env)');
    src.line('# MyStack(app, "my-stack-prod", env=prod_env)');
    src.line("");
    src.line("app.synth()");
  }
}

class MyStackCode extends Component {
  constructor(scope: Construct, sampleFile: string, cdkMajorVersion: number) {
    super(scope, "MyStackCode");

    let appFile: string[] = [];
    appFile.push("import os");
    if (cdkMajorVersion < 2) {
      appFile.push("from aws_cdk.core import Construct, Stack");
    } else {
      appFile.push("from aws_cdk import Stack");
      appFile.push("from constructs import Construct");
    }
    appFile.push("");
    appFile.push("");
    appFile.push("class MyStack(Stack):");
    appFile.push("");
    appFile.push(
      "  def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:"
    );
    appFile.push("    super().__init__(scope, construct_id, **kwargs)");
    appFile.push("");
    appFile.push("    # The code that defines your stack goes here");
    appFile.push("");

    new SampleDir(this, sampleFile, {
      files: {
        "__init__.py": "",
        "my_stack.py": appFile.join("\n"),
      },
    });
  }
}
