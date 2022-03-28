import { Component } from "../component";
import { PythonProject, PythonProjectOptions } from "../python";
import { SourceCode } from "../source-code";
import { YamlFile } from "../yaml";

export interface Cdk8sPythonOptions extends PythonProjectOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.5.53"
   * @featured
   */
  readonly cdk8sVersion: string;

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
   * constructs verion
   *
   * @default "3.3.251"
   */
  readonly constructsVersion?: string;

  /**
   * Use pinned version instead of caret version for CDK8s.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sVersionPinning?: boolean;

  /**
   * Use pinned version instead of caret version for constructs.
   *
   * You can use this to prevent yarn to mix versions for your consructs package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly constructsVersionPinning?: boolean;

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
   * The CDK8s version this app is using.
   */
  public readonly cdk8sVersion: string;

  /**
   * The constructs version this app is using.
   */
  public readonly constructsVersion: string;

  /**
   * The CDK8s app entrypoint
   */
  public readonly appEntrypoint: string;

  constructor(options: Cdk8sPythonOptions) {
    super({ ...options, pytest: false, sample: false });

    if (!options.cdk8sVersion) {
      throw new Error("Required field cdk8sVersion is not specified.");
    }

    this.appEntrypoint = options.appEntrypoint ?? "app.py";

    this.cdk8sVersion = options.cdk8sVersionPinning
      ? options.cdk8sVersion
      : `^${options.cdk8sVersion}`;

    if (options.constructsVersion) {
      this.constructsVersion = options.constructsVersionPinning
        ? options.constructsVersion
        : `^${options.constructsVersion}`;
    } else {
      this.constructsVersion = "^3.3.251";
    }

    this.addDependency(`cdk8s@${this.cdk8sVersion}`);
    this.addDependency(`constructs@${this.constructsVersion}`);

    this.addDevDependency(`cdk8s@${this.cdk8sVersion}`);
    this.addDevDependency(`constructs@${this.constructsVersion}`);

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

    const src = new SourceCode(project, filename, {
      readonly: false,
    });

    src.line("from constructs import Construct");
    src.line("from cdk8s import App, Chart");
    src.line("");
    src.line("");
    src.open("class MyChart(Chart):");
    src.open("def __init__(self, scope: Construct, id:str):");
    src.line("super().__init__(scope, id)");
    src.line("");
    src.line("# define resources here");
    src.close("");
    src.close("");
    src.line("");
    src.line("");
    src.line("app = App()");
    src.line(`MyChart(app, "${project.name}")`);
    src.line("");
    src.line("app.synth()");
    src.line("");
  }
}
