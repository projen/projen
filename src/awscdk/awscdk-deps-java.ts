import { AwsCdkDeps, AwsCdkPackageNames } from './awscdk-deps';

/**
 * Manages dependencies on the AWS CDK for Java projects.
 */
export class AwsCdkDepsJava extends AwsCdkDeps {
  protected packageNames(): AwsCdkPackageNames {
    return {
      coreV1: 'software.amazon.awscdk/core',
      coreV2: 'software.amazon.awscdk/aws-cdk-lib',
      constructs: 'software.constructs/constructs',
      assertions: 'software.amazon.awscdk/assertions',
    };
  }
}