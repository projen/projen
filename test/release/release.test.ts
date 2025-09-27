import * as YAML from "yaml";
import { Project } from "../../src";
import { JobPermission, JobStep } from "../../src/github/workflows-model";
import { NodeProject } from "../../src/javascript";
import {
  Publisher,
  Release,
  ReleaseTrigger,
  CodeArtifactAuthProvider,
} from "../../src/release";
import { synthSnapshot, TestProject } from "../util";

describe("Single Project", () => {
  test("minimal", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("with major version filter", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "10.x",
      majorVersion: 10,
      releaseWorkflowName: "release",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toBeDefined();
    expect(outdir).toMatchSnapshot();
  });

  test("with release tag prefix", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "10.x",
      majorVersion: 10,
      releaseTagPrefix: "prefix/",
      releaseWorkflowName: "release",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toBeDefined();
    expect(outdir).toMatchSnapshot();
  });

  test("with bumpPackage", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "10.x",
      artifactsDirectory: "dist",
      bumpPackage: "MY-BUMP",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".projen/tasks.json"].tasks.bump.env.BUMP_PACKAGE).toEqual(
      "MY-BUMP"
    );
  });

  test("with nextVersionCommand", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "10.x",
      artifactsDirectory: "dist",
      nextVersionCommand: "NEXT-VERSION-COMMAND",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(
      outdir[".projen/tasks.json"].tasks.bump.env.NEXT_VERSION_COMMAND
    ).toEqual("NEXT-VERSION-COMMAND");
  });

  test("nextVersionCommand and minMajorVersion do not go together", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    expect(() => {
      new Release(project, {
        task: project.buildTask,
        versionFile: "version.json",
        branch: "10.x",
        artifactsDirectory: "dist",
        nextVersionCommand: "NEXT-VERSION-COMMAND",
        minMajorVersion: 10,
      });
    }).toThrow(
      /minMajorVersion and nextVersionCommand cannot be used together/
    );
  });

  test("addBranch() can be used for additional release branches", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.addBranch("2.x", { majorVersion: 2 });
    release.addBranch("10.x", { majorVersion: 10 });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toBeDefined();
    expect(outdir[".github/workflows/release-2.x.yml"]).toBeDefined();
    expect(outdir[".github/workflows/release-10.x.yml"]).toBeDefined();
    expect(outdir).toMatchSnapshot();
  });

  test('if multiple branches are defined, the default branch requires a "majorVersion"', () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    const addBranch = () => release.addBranch("2.x", { majorVersion: 2 });

    // THEN
    expect(addBranch).toThrow(
      /you must specify \"majorVersion\" for the default branch when adding multiple release branches/
    );
  });

  test("publisher (defaults)", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true,
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo();
    release.publisher.publishToMaven();
    release.publisher.publishToNpm();
    release.publisher.publishToNuget();
    release.publisher.publishToPyPi();

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toMatchSnapshot();
    expect(outdir[".projen/tasks.json"]).toMatchSnapshot();
  });

  test("publishers are added as jobs to all release workflows", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.addBranch("2.x", { majorVersion: 2 });
    release.publisher.publishToNpm();

    // THEN
    const outdir = synthSnapshot(project);
    const wf1 = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(wf1).toMatchObject({
      on: { push: { branches: ["main"] } },
      jobs: {
        release: {
          steps: expect.any(Array),
        },
        release_npm: {},
      },
    });
    expect(wf1.jobs.release.steps.length).toBe(7);
    const wf2 = YAML.parse(outdir[".github/workflows/release-2.x.yml"]);
    expect(wf2).toMatchObject({
      on: { push: { branches: ["2.x"] } },
      jobs: {
        release: {
          steps: expect.any(Array),
        },
        release_npm: {},
      },
    });
    expect(wf2.jobs.release.steps.length).toBe(7);
  });

  test("manual releases do not generate a release workflow", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseTrigger: ReleaseTrigger.manual(),
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toBeUndefined();
  });

  test("releaseSchedule schedules releases", () => {
    // GIVEN
    const schedule = "0 17 * * *";
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseEveryCommit: false,
      releaseSchedule: schedule,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const wf1 = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(wf1).toMatchObject({
      on: {
        schedule: expect.arrayContaining([{ cron: schedule }]),
      },
    });
  });

  test("continuous release on every push", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseTrigger: ReleaseTrigger.continuous(),
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow).toMatchObject({
      on: {
        push: {
          branches: ["main"],
        },
      },
    });
    expect(workflow.on.push.paths).toBeUndefined();
  });

  test("continuous release on pushes to certain paths", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseTrigger: ReleaseTrigger.continuous({ paths: ["sub/**"] }),
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow).toMatchObject({
      on: {
        push: {
          branches: ["main"],
          paths: ["sub/**"],
        },
      },
    });
  });

  test("workflowDispatch only leads to workflow dispatch trigger", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseTrigger: ReleaseTrigger.workflowDispatch(),
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    expect(workflow).toMatchObject({
      on: {
        workflow_dispatch: {},
      },
    });
  });

  test("manual release publish happens after anti-tamper check", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseTrigger: ReleaseTrigger.manual(),
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const steps: Object[] = outdir[".projen/tasks.json"].tasks.release.steps;
    const antiTamperStepIndex = steps.findIndex(
      (obj: any) => obj.exec === Release.ANTI_TAMPER_CMD
    );
    const publishGitStepIndex = steps.findIndex(
      (obj: any) => obj.spawn === Publisher.PUBLISH_GIT_TASK_NAME
    );
    expect(publishGitStepIndex).toBeGreaterThan(antiTamperStepIndex);
  });

  test("manual release with custom git-push", () => {
    // GIVEN
    const project = new TestProject();
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseTrigger: ReleaseTrigger.manual({
        gitPushCommand: "git push --follow-tags -o ci.skip origin main",
      }),
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    const steps =
      outdir[".projen/tasks.json"].tasks[Publisher.PUBLISH_GIT_TASK_NAME].steps;
    expect(steps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          exec: "git push --follow-tags -o ci.skip origin main",
        }),
      ])
    );
  });

  test("addJobs() can be used to add arbitrary jobs to the release workflows", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 0,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    release.addBranch("foo", { majorVersion: 4, workflowName: "foo-workflow" });
    release.publisher.publishToPyPi();

    // WHEN
    release.addJobs({
      random_job: {
        runsOn: ["foo"],
        permissions: {
          actions: JobPermission.NONE,
        },
        steps: [],
      },
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("majorVersion can be 0", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "goo.json",
      branch: "main",
      majorVersion: 0,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toMatchSnapshot();
    expect(outdir[".projen/tasks.json"]).toMatchSnapshot();
  });

  test("minMajorVersion can be 1", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "goo.json",
      branch: "main",
      minMajorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".projen/tasks.json"]).toMatchSnapshot();
  });

  test("prerelease can be specified per branch", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "goo.json",
      branch: "main",
      majorVersion: 0,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    release.addBranch("10.x", { majorVersion: 10, prerelease: "pre" });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toMatchSnapshot();
    expect(outdir[".github/workflows/release.10.x.yml"]).toMatchSnapshot();
    expect(outdir[".projen/tasks.json"]).toMatchSnapshot();
  });

  test("releaseBranches can be use to define additional branches", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "goo.json",
      branch: "main",
      majorVersion: 1,
      releaseBranches: {
        "3.x": { majorVersion: 3 },
        next: { majorVersion: 4, prerelease: "pre" },
      },
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("releaseBranches can be defined with different tag prefixes to the same major version", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "goo.json",
      branch: "firefox",
      majorVersion: 1,
      releaseWorkflowName: "release-firefox",
      releaseTagPrefix: "firefox/",
      releaseBranches: {
        safari: { majorVersion: 1, tagPrefix: "safari/" },
      },
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("releaseBranches as an array throws an error since type was changed", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    expect(
      () =>
        new Release(project, {
          task: project.buildTask,
          versionFile: "goo.json",
          branch: "main",
          majorVersion: 1,
          releaseBranches: ["10.x", "2.x"] as any,
          artifactsDirectory: "dist",
        })
    ).toThrow(
      /\"releaseBranches\" is no longer an array. See type annotations/
    );
  });

  test("github packages are supported by npm, maven, and nuget", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      registry: "npm.pkg.github.com",
    });
    release.publisher.publishToMaven({
      mavenRepositoryUrl: "maven.pkg.github.com",
    });
    release.publisher.publishToNuget({
      nugetServer: "nuget.pkg.github.com",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("can enable issue creation on failed releases with a custom label", () => {
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      releaseFailureIssue: true,
      releaseFailureIssueLabel: "custom-label",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      registry: "npm.pkg.github.com",
    });

    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toMatchSnapshot();
  });

  test("AWS CodeArtifact is supported by npm and pypi", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      registry:
        "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
    });
    release.publisher.publishToPyPi({
      twineRegistryUrl:
        "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/pypi/my_repo/",
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("AWS CodeArtifact is supported by npm and pypi with AWS access keys", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      registry:
        "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        accessKeyIdSecret: "OTHER_AWS_ACCESS_KEY_ID",
        secretAccessKeySecret: "OTHER_AWS_SECRET_ACCESS_KEY",
      },
    });
    release.publisher.publishToPyPi({
      twineRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/pypi/my_repo/",
      codeArtifactOptions: {
        accessKeyIdSecret: "OTHER_AWS_ACCESS_KEY_ID",
        secretAccessKeySecret: "OTHER_AWS_SECRET_ACCESS_KEY",
      },
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("AWS CodeArtifact is supported with role to assume", () => {
    // GIVEN
    const project = new TestProject();
    const roleArn = "role-arn";

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      registry:
        "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        roleToAssume: roleArn,
      },
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("AWS CodeArtifact is supported with Github OIDC auth", () => {
    // GIVEN
    const project = new TestProject();
    const roleArn = "role-arn";

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToNpm({
      registry:
        "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        roleToAssume: roleArn,
        authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
      },
    });
    release.publisher.publishToPyPi({
      twineRegistryUrl:
        "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/pypi/my_repo/",
      codeArtifactOptions: {
        roleToAssume: roleArn,
        authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
      },
    });

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir).toMatchSnapshot();
  });

  test("can be modified with escape hatches", () => {
    // GIVEN
    const project = new TestProject();
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    project
      .github!.tryFindWorkflow("release")!
      .file!.addOverride("jobs.release.env.FOO", "VALUE1");
    project
      .github!.tryFindWorkflow("release")!
      .file!.addOverride("jobs.release_github.env.BAR", "VALUE2");

    // THEN
    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/release.yml"]).toContain("FOO: VALUE1");
    expect(outdir[".github/workflows/release.yml"]).toContain("BAR: VALUE2");
    expect(outdir).toMatchSnapshot();
  });

  test("publisher can use custom github runner", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      workflowRunsOn: ["self-hosted"],
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo();
    release.publisher.publishToMaven();
    release.publisher.publishToNpm();
    release.publisher.publishToNuget();
    release.publisher.publishToPyPi();

    // THEN
    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);
    for (let job of Object.keys(workflow.jobs)) {
      expect(workflow.jobs[job]["runs-on"]).toEqual("self-hosted");
    }
  });

  test("ability to add post release steps in release workflow with publishToGitHubReleases", () => {
    // GIVEN
    const project = new TestProject({});

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    release.publisher.publishToGitHubReleases({
      postPublishSteps: [
        {
          name: "Add additional content",
          run: `gh release upload $(cat dist/releasetag.txt) 'dist/js/example-*.tgz'`,
        },
      ],
      changelogFile: "changelog.md",
      releaseTagFile: "releasetag.txt",
      versionFile: "version.txt",
    });

    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);

    // Expect the last element to be the post step added
    const githubReleaseJobSteps = workflow.jobs.release_github
      .steps as Array<JobStep>;
    expect(githubReleaseJobSteps[githubReleaseJobSteps.length - 1]).toEqual({
      name: "Add additional content",
      run: `gh release upload $(cat dist/releasetag.txt) 'dist/js/example-*.tgz'`,
    });
  });

  test("ability to add post release steps in release workflow with addGitHubPostPublishingSteps", () => {
    // GIVEN
    const project = new TestProject({});

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
    });

    release.publisher.addGitHubPostPublishingSteps({
      name: "Add additional content",
      run: `gh release upload $(cat dist/releasetag.txt) 'dist/js/example-*.tgz'`,
    });

    const outdir = synthSnapshot(project);
    const workflow = YAML.parse(outdir[".github/workflows/release.yml"]);

    // Expect the last element to be the post step added
    const githubReleaseJobSteps = workflow.jobs.release_github
      .steps as Array<JobStep>;
    expect(githubReleaseJobSteps[githubReleaseJobSteps.length - 1]).toEqual({
      name: "Add additional content",
      run: `gh release upload $(cat dist/releasetag.txt) 'dist/js/example-*.tgz'`,
    });
  });

  describe("npmDistTag", () => {
    test("determines npm dist-tag used in the workflow", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const release = new Release(project, {
        releaseBranches: {
          "main-3": { majorVersion: 3, npmDistTag: "latest-3" },
        },
        branch: "main",
        majorVersion: 1,
        task: project.buildTask,
        versionFile: "version.json",
        publishTasks: true, // to increase coverage
        artifactsDirectory: "dist",
      });

      release.publisher.publishToNpm();

      // THEN
      const files = synthSnapshot(project);
      const main = YAML.parse(files[".github/workflows/release.yml"]);
      const main3 = YAML.parse(files[".github/workflows/release-main-3.yml"]);
      expect(main.jobs.release_npm.steps[3].env).toStrictEqual({
        NPM_DIST_TAG: "latest",
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
      });
      expect(main3.jobs.release_npm.steps[3].env).toStrictEqual({
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        NPM_DIST_TAG: "latest-3",
      });
    });

    test("the dist-tag for the default branch is set at the root", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const release = new Release(project, {
        releaseBranches: {
          "main-3": { majorVersion: 3, npmDistTag: "latest-3" },
        },
        branch: "main",
        majorVersion: 1,
        npmDistTag: "main-tag",
        task: project.buildTask,
        versionFile: "version.json",
        publishTasks: true, // to increase coverage
        artifactsDirectory: "dist",
      });

      release.publisher.publishToNpm();

      // THEN
      const files = synthSnapshot(project);
      const main = YAML.parse(files[".github/workflows/release.yml"]);
      const main3 = YAML.parse(files[".github/workflows/release-main-3.yml"]);
      expect(main.jobs.release_npm.steps[3].env).toStrictEqual({
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        NPM_DIST_TAG: "main-tag",
      });
      expect(main3.jobs.release_npm.steps[3].env).toStrictEqual({
        NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
        NPM_DIST_TAG: "latest-3",
      });
    });

    test("if branch-level dist-tag is set, then publishToNpm cannot specify dist-tag", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const release = new Release(project, {
        releaseBranches: {
          "main-3": { majorVersion: 3, npmDistTag: "latest-3" },
        },
        branch: "main",
        majorVersion: 1,
        task: project.buildTask,
        versionFile: "version.json",
        publishTasks: true, // to increase coverage
        artifactsDirectory: "dist",
      });

      release.publisher.publishToNpm({ distTag: "next" });

      expect(() => project.synth()).toThrow(
        /cannot set branch-level npmDistTag and npmDistTag in publishToNpm/
      );
    });
  });

  test("if npmProvenance is enabled, environment variable is set and id-token write permission is granted", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    release.publisher.publishToNpm({
      npmProvenance: true,
    });

    // THEN
    const files = synthSnapshot(project);
    const releaseWorkflow = YAML.parse(files[".github/workflows/release.yml"]);

    expect(releaseWorkflow.jobs.release_npm.steps[3].env).toStrictEqual({
      NPM_CONFIG_PROVENANCE: "true",
      NPM_DIST_TAG: "latest",
      NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
    });

    expect(releaseWorkflow.jobs.release_npm.permissions).toStrictEqual({
      contents: "read",
      "id-token": "write",
    });
  });

  test("if npmTrustedPublishing is enabled, no token is set and id-token write permission is granted", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    release.publisher.publishToNpm({
      trustedPublishing: true,
      npmProvenance: false,
    });

    // THEN
    const files = synthSnapshot(project);
    const releaseWorkflow = YAML.parse(files[".github/workflows/release.yml"]);

    expect(releaseWorkflow.jobs.release_npm.steps[3].env).toStrictEqual({
      NPM_DIST_TAG: "latest",
      NPM_TRUSTED_PUBLISHER: "true",
    });

    expect(releaseWorkflow.jobs.release_npm.permissions).toStrictEqual({
      contents: "read",
      "id-token": "write",
    });
  });

  test("if publishTasks is disabled, no publish tasks are created", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      workflowRunsOn: ["self-hosted"],
      artifactsDirectory: "dist",
    });

    // WHEN
    release.publisher.publishToGo();
    release.publisher.publishToMaven();
    release.publisher.publishToNpm();
    release.publisher.publishToNuget();
    release.publisher.publishToPyPi();

    // THEN
    const files = synthSnapshot(project);
    const tasks = files[".projen/tasks.json"].tasks;
    expect(
      Object.keys(tasks).filter((t) => t.startsWith("publish:")).length
    ).toBe(0);
  });

  test("dryRun", () => {
    // GIVEN
    const project = new TestProject();

    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      artifactsDirectory: "dist",
      publishDryRun: true,
    });

    // WHEN
    release.publisher.publishToGo();
    release.publisher.publishToMaven();
    release.publisher.publishToNpm();
    release.publisher.publishToNuget();
    release.publisher.publishToPyPi();

    // THEN
    const files = synthSnapshot(project);
    const releaseWorkflow = YAML.parse(files[".github/workflows/release.yml"]);
    const releaseJobs = Object.keys(releaseWorkflow.jobs).filter((name) =>
      name.startsWith("release_")
    );
    for (const name of releaseJobs) {
      const job = releaseWorkflow.jobs[name];
      expect(
        job.steps.slice(-1)[0].run.startsWith('echo "DRY RUN:')
      ).toBeTruthy();
    }
  });
});

