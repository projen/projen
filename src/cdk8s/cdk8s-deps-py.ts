import type { Cdk8sPackageNames } from "./cdk8s-deps";
import { Cdk8sDeps } from "./cdk8s-deps";

export class Cdk8sDepsPy extends Cdk8sDeps {
  protected packageNames(): Cdk8sPackageNames {
    return {
      cdk8s: "cdk8s",
      constructs: "constructs",
      cdk8sPlus: "cdk8s-plus",
    };
  }
}
