import * as fs from "fs";
import * as path from "path";
import { AutoDiscover } from "./auto-discover";
import { Cdk8sDeps, Cdk8sDepsCommonOptions } from "./cdk8s-deps";
import { Cdk8sDepsJs } from "./cdk8s-deps-js";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { TypeScriptAppProject, TypeScriptProjectOptions } from "../typescript";
import { YamlFile } from "../yaml";

export interface Cdk8sTypeScriptAppOptions
  extends TypeScriptProjectOptions, Cdk8sDepsCommonOptions {
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
   * The CDK8s app entrypoint
   */
  public readonly appEntrypoint: string;

  public readonly cdk8sDeps: Cdk8sDeps;

  constructor(options: Cdk8sTypeScriptAppOptions) {
    super({
      ...options,
      sampleCode: false,
    });

    this.cdk8sDeps = new Cdk8sDepsJs(this, {
      dependencyType: DependencyType.RUNTIME,
      cdk8sCliDependency: true,
      ...options,
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
      fs.existsSync(srcdir) &&
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

    fs.mkdirSync(srcdir, { recursive: true });
    fs.writeFileSync(path.join(srcdir, this.appProject.appEntrypoint), srcCode);
  }
}
