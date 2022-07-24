import { Cdk8sDeps, Cdk8sPackageNames } from "./cdk8s-deps";

export class Cdk8sDepsJs extends Cdk8sDeps {
  protected packageNames(): Cdk8sPackageNames {
    return {
      cdk8s: "cdk8s",
      cdk8sClient: "cdk8s-cli",
      constructs: "constructs",
      cdk8sPlus: "cdk8s-plus",
    };
  }
}
