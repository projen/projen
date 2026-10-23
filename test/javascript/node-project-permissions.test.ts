import * as yaml from "yaml";
import { JsiiProject } from "../../src/cdk";
import type { JobPermissions } from "../../src/github/workflows-model";
import { JobPermission } from "../../src/github/workflows-model";
import type { NodeProjectOptions } from "../../src/javascript";
import { CodeArtifactAuthProvider, NodeProject } from "../../src/javascript";
import {
  directorySnapshot,
  mkdtemp,
  synthSnapshot,
  type SynthOutput,
} from "../util";

const codeArtifact: Partial<NodeProjectOptions> = {
  scopedPackagesOptions: [
    {
      scope: "@example",
      registryUrl:
        "https://example-123456789012.d.codeartifact.us-east-1.amazonaws.com/npm/example/",
    },
  ],
  codeArtifactOptions: {
    authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
    roleToAssume: "arn:aws:iam::123456789012:role/example",
  },
};

function project(options: Partial<NodeProjectOptions> = {}) {
  return new NodeProject({
    name: "permissions-test",
    defaultReleaseBranch: "main",
    ...options,
  });
}

function permissions(output: SynthOutput, workflow: string, job: string) {
  return yaml.parse(output[`.github/workflows/${workflow}.yml`]).jobs[job]
    .permissions;
}

function expectMainJobs(output: SynthOutput, extra: Record<string, string>) {
  expect(permissions(output, "build", "build")).toEqual({
    contents: "write",
    ...extra,
  });
  expect(permissions(output, "release", "release")).toEqual({
    contents: "write",
    ...extra,
  });
  expect(permissions(output, "upgrade-main", "upgrade")).toEqual({
    contents: "read",
    ...extra,
  });
}

test("omitted, undefined and empty permissions preserve default synthesis", () => {
  const defaults = synthSnapshot(project());
  expectMainJobs(defaults, {});
  expect(synthSnapshot(project({ workflowPermissions: undefined }))).toEqual(
    defaults,
  );
  expect(synthSnapshot(project({ workflowPermissions: {} }))).toEqual(defaults);
});

test("explicit OIDC permissions reach build, release and upgrade jobs", () => {
  const output = synthSnapshot(
    project({ workflowPermissions: { idToken: JobPermission.WRITE } }),
  );
  expectMainJobs(output, { "id-token": "write" });
});

test.each([JobPermission.NONE, JobPermission.READ, JobPermission.WRITE])(
  "explicit %s permissions override the corresponding job defaults",
  (permission) => {
    const output = synthSnapshot(
      project({
        workflowPermissions: {
          contents: permission,
          packages: permission,
          checks: JobPermission.WRITE,
          idToken: JobPermission.NONE,
        },
      }),
    );
    expectMainJobs(output, {
      contents: permission,
      packages: permission,
      checks: "write",
      "id-token": "none",
    });
  },
);

test.each([codeArtifact, { codeCov: true }])(
  "automatic OIDC permissions survive unrelated and undefined overrides: %j",
  (automaticOptions) => {
    expectMainJobs(synthSnapshot(project(automaticOptions)), {
      "id-token": "write",
    });
    const output = synthSnapshot(
      project({
        ...automaticOptions,
        workflowPermissions: {
          idToken: undefined,
          packages: JobPermission.READ,
        },
      }),
    );
    expectMainJobs(output, { "id-token": "write", packages: "read" });
  },
);

test("an explicit NONE can revoke an automatically inferred permission", () => {
  const output = synthSnapshot(
    project({
      ...codeArtifact,
      workflowPermissions: { idToken: JobPermission.NONE },
    }),
  );
  expectMainJobs(output, { "id-token": "none" });
});

test.each([
  undefined,
  { idToken: JobPermission.WRITE, packages: JobPermission.READ },
])(
  "build-specific permissions remain a complete replacement: %j",
  (workflowPermissions) => {
    const output = synthSnapshot(
      project({
        ...codeArtifact,
        workflowPermissions,
        buildWorkflowOptions: {
          permissions: { contents: JobPermission.READ },
        },
      }),
    );
    expect(permissions(output, "build", "build")).toEqual({
      contents: "read",
    });
    expect(permissions(output, "release", "release")).toEqual({
      contents: "write",
      "id-token": "write",
      ...(workflowPermissions ? { packages: "read" } : {}),
    });
  },
);

