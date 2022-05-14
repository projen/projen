import { Project } from "../../src";
import { CdkConfig } from "../../src/awscdk/cdk-config";

describe("context values", () => {
  test("issue #1349", () => {
    new CdkConfig(new Project({ name: "my-project" }), {
      app: "foo",
      context: {
        "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport": true,
      },
    });

    new CdkConfig(new Project({ name: "my-project" }), {
      app: "foo",
      context: {
        "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport": "true",
      },
    });
  });
});
