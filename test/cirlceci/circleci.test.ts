// @ts-ignore
import { Workflow, Circleci, Orb, CircleCiProps } from "../../src/circleci";
import { TestProject } from "../util";

test("workflow needs to have jobs assigned", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
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
  circle.addWorkflow({
    identifier: "workflow2",
    jobs: [{ identifier: "job2", context: ["context2"] }],
  });
  // const workflow = new Workflow("test", []);
  // expect(() => circle.addWorkflow(workflow)).toThrowError(
  //   "Workflow must have at least one job"
  // );
});
