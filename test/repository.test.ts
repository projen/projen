import { Construct } from "constructs";
import { TestProject } from "./util";
import { Component, Project } from "../src";
import { Repository } from "../src/repository";

describe("Repository", () => {
  describe("Repository.of()", () => {
    test("finds Repository from a root project", () => {
      const project = new TestProject();
      const repo = Repository.of(project);

      expect(repo).toBeDefined();
      expect(Repository.isRepository(repo)).toBe(true);
    });

    test("finds Repository from a subproject", () => {
      const root = new TestProject();
      const sub = new Project({
        parent: root,
        outdir: "sub",
        name: "sub-project",
      });

      const repo = Repository.of(sub);
      expect(repo).toBe(Repository.of(root));
    });

    test("finds Repository from a component", () => {
      const root = new TestProject();
      const comp = new Component(root);

      const repo = Repository.of(comp);
      expect(repo).toBe(Repository.of(root));
    });

    test("finds Repository from a deeply nested component", () => {
      const root = new TestProject();
      const sub = new Project({
        parent: root,
        outdir: "sub",
        name: "sub-project",
      });
      const comp = new Component(sub);

      const repo = Repository.of(comp);
      expect(repo).toBe(Repository.of(root));
    });

    test("throws when no Repository in ancestor chain", () => {
      const bare = new Construct(undefined as any, "bare");
      expect(() => Repository.of(bare)).toThrow(
        /No Repository found/,
      );
    });
  });

  describe("Repository.isRepository()", () => {
    test("returns true for a Repository", () => {
      const project = new TestProject();
      const repo = Repository.of(project);
      expect(Repository.isRepository(repo)).toBe(true);
    });

    test("returns false for a Project", () => {
      const project = new TestProject();
      expect(Repository.isRepository(project)).toBe(false);
    });

    test("returns false for non-constructs", () => {
      expect(Repository.isRepository(null)).toBe(false);
      expect(Repository.isRepository(undefined)).toBe(false);
      expect(Repository.isRepository("string")).toBe(false);
      expect(Repository.isRepository(42)).toBe(false);
    });
  });

  describe("Repository.projects", () => {
    test("lists root project", () => {
      const project = new TestProject();
      const repo = Repository.of(project);

      expect(repo.projects).toContain(project);
    });

    test("lists subprojects", () => {
      const root = new TestProject();
      const sub = new Project({
        parent: root,
        outdir: "sub",
        name: "sub-project",
      });
      const repo = Repository.of(root);

      expect(repo.projects).toContain(root);
      expect(repo.projects).toContain(sub);
    });
  });

  describe("project.repo", () => {
    test("returns the parent Repository", () => {
      const project = new TestProject();
      const repo = project.repo;

      expect(repo).toBeDefined();
      expect(Repository.isRepository(repo)).toBe(true);
      expect(repo).toBe(Repository.of(project));
    });
  });
});
