import { join } from "path";
import { DependencyType, SampleDir } from "..";
import { AwsCdkDeps, AwsCdkDepsCommonOptions } from "./awscdk-deps";
import { AwsCdkDepsJava } from "./awscdk-deps-java";
import { CdkConfig, CdkConfigCommonOptions } from "./cdk-config";
import { CdkTasks } from "./cdk-tasks";
import { JavaProject, JavaProjectOptions } from "../java";

export interface AwsCdkJavaAppOptions
  extends JavaProjectOptions,
    CdkConfigCommonOptions,
    AwsCdkDepsCommonOptions {
  /**
   * The name of the Java class with the static `main()` method. This method
   * should call `app.synth()` on the CDK app.
   *
   * @default "org.acme.MyApp"
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
   * The `cdk.json` file.
   */
  public readonly cdkConfig: CdkConfig;

  /**
   * CDK dependency management helper class
   */
  public readonly cdkDeps: AwsCdkDeps;

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
    const mainClassComponents = options.mainClass.split(".");
    const mainPackage = mainClassComponents.slice(0, -1);
    const mainClassName = mainClassComponents[mainClassComponents.length - 1];

    super({
      ...options,
      sample: false,
      sampleJavaPackage: mainPackage.join("."),
    });

    this.mainClass = options.mainClass;
    this.mainPackage = mainPackage.join(".");
    this.mainClassName = mainClassName;

    this.cdkDeps = new AwsCdkDepsJava(this, {
      dependencyType: DependencyType.RUNTIME,
      ...options,
    });

    this.cdkTasks = new CdkTasks(this);
    this.postCompileTask.spawn(this.cdkTasks.synth);

    this.cdkConfig = new CdkConfig(this, {
      app: `mvn exec:java --quiet -Dexec.mainClass=${this.mainClass}`,
      ...options,
    });

    if (options.sample ?? true) {
      this.addSample();
    }
  }

  /**
   * Adds an AWS CDK module dependencies
   *
   * @param modules The list of modules to depend on (e.g. "software.amazon.awscdk/aws-lambda", "software.amazon.awscdk/aws-iam", etc)
   * @deprecated In CDK 2.x all modules are available by default. Alpha modules should be added using the standard 'deps'
   */
  public addCdkDependency(...modules: string[]) {
    for (const m of modules) {
      this.cdkDeps.addV1Dependencies(m);
    }
  }

  private addSample() {
    const pkg = this.mainPackage.split(".");
    const javaFile = `${this.mainClassName}.java`;
    new SampleDir(this, join("src", "main", "java", ...pkg), {
      files: {
        [javaFile]: [
          `package ${pkg.join(".")};`,
          "",
          this.cdkDeps.cdkMajorVersion == 1
            ? "import software.amazon.awscdk.core.App;"
            : "import software.amazon.awscdk.App;",
          this.cdkDeps.cdkMajorVersion == 1
            ? "import software.amazon.awscdk.core.Stack;"
            : "import software.amazon.awscdk.Stack;",
          "",
          `public class ${this.mainClassName} {`,
          "  public static void main(final String[] args) {",
          "    App app = new App();",
          `    new Stack(app, "${this.name}");`,
          "    app.synth();",
          "  }",
          "}",
        ].join("\n"),
      },
    });
  }
}
