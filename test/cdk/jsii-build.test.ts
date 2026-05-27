import { javascript, Project } from "../../src";
import { JsiiBuild } from "../../src/cdk";
import { TypeScriptProject } from "../../src/typescript";
import { synthSnapshot } from "../util";

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
      const project = createTypeScriptProject();
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
      const releaseWorkflow = output[".github/workflows/release.yml"];
      expect(releaseWorkflow).toContain(".repo/packages/my-lib");
    });
  });
});
