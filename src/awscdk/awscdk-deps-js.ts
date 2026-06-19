import type { AwsCdkPackageNames } from "./awscdk-deps";
import { AwsCdkDeps } from "./awscdk-deps";

/**
 * Manages dependencies on the AWS CDK for Node.js projects.
 */
export class AwsCdkDepsJs extends AwsCdkDeps {
  protected packageNames(): AwsCdkPackageNames {
    return {
      coreV2: "aws-cdk-lib",
      constructs: "constructs",
    };
  }
}
