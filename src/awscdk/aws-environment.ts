import * as path from 'path';
import { App, Stack } from '@aws-cdk/core';
import { copySync, mkdirpSync } from 'fs-extra';
import { GithubAspect } from '../github-aspect';
import { Project } from '../project';
import { ProjectConstruct } from '../project-construct';
import { AwsCdkDeployWorkflow, AwsCredentialsSecrets } from './awscdk-workflow';

const OUTDIR_BASE = '.awscdk';

export interface AwsEnvironmentProps {
  /**
   * The AWS environment in format `aws://ACCOUNT/REGION`.
   */
  readonly env: string;

  /**
   * Secret names for AWS credentials.
   * @default - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
   */
  readonly creds?: AwsCredentialsSecrets;
}

/**
 * Represents an AWS environment (account/region).
 */
export class AwsEnvironment extends ProjectConstruct {
  public readonly env: string;

  public readonly stack: Stack;
  private readonly app: App;

  public readonly outdir: string;

  constructor(project: Project, props: AwsEnvironmentProps) {
    super(project, props.env);
    this.env = props.env;

    this.app = new App({
      stackTraces: false,
      autoSynth: false,
    });

    this.stack = new Stack(this.app, project.name, {
      env: parseEnv(props.env),
    });

    this.outdir = path.join(OUTDIR_BASE, `${this.stack.account}/${this.stack.region}`);
    project.gitignore.include(this.outdir);

    // if this project is on github
    const github = GithubAspect.of(project);
    if (github) {
      new AwsCdkDeployWorkflow(project, this.env, {
        cxdir: this.outdir,
        region: this.region,
        creds: props.creds,
      });
    }
  }

  public get account() {
    return this.stack.account;
  }

  public get region() {
    return this.stack.region;
  }

  /**
   * Synthesizes files to the project output directory.
   * @param projectdir The project directory
   */
  public synthesize(projectdir: string) {
    this.app.synth();

    const cdkout = path.resolve(projectdir, this.outdir);
    mkdirpSync(cdkout);
    copySync(this.app.outdir, cdkout);
  }
}

function parseEnv(env: string) {
  // aws://1111/region
  const [,, account, region] = env.split('/');
  return { account, region };
}