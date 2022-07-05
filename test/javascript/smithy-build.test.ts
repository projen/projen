import { SmithyBuild } from "../../src/javascript/smithy-build";
import { synthSnapshot, TestProject } from "../util";

test("no bugs field present", () => {
  const project = new TestProject();

  new SmithyBuild(project, {});

  const snps = synthSnapshot(project);
  expect(snps["smithy-build.json"].version).toBe("1.0");
});
