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

    expect(config.include).toContain(newInclude);
    expect(config.include).toContain(defaultIncludes[0]);
  });

  test("should accept both a string and an array for `addIncludes`", () => {
    const includeStr = "string/**/*.ts";
    const includeArr = ["arr/**/*.ts"];
    const config = new CdkConfig(new TestProject(), {
      app: "test includes",
    });

    config.addIncludes(includeStr);
    config.addIncludes(includeArr);

    expect(config.include).toContain(includeStr);
    expect(config.include).toContain(includeArr[0]);
  });
});

describe("excludes", () => {
  test("should retain their initialized value", () => {
    const defaultExcludes = ["README.md"];

    const config = new CdkConfig(new TestProject(), {
      app: "test excludes",
      watchExcludes: defaultExcludes,
    });

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

    expect(config.exclude).toContain(newExclude);
    expect(config.exclude).toContain(defaultExcludes[0]);
  });

  test("should accept both a string and an array for `addExcludes`", () => {
    const excludeStr = "string/**/*.ts";
    const excludeArr = ["arr/**/*.ts"];
    const config = new CdkConfig(new TestProject(), {
      app: "test excludes",
    });

    config.addExcludes(excludeStr);
    config.addExcludes(excludeArr);

    expect(config.exclude).toContain(excludeStr);
    expect(config.exclude).toContain(excludeArr[0]);
  });
});
