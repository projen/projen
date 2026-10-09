import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";
import { javascript, Project } from "../../src";
import { JsiiBuild, JsiiProject, ValidateTsconfig } from "../../src/cdk";
import { TypeScriptProject } from "../../src/typescript";
import { git } from "../../src/util/exec";
import { mkdtemp, synthSnapshot } from "../util";

function createTypeScriptProject(
  options: Partial<javascript.NodeProjectOptions> = {},
) {
  return new TypeScriptProject({
    name: "test-project",
    defaultReleaseBranch: "main",
    disableTsconfig: true,
    ...options,
  });
}

describe("JsiiBuild", () => {
  describe("supports()", () => {
    it("returns true for TypeScriptProject", () => {
      const mixin = new JsiiBuild();
      const project = createTypeScriptProject();
      expect(mixin.supports(project)).toBe(true);
    });

    it("applyTo is a no-op for unsupported constructs", () => {
      const mixin = new JsiiBuild();
      const project = new Project({ name: "plain" });
      mixin.applyTo(project);
      expect(project.tasks.tryFind("package-all")).toBeUndefined();
    });
  });

  describe("applyTo()", () => {
    it("applies jsii configuration to a TypeScriptProject", () => {
      const project = createTypeScriptProject();
      project.with(new JsiiBuild());

      const output = synthSnapshot(project);
      const pkgjson = output["package.json"];
      expect(pkgjson.jsii).toBeDefined();
      expect(pkgjson.jsii.tsc.outDir).toBe("lib");
      expect(pkgjson.jsii.tsc.rootDir).toBe("src");
    });

    it("sets stability to deprecated", () => {
      const project = createTypeScriptProject();
      project.with(new JsiiBuild({ stability: "deprecated" }));

      const output = synthSnapshot(project);
      const pkgjson = output["package.json"];
      expect(pkgjson.stability).toBe("deprecated");
      expect(pkgjson.deprecated).toBe(true);
    });

    it("enables compat check", () => {
      const project = createTypeScriptProject();
      project.with(new JsiiBuild({ compat: true }));

      const output = synthSnapshot(project);
      const tasks = output[".projen/tasks.json"].tasks;
      expect(tasks.compat).toBeDefined();
      // compat should be spawned by compile
      expect(tasks.compile.steps.some((s: any) => s.spawn === "compat")).toBe(
        true,
      );
    });

    it("skips npm release when releaseToNpm is false", () => {
      const project = createTypeScriptProject();
      project.with(new JsiiBuild({ releaseToNpm: false }));

      const output = synthSnapshot(project);
      const buildWorkflow = output[".github/workflows/build.yml"];
      expect(buildWorkflow).not.toContain("package-js");
    });

    it("works without release component", () => {
      const project = createTypeScriptProject({ release: false });
      project.with(
        new JsiiBuild({
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      // Should not throw
      const output = synthSnapshot(project);
      expect(output["package.json"].jsii.targets.java).toBeDefined();
    });

    it("works without build workflow", () => {
      const project = createTypeScriptProject({ buildWorkflow: false });
      project.with(
        new JsiiBuild({
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      // Should not throw
      const output = synthSnapshot(project);
      expect(output["package.json"].jsii.targets.java).toBeDefined();
    });

    it("uses bun package manager bootstrap steps", () => {
      const project = createTypeScriptProject({
        packageManager: javascript.NodePackageManager.BUN,
      });
      project.with(
        new JsiiBuild({
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      const output = synthSnapshot(project);
      const buildWorkflow = output[".github/workflows/build.yml"];
      expect(buildWorkflow).toContain("setup-bun");
    });

    it("uses workspaceDirectory in packaging steps", () => {
      const project = createTypeScriptProject({
        packageManager: javascript.NodePackageManager.NPM,
      });
      project.with(
        new JsiiBuild({
          workspaceDirectory: "packages/my-lib",
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      const output = synthSnapshot(project);
      const releaseWorkflow = YAML.parse(
        output[".github/workflows/release.yml"],
      );
      const steps = releaseWorkflow.jobs.release_npm.steps;
      const commands = {
        "Install Dependencies": "cd .repo && npm ci",
        "Extract build artifact":
          "tar --strip-components=1 -xzvf dist/js/*.tgz -C .repo/packages/my-lib",
        "Move build artifact out of the way": "mv dist dist.old",
        "Create js artifact":
          "cd .repo/packages/my-lib && npx projen package:js",
        "Collect js artifact": "mv .repo/packages/my-lib/dist dist",
      };
      for (const [name, run] of Object.entries(commands)) {
        expect(steps.find((step: any) => step.name === name)).toMatchObject({
          run,
        });
      }
    });

    it("pins packaging job checkouts to the PR head SHA", () => {
      const project = createTypeScriptProject();
      project.with(
        new JsiiBuild({
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      const output = synthSnapshot(project);
      const buildWorkflow = YAML.parse(output[".github/workflows/build.yml"]);
      for (const jobName of ["package-js", "package-java"]) {
        const checkoutStep = buildWorkflow.jobs[jobName].steps.find((s: any) =>
          s.uses?.startsWith("actions/checkout"),
        );
        expect(checkoutStep.with.ref).toBe(
          "${{ github.event.pull_request.head.sha }}",
        );
        expect(checkoutStep.with.repository).toBe(
          "${{ github.event.pull_request.head.repo.full_name }}",
        );
      }
    });
  });
});

describe("JsiiBuild tsconfig option", () => {
  it("uses the injected tsconfig for jsii compilation", () => {
    const project = createTypeScriptProject();
    const tsconfig = new javascript.TypescriptConfig(project, {
      fileName: "tsconfig.jsii.json",
      compilerOptions: {
        rootDir: "src",
        outDir: "lib",
      },
    });
    project.with(new JsiiBuild({ tsconfig }));

    const output = synthSnapshot(project);
    const pkgjson = output["package.json"];

    expect(pkgjson.jsii.tsconfig).toBe("tsconfig.jsii.json");
    expect(pkgjson.jsii.validateTsconfig).toBe("strict");
    expect(pkgjson.jsii.tsc).toBeUndefined();
    expect(output["tsconfig.jsii.json"]).toBeDefined();
  });

  it("falls back to project.tsconfig when no tsconfig is injected", () => {
    const project = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
    });
    project.with(new JsiiBuild());

    const output = synthSnapshot(project);
    const pkgjson = output["package.json"];

    expect(pkgjson.jsii.tsconfig).toBe("tsconfig.json");
    expect(pkgjson.jsii.tsc).toBeUndefined();
  });

  it("falls back to tsc settings when disableTsconfig is true and no tsconfig injected", () => {
    const project = createTypeScriptProject();
    project.with(new JsiiBuild());

    const output = synthSnapshot(project);
    const pkgjson = output["package.json"];

    expect(pkgjson.jsii.tsc).toStrictEqual({ outDir: "lib", rootDir: "src" });
    expect(pkgjson.jsii.tsconfig).toBeUndefined();
  });

  it("adds excludeTypescript patterns to the injected tsconfig", () => {
    const project = createTypeScriptProject();
    const tsconfig = new javascript.TypescriptConfig(project, {
      fileName: "tsconfig.jsii.json",
      compilerOptions: {
        rootDir: "src",
        outDir: "lib",
      },
    });
    project.with(
      new JsiiBuild({ tsconfig, excludeTypescript: ["src/**/test/*.ts"] }),
    );

    const output = synthSnapshot(project);

    expect(output["tsconfig.jsii.json"].exclude).toContain("src/**/test/*.ts");
    expect(output["package.json"].jsii.excludeTypescript).toBeUndefined();
  });

  it("respects custom validateTsconfig level", () => {
    const project = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
    });
    project.with(new JsiiBuild({ validateTsconfig: ValidateTsconfig.MINIMAL }));

    const output = synthSnapshot(project);
    const pkgjson = output["package.json"];

    expect(pkgjson.jsii.validateTsconfig).toBe("minimal");
  });
});

describe("JsiiBuild fallback behaviors", () => {
  describe("stability", () => {
    it("falls back to project-level stability when not set on JsiiBuild", () => {
      const project = createTypeScriptProject({ stability: "experimental" });
      project.with(new JsiiBuild());

      const output = synthSnapshot(project);
      expect(output["package.json"].stability).toBe("experimental");
    });

    it("JsiiBuild stability takes precedence over project-level stability", () => {
      const project = createTypeScriptProject({ stability: "experimental" });
      project.with(new JsiiBuild({ stability: "stable" }));

      const output = synthSnapshot(project);
      expect(output["package.json"].stability).toBe("stable");
    });

    it("defaults to stable when neither JsiiBuild nor project-level stability is set", () => {
      const project = createTypeScriptProject();
      project.with(new JsiiBuild());

      const output = synthSnapshot(project);
      expect(output["package.json"].stability).toBe("stable");
    });
  });

  describe("npmTrustedPublishing", () => {
    it("falls back to project-level npmTrustedPublishing when not set on JsiiBuild", () => {
      const project = createTypeScriptProject({
        npmTrustedPublishing: true,
      });
      project.with(new JsiiBuild());

      const output = synthSnapshot(project);
      const releaseWorkflow = output[".github/workflows/release.yml"];
      expect(releaseWorkflow).toContain("NPM_TRUSTED_PUBLISHER");
      expect(releaseWorkflow).not.toContain("NPM_TOKEN");
    });

    it("JsiiBuild npmTrustedPublishing takes precedence over project-level", () => {
      const project = createTypeScriptProject({
        npmTrustedPublishing: true,
      });
      project.with(new JsiiBuild({ npmTrustedPublishing: false }));

      const output = synthSnapshot(project);
      const releaseWorkflow = output[".github/workflows/release.yml"];
      // not trusted publishing means NPM_TOKEN secret is required
      expect(releaseWorkflow).toContain("NPM_TOKEN");
    });

    it("defaults to false when neither JsiiBuild nor project-level is set", () => {
      const project = createTypeScriptProject();
      project.with(new JsiiBuild());

      const output = synthSnapshot(project);
      const releaseWorkflow = output[".github/workflows/release.yml"];
      // not trusted publishing means NPM_TOKEN secret is required
      expect(releaseWorkflow).toContain("NPM_TOKEN");
    });
  });

  describe("workflowNodeVersion", () => {
    it("falls back to project-level workflowNodeVersion when not set on JsiiBuild", () => {
      const project = createTypeScriptProject({
        workflowNodeVersion: "18.x",
      });
      project.with(
        new JsiiBuild({
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      const output = synthSnapshot(project);
      const buildWorkflow = output[".github/workflows/build.yml"];
      expect(buildWorkflow).toContain("node-version: 18.x");
    });

    it("JsiiBuild workflowNodeVersion takes precedence over project-level", () => {
      const project = createTypeScriptProject({
        workflowNodeVersion: "18.x",
      });
      project.with(
        new JsiiBuild({
          workflowNodeVersion: "20.x",
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      const output = synthSnapshot(project);
      const buildWorkflow = output[".github/workflows/build.yml"];
      // The package-java job should use 20.x from JsiiBuild, not 18.x from project
      expect(buildWorkflow).toContain("node-version: 20.x");
    });

    it("defaults to lts/* when neither JsiiBuild nor project-level is set", () => {
      const project = createTypeScriptProject();
      project.with(
        new JsiiBuild({
          publishToMaven: {
            javaPackage: "com.example",
            mavenGroupId: "com.example",
            mavenArtifactId: "test",
          },
        }),
      );

      const output = synthSnapshot(project);
      const buildWorkflow = output[".github/workflows/build.yml"];
      expect(buildWorkflow).toContain("node-version: lts/*");
    });
  });
});

describe("JsiiBuild Go tarball gitignore", () => {
  const repository = "https://github.com/example/source.git";
  const moduleName = "github.com/example/source";
  const goTarget = { moduleName, packageName: "fixturego" };
  const exception = "!/fixturego/jsii/*.tgz";

  test.each([
    repository,
    "https://github.com/example/source",
    "https://github.com/example/source.git/",
    "git+https://github.com/example/source.git",
    "ssh://git@github.com/example/source.git",
    "git+ssh://git@github.com/example/source.git",
    "git@github.com:example/source.git",
    "https://GITHUB.COM/Example/Source.git",
  ])("recognizes repository URL %s", (url) => {
    const project = createTypeScriptProject({ repository: url });
    project.with(new JsiiBuild({ publishToGo: goTarget }));
    expect(synthSnapshot(project)[".gitignore"]).toContain(exception);
  });

  test.each([
    [undefined, moduleName],
    [repository, "github.com/example/separate"],
    [repository, "github.com/another/source"],
    [repository, "github.com/example/source-extra"],
    [repository, "github.com/example/source/sdk"],
    [repository, "github.com/example/source/v2"],
    [repository, "example.com/example/source"],
    ["https://github.com.evil.example/example/source.git", moduleName],
    ["https://gitlab.com/example/source.git", moduleName],
    ["https://github.com/example/source/tree/main", moduleName],
    ["https://github.com/example/source.git?ref=main", moduleName],
    ["https://github.com/example/source.git#main", moduleName],
    ["https://github.com/example/source-extra.git", moduleName],
    ["https://github.com/example/..", "github.com/example/.."],
    ["github:example/source", moduleName],
    ["not a repository URL", moduleName],
  ])(
    "leaves unrelated or unsupported repositories alone: %s -> %s",
    (url, target) => {
      const project = createTypeScriptProject({ repository: url });
      project.with(
        new JsiiBuild({ publishToGo: { ...goTarget, moduleName: target } }),
      );
      expect(synthSnapshot(project)[".gitignore"]).not.toContain(exception);
    },
  );

  test("uses the package's repository metadata", () => {
    const project = createTypeScriptProject();
    project.package.addField("repository", repository);
    project.with(new JsiiBuild({ publishToGo: goTarget }));
    expect(synthSnapshot(project)[".gitignore"]).toContain(exception);
  });

  test.each(["../other", "*", "nested/package"])(
    "does not expand the exception for an unsupported package name: %s",
    (packageName) => {
      const project = createTypeScriptProject({ repository });
      project.with(new JsiiBuild({ publishToGo: { moduleName, packageName } }));
      expect(synthSnapshot(project)[".gitignore"]).not.toMatch(/!.*\.tgz/);
    },
  );

  test("does not change npm or other language targets without Go", () => {
    const project = createTypeScriptProject({ repository });
    project.with(
      new JsiiBuild({
        publishToPypi: { distName: "example", module: "example" },
        publishToMaven: {
          javaPackage: "com.example",
          mavenGroupId: "com.example",
          mavenArtifactId: "example",
        },
        publishToNuget: { dotNetNamespace: "Example", packageId: "Example" },
      }),
    );
    const ignore = synthSnapshot(project)[".gitignore"];
    expect(ignore).not.toMatch(/!.*\.tgz/);
    expect(ignore).toContain("*.tgz");
    expect(ignore).toContain("/dist/");
  });

  test.each<[string, boolean, string, string | undefined, string, string]>([
    ["jsii", false, "npm-name", "fixturego", "fixturego", "1.2.3"],
    ["mixin", false, "npm-name", "fixturego", "fixturego", "1.2.3"],
    ["jsii", true, "npm-name", "fixturego", "fixturego", "1.2.3"],
    ["mixin", true, "npm-name", "fixturego", "fixturego", "1.2.3"],
    ["mixin", false, "hello-world", undefined, "helloworld", "1.2.3"],
    ["jsii", false, "@acme/hello-world", undefined, "acmehelloworld", "2.3.4"],
    ["mixin", false, "hello.world", undefined, "hello.world", "1.2.3"],
  ])(
    "Git selects the embedded tarball: %s nested=%s npm=%s Go=%s directory=%s version=%s",
    (entrypoint, nested, npmName, goName, directory, version) => {
      const outdir = mkdtemp();
      const parent = nested
        ? new javascript.NodeProject({
            name: "source-root",
            outdir,
            repository,
            defaultReleaseBranch: "main",
          })
        : undefined;
      const options = {
        name: "display-name",
        packageName: npmName,
        parent,
        outdir: nested ? "packages/library" : outdir,
        defaultReleaseBranch: "main",
        repositoryDirectory: nested ? "packages/library" : undefined,
      };
      const publishToGo = { moduleName, packageName: goName };
      const project =
        entrypoint === "jsii"
          ? new JsiiProject({
              ...options,
              repositoryUrl: repository,
              author: "Test Author",
              authorAddress: "test@example.com",
              publishToGo,
              docgen: false,
            })
          : new TypeScriptProject({
              ...options,
              repository,
              disableTsconfig: true,
            });
      if (entrypoint === "mixin") {
        project.with(new JsiiBuild({ publishToGo, docgen: false }));
      }
      project.package.addField("version", version);
      const root = parent ?? project;
      const previous = process.env.PROJEN_DISABLE_POST;
      try {
        process.env.PROJEN_DISABLE_POST = "true";
        root.synth();
        const first = fs.readFileSync(path.join(outdir, ".gitignore"), "utf8");
        root.synth();
        expect(fs.readFileSync(path.join(outdir, ".gitignore"), "utf8")).toBe(
          first,
        );
      } finally {
        if (previous === undefined) {
          delete process.env.PROJEN_DISABLE_POST;
        } else {
          process.env.PROJEN_DISABLE_POST = previous;
        }
      }
      const runGit = (...args: string[]) =>
        git.capture(["-c", "core.excludesFile=", ...args], {
          cwd: outdir,
        });
      const isIgnored = (file: string) => {
        try {
          runGit("check-ignore", "-q", "--", file);
          return true;
        } catch (error) {
          expect(error).toMatchObject({ status: 1 });
          return false;
        }
      };
      runGit("init");
      expect(runGit("remote")).toBe("");
      const tarball = `${directory}/jsii/package-${version}.tgz`;
      const ignored = [
        "npm-package.tgz",
        "unrelated/temporary.tgz",
        `${directory}/temporary.tgz`,
        `unrelated/${tarball}`,
        `dist/go/${tarball}`,
        "dist/js/npm-package.tgz",
      ];
      for (const file of [tarball, ...ignored]) {
        fs.mkdirSync(path.dirname(path.join(outdir, file)), {
          recursive: true,
        });
        fs.writeFileSync(path.join(outdir, file), "Git selection fixture");
      }
      expect(isIgnored(tarball)).toBe(false);
      expect(runGit("check-ignore", "-v", "--", tarball)).toContain(
        `!/${directory}/jsii/*.tgz`,
      );
      expect(runGit("add", "--dry-run", "--", tarball)).toContain(tarball);
      expect(runGit("ls-files", "--stage")).toBe("");
      for (const file of ignored) {
        expect(isIgnored(file)).toBe(true);
      }
      if (parent) {
        expect(
          fs.readFileSync(path.join(project.outdir, ".gitignore"), "utf8"),
        ).not.toContain(`!/${directory}/jsii/*.tgz`);
      }
      root.gitignore.exclude(`/${directory}/`);
      root.gitignore.synthesize();
      expect(isIgnored(tarball)).toBe(true);
      root.gitignore.removePatterns(`/${directory}/`);
      root.gitignore.exclude("*.tgz");
      root.gitignore.synthesize();
      expect(isIgnored(tarball)).toBe(true);
    },
  );
});

describe("JsiiBuild declaration entrypoints", () => {
  it("preserves an explicitly configured TypeScript declaration path", () => {
    // NodeProjectOptions cannot express entrypointTypes, so construct directly.
    const project = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      disableTsconfig: true,
      entrypointTypes: "declarations/public.d.ts",
    });
    project.with(new JsiiBuild());

    const pkgjson = synthSnapshot(project)["package.json"];
    expect(pkgjson.main).toBe("lib/index.js");
    expect(pkgjson.types).toBe("declarations/public.d.ts");
  });

  it("preserves explicit types when the JavaScript entrypoint is empty", () => {
    const project = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      disableTsconfig: true,
      entrypoint: "",
      entrypointTypes: "declarations/public.d.ts",
    });
    project.with(new JsiiBuild());

    const pkgjson = synthSnapshot(project)["package.json"];
    expect(pkgjson.main).toBeUndefined();
    expect(pkgjson.types).toBe("declarations/public.d.ts");
  });

  it("does not manufacture types when the project omits entrypoint and entrypointTypes", () => {
    const project = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      disableTsconfig: true,
      entrypoint: "",
    });
    project.with(new JsiiBuild());

    const pkgjson = synthSnapshot(project)["package.json"];
    expect(pkgjson.main).toBeUndefined();
    expect(pkgjson).not.toHaveProperty("types");
  });

  it("does not let libdir override an entrypoint-derived declaration path", () => {
    const project = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      disableTsconfig: true,
      libdir: "dist",
      entrypoint: "lib/index.js",
    });
    project.with(new JsiiBuild());

    const pkgjson = synthSnapshot(project)["package.json"];
    expect(pkgjson.main).toBe("lib/index.js");
    expect(pkgjson.types).toBe("lib/index.d.ts");
    expect(pkgjson.jsii.tsc.outDir).toBe("dist");
  });
});
