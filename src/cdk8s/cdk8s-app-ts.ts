import * as path from "path";
import * as fs from "fs-extra";
import { Component } from "../component";
import { TypeScriptAppProject, TypeScriptProjectOptions } from "../typescript";
import { YamlFile } from "../yaml";
import { AutoDiscover } from "./auto-discover";

export interface Cdk8sTypeScriptAppOptions extends TypeScriptProjectOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.0.0-beta.10"
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
   * @default "3.2.34"
   */

  readonly constructsVersion?: string;

  /**
   * cdk8s-cli version
   *
   * @default "cdk8sVersion"
   */

  readonly cdk8sCliVersion?: string;

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
   * Use pinned version instead of caret version for CDK8s-cli.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sCliVersionPinning?: boolean;

  /**
   * Use pinned version instead of caret version for cdk8s-plus-17.
   *
   * You can use this to prevent yarn to mix versions for your CDK8s package and to prevent auto-updates.
   * If you use experimental features this will let you define the moment you include breaking changes.
   *
   * @default false
   */
  readonly cdk8sPlusVersionPinning?: boolean;

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
   * The CDK8s app's entrypoint (relative to the source directory, which is
   * "src" by default).
   *
   * @default "main.ts"
   */
  readonly appEntrypoint?: string;

  /**
   * Automatically adds an `cdk8s.IntegrationTest` for each `.integ.ts` app
   * in your test directory. If this is disabled, you can manually add an
   * `cdk8s.AutoDiscover` component to your project.
   *
   * @default true
   */
  readonly integrationTestAutoDiscover?: boolean;
}

/**
 * CDK8s app in TypeScript
 *
 *
 * @pjid cdk8s-app-ts
 */

export class Cdk8sTypeScriptApp extends TypeScriptAppProject {
  /**
   * The CDK8s version this app is using.
   */
  public readonly cdk8sVersion: string;

  /**
   * The constructs version this app is using.
   */
  public readonly constructsVersion: string;

  /**
   * The cdk8s-cli version this app is using.
   */

  public readonly cdk8sCliVersion: string;

  /**
   * The CDK8s app entrypoint
   */
  public readonly appEntrypoint: string;

  constructor(options: Cdk8sTypeScriptAppOptions) {
    super({
      ...options,
      sampleCode: false,
    });

    if (!options.cdk8sVersion) {
      throw new Error("Required field cdk8sVersion is not specified.");
    }

    // encode a hidden assumption further down the chain
    if (this.srcdir !== "src") {
      throw new Error('sources are expected under the "src" directory');
    }

    // encode a hidden assumption further down the chain
    if (this.testdir !== "test") {
      throw new Error('test sources are expected under the "test" directory');
    }

    this.appEntrypoint = options.appEntrypoint ?? "main.ts";

    this.cdk8sVersion = options.cdk8sVersionPinning
      ? options.cdk8sVersion
      : `^${options.cdk8sVersion}`;

    if (options.constructsVersion) {
      this.constructsVersion = options.constructsVersionPinning
        ? options.constructsVersion
        : `^${options.constructsVersion}`;
    } else {
      this.constructsVersion = "^3.2.34";
    }

    if (!!options.cdk8sCliVersion) {
      this.cdk8sCliVersion = options.cdk8sCliVersionPinning
        ? options.cdk8sCliVersion
        : `^${options.cdk8sCliVersion}`;
    } else {
      this.cdk8sCliVersion = this.cdk8sVersion;
    }

    // CLI
    this.addDeps(
      `cdk8s@${this.cdk8sVersion}`,
      `constructs@${this.constructsVersion}`
    );
    this.addDevDeps(
      "ts-node",
      `cdk8s-cli@${this.cdk8sCliVersion}`,
      `cdk8s@${this.cdk8sVersion}`,
      `constructs@${this.constructsVersion}`
    );

    const synth = this.addTask("synth", {
      description:
        'Synthesizes your cdk8s app into dist (part of "yarn build")',
      exec: "cdk8s synth",
    });

    this.addTask("import", {
      description: "Imports API objects to your app by generating constructs.",
      exec: "cdk8s import -o src/imports",
    });

    // add synth to the build
    this.postCompileTask.spawn(synth);

    const cdk8sImports = options.cdk8sImports ?? [];
    const k8sSpec = options.k8sSpecVersion
      ? `k8s@${options.k8sSpecVersion}`
      : "k8s";

    const appEntrypointBaseName = path.basename(this.appEntrypoint, ".ts");

    new YamlFile(this, "cdk8s.yaml", {
      committed: true,
      editGitignore: true,
      obj: {
        language: "typescript",
        app: `node lib/${appEntrypointBaseName}.js`,
        imports: [k8sSpec, ...cdk8sImports],
      },
    });

    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }

    new AutoDiscover(this, {
      testdir: this.testdir,
      tsconfigPath: this.tsconfigDev.fileName,
      integrationTestAutoDiscover: options.integrationTestAutoDiscover ?? true,
    });
  }
}

class SampleCode extends Component {
  private readonly appProject: Cdk8sTypeScriptApp;
  constructor(project: Cdk8sTypeScriptApp) {
    super(project);
    this.appProject = project;
  }

  public synthesize() {
    const outdir = this.project.outdir;
    const srcdir = path.join(outdir, this.appProject.srcdir);
    if (
      fs.pathExistsSync(srcdir) &&
      fs.readdirSync(srcdir).filter((x) => x.endsWith(".ts"))
    ) {
      return;
    }

    const srcCode = `import { Construct } from 'constructs';
import { App, Chart, ChartProps, ApiObject } from 'cdk8s';

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = { }) {
    super(scope, id, props);

    const label = { app: 'hello-k8s' };



    new ApiObject(this, 'deployment', {
      apiVersion: "v1",
      kind: "Pod",
      metadata: {
          namespace: "frontend",
          name: "nginx",
          labels: label,
      },
      spec: {
          containers: [{
              name: "nginx",
              image: "nginx:1.14-alpine",
              resources: {
                  limits: {
                      memory: "20Mi",
                      cpu: 0.2,
                  },
              },
          }],
      },
    });
  }
}

const app = new App();
new MyChart(app, 'hello');
app.synth();`;

    fs.mkdirpSync(srcdir);
    fs.writeFileSync(path.join(srcdir, this.appProject.appEntrypoint), srcCode);
  }
}
