import { parse } from "yaml";
import {
  DependencyType,
  Project,
  RenovatebotMinimumReleaseAgeBehaviour,
} from "../src";
import { mkdtemp, synthSnapshot, TestProject } from "./util";
import { GitHub, GitHubProject, GithubWorkflow } from "../src/github";
import { TypeScriptProject } from "../src/typescript";
import { directorySnapshot } from "../src/util/synth";

describe("renovatebot", () => {
  test("renovatebot: true creates renovatebot configuration", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toMatchSnapshot();
  });

  test("renovatebot: will ignore deps added later", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
    });
    p.deps.addDependency("test@1.0.0", DependencyType.RUNTIME);

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "test",
      "projen",
      "amannn/action-semantic-pull-request",
    ]);
  });

  test("renovatebot: will ignore workflow actions", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
      github: true,
      githubOptions: {
        workflows: true,
      },
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "projen",
      "amannn/action-semantic-pull-request",
    ]);
  });

  test("renovatebot: will ignore reusable workflow versions", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
      github: true,
      githubOptions: {
        workflows: true,
      },
    });

    const workflow = p.github?.addWorkflow("self-added");
    workflow?.addJob("actions", {
      permissions: {},
      uses: "own-org/reusable-workflows/.github/workflows/testing.yaml@v1",
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "projen",
      "amannn/action-semantic-pull-request",
      "own-org/reusable-workflows/.github/workflows/testing.yaml",
    ]);
  });

  test("renovatebot: will ignore workflow actions created manually", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
      github: true,
      githubOptions: {
        workflows: true,
      },
    });

    const workflow = p.github?.addWorkflow("self-added");
    workflow?.addJob("actions", {
      permissions: {},
      steps: [
        {
          name: "checkout",
          uses: "actions/checkout@v4",
        },
        {
          name: "cache",
          uses: "actions/cache@v4",
        },
      ],
    });
    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"]).toHaveProperty("ignoreDeps", [
      "projen",
      "amannn/action-semantic-pull-request",
      "actions/checkout",
      "actions/cache",
    ]);
  });

  test.each([
    { workflows: true, force: false, standalone: false },
    { workflows: false, force: true, standalone: false },
    { workflows: false, force: false, standalone: false },
    { workflows: true, force: false, standalone: true },
    { workflows: false, force: true, standalone: true },
  ])(
    "renovatebot: discovers emitted workflows ($workflows, $force, $standalone)",
    ({ workflows, force, standalone }) => {
      const renovatebotOptions = {
        ignore: ["custom-ignore", "custom-ignore"],
        ignoreProjen: false,
      };
      const options = {
        name: "workflow-project",
        outdir: mkdtemp(),
        renovatebot: true,
        renovatebotOptions,
      };
      const githubOptions = { workflows, pullRequestLint: false };
      const p = standalone
        ? new Project(options)
        : new GitHubProject({ ...options, githubOptions });
      const github = standalone ? new GitHub(p, githubOptions) : GitHub.of(p)!;
      const later = new GithubWorkflow(github, "z-manual", {
        force,
        fileName: "manual.yaml",
      });
      later.addJob("actions", {
        permissions: {},
        steps: [
          { uses: "actions/checkout@v4" },
          { uses: "actions/checkout@v3" },
          { run: "echo hello" },
          { uses: "./.github/actions/local" },
          { uses: "docker://alpine:3" },
        ],
      });
      later.addJob("reusable", {
        permissions: {},
        uses: "example/workflows/.github/workflows/test.yaml@v1",
      });
      const earlier = new GithubWorkflow(github, "a-manual", { force });
      earlier.addJob("actions", {
        permissions: {},
        steps: [{ uses: "actions/setup-node@v4" }],
      });
      earlier.addJob("reusable", {
        permissions: {},
        uses: "example/workflows/.github/workflows/test.yaml@v2",
      });

      expect(github.workflows).toEqual([earlier, later]);
      p.synth();
      const first = directorySnapshot(p.outdir, { supportJsonComments: true });
      const emitted = workflows || force;
      if (emitted) {
        expect(later.file).toBeDefined();
        expect(
          parse(first[".github/workflows/manual.yaml"]).jobs,
        ).toMatchObject({
          actions: {
            steps: [
              { uses: "actions/checkout@v4" },
              { uses: "actions/checkout@v3" },
              { run: "echo hello" },
              { uses: "./.github/actions/local" },
              { uses: "docker://alpine:3" },
            ],
          },
          reusable: {
            uses: "example/workflows/.github/workflows/test.yaml@v1",
          },
        });
        expect(
          parse(first[".github/workflows/a-manual.yml"]).jobs,
        ).toHaveProperty("actions.steps.0.uses", "actions/setup-node@v4");
      } else {
        expect(later.file).toBeUndefined();
        expect(earlier.file).toBeUndefined();
        expect(first).not.toHaveProperty(".github/workflows/manual.yaml");
        expect(first).not.toHaveProperty(".github/workflows/a-manual.yml");
      }
      expect(first["renovate.json5"].ignoreDeps).toEqual([
        "custom-ignore",
        ...(emitted
          ? [
              "actions/setup-node",
              "actions/checkout",
              "./.github/actions/local",
              "docker://alpine:3",
              "example/workflows/.github/workflows/test.yaml",
            ]
          : []),
      ]);
      p.synth();
      expect(
        directorySnapshot(p.outdir, { supportJsonComments: true }),
      ).toEqual(first);
      expect(renovatebotOptions).toEqual({
        ignore: ["custom-ignore", "custom-ignore"],
        ignoreProjen: false,
      });
    },
  );

  test.each([false, true])(
    "renovatebot: handles no workflows (github: %s)",
    (github) => {
      const p = new GitHubProject({
        name: "no-workflows",
        github,
        githubOptions: { pullRequestLint: false },
        renovatebot: true,
      });
      const snapshot = synthSnapshot(p);
      expect(
        Object.keys(snapshot).filter((file) =>
          file.startsWith(".github/workflows/"),
        ),
      ).toEqual([]);
      expect(snapshot["renovate.json5"].ignoreDeps).toEqual(["projen"]);
    },
  );

  test.each([{ ignoreDeps: [] }, { ignoreDeps: ["override-ignore"] }])(
    "renovatebot: explicit ignoreDeps overrides forced workflow ignores (%j)",
    ({ ignoreDeps }) => {
      const overrideConfig = { ignoreDeps };
      const originalConfig = { ignoreDeps: [...ignoreDeps] };
      const p = new GitHubProject({
        name: "override-workflows",
        githubOptions: { workflows: false },
        renovatebot: true,
        renovatebotOptions: { overrideConfig },
      });
      const workflow = new GithubWorkflow(p.github!, "forced", { force: true });
      workflow.addJob("actions", {
        permissions: {},
        steps: [{ uses: "actions/checkout@v4" }],
      });
      const snapshot = synthSnapshot(p);
      expect(snapshot[".github/workflows/forced.yml"]).toBeDefined();
      expect(snapshot["renovate.json5"].ignoreDeps).toEqual(
        originalConfig.ignoreDeps,
      );
      expect(overrideConfig).toEqual(originalConfig);
    },
  );

  test("renovatebot: collects workflows within the owning project", () => {
    const parent = new GitHubProject({
      name: "parent",
      githubOptions: { pullRequestLint: false },
      renovatebot: true,
    });
    const child = new GitHubProject({
      name: "child",
      parent,
      outdir: "child",
      github: true,
      githubOptions: { workflows: false },
      renovatebot: true,
    });
    for (const p of [parent, child]) {
      const workflow = new GithubWorkflow(p.github!, "manual", { force: true });
      workflow.addJob("actions", {
        permissions: {},
        steps: [{ uses: `${p.name}/action@v1` }],
      });
    }
    const snapshot = synthSnapshot(parent);
    expect(snapshot[".github/workflows/manual.yml"]).toBeDefined();
    expect(snapshot["child/.github/workflows/manual.yml"]).toBeDefined();
    expect(snapshot["renovate.json5"].ignoreDeps).toEqual([
      "projen",
      "parent/action",
    ]);
    expect(snapshot["child/renovate.json5"].ignoreDeps).toEqual([
      "projen",
      "child/action",
    ]);
  });

  test("renovatebot: override renovatebot configuration", () => {
    // GIVEN
    const overrideConfig = {
      prHourlyLimit: 10,
      schedule: [],
      packageRules: [],
      labels: [],
      ignoreDeps: [],
      extends: ["customExtend"],
    };
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        marker: false,
        labels: ["renotate", "dependencies"],
        overrideConfig: overrideConfig,
      },
    });

    // WHEN
    const snapshot = synthSnapshot(p)["renovate.json5"];

    // THEN
    expect(snapshot).toMatchSnapshot();
    expect(snapshot).toStrictEqual(overrideConfig);
  });

  test("renovatebot: no minimumReleaseAge by default", () => {
    const p = new TestProject({ renovatebot: true });
    const snapshot = synthSnapshot(p);
    expect(snapshot["renovate.json5"]).not.toHaveProperty("minimumReleaseAge");
  });

  test("renovatebot: sets minimumReleaseAge", () => {
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        minimumReleaseAge: "3 days",
      },
    });
    const snapshot = synthSnapshot(p);
    expect(snapshot["renovate.json5"]).toHaveProperty(
      "minimumReleaseAge",
      "3 days",
    );
  });

  test("renovatebot: sets minimumReleaseAgeBehaviour", () => {
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        minimumReleaseAge: "3 days",
        minimumReleaseAgeBehaviour:
          RenovatebotMinimumReleaseAgeBehaviour.TIMESTAMP_OPTIONAL,
      },
    });
    const snapshot = synthSnapshot(p);
    expect(snapshot["renovate.json5"]).toHaveProperty(
      "minimumReleaseAgeBehaviour",
      "timestamp-optional",
    );
  });

  test("renovatebot: can use file escape hatch", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
      renovatebotOptions: {
        labels: ["renotate", "dependencies"],
      },
    });

    // THEN
    expect(p.tryFindObjectFile("renovate.json5")).toBeDefined();
  });

  test("renovatebot: adds customManagers:biomeVersions when biome is configured", () => {
    // GIVEN
    const p = new TypeScriptProject({
      name: "test-project",
      defaultReleaseBranch: "main",
      renovatebot: true,
      biome: true,
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"].extends).toContain(
      "customManagers:biomeVersions",
    );
  });

  test("renovatebot: does not add customManagers:biomeVersions when biome is not configured", () => {
    // GIVEN
    const p = new TestProject({
      renovatebot: true,
    });

    // WHEN
    const snapshot = synthSnapshot(p);

    // THEN
    expect(snapshot["renovate.json5"].extends).not.toContain(
      "customManagers:biomeVersions",
    );
  });
});
