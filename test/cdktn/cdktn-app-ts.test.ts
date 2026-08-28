import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { CdktnTypeScriptApp } from "../../src/cdktn";
import { TypeScriptRunner } from "../../src/typescript/typescript-runner";
import { mkdtemp, synthSnapshot } from "../util";

describe("cdktf.json", () => {
  it("app fully overridden", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      app: "bun --smol my-app.ts",
    });
    const files = synthSnapshot(project);
    expect(files["cdktf.json"].app).toStrictEqual("bun --smol my-app.ts");
  });

  it("with the default package manager", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });
    const files = synthSnapshot(project);
    expect(files["cdktf.json"].app).toStrictEqual(
      "node --enable-source-maps --import=amaro/transform src/main.ts",
    );
  });

  it("with a custom appEntrypoint", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      appEntrypoint: "my-app.ts",
    });
    const files = synthSnapshot(project);
    expect(files["cdktf.json"].app).toStrictEqual(
      "node --enable-source-maps --import=amaro/transform src/my-app.ts",
    );
  });

  it("throws an error if both app and appEntrypoint are specified", () => {
    expect(() => {
      new CdktnTypeScriptApp({
        name: "hello",
        defaultReleaseBranch: "main",
        cdktnVersion: "0.24.0",
        app: "bun --smol my-app.ts",
        appEntrypoint: "my-app.ts",
      });
    }).toThrow("Only one of 'app' or 'appEntrypoint' can be specified");
  });

  it("includes terraform providers and modules", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      terraformProviders: ["aws@~>5.0"],
      terraformModules: ["terraform-aws-modules/vpc/aws"],
    });
    const files = synthSnapshot(project);
    expect(files["cdktf.json"].terraformProviders).toStrictEqual(["aws@~>5.0"]);
    expect(files["cdktf.json"].terraformModules).toStrictEqual([
      "terraform-aws-modules/vpc/aws",
    ]);
  });

  it("uses the same command regardless of tsconfig", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      disableTsconfig: true,
    });
    const files = synthSnapshot(project);
    expect(files["cdktf.json"].app).toStrictEqual(
      "node --enable-source-maps --import=amaro/transform src/main.ts",
    );
  });

  it("respects a custom runner", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      runner: TypeScriptRunner.tsx(),
    });
    const files = synthSnapshot(project);
    expect(files["cdktf.json"].app).toStrictEqual("tsx src/main.ts");
  });

  it("falls back to a direct node invocation if the runner's last step has no execArgs", () => {
    const configForSpy = jest
      .spyOn(TypeScriptRunner.prototype, "configFor")
      .mockReturnValue({
        dependencies: [],
        steps: [{ name: "no-op-step" }],
      });

    try {
      const project = new CdktnTypeScriptApp({
        name: "hello",
        defaultReleaseBranch: "main",
        cdktnVersion: "0.24.0",
      });
      const files = synthSnapshot(project);
      expect(files["cdktf.json"].app).toStrictEqual("node src/main.ts");
    } finally {
      configForSpy.mockRestore();
    }
  });
});

describe("dependencies", () => {
  it("adds a runtime dependency on cdktn", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot["package.json"].dependencies).toMatchObject({
      cdktn: "^0.24.0",
    });
  });

  it("adds a dev dependency on cdktn-cli", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot["package.json"].devDependencies).toMatchObject({
      "cdktn-cli": "^0.24.0",
    });
  });

  it("does not add ts-node as a dev dependency", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });
    const snapshot = synthSnapshot(project);
    expect(snapshot["package.json"].devDependencies["ts-node"]).toBeUndefined();
  });

  it("throws an error if cdktnVersion is not specified", () => {
    expect(() => {
      new CdktnTypeScriptApp({
        name: "hello",
        defaultReleaseBranch: "main",
        cdktnVersion: undefined as any,
      });
    }).toThrow("Required field cdktnVersion is not specified.");
  });
});

describe("sample code", () => {
  it("generates the app entrypoint and matching test by default", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });

    const files = synthSnapshot(project);

    expect(files["src/main.ts"]).toContain(
      "export class MyStack extends TerraformStack",
    );
    expect(files["test/main.test.ts"]).toContain(
      "import { MyStack } from '../src/main';",
    );
  });

  it("generates a custom appEntrypoint located in a subdirectory", () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      appEntrypoint: "bin/main.ts",
    });

    const files = synthSnapshot(project);

    expect(files["src/bin/main.ts"]).toContain(
      "export class MyStack extends TerraformStack",
    );
    expect(files["test/main.test.ts"]).toContain(
      "import { MyStack } from '../src/bin/main';",
    );
  });

  it("does not generate sample code when the source directory already contains a .ts file", () => {
    const outdir = mkdtemp();
    mkdirSync(join(outdir, "src"));
    writeFileSync(join(outdir, "src", "other.ts"), "// pre-existing");

    const project = new CdktnTypeScriptApp({
      name: "hello",
      outdir,
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      appEntrypoint: "bin/main.ts",
    });

    const files = synthSnapshot(project);
    expect(files["src/bin/main.ts"]).toBeUndefined();
    expect(files["src/other.ts"]).toStrictEqual("// pre-existing");
  });

  it("does not overwrite an existing entrypoint in a subdirectory", () => {
    const outdir = mkdtemp();
    const entrypoint = join(outdir, "src", "bin", "main.ts");
    mkdirSync(dirname(entrypoint), { recursive: true });
    writeFileSync(entrypoint, "// my own entrypoint");

    const project = new CdktnTypeScriptApp({
      name: "hello",
      outdir,
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
      appEntrypoint: "bin/main.ts",
    });

    const files = synthSnapshot(project);
    expect(files["src/bin/main.ts"]).toStrictEqual("// my own entrypoint");
  });
});

describe("synth", () => {
  let project: CdktnTypeScriptApp;
  let files: Record<string, any>;

  beforeEach(() => {
    project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });

    files = synthSnapshot(project);
  });

  it('adds a "synth" task', () => {
    expect(files[".projen/tasks.json"].tasks.synth).toStrictEqual({
      name: "synth",
      description: "Synthesizes your CDKTN app into cdktf.out",
      steps: [{ execArgs: ["cdktn", "synth"] }],
    });
  });

  it('adds a "synth:silent" task', () => {
    expect(files[".projen/tasks.json"].tasks["synth:silent"]).toStrictEqual({
      name: "synth:silent",
      description:
        'Synthesizes your CDKTN app into cdktf.out and suppresses the template in stdout (part of "yarn build")',
      steps: [{ execArgs: ["cdktn", "synth", "-q"] }],
    });
  });

  it('spawns a "synth:silent" post-compile task', () => {
    expect(
      files[".projen/tasks.json"].tasks["post-compile"].steps,
    ).toStrictEqual([{ spawn: "synth:silent" }]);
  });

  it('adds a "get" task', () => {
    expect(files[".projen/tasks.json"].tasks.get).toStrictEqual({
      name: "get",
      description: "Imports and updates Terraform providers and modules",
      steps: [{ execArgs: ["cdktn", "get"] }],
    });
  });
});

describe("watch", () => {
  it('adds a "watch" task', () => {
    const project = new CdktnTypeScriptApp({
      name: "hello",
      defaultReleaseBranch: "main",
      cdktnVersion: "0.24.0",
    });

    const files = synthSnapshot(project);
    expect(files[".projen/tasks.json"].tasks.watch).toStrictEqual({
      name: "watch",
      description:
        "Watches changes in your source code and rebuilds and deploys to the current account",
      steps: [{ execArgs: ["cdktn", "watch"] }],
    });
  });
});
