import {
  Jest,
  JavaScriptTestRunner,
  NodeProject,
  NodeNativeTest,
} from "../../src/javascript";
import * as logging from "../../src/logging";
import { mkdtemp } from "../util";

logging.disable();

function newProject() {
  return new NodeProject({
    outdir: mkdtemp(),
    name: "test-node-project",
    githubOptions: { mergify: false },
    projenDevDependency: false,
    defaultReleaseBranch: "master",
    jest: false,
  });
}

test("JavaScriptTestRunner.useJest() is unusable before attach", () => {
  const runner = JavaScriptTestRunner.useJest();
  expect(() => runner.jest).toThrow(/not usable until it is attached/);
});

test("JavaScriptTestRunner.useNode() is unusable before attach", () => {
  const runner = JavaScriptTestRunner.useNode();
  expect(() => runner.nodeNativeTest).toThrow(
    /not usable until it is attached/,
  );
});

test("JavaScriptTestRunner.useJest().attach() creates a Jest component", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.useJest().attach(project);

  expect(runner.jest).toBeInstanceOf(Jest);
  expect(runner.nodeNativeTest).toBeUndefined();
  expect(Jest.of(project)).toBe(runner.jest);
  expect(runner.coverageDirectory).toEqual(runner.jest?.coverageDirectory);
});

test("JavaScriptTestRunner.useNode().attach() creates a NodeNativeTest component", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.useNode().attach(project);

  expect(runner.nodeNativeTest).toBeInstanceOf(NodeNativeTest);
  expect(runner.jest).toBeUndefined();
  expect(NodeNativeTest.of(project)).toBe(runner.nodeNativeTest);
  expect(runner.coverageDirectory).toEqual(
    runner.nodeNativeTest?.coverageDirectory,
  );
});

test("tryAttach() only attaches once", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.useJest();

  const first = runner.tryAttach(project);
  const second = runner.tryAttach(project);

  expect(first).toBe(second);
  expect(Jest.of(project)).toBe(first.jest);
});

test("attach() throws if already attached", () => {
  const runner = JavaScriptTestRunner.useJest();
  runner.attach(newProject());

  expect(() => runner.attach(newProject())).toThrow(/already attached/);
});