describe("Subproject", () => {
  test("require rootProject to be a GitHub Project in order to create release workflow", () => {
    // GIVEN
    const rootProject = new Project({
      name: "parent",
    });
    const project = new TestProject({
      parent: rootProject,
      outdir: "packages/subproject",
    });

    // WHEN

    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
      releaseTagPrefix: "my-project@", // to avoid conflicts with the root project
    });

    const outdir = synthSnapshot(rootProject);

    expect(outdir[".github/workflows/release_my-project.yml"]).toBeUndefined();
  });

  test("require rootProject to have github enabled in order to create release workflow", () => {
    // GIVEN
    const rootProject = new NodeProject({
      name: "parent",
      defaultReleaseBranch: "main",
      github: false,
    });
    const project = new TestProject({
      parent: rootProject,
      outdir: "packages/subproject",
    });

    // WHEN

    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
      releaseTagPrefix: "my-project@", // to avoid conflicts with the root project
    });

    const outdir = synthSnapshot(rootProject);

    expect(outdir[".github/workflows/release_my-project.yml"]).toBeUndefined();
  });

  test("rootProject should contain release_my-project.yml", () => {
    // GIVEN
    const rootProject = new NodeProject({
      defaultReleaseBranch: "main",
      name: "parent",
    });
    const subprojectOutdir = "packages/subproject";
    const project = new TestProject({
      parent: rootProject,
      github: true,
      outdir: subprojectOutdir,
    });

    // WHEN
    const artifactsDirectory = "dist";
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory,
      releaseTagPrefix: "my-project@", // to avoid conflicts with the root project
    });

    const outdir = synthSnapshot(rootProject);

    const subprojectReleaseWorkflowAsString =
      outdir[".github/workflows/release_my-project.yml"];

    expect(subprojectReleaseWorkflowAsString).toBeDefined();
    const subprojectReleaseWorkflow = YAML.parse(
      subprojectReleaseWorkflowAsString
    );
    expect(
      subprojectReleaseWorkflow.jobs.release.defaults.run["working-directory"]
    ).toEqual(`./${subprojectOutdir}`);
    expect(
      subprojectReleaseWorkflow.jobs.release.steps.find(
        (step: any) => step.name === "Upload artifact"
      ).with.path
    ).toEqual(`${subprojectOutdir}/${artifactsDirectory}`);

    expect(subprojectReleaseWorkflowAsString).toMatchSnapshot();
  });

  test("childProject should contain no github workflows", () => {
    // GIVEN
    const rootProject = new NodeProject({
      defaultReleaseBranch: "main",
      name: "parent",
    });
    const project = new TestProject({
      parent: rootProject,
      outdir: "packages/subproject",
    });

    // WHEN
    new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
      releaseTagPrefix: "my-project@", // to avoid conflicts with the root project
    });

    const outdir = synthSnapshot(project);
    expect(outdir[".github/workflows/pull-request-lint.yml"]).toBeUndefined();
    expect(outdir[".github/workflows/release_my-project.yml"]).toBeUndefined();
  });
});

