import { join } from "path";
import { IntegrationTestBase, IntegrationTestBaseOptions } from "../cdk";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { AwsCdkDeps } from "./awscdk-deps";
import { FEATURE_FLAGS } from "./internal";

export interface IntegrationTestCommonOptions {
  /**
   * Destroy the test app after a successful deployment. If disabled, leaves the
   * app deployed in the dev account.
   * @default true
   */
  readonly destroyAfterDeploy?: boolean;
}

/**
 * Options for `IntegrationTest`.
 */
export interface IntegrationTestOptions
  extends IntegrationTestCommonOptions,
    IntegrationTestBaseOptions {
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
  constructor(project: Project, options: IntegrationTestOptions) {
    super(project, options);

    const deployDir = join(this.tmpDir, "deploy.cdk.out");
    const synthDir = join(this.tmpDir, "synth.cdk.out");

    const app = `ts-node -P ${options.tsconfigPath} ${options.entrypoint}`;

    if (!project.deps.tryGetDependency("aws-cdk")) {
      project.deps.addDependency(
        `aws-cdk@^${options.cdkDeps.cdkMajorVersion}`,
        DependencyType.BUILD
      );
    }

    if (!project.deps.tryGetDependency("ts-node")) {
      project.deps.addDependency("ts-node", DependencyType.BUILD);
    }

    const opts = [
      `--app "${app}"`,
      "--no-version-reporting",
      // don't inject cloudformation metadata into template
      "--no-path-metadata",
      "--no-asset-metadata",
    ];

    if (options.cdkDeps.cdkMajorVersion === 1) {
      // add all feature flags
      const features = [
        ...FEATURE_FLAGS,
        "@aws-cdk/core:newStyleStackSynthesis", // simplifies asset coordinates in synth output
      ];

      for (const feature of features) {
        opts.push(`--context ${feature}=true`);
      }
    }

    const cdkopts = opts.join(" ");

    // Determine which stacks to deploy
    const stacks = options.stacks ?? ["**"];
    const stackOpts = stacks.map((stack) => `'${stack}'`).join(" ");

    this.deployTask.exec(`rm -fr ${deployDir}`);
    this.deployTask.exec(
      `cdk deploy ${cdkopts} ${stackOpts} --require-approval=never -o ${deployDir}`
    );

    // if deployment was successful, copy the deploy dir to the expected dir
    this.deployTask.exec(`rm -fr ${this.snapshotDir}`);
    this.deployTask.exec(`mv ${deployDir} ${this.snapshotDir}`);

    this.watchTask.exec(`cdk watch ${cdkopts} ${stackOpts} -o ${deployDir}`);

    this.destroyTask.exec(
      `cdk destroy --app ${this.snapshotDir} ${stackOpts} --no-version-reporting`
    );

    const destroyAfterDeploy = options.destroyAfterDeploy ?? true;
    if (destroyAfterDeploy) {
      this.deployTask.spawn(this.destroyTask);
    }

    const exclude = ["asset.*", "cdk.out", "manifest.json", "tree.json"];

    this.assertTask.exec(`cdk synth ${cdkopts} -o ${synthDir} > /dev/null`);
    this.assertTask.exec(
      `diff -r ${exclude.map((x) => `-x ${x}`).join(" ")} ${
        this.snapshotDir
      }/ ${synthDir}/`
    );

    this.snapshotTask.exec(
      `cdk synth ${cdkopts} -o ${this.snapshotDir} > /dev/null`
    );

    // do not commit all files we are excluding
    for (const x of exclude) {
      project.addGitIgnore(`${this.snapshotDir}/${x}`);
      project.addGitIgnore(`${this.snapshotDir}/**/${x}`); // nested assemblies
    }
  }
}
