import { AwsCdkDeps, AwsCdkPackageNames } from './awscdk-deps';

/**
 * Manages dependencies on the AWS CDK for Node.js projects.
 */
export class AwsCdkDepsJs extends AwsCdkDeps {
  protected packageNames(): AwsCdkPackageNames {
    return {
      coreV1: '@aws-cdk/core',
      coreV2: 'aws-cdk-lib',
      constructs: 'constructs',
      assert: '@aws-cdk/assert',
      assertions: '@aws-cdk/assertions',
    };
  }
}