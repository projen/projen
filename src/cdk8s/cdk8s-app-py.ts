import { Component, DependencyType, YamlFile, SampleFile } from "..";
import { Cdk8sDeps, Cdk8sDepsCommonOptions } from "./cdk8s-deps";
import { Cdk8sDepsPy } from "./cdk8s-deps-py";
import { PythonProject, PythonProjectOptions } from "../python/python-project";

/**
 * Options for `Cdk8sPythonApp`
 */
export interface Cdk8sPythonOptions
  extends PythonProjectOptions,
    Cdk8sDepsCommonOptions {
  /**
   * Import a specific Kubernetes spec version.
   *
   * @default - Use the cdk8s default
   */
  readonly k8sSpecVersion?: string;

  /**
   * Import additional specs
   *
   * @default - no additional specs imported
   */
  readonly cdk8sImports?: string[];

  /**
   * The CDK8s app's entrypoint
   *
   * @default "app.py"
   */
  readonly appEntrypoint?: string;
}

/**
 * CDK8s app in Python
 *
 *
 * @pjid cdk8s-app-py
 */
export class Cdk8sPythonApp extends PythonProject {
  /**
   * The CDK8s app entrypoint
   */
  public readonly appEntrypoint: string;

  public readonly cdk8sDeps: Cdk8sDeps;

  constructor(options: Cdk8sPythonOptions) {
    super({ ...options, pytest: false, sample: false });

    this.cdk8sDeps = new Cdk8sDepsPy(this, {
      dependencyType: DependencyType.RUNTIME,
      cdk8sCliDependency: false,
      ...options,
    });

    if (!options.cdk8sVersion) {
      throw new Error("Required field cdk8sVersion is not specified.");
    }

    this.appEntrypoint = options.appEntrypoint ?? "app.py";

    const synth = this.addTask("synth", {
      description: "Synthesizes your cdk8s app into dist",
      exec: "cdk8s synth",
    });

    // add synth to the build
    this.postCompileTask.spawn(synth);

    const cdk8sImports = options.cdk8sImports ?? [];
    const k8sSpec = options.k8sSpecVersion
      ? `k8s@${options.k8sSpecVersion}`
      : "k8s";

    new YamlFile(this, "cdk8s.yaml", {
      committed: true,
      editGitignore: true,
      obj: {
        language: "python",
        app: `python ${this.appEntrypoint}`,
        imports: [k8sSpec, ...cdk8sImports],
      },
    });

    if (options.sample ?? true) {
      new AppCode(this, this.appEntrypoint);
    }
  }
}

class AppCode extends Component {
  constructor(project: Cdk8sPythonApp, filename: string) {
    super(project);

    new SampleFile(project, filename, {
      contents: [
        "from constructs import Construct",
        "from cdk8s import App, Chart",
        "",
        "",
        "class MyChart(Chart):",
        "  def __init__(self, scope: Construct, id:str):",
        "    super().__init__(scope, id)",
        "",
        "",
        "app = App()",
        'MyChart(app, "${project.name}")',
        "",
        "app.synth()",
      ].join("\n"),
    });
  }
}