describe("python", () => {
  test("if trustedPublishing is enabled, api token is minted and id-token write permission is granted", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    release.publisher.publishToPyPi({
      trustedPublishing: true,
    });

    // THEN
    const files = synthSnapshot(project);
    const releaseWorkflow = YAML.parse(files[".github/workflows/release.yml"]);

    // Find the Release step (it should be the step with name "Release")
    const releaseStep = releaseWorkflow.jobs.release_pypi.steps.find(
      (step: any) => step.name === "Release"
    );
    expect(releaseStep).toMatchObject({
      name: "Release",
      run: expect.any(String),
      env: {
        PYPI_TRUSTED_PUBLISHER: "true",
      },
    });

    expect(releaseWorkflow.jobs.release_pypi.permissions).toStrictEqual({
      contents: "read",
      "id-token": "write",
    });
  });
});

describe("nuget", () => {
  test("if trustedPublishing is enabled, api token is minted and id-token write permission is granted", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const release = new Release(project, {
      task: project.buildTask,
      versionFile: "version.json",
      branch: "main",
      majorVersion: 1,
      publishTasks: true, // to increase coverage
      artifactsDirectory: "dist",
    });

    release.publisher.publishToNuget({
      trustedPublishing: true,
    });

    // THEN
    const files = synthSnapshot(project);
    const releaseWorkflow = YAML.parse(files[".github/workflows/release.yml"]);

    // Find the Release step (it should be the step with name "Release")
    const releaseStep = releaseWorkflow.jobs.release_nuget.steps.find(
      (step: any) => step.name === "Release"
    );
    expect(releaseStep).toMatchObject({
      name: "Release",
      run: expect.any(String),
      env: {
        NUGET_TRUSTED_PUBLISHER: "true",
        NUGET_USERNAME: "${{ secrets.NUGET_USERNAME }}",
      },
    });

    expect(releaseWorkflow.jobs.release_nuget.permissions).toStrictEqual({
      contents: "read",
      "id-token": "write",
    });
  });
});
