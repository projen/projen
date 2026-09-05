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

test("JavaScriptTestRunner.jest().attach() creates a Jest component", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.jest().attach(project);

  expect(NodeNativeTest.of(project)).toBeUndefined();
  expect(runner).toBeInstanceOf(JavaScriptTestRunner);
  expect(Jest.of(project)).toBeDefined();
});

test("JavaScriptTestRunner.nodejs().attach() creates a NodeNativeTest component", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.nodejs().attach(project);

  expect(Jest.of(project)).toBeUndefined();
  expect(runner).toBeInstanceOf(JavaScriptTestRunner);
  expect(NodeNativeTest.of(project)).toBeDefined();
});

test("tryAttach() only attaches once", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.jest();

  const first = runner.tryAttach(project);
  const second = runner.tryAttach(project);

  expect(first).toBe(second);
  expect(Jest.of(project)).toBeDefined();
});

test("attach() throws if already attached", () => {
  const runner = JavaScriptTestRunner.jest();
  runner.attach(newProject());

  expect(() => runner.attach(newProject())).toThrow(/already attached/);
});

test("updateSnapshot delegates to the underlying runner", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.nodejs().attach(project);

  expect(runner.updateSnapshot).toBe(
    NodeNativeTest.of(project)!.updateSnapshot,
  );
});

test("nodejs({ transformTypes: true }) enables source maps and the amaro loader", () => {
  const project = newProject();
  const runner = JavaScriptTestRunner.nodejs({ transformTypes: true }).attach(
    project,
  );

  const nodeNativeTest = NodeNativeTest.of(project)!;
  expect(nodeNativeTest.configFile.config.nodeOptions).toMatchObject({
    enableSourceMaps: true,
    import: ["amaro/transform"],
  });

  const { dependencies } = runner.configFor();
  expect(dependencies).toContainEqual({ name: "amaro" });
});
