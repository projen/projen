import { join } from "path/posix";
import { AwsCdkDeps } from "./awscdk-deps";
import { FEATURE_FLAGS_V1 } from "./internal";
import { IntegrationTestBase, IntegrationTestBaseOptions } from "../cdk";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";

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

    if (!project.deps.tryGetDependency("aws-cdk")) {
      project.deps.addDependency(
        `aws-cdk@^${options.cdkDeps.cdkMajorVersion}`,
        DependencyType.BUILD,
      );
    }

    if (!project.deps.tryGetDependency("ts-node")) {
      project.deps.addDependency("ts-node", DependencyType.BUILD);
    }

    const deployDir = join(this.tmpDir, "deploy.cdk.out");
    const assertDir = join(this.tmpDir, "assert.cdk.out");
    const app = `ts-node -P ${options.tsconfigPath} ${options.entrypoint}`;

    const opts = [
      `--app "${app}"`,
      "--no-notices",
      "--no-version-reporting",
      // don't inject cloudformation metadata into template
      "--no-asset-metadata",
    ];

    const pathMetadata = options.pathMetadata ?? false;
    if (!pathMetadata) {
      opts.push("--no-path-metadata");
    }

    if (options.cdkDeps.cdkMajorVersion === 1) {
      // add all feature flags
      const features = {
        ...FEATURE_FLAGS_V1,
        "@aws-cdk/core:newStyleStackSynthesis": true, // simplifies asset coordinates in synth output
      };

      for (const feature of Object.keys(features)) {
        opts.push(`--context ${feature}=true`);
      }
    }

    const cdkopts = opts.join(" ");

    // Determine which stacks to deploy
    const stacks = options.stacks ?? ["**"];
    const stackOpts = stacks.map((stack) => `'${stack}'`).join(" ");

    this.deployTask.exec(`rm -fr ${deployDir}`);
    this.deployTask.exec(
      `cdk deploy ${cdkopts} ${stackOpts} --require-approval=never -o ${deployDir}`,
    );

    // if deployment was successful, copy the deploy dir to the expected dir
    this.deployTask.exec(`rm -fr ${this.snapshotDir}`);
    this.deployTask.exec(`mv ${deployDir} ${this.snapshotDir}`);

    this.watchTask = project.addTask(`integ:${this.name}:watch`, {
      description: `watch integration test '${this.name}' (without updating snapshots)`,
      exec: `cdk watch ${cdkopts} ${stackOpts} -o ${deployDir}`,
    });

    this.destroyTask = project.addTask(`integ:${this.name}:destroy`, {
      description: `destroy integration test '${this.name}'`,
      exec: `cdk destroy --app ${this.snapshotDir} ${stackOpts} --no-version-reporting`,
    });

    const destroyAfterDeploy = options.destroyAfterDeploy ?? true;
    if (destroyAfterDeploy) {
      this.deployTask.spawn(this.destroyTask);
    }

    this.snapshotTask.exec(
      `cdk synth ${cdkopts} -o ${this.snapshotDir} > /dev/null`,
    );

    const exclude = ["asset.*", "cdk.out", "manifest.json", "tree.json"];

    this.assertTask.exec(`cdk synth ${cdkopts} -o ${assertDir} > /dev/null`);
    this.assertTask.exec(
      `diff -r ${exclude.map((x) => `-x ${x}`).join(" ")} ${
        this.snapshotDir
      }/ ${assertDir}/`,
    );

    // do not commit all files we are excluding
    for (const x of exclude) {
      project.addGitIgnore(`${this.snapshotDir}/${x}`);
      project.addGitIgnore(`${this.snapshotDir}/**/${x}`); // nested assemblies
    }
  }
}
