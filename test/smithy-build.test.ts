import { SmithyBuild } from "../src/smithy-build";
import { synthSnapshot, TestProject } from "./util";

test("adds default smithy-build.json file", () => {
  const project = new TestProject();

  new SmithyBuild(project, {});

  const snps = synthSnapshot(project);
  expect(snps["smithy-build.json"].version).toBe("1.0");
});

test("does not add smithy-build.json file by default", () => {
  const project = new TestProject();

  const snps = synthSnapshot(project);
  expect(snps["smithy-build.json"]).toBeUndefined();
});

test("can add imports", () => {
  const project = new TestProject();

  const smithyBuild = new SmithyBuild(project, {});
  smithyBuild.addImport("foo.json");

  const snps = synthSnapshot(project);

  expect(snps["smithy-build.json"].imports).toContain("foo.json");
});

test("can add plugins", () => {
  const project = new TestProject();

  const smithyBuild = new SmithyBuild(project, {});
  smithyBuild.addPlugins({
    "my-plugin": {
      service: "my-service",
    },
  });

  const snps = synthSnapshot(project);

  expect(snps["smithy-build.json"].plugins).toStrictEqual({
    "my-plugin": {
      service: "my-service",
    },
  });
});

test("can add projections", () => {
  const project = new TestProject();

  const smithyBuild = new SmithyBuild(project, {});
  smithyBuild.addProjections({
    testProjection: {
      imports: ["foo.json"],
      transforms: [
        {
          name: "changeTypes",
          args: {},
        },
      ],
    },
  });

  const snps = synthSnapshot(project);

  expect(snps["smithy-build.json"].projections).toStrictEqual({
    testProjection: {
      imports: ["foo.json"],
      transforms: [
        {
          name: "changeTypes",
          args: {},
        },
      ],
    },
  });
});
