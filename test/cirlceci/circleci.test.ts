// @ts-ignore
import { Workflow, Circleci, Orb, CircleCiProps } from "../../src/circleci";
import { synthSnapshot, TestProject } from "../util";

test("workflow needs to have jobs assigned", () => {
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
  // p.synth();

  const snapshot = synthSnapshot(p);
  const circleci = snapshot[".circleci/config.yml"];
  expect(circleci).toMatchSnapshot();
  expect(circleci).toContain("customName2");
  expect(circleci).toContain("context3");
  console.log(circleci);
  // const workflow = new Workflow("test", []);
  // expect(() => circle.addWorkflow(workflow)).toThrowError(
  //   "Workflow must have at least one job"
  // );
});
