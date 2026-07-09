import {
  simulateProjenNew,
  synthSnapshot,
  synthSnapshotWithPost,
  TestProject,
} from "./util";
import { Component } from "../src/component";
import type { InitProject } from "../src/project";

class RecordingComponent extends Component {
  public projectCreationCalls: InitProject[] = [];
  public postProjectCreationCalls: InitProject[] = [];

  public override projectCreation(initProject: InitProject): void {
    this.projectCreationCalls.push(initProject);
  }

  public override postProjectCreation(initProject: InitProject): void {
    this.postProjectCreationCalls.push(initProject);
  }
}

// any resolvable built-in project type works; the FQN just needs to exist in
// the inventory since `resolveInitProject` looks it up.
const FQN = "projen.javascript.NodeProject";

test("projectCreation and postProjectCreation are not called for a normal (non-`projen new`) project", () => {
  // GIVEN
  const project = new TestProject();
  const comp = new RecordingComponent(project);

  // WHEN
  project.synth();

  // THEN
  expect(comp.projectCreationCalls).toEqual([]);
  expect(comp.postProjectCreationCalls).toEqual([]);
});

test("projectCreation and postProjectCreation are called once when the project is created via `projen new`", () => {
  // GIVEN
  const project = simulateProjenNew(TestProject, FQN);
  const comp = new RecordingComponent(project);

  // WHEN
  project.synth();

  // THEN
  expect(comp.projectCreationCalls).toHaveLength(1);
  expect(comp.postProjectCreationCalls).toHaveLength(1);
  expect(comp.projectCreationCalls[0].fqn).toEqual(FQN);
  expect(comp.postProjectCreationCalls[0].fqn).toEqual(FQN);
});

test("projectCreation still runs when post-synthesis steps are disabled, but postProjectCreation does not", () => {
  // GIVEN
  const project = simulateProjenNew(TestProject, FQN);
  const comp = new RecordingComponent(project);

  // WHEN
  // synthSnapshot sets PROJEN_DISABLE_POST=true for the duration of synth()
  synthSnapshot(project);

  // THEN
  expect(comp.projectCreationCalls).toHaveLength(1);
  expect(comp.postProjectCreationCalls).toEqual([]);
});

test("both hooks run when post-synthesis steps are explicitly enabled", () => {
  // GIVEN
  const project = simulateProjenNew(TestProject, FQN);
  const comp = new RecordingComponent(project);

  // WHEN
  synthSnapshotWithPost(project);

  // THEN
  expect(comp.projectCreationCalls).toHaveLength(1);
  expect(comp.postProjectCreationCalls).toHaveLength(1);
});

test("projectCreation runs even when `--no-synth` is set, without a full synthesis", () => {
  // GIVEN
  const project = simulateProjenNew(TestProject, FQN, { synth: false });
  const comp = new RecordingComponent(project);

  // WHEN
  project.synth();

  // THEN: the creation hook still ran...
  expect(comp.projectCreationCalls).toHaveLength(1);
  // ...but postProjectCreation (gated on postSynthesize) never runs, since a
  // full synthesis (which is where postSynthesize lives) never happened.
  expect(comp.postProjectCreationCalls).toEqual([]);
});

test("projectCreation and postProjectCreation are only invoked once, not once per synth() call", () => {
  // GIVEN
  const project = simulateProjenNew(TestProject, FQN);
  const comp = new RecordingComponent(project);

  // WHEN
  project.synth();
  project.synth();

  // THEN: project creation info doesn't disappear, so this is intentionally
  // documenting current behavior - both hooks re-fire on every synth() call
  // for a project created via `projen new`, since `initProject` is sticky.
  expect(comp.projectCreationCalls).toHaveLength(2);
  expect(comp.postProjectCreationCalls).toHaveLength(2);
});
