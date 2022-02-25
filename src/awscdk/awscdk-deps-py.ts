import { AwsCdkDeps, AwsCdkPackageNames } from "./awscdk-deps";

/**
 * Manages dependencies on the AWS CDK for Python projects.
 */
export class AwsCdkDepsPy extends AwsCdkDeps {
  protected packageNames(): AwsCdkPackageNames {
    return {
      coreV1: "aws_cdk.core",
      coreV2: "aws-cdk-lib",
      constructs: "constructs",
      assert: "aws_cdk.assert",
      assertions: "aws_cdk.assertions",
    };
  }
}
