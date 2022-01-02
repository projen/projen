import { NodeProject } from "../src/javascript";
import { GitClientHook, Husky } from "../src/javascript/husky";
import { synthSnapshot } from "./util";

describe("husky", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      husky: true,
    });
    const project2 = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      husky: true,
    });
    // THEN
    expect(synthSnapshot(project)[".husky/pre-commit"]).toMatchSnapshot();
    expect(synthSnapshot(project2)[".husky/commit-msg"]).toMatchSnapshot();
  });

  test("throw Error on child project", () => {
    // GIVEN
    const parent = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });
    const child = new NodeProject({
      name: "child",
      defaultReleaseBranch: "main",
      outdir: "childDir",
      parent: parent,
    });

    // THEN
    expect(() => new Husky(child)).toThrowError(
      /Husky can only be configured on the root project/
    );
  });

  test("new hook files are only created on demand", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      husky: true,
      huskyPremadeHooks: { enforceConventialCommits: false, lintStaged: false },
    });
    // WHEN
    project.husky?.addHookCommands(GitClientHook.PRE_REBASE, ["echo foo"]);
    // THEN
    expect(project.husky?.tryFindHook(GitClientHook.PRE_REBASE)).toBeDefined();
    expect(
      project.husky?.tryFindHook(GitClientHook.PRE_COMMIT)
    ).not.toBeDefined();
  });
});
