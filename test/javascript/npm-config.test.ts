import { NodeProject, NodeProjectOptions } from "../../src/javascript";
import { NpmConfig } from "../../src/javascript/npm-config";
import { synthSnapshot } from "../util";

test("registry is handled correctly", () => {
  const prj = new TestNodeProject({
    name: "test-project",
    defaultReleaseBranch: "main",
  });

  const npmrc = new NpmConfig(prj, {
    registry: "https://my.registry.com/mirror",
  });
  npmrc.addRegistry("https://my.registry.com/private", "@company");

  const out = synthSnapshot(prj);
  expect(out[".npmrc"]).toMatchSnapshot();
});

test("default registry is used correctly", () => {
  const prj = new TestNodeProject({
    name: "test-project",
    defaultReleaseBranch: "main",
  });

  const npmrc = new NpmConfig(prj);
  npmrc.addRegistry("https://my.registry.com/private", "@company");

  const out = synthSnapshot(prj);
  expect(out[".npmrc"]).toMatchSnapshot();
});

test("override default registry via setter", () => {
  const prj = new TestNodeProject({
    name: "test-project",
    defaultReleaseBranch: "main",
  });

  const npmrc = new NpmConfig(prj, {
    registry: "https://my.registry.com/mirror",
  });
  npmrc.addRegistry("https://my.registry.com/mirror2");
  npmrc.addRegistry("https://my.registry.com/private", "@company");

  const out = synthSnapshot(prj);
  expect(out[".npmrc"]).toMatchSnapshot();
});

test("generic prop is set correctly", () => {
  const prj = new TestNodeProject({
    name: "test-project",
    defaultReleaseBranch: "main",
  });

  const npmrc = new NpmConfig(prj);
  npmrc.addConfig("key", "value");

  const out = synthSnapshot(prj);
  expect(out[".npmrc"]).toMatchSnapshot();
});

class TestNodeProject extends NodeProject {
  constructor(options: Partial<NodeProjectOptions> = {}) {
    super({
      name: "test-node-project",
      defaultReleaseBranch: "master",
      ...options,
    });
    // Remove default .npmrc
    this.tryRemoveFile(".npmrc");
  }
}
