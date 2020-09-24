import { Component } from './component';
import { JsonFile } from './json';
import { Semver } from './semver';
import { TypeScriptAppProject, TypeScriptProjectOptions } from './typescript';
import * as fs from 'fs-extra';
import * as path from 'path';
import { StartEntryCategory } from './start';

export interface AwsCdkTypeScriptAppOptions extends TypeScriptProjectOptions {
  /**
   * AWS CDK version to use.
   *
   * @default 1.63.0
   */
  readonly cdkVersion: string;

  /**
   * Which AWS CDK modules (those that start with "@aws-cdk/") this app uses.
   */
  readonly cdkDependencies?: string[];

  /**
   * Additional context to include in `cdk.json`.
   */
  readonly context?: { [key: string]: string };
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
  public readonly cdkVersion: Semver;

  /**
   * Contents of `cdk.json`.
   */
  public readonly cdkConfig: any;

  constructor(options: AwsCdkTypeScriptAppOptions) {
    super({
      ...options,
      sampleCode: false,
    });

    this.cdkVersion = Semver.caret(options.cdkVersion);

    // CLI
    this.addDevDependencies({ 'aws-cdk': this.cdkVersion });

    this.addCdkDependency('@aws-cdk/assert');
    this.addCdkDependency('@aws-cdk/core');
    this.addCdkDependency(...options.cdkDependencies ?? []);

    this.addScript('synth', 'cdk synth');
    this.addScript('cdk', 'cdk');
    this.addScript('deploy', 'cdk deploy');
    this.addCompileCommand('yarn synth'); // synth after compile

    this.start?.addEntry('synth', {
      desc: 'Synthesizes your cdk app into cdk.out (part of "yarn build")',
      category: StartEntryCategory.BUILD,
    });

    this.start?.addEntry('deploy', {
      desc: 'Deploys your cdk app to the AWS cloud',
      category: StartEntryCategory.RELEASE,
    });

    this.cdkConfig = {
      app: `node ${this.entrypoint}`,
    };

    new JsonFile(this, 'cdk.json', {
      obj: this.cdkConfig,
    });

    if (options.sampleCode ?? true) {
      new SampleCode(this);
    }
  }

  /**
   * Adds an AWS CDK module dependencies
   * @param modules The list of modules to depend on
   */
  public addCdkDependency(...modules: string[]) {
    for (const m of modules) {
      // since synthesis runs at build time, CDK dependencies should be dev-dependencies
      this.addDependencies({ [m]: this.cdkVersion });
    }
  }
}

class SampleCode extends Component {
  private readonly nodeProject: AwsCdkTypeScriptApp;
  constructor(project: AwsCdkTypeScriptApp) {
    super(project);
    this.nodeProject = project;
  }

  public synthesize(outdir: string) {
    const srcdir = path.join(outdir, this.nodeProject.srcdir);
    if (fs.pathExistsSync(srcdir) && fs.readdirSync(srcdir).filter(x => x.endsWith('.ts'))) {
      return;
    }

    const srcCode = `import { App, Construct, Stack, StackProps } from '@aws-cdk/core';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

const app = new App();
new MyStack(app, 'my-stack');
app.synth();`;

    fs.mkdirpSync(srcdir);
    fs.writeFileSync(path.join(srcdir, 'main.ts'), srcCode);

    const testdir = path.join(outdir, this.nodeProject.testdir);
    if (fs.pathExistsSync(testdir) && fs.readdirSync(testdir).filter(x => x.endsWith('.ts'))) {
      return;
    }

    const testCode = `import '@aws-cdk/assert/jest';
import { MyStack } from '../src/main'
import { App } from '@aws-cdk/core';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  expect(stack).not.toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});`;

    fs.mkdirpSync(testdir);
    fs.writeFileSync(path.join(testdir, 'app.test.ts'), testCode);
  }
}