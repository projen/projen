import { NodeProject } from "../../../src/javascript";
import { ESLintConfig } from "../../../src/javascript/eslint/config";
import { Extends } from "../../../src/javascript/eslint/config-object";
import { ESLint } from "../../../src/javascript/eslint/eslint";
import { ModuleType } from "../../../src/javascript/module-type";
import { Project } from "../../../src/project";
import { TypeScriptProject } from "../../../src/typescript";
import { synthSnapshot } from "../../util";

describe("ESLint (flat config)", () => {
  describe("basic functionality", () => {
    test("creates eslint task", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
      });

      expect(eslint.task).toBeDefined();
      expect(project.tasks.tryFind("eslint")).toBe(eslint.task);
    });

    test("creates flat config file", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
      });

      const output = synthSnapshot(project);
      expect(output["eslint.config.mjs"]).toBeDefined();
    });

    test("adds eslint dependency", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
      });

      expect(project.deps.getDependency("eslint")).toBeDefined();
    });
  });

  describe("module type", () => {
    test("creates ESM config by default", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
      });

      const output = synthSnapshot(project);
      expect(output["eslint.config.mjs"]).toBeDefined();
      expect(output["eslint.config.cjs"]).toBeUndefined();
    });

    test("creates CommonJS config when specified", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
        fileOptions: {
          moduleType: ModuleType.COMMON_JS,
        },
      });

      const output = synthSnapshot(project);
      expect(output["eslint.config.cjs"]).toBeDefined();
      expect(output["eslint.config.mjs"]).toBeUndefined();
    });
  });

  describe("TypeScript detection", () => {
    test("adds TypeScript configs for TypeScript project", () => {
      const project = new TypeScriptProject({
        name: "test",
        defaultReleaseBranch: "main",
        eslint: false,
      });

      new ESLint(project, {
        files: ["src/**/*.ts"],
      });

      const output = synthSnapshot(project);
      const content = output["eslint.config.mjs"];
      expect(content).toContain("tseslint");
    });

    test("does not add TypeScript configs for JS project", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
      });

      const output = synthSnapshot(project);
      const content = output["eslint.config.mjs"];
      expect(content).not.toContain("tseslint");
    });
  });

  describe("command options", () => {
    test("includes --fix by default", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
      });

      const taskStep = eslint.task.steps[0];
      expect(taskStep.exec).toContain("--fix");
    });

    test("excludes --fix when disabled", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
        commandOptions: { fix: false },
      });

      const taskStep = eslint.task.steps[0];
      expect(taskStep.exec).not.toContain("--fix");
    });

    test("includes --cache by default", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
      });

      const taskStep = eslint.task.steps[0];
      expect(taskStep.exec).toContain("--cache");
    });

    test("excludes --cache when disabled", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
        commandOptions: { cache: false },
      });

      const taskStep = eslint.task.steps[0];
      expect(taskStep.exec).not.toContain("--cache");
    });

    test("adds extra args", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
        commandOptions: { extraArgs: ["--debug"] },
      });

      const taskStep = eslint.task.steps[0];
      expect(taskStep.exec).toContain("--debug");
    });
  });

  describe("configs", () => {
    test("disables linter when specified", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
        linter: false,
      });

      const output = synthSnapshot(project);
      const content = output["eslint.config.mjs"];
      expect(content).not.toContain("eslint.configs.recommended");
    });

    test("disables formatter when specified", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
        formatter: false,
      });

      const output = synthSnapshot(project);
      const content = output["eslint.config.mjs"];
      expect(content).not.toContain("stylistic");
    });

    test("adds custom configs", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
        configs: [
          new ESLintConfig({
            rules: {
              customRule: "error",
            },
          }),
        ],
      });

      const output = synthSnapshot(project);
      const content = output["eslint.config.mjs"];
      expect(content).toContain("customRule");
    });

    test("addConfigs method works", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
      });

      eslint.addConfigs(
        new ESLintConfig({
          extends: [Extends.fromName("additionalConfig")],
        }),
      );

      const output = synthSnapshot(project);
      const content = output["eslint.config.mjs"];
      expect(content).toContain("additionalConfig");
    });
  });

  describe("singleton", () => {
    test("ESLint.of returns the ESLint component", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      const eslint = new ESLint(project, {
        files: ["src/**/*.js"],
      });

      expect(ESLint.of(project)).toBe(eslint);
    });

    test("ESLint.of returns undefined when no ESLint component", () => {
      const project = new NodeProject({
        name: "test",
        defaultReleaseBranch: "main",
      });

      expect(ESLint.of(project)).toBeUndefined();
    });
  });

  describe("gitignore", () => {
    test("adds .eslintcache to gitignore when cache enabled by default", () => {
      const project = new Project({
        name: "test",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
      });

      const output = synthSnapshot(project);
      const gitignore = output[".gitignore"].split("\n");
      expect(gitignore).toContain(".eslintcache");
    });

    test("does not add .eslintcache to gitignore when cache disabled", () => {
      const project = new Project({
        name: "test",
      });

      new ESLint(project, {
        files: ["src/**/*.js"],
        commandOptions: { cache: false },
      });

      const output = synthSnapshot(project);
      const gitignore = output[".gitignore"].split("\n");
      expect(gitignore).not.toContain(".eslintcache");
    });
  });
});
