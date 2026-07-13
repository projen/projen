import type { AwsCdkPackageNames } from "./awscdk-deps";
import { AwsCdkDeps } from "./awscdk-deps";

/**
 * Manages dependencies on the AWS CDK for Python projects.
 */
export class AwsCdkDepsPy extends AwsCdkDeps {
  protected packageNames(): AwsCdkPackageNames {
    return {
      coreV2: "aws-cdk-lib",
      constructs: "constructs",
    };
  }
}
