import { StandardProject, TaskRuntime, Testing } from "../src";

test("renovatebot: true creates renovatebot configuration", () => {
  // GIVEN
  const p = new StandardProject({
    name: "my-project",
    renovatebot: true,
    renovatebotOptions: {
      labels: ["renotate", "dependencies"],
    },
  });

  // WHEN
  const snapshot = Testing.synth(p);

  // THEN
  expect(snapshot["renovate.json5"]).toMatchSnapshot();
});

test("default tasks", () => {
  // GIVEN
  const p = new StandardProject({ name: "my-project" });

  // THEN
  const snapshot = Testing.synth(p);
  expect(snapshot[TaskRuntime.MANIFEST_FILE]).toMatchSnapshot();
});

test("tasks can be added via addTask", () => {
  // GIVEN
  const p = new StandardProject({ name: "my-project" });

  // WHEN
  p.addTask("custom-task");

  // THEN
  const snapshot = Testing.synth(p);
  expect(snapshot[TaskRuntime.MANIFEST_FILE].tasks["custom-task"]).toEqual({
    name: "custom-task",
  });
});

test("tasks can be removed via removeTask", () => {
  // GIVEN
  const p = new StandardProject({ name: "my-project" });

  // WHEN
  p.addTask("custom-task");
  p.removeTask("custom-task");

  // THEN
  const snapshot = Testing.synth(p);
  expect(
    snapshot[TaskRuntime.MANIFEST_FILE].tasks["custom-task"]
  ).toBeUndefined();
});

test("exposes dependencies", () => {
  // GIVEN
  const p = new StandardProject({ name: "my-project" });

  // THEN
  expect(p.deps).toBeDefined();
});
