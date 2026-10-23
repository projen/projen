import { readFileSync } from "fs";
import type { CdkConfigCommonOptions } from "../../src/awscdk";
import {
  ApprovalLevel,
  AwsCdkJavaApp,
  AwsCdkPythonApp,
  AwsCdkTypeScriptApp,
  CdkConfig,
  CdkFeatureFlags,
} from "../../src/awscdk";
import { FEATURE_FLAGS_V2 } from "../../src/awscdk/internal";
import { synthSnapshot, TestProject } from "../util";

describe("version reporting", () => {
  test.each<[CdkConfigCommonOptions, boolean | undefined]>([
    [{ versionReporting: true }, true],
    [{ versionReporting: false }, false],
    [{}, undefined],
    [{ versionReporting: undefined }, undefined],
  ])("synthesizes %p without changing other CDK settings", (options, value) => {
    const project = new TestProject();
    const config = new CdkConfig(project, {
      app: "node lib/main.js",
      context: { environment: "test" },
      requireApproval: ApprovalLevel.ANY_CHANGE,
      cdkout: "custom.out",
      buildCommand: "node build.js",
      watchIncludes: ["src/**/*.ts"],
      watchExcludes: ["test/**"],
      ...options,
    });

    project.synth();
    const first = readFileSync(config.json.absolutePath, "utf8");
    const second = synthSnapshot(project, { parseJson: false })["cdk.json"];

    expect(second).toBe(first);
    expect(JSON.parse(second)).toStrictEqual({
      "//": expect.any(String),
      app: "node lib/main.js",
      context: { environment: "test" },
      requireApproval: ApprovalLevel.ANY_CHANGE,
      output: "custom.out",
      build: "node build.js",
      watch: { include: ["src/**/*.ts"], exclude: ["test/**"] },
      ...(value === undefined ? {} : { versionReporting: value }),
    });
  });

  test.each([
    {
      language: "TypeScript",
      createApp: (options: CdkConfigCommonOptions) =>
        new AwsCdkTypeScriptApp({
          name: "test-app",
          defaultReleaseBranch: "main",
          cdkVersion: "2.189.1",
          ...options,
        }),
    },
    {
      language: "Python",
      createApp: (options: CdkConfigCommonOptions) =>
        new AwsCdkPythonApp({
          name: "test-app",
          moduleName: "test_app",
          authorName: "Test Author",
          authorEmail: "test@example.com",
          version: "0.1.0",
          cdkVersion: "2.189.1",
          ...options,
        }),
    },
    {
      language: "Java",
      createApp: (options: CdkConfigCommonOptions) =>
        new AwsCdkJavaApp({
          name: "test-app",
          artifactId: "test-app",
          groupId: "org.acme",
          mainClass: "org.acme.MyApp",
          version: "0.1.0",
          cdkVersion: "2.189.1",
          ...options,
        }),
    },
  ])("forwards the option from the $language app", ({ createApp }) => {
    const defaults = synthSnapshot(createApp({}))["cdk.json"];
    expect(defaults).not.toHaveProperty("versionReporting");

    for (const versionReporting of [true, false]) {
      const output = synthSnapshot(createApp({ versionReporting }));
      expect(output["cdk.json"]).toStrictEqual({
        ...defaults,
        versionReporting,
      });
    }
  });
});

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

  test("should accept multiple values on `addIncludes`", () => {
    const newIncludes = ["value-one.ts", "value-two.ts"];
    const config = new CdkConfig(new TestProject(), {
      app: "test includes multi value",
    });

    config.addIncludes(...newIncludes);

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

  test("should accept multiple values on `addExcludes`", () => {
    const newExcludes = ["node_modules", "README.md"];
    const config = new CdkConfig(new TestProject(), {
      app: "test excludes multi value",
    });

    config.addExcludes(...newExcludes);

    expect(config.exclude).toEqual(newExcludes);
  });
});

describe("feature flags", () => {
  test("can be set for cdk v2", () => {
    const config = new CdkConfig(new TestProject(), {
      app: "test feature flags",
      featureFlags: CdkFeatureFlags.V2.ALL,
    });

    expect(config.context["@aws-cdk/aws-iam:minimizePolicies"]).toBe(true);
    expect(config.context).toEqual(expect.objectContaining(FEATURE_FLAGS_V2));
  });

  test("can be loaded dynamically for cdk v2", () => {
    const config = new CdkConfig(new TestProject(), {
      app: "test feature flags",
      featureFlags: CdkFeatureFlags.V2.fromLocalAwsCdkLib(),
    });

    expect(config.context).toEqual(expect.objectContaining(FEATURE_FLAGS_V2));
    expect(config.context["@aws-cdk/aws-iam:minimizePolicies"]).toBe(true);
  });

  test("user context should take precedence over default flags", () => {
    const config = new CdkConfig(new TestProject(), {
      app: "test feature flags",
      featureFlags: CdkFeatureFlags.V2.ALL,
      context: {
        "@aws-cdk/aws-lambda:recognizeLayerVersion": false,
      },
    });

    expect(config.context["@aws-cdk/aws-iam:minimizePolicies"]).toBe(true);
    expect(config.context["@aws-cdk/aws-lambda:recognizeLayerVersion"]).toBe(
      false,
    );
  });
});
