import { GithubAspect } from '../github-aspect';
import { GithubWorkflow } from '../github-workflow';
import { Project } from '../project';

/**
 * GitHub secret names which include AWS credentials.
 */
export interface AwsCredentialsSecrets {

  /**
   * @default "AWS_ACCESS_KEY_ID"
   */
  readonly accessKeyId?: string;

  /**
   * @default "AWS_SECRET_ACCESS_KEY"
   */
  readonly secretAccessKey?: string;
}

export interface AwsCdkDeployWorkflowProps {
  /**
   * Directory relative to the root of th repo with a cloud assembly to deploy.
   * @default "./cdk.out"
   */
  readonly cxdir: string;

  /**
   * The region to deploy to.
   */
  readonly region: string;

  /**
   * GitHub secret names with AWS credentials.
   * @default - defaults
   */
  readonly creds?: AwsCredentialsSecrets;
}

/**
 * A workflow for deploying AWS CDK applications.
 */
export class AwsCdkDeployWorkflow extends GithubWorkflow {
  constructor(project: Project, name: string, props: AwsCdkDeployWorkflowProps) {
    super(project, `awscdk-${name}`);

    // if this project is on github
    const github = GithubAspect.of(project);
    if (!github) {
      throw new Error('AwsCdkWorkflow is only supported on GitHub at the moment');
    }

    const accessKeyIdSecret = props.creds?.accessKeyId ?? 'AWS_ACCESS_KEY_ID';
    const secretAccessKeySecret = props.creds?.secretAccessKey ?? 'AWS_SECRET_ACCESS_KEY';

    this.addJobs({
      Deploy: {
        'name': name,
        'runs-on': 'ubuntu-latest',
        'steps': [
          ...github.workflowBootstrapSteps,
          {
            name: 'Login to AWS',
            uses: 'aws-actions/configure-aws-credentials@v1',
            with: {
              'aws-access-key-id': `$\{{ secrets.${accessKeyIdSecret} }}`,
              'aws-secret-access-key': `\${{ secrets.${secretAccessKeySecret} }}`,
              'region': props.region,
            },
          },
          {
            name: 'Deploy',
            run: `npx cdk deploy --require-approval=never ${props.cxdir}`,
          },
        ],
      },
    });
  }
}