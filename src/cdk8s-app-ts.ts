
import * as path from 'path';
import * as fs from 'fs-extra';
import { Component } from './component';
import { TaskCategory } from './tasks';
import { TypeScriptAppProject, TypeScriptProjectOptions } from './typescript';

export interface Cdk8sTypeScriptAppOptions extends TypeScriptProjectOptions {
  /**
   * Minimum target version this library is tested against.
   *
   * @default "1.0.0-beta.10"
   * @featured
   */
  readonly cdk8sVersion: string;

  /**
   * constructs verion
   *
   * @default "3.2.34"
   */

  readonly constructsVersion?: string;

  /**
   * cdk8s-plus-17 version
   *
   * @default "cdk8sVersion"
   */

  readonly cdk8sPlusVersion?: string;

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
   * The cdk8s-plus-17 version this app is using.
   */

  public readonly cdk8sPlusVersion: string;

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

    // encode a hidden assumption further down the chain
    if (this.srcdir !== 'src') {
      throw new Error('sources are expected under the "src" directory');
    }

    // encode a hidden assumption further down the chain
    if (this.testdir !== 'test') {
      throw new Error('test sources are expected under the "test" directory');
    }

    this.appEntrypoint = options.appEntrypoint ?? 'main.ts';

    this.cdk8sVersion = options.cdk8sVersionPinning ? options.cdk8sVersion : `^${options.cdk8sVersion}`;

    if (!! options.cdk8sPlusVersion) {
      this.cdk8sPlusVersion = options.cdk8sPlusVersionPinning ? options.cdk8sPlusVersion : `^${options.cdk8sPlusVersion}`;
    } else {
      this.cdk8sPlusVersion = this.cdk8sVersion;
    }

    if (options.constructsVersion) {
      this.constructsVersion = options.constructsVersionPinning ? options.constructsVersion: `^${options.constructsVersion}`;
    } else {
      this.constructsVersion = '^3.2.34';
    }

    if (!! options.cdk8sCliVersion) {
      this.cdk8sCliVersion = options.cdk8sCliVersionPinning ? options.cdk8sCliVersion: `^${options.cdk8sCliVersion}`;
    } else {
      this.cdk8sCliVersion = this.cdk8sVersion;
    }


    // CLI
    this.addDeps(
      `cdk8s@${this.cdk8sVersion}`,
      `constructs@${this.constructsVersion}`,
      `cdk8s-plus-17@${this.cdk8sPlusVersion}`,
    );
    this.addDevDeps(
      'ts-node@^9',
      `cdk8s-cli@${this.cdk8sCliVersion}`,
      `cdk8s@${this.cdk8sVersion}`,
      `constructs@${this.constructsVersion}`,
      `cdk8s-plus-17@${this.cdk8sPlusVersion}`,
    );

    const synth = this.addTask('synth', {
      description: 'Synthesizes your cdk8s app into dist (part of "yarn build")',
      category: TaskCategory.BUILD,
      exec: 'cdk8s synth',
    });

    this.addTask('import', {
      description: 'Imports API objects to your app by generating constructs.',
      category: TaskCategory.MISC,
      exec: 'cdk8s import',
    });

    this.gitignore.include('imports/');
    this.gitignore.include('cdk8s.yaml');

    // add synth to the build
    this.buildTask.spawn(synth);

    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }

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
    if (fs.pathExistsSync(srcdir) && fs.readdirSync(srcdir).filter(x => x.endsWith('.ts'))) {
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

    const appEntrypointName = path.basename(this.appProject.appEntrypoint, '.ts');

    const cdk8sYaml = `language: typescript
app: node lib/${appEntrypointName}.js
imports:
  - k8s
    `;

    fs.writeFileSync(path.join(outdir, 'cdk8s.yaml'), cdk8sYaml);

  }
}