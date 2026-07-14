import type { AwsCdkPackageNames } from "./awscdk-deps";
import { AwsCdkDeps } from "./awscdk-deps";

/**
 * Manages dependencies on the AWS CDK for Java projects.
 */
export class AwsCdkDepsJava extends AwsCdkDeps {
  protected packageNames(): AwsCdkPackageNames {
    return {
      coreV2: "software.amazon.awscdk/aws-cdk-lib",
      constructs: "software.constructs/constructs",
    };
  }
}
