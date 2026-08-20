import { writeFileSync } from "fs";
import { join } from "path";
import { CdktnConfig } from "../../src/cdktn/cdktn-config";
import { mkdtemp, synthSnapshot, TestProject } from "../util";

describe("app", () => {
  test("is set from the given app command", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "npx ts-node main.ts",
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].app).toStrictEqual("npx ts-node main.ts");
  });
});

describe("file permissions", () => {
  test("cdktf.json is not read-only so `cdktn get` can write to it", () => {
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "foo",
    });

    expect(config.file.readonly).toBe(false);
  });
});

describe("output", () => {
  test("defaults to cdktf.out", () => {
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "foo",
    });

    expect(config.cdktnOut).toStrictEqual("cdktf.out");

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].output).toStrictEqual("cdktf.out");
  });

  test("can be customized", () => {
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "foo",
      cdktnOut: "custom.out",
    });

    expect(config.cdktnOut).toStrictEqual("custom.out");

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].output).toStrictEqual("custom.out");
  });
});

describe("terraform providers", () => {
  test("should retain their initialized value", () => {
    const defaultProviders = ["aws@~>5.0"];
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "test providers",
      terraformProviders: defaultProviders,
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformProviders).toEqual(defaultProviders);
  });

  test("should contain updated values when `addTerraformProviders` is called", () => {
    const defaultProviders = ["aws@~>5.0"];
    const newProvider = "google@~>5.0";
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "test providers",
      terraformProviders: defaultProviders,
    });

    config.addTerraformProviders(newProvider);

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformProviders).toContain(newProvider);
    expect(snapshot["cdktf.json"].terraformProviders).toContain(
      defaultProviders[0],
    );
  });

  test("should accept multiple values on `addTerraformProviders`", () => {
    const newProviders = ["aws@~>5.0", "google@~>5.0"];
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "test providers multi value",
    });

    config.addTerraformProviders(...newProviders);

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformProviders).toEqual(newProviders);
  });
});

describe("terraform modules", () => {
  test("should retain their initialized value", () => {
    const defaultModules = ["terraform-aws-modules/vpc/aws"];
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "test modules",
      terraformModules: defaultModules,
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformModules).toEqual(defaultModules);
  });

  test("should contain updated values when `addTerraformModules` is called", () => {
    const defaultModules = ["terraform-aws-modules/vpc/aws"];
    const newModule = "terraform-aws-modules/eks/aws";
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "test modules",
      terraformModules: defaultModules,
    });

    config.addTerraformModules(newModule);

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformModules).toContain(newModule);
    expect(snapshot["cdktf.json"].terraformModules).toContain(
      defaultModules[0],
    );
  });

  test("should accept multiple values on `addTerraformModules`", () => {
    const newModules = [
      "terraform-aws-modules/vpc/aws",
      "terraform-aws-modules/eks/aws",
    ];
    const project = new TestProject();
    const config = new CdktnConfig(project, {
      app: "test modules multi value",
    });

    config.addTerraformModules(...newModules);

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformModules).toEqual(newModules);
  });
});

describe("context", () => {
  test("is set from the given context", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
      context: {
        "some-key": "some-value",
      },
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].context).toEqual({
      "some-key": "some-value",
    });
  });
});

describe("projectId", () => {
  test("is omitted by default", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].projectId).toBeUndefined();
  });

  test("is set from the given projectId", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
      projectId: "my-project-id",
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].projectId).toStrictEqual("my-project-id");
  });
});

describe("sendCrashReports", () => {
  test("is omitted by default", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].sendCrashReports).toBeUndefined();
  });

  test("can be enabled", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
      sendCrashReports: true,
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].sendCrashReports).toStrictEqual(true);
  });

  test("can be disabled", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
      sendCrashReports: false,
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].sendCrashReports).toStrictEqual(false);
  });
});

describe("merging with an existing cdktf.json on disk", () => {
  test("dedupes projen-managed providers/modules against those already on disk", () => {
    const outdir = mkdtemp();
    writeFileSync(
      join(outdir, "cdktf.json"),
      JSON.stringify({
        terraformProviders: ["aws@~>5.0", "google@~>5.0"],
        terraformModules: ["terraform-aws-modules/vpc/aws"],
      }),
    );

    const project = new TestProject({ outdir });
    new CdktnConfig(project, {
      app: "foo",
      terraformProviders: ["aws@~>5.0"],
      terraformModules: [
        "terraform-aws-modules/vpc/aws",
        "terraform-aws-modules/eks/aws",
      ],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformProviders).toEqual([
      "aws@~>5.0",
      "google@~>5.0",
    ]);
    expect(snapshot["cdktf.json"].terraformModules).toEqual([
      "terraform-aws-modules/vpc/aws",
      "terraform-aws-modules/eks/aws",
    ]);
  });

  test("ignores an existing cdktf.json that is not valid JSON", () => {
    const outdir = mkdtemp();
    writeFileSync(join(outdir, "cdktf.json"), "{ not valid json");

    const project = new TestProject({ outdir });
    new CdktnConfig(project, {
      app: "foo",
      terraformProviders: ["aws@~>5.0"],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformProviders).toEqual(["aws@~>5.0"]);
  });

  test("has nothing to merge when no cdktf.json exists on disk yet", () => {
    const outdir = mkdtemp();

    const project = new TestProject({ outdir });
    new CdktnConfig(project, {
      app: "foo",
      terraformProviders: ["aws@~>5.0"],
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot["cdktf.json"].terraformProviders).toEqual(["aws@~>5.0"]);
  });
});

describe("gitignore", () => {
  test("excludes the output directory and .gen", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitignore"]).toContain("/cdktf.out/");
    expect(snapshot[".gitignore"]).toContain(".gen/");
  });

  test("respects a custom output directory", () => {
    const project = new TestProject();
    new CdktnConfig(project, {
      app: "foo",
      cdktnOut: "custom.out",
    });

    const snapshot = synthSnapshot(project);
    expect(snapshot[".gitignore"]).toContain("/custom.out/");
  });
});
