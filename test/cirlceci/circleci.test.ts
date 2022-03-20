// @ts-ignore
import { Workflow, Circleci, Orb, CircleciOptions } from "../../src/circleci";
import { synthSnapshot, TestProject } from "../util";

test("workflow needs to have jobs assigned", () => {
  // GIVEN
  const p = new TestProject({});
  const options: CircleciOptions = {
    orbs: {
      hello: "world:2.0",
    },
    workflows: {
      "cdk-diff": {
        jobs: [
          {
            job1: {
              name: "namedJob1",
              requires: ["req1", "req2"],
            },
          },
        ],
      },
    },
  };
  const circle = new Circleci(p, options);
  console.log(circle.printDebug());
  const snapshot = synthSnapshot(p);
  console.log(snapshot);
  // circle.addWorkflow({
  //   identifier: "workflow2",
  //   jobs: [{ identifier: "job2", context: ["context2"] }],
  // });
  // const workflow = new Workflow("test", []);
  // expect(() => circle.addWorkflow(workflow)).toThrowError(
  //   "Workflow must have at least one job"
  // );
});
