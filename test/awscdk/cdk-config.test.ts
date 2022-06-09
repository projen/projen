import { CdkConfig } from "../../src/awscdk/cdk-config";
import { TestProject } from "../util";

describe("context values", () => {
  test("issue #1349", () => {
    new CdkConfig(new TestProject(), {
      app: "foo",
      context: {
        "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport": true,
      },
    });

    new CdkConfig(new TestProject(), {
      app: "foo",
      context: {
        "@aws-cdk/aws-ecr-assets:dockerIgnoreSupport": "true",
      },
    });
  });
});

describe("includes", () => {
  test("should retain their initialized value", () => {
    const defaultIncludes = ["src/**/*.ts", "test/**/*.ts"];
    const config = new CdkConfig(new TestProject(), {
      app: "test includes",
      watchIncludes: defaultIncludes,
    });

    // @ts-ignore test values are being set properly
    expect(config.include).toEqual(defaultIncludes);
  });

  test("should contain updated values when `addIncludes` is called", () => {
    const defaultIncludes = ["src/**/*.ts", "test/**/*.ts"];
    const newInclude = "custom/**/*.ts";
    const config = new CdkConfig(new TestProject(), {
      app: "test includes",
      watchIncludes: defaultIncludes,
    });

    config.addIncludes(newInclude);

    // @ts-ignore test values are being set properly
    expect(config.include).toContain(newInclude);
    // @ts-ignore test values are being set properly
    expect(config.include).toContain(defaultIncludes[0]);
  });

  test("should accept multiple values on `addIncludes`", () => {
    const newIncludes = ["value-one.ts", "value-two.ts"];
    const config = new CdkConfig(new TestProject(), {
      app: "test includes multi value",
    });

    config.addIncludes(...newIncludes);

    // @ts-ignore test values being set correctly
    expect(config.include).toEqual(newIncludes);
  });
});

describe("excludes", () => {
  test("should retain their initialized value", () => {
    const defaultExcludes = ["README.md"];
    const config = new CdkConfig(new TestProject(), {
      app: "test excludes",
      watchExcludes: defaultExcludes,
    });

    // @ts-ignore test values are being set properly
    expect(config.exclude).toEqual(defaultExcludes);
  });

  test("should contain updated values when `addExcludes` is called", () => {
    const defaultExcludes = ["README.md"];
    const newExclude = "node_modules";
    const config = new CdkConfig(new TestProject(), {
      app: "test excludes",
      watchExcludes: defaultExcludes,
    });

    config.addExcludes(newExclude);

    // @ts-ignore test values are being set properly
    expect(config.exclude).toContain(newExclude);
    // @ts-ignore test values are being set properly
    expect(config.exclude).toContain(defaultExcludes[0]);
  });

  test("should accept multiple values on `addExcludes`", () => {
    const newExcludes = ["node_modules", "README.md"];
    const config = new CdkConfig(new TestProject(), {
      app: "test excludes multi value",
    });

    config.addExcludes(...newExcludes);

    // @ts-ignore test values are being set properly
    expect(config.exclude).toEqual(newExcludes);
  });
});
