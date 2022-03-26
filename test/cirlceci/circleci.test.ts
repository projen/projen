// @ts-ignore
import { Workflow, Circleci, Orb, CircleCiProps } from "../../src/circleci";
// @ts-ignore
import { synthSnapshot, TestProject } from "../util";

test("additional workflow can be added", () => {
  // GIVEN
  const p = new TestProject();
  const options: CircleCiProps = {
    orbs: {
      hello: "world:2.0",
    },
    workflows: [
      {
        identifier: "workflow1",
        jobs: [
          {
            identifier: "job1",
            context: ["context1"],
          },
          {
            identifier: "job2",
            name: "customName2",
          },
        ],
      },
    ],
  };
  const circle = new Circleci(p, options);
  circle.addWorkflow({
    identifier: "workflow3",
    jobs: [{ identifier: "job3", context: ["context3"] }],
  });
  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("customName2");
  expect(circleci).toContain("context3");
  console.log(circleci);
});

test("orb with the same id can not be added", () => {
  // GIVEN
  const p = new TestProject();
  const options: CircleCiProps = {
    orbs: {
      hello: "world:2.0",
    },
    workflows: [
      {
        identifier: "workflow1",
        jobs: [
          {
            identifier: "job1",
            context: ["context1"],
          },
        ],
      },
    ],
  };
  const circle = new Circleci(p, options);
  expect(() => circle.addOrb("hello", "world:3.0")).toThrowError(
    "Circleci Config already contains an orb named hello."
  );
  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("workflow1");
  expect(circleci).toContain("world:2.0");
  expect(circleci).not.toContain("world:3.0");
  console.log(circleci);
});
