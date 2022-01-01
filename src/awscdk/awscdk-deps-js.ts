import { Project } from '../project';
import { AwsCdkDeps, AwsCdkDepsOptions } from './awscdk-deps';

/**
 * Manages dependencies on the AWS CDK for Node.js projects.
 */
export class AwsCdkDepsJs extends AwsCdkDeps {
  constructor(project: Project, options: AwsCdkDepsOptions) {
    super(project, options, {
      frameworkV1Package: '@aws-cdk/core',
      frameworkV2Package: 'aws-cdk-lib',
      constructsPackage: 'constructs',
      assertPackage: '@aws-cdk/assert',
      assertionsPackage: '@aws-cdk/assertions',
    });
  }
}