import { join } from "path/posix";
import type { AwsCdkDeps } from "./awscdk-deps";
import type { IntegrationTestBaseOptions } from "../cdk";
import { IntegrationTestBase } from "../cdk";
import { DependencyType } from "../dependencies";
import type { Project } from "../project";
import type { Task } from "../task";

export interface IntegrationTestCommonOptions {
  /**
   * Destroy the test app after a successful deployment. If disabled, leaves the
   * app deployed in the dev account.
   * @default true
   */
  readonly destroyAfterDeploy?: boolean;

  /**
   * Enables path metadata, adding `aws:cdk:path`, with the defining construct's
   * path, to the CloudFormation metadata for each synthesized resource.
   * @default false
   */
  readonly pathMetadata?: boolean;
}

/**
 * Options for `IntegrationTest`.
 */
export interface IntegrationTestOptions
  extends IntegrationTestCommonOptions, IntegrationTestBaseOptions {
  /**
   * A list of stacks within the integration test to deploy/destroy.
   *
   * @default ["**"]
   */
  readonly stacks?: string[];

  /**
   * AWS CDK dependency manager.
   */
  readonly cdkDeps: AwsCdkDeps;
}

/**
 * Cloud integration tests.
 */
export class IntegrationTest extends IntegrationTestBase {
  /**
   * Destroy the integration test resources
   */
  public readonly destroyTask: Task;

  /**
   * The watch task.
   */
  public readonly watchTask: Task;

  constructor(project: Project, options: IntegrationTestOptions) {
    super(project, options);

    project.deps.requestDependency({
      name: "aws-cdk",
      version: options.cdkDeps.cdkCliVersion,
      type: DependencyType.BUILD,
    });

    project.deps.requestDependency({
      name: "ts-node",
      type: DependencyType.BUILD,
    });

    const deployDir = join(this.tmpDir, "deploy.cdk.out");
    const assertDir = join(this.tmpDir, "assert.cdk.out");
    const app = `ts-node -P ${options.tsconfigPath} ${options.entrypoint}`;

    const opts = [
      "--app",
      app,
      "--no-notices",
      "--no-version-reporting",
      // don't inject cloudformation metadata into template
      "--no-asset-metadata",
    ];

    const pathMetadata = options.pathMetadata ?? false;
    if (!pathMetadata) {
      opts.push("--no-path-metadata");
    }

    // Determine which stacks to deploy
    const stacks = options.stacks ?? ["**"];

    this.deployTask.execArgs(["rm", "-fr", deployDir]);
    this.deployTask.execArgs([
      "cdk",
      "deploy",
      ...opts,
      ...stacks,
      "--require-approval=never",
      "-o",
      deployDir,
    ]);

    // if deployment was successful, copy the deploy dir to the expected dir
    this.deployTask.execArgs(["rm", "-fr", this.snapshotDir]);
    this.deployTask.execArgs(["mv", deployDir, this.snapshotDir]);

    this.watchTask = project.addTask(`integ:${this.name}:watch`, {
      description: `watch integration test '${this.name}' (without updating snapshots)`,
      execArgs: ["cdk", "watch", ...opts, ...stacks, "-o", deployDir],
    });

    this.destroyTask = project.addTask(`integ:${this.name}:destroy`, {
      description: `destroy integration test '${this.name}'`,
      execArgs: [
        "cdk",
        "destroy",
        "--app",
        this.snapshotDir,
        ...stacks,
        "--no-version-reporting",
      ],
    });

    const destroyAfterDeploy = options.destroyAfterDeploy ?? true;
    if (destroyAfterDeploy) {
      this.deployTask.spawn(this.destroyTask);
    }

    this.snapshotTask.execArgs([
      "cdk",
      "synth",
      "--quiet",
      ...opts,
      "-o",
      this.snapshotDir,
    ]);

    const exclude = ["asset.*", "cdk.out", "manifest.json", "tree.json"];

    this.assertTask.execArgs([
      "cdk",
      "synth",
      "--quiet",
      ...opts,
      "-o",
      assertDir,
    ]);
    this.assertTask.execArgs([
      "diff",
      "-r",
      ...exclude.flatMap((x) => ["-x", x]),
      `${this.snapshotDir}/`,
      `${assertDir}/`,
    ]);

    // do not commit all files we are excluding
    for (const x of exclude) {
      project.addGitIgnore(`${this.snapshotDir}/${x}`);
      project.addGitIgnore(`${this.snapshotDir}/**/${x}`); // nested assemblies
    }
  }
}
