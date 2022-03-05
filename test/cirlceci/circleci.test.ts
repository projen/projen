// @ts-ignore
import { Workflow, Circleci, Orb } from "../../src/circleci";
import { TestProject } from "../util";

test("workflow needs to have jobs assigned", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const circle = new Circleci(p);
  const workflow = new Workflow("test", []);
  expect(() => circle.addWorkflow(workflow)).toThrowError(
    "Workflow must have at least one job"
  );
});

test("circleci orbs are added", () => {
  // GIVEN
  const p = new TestProject({
    stale: true,
  });
  const circle = new Circleci(p);
  circle.addOrb(new Orb("cdk", "signavio/cdk-orb", "0.10.8"));
  circle.addOrb(new Orb("some", "stuff", "0.1.2"));
  expect(circle).toHaveProperty("orbs");
  expect(circle).toMatchObject({
    orbs: { cdk: "signavio/cdk-orb@0.10.8", some: "stuff@0.1.2" },
  });
});