test("upgrade-specific permissions merge by field without changing other jobs", () => {
  const workflowPermissions = Object.freeze({
    idToken: JobPermission.WRITE,
    packages: JobPermission.READ,
  });
  const upgradePermissions = Object.freeze({
    idToken: JobPermission.NONE,
    contents: JobPermission.NONE,
    checks: JobPermission.WRITE,
  });
  const output = synthSnapshot(
    project({
      workflowPermissions,
      depsUpgradeOptions: {
        workflowOptions: { permissions: upgradePermissions },
      },
    }),
  );
  expect(permissions(output, "upgrade-main", "upgrade")).toEqual({
    contents: "none",
    "id-token": "none",
    packages: "read",
    checks: "write",
  });
  for (const job of ["build", "release"]) {
    expect(permissions(output, job, job)).toEqual({
      contents: "write",
      "id-token": "write",
      packages: "read",
    });
  }
  expect(workflowPermissions).toEqual({
    idToken: JobPermission.WRITE,
    packages: JobPermission.READ,
  });
  expect(upgradePermissions).toEqual({
    idToken: JobPermission.NONE,
    contents: JobPermission.NONE,
    checks: JobPermission.WRITE,
  });
});

test("permissions apply to every release and upgrade branch", () => {
  const output = synthSnapshot(
    project({
      majorVersion: 2,
      releaseBranches: { "1.x": { majorVersion: 1 } },
      workflowPermissions: { idToken: JobPermission.WRITE },
    }),
  );
  expectMainJobs(output, { "id-token": "write" });
  expect(permissions(output, "release-1.x", "release")).toEqual({
    contents: "write",
    "id-token": "write",
  });
  expect(permissions(output, "upgrade-1.x", "upgrade")).toEqual({
    contents: "read",
    "id-token": "write",
  });
});

test.each([
  { buildWorkflow: false },
  { release: false },
  { depsUpgrade: false },
  { github: false },
])("permissions do not enable disabled workflows: %j", (disabled) => {
  const defaults = synthSnapshot(project(disabled));
  const output = synthSnapshot(
    project({
      ...disabled,
      workflowPermissions: { idToken: JobPermission.WRITE },
    }),
  );
  expect(Object.keys(output)).toEqual(Object.keys(defaults));
});

test("only the main jobs change in jsii projects; package and publish jobs stay unchanged", () => {
  const synth = (workflowPermissions?: JobPermissions) =>
    synthSnapshot(
      new JsiiProject({
        name: "permissions-test",
        defaultReleaseBranch: "main",
        author: "Example",
        authorAddress: "example@example.com",
        repositoryUrl: "https://github.com/example/example.git",
        publishToPypi: { distName: "example", module: "example" },
        workflowPermissions,
      }),
    );
  const defaults = synth();
  const output = synth({ idToken: JobPermission.WRITE });
  expectMainJobs(output, { "id-token": "write" });
  for (const job of ["package-js", "package-python"]) {
    expect(permissions(output, "build", job)).toEqual({ contents: "read" });
  }
  expect(Object.keys(output)).toEqual(Object.keys(defaults));
  const mainJobs: Record<string, string> = {
    ".github/workflows/build.yml": "build",
    ".github/workflows/release.yml": "release",
    ".github/workflows/upgrade-main.yml": "upgrade",
  };
  for (const file of Object.keys(defaults)) {
    if (!file.startsWith(".github/workflows/")) {
      expect(output[file]).toEqual(defaults[file]);
      continue;
    }
    const actual = yaml.parse(output[file]);
    const expected = yaml.parse(defaults[file]);
    const mainJob = mainJobs[file];
    if (mainJob) {
      expect(actual.jobs[mainJob].permissions).toEqual({
        ...expected.jobs[mainJob].permissions,
        "id-token": "write",
      });
      actual.jobs[mainJob].permissions = expected.jobs[mainJob].permissions;
    }
    expect(actual).toEqual(expected);
  }
});

test("repeated synthesis is stable and does not mutate caller permissions", () => {
  const workflowPermissions = Object.freeze({ idToken: JobPermission.WRITE });
  const buildPermissions = Object.freeze({ contents: JobPermission.READ });
  const instance = project({
    outdir: mkdtemp(),
    workflowPermissions,
    buildWorkflowOptions: { permissions: buildPermissions },
  });
  const previous = process.env.PROJEN_DISABLE_POST;
  try {
    process.env.PROJEN_DISABLE_POST = "true";
    instance.synth();
    const first = directorySnapshot(instance.outdir);
    instance.synth();
    expect(directorySnapshot(instance.outdir)).toEqual(first);
    expect(workflowPermissions).toEqual({ idToken: JobPermission.WRITE });
    expect(buildPermissions).toEqual({ contents: JobPermission.READ });
  } finally {
    if (previous === undefined) {
      delete process.env.PROJEN_DISABLE_POST;
    } else {
      process.env.PROJEN_DISABLE_POST = previous;
    }
  }
});
