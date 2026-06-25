import { join } from "path/posix";
import type { IntegrationTestBaseOptions } from "../cdk";
import { IntegrationTestBase } from "../cdk";
import { DependencyType } from "../dependencies";
import type { Project } from "../project";

/**
 * Options for IntegrationTest
 */
export interface IntegrationTestOptions extends IntegrationTestBaseOptions {}

/**
 * CDK8S integration test.
 */
export class IntegrationTest extends IntegrationTestBase {
  constructor(project: Project, options: IntegrationTestOptions) {
    super(project, options);

    project.deps.requestDependency({
      name: "cdk8s-cli",
      type: DependencyType.BUILD,
    });

    project.deps.requestDependency({
      name: "ts-node",
      type: DependencyType.BUILD,
    });

    const deployDir = join(this.tmpDir, "deploy.cdk.out");
    const assertDir = join(this.tmpDir, "assert.cdk.out");
    const app = `ts-node -P ${options.tsconfigPath} ${options.entrypoint}`;

    // Synth, deploy, and capture the snapshot
    this.deployTask.execArgs(["rm", "-fr", deployDir]);
    this.deployTask.execArgs(["cdk8s", "synth", "--app", app, "-o", deployDir]);
    this.deployTask.execArgs(["kubectl", "apply", "-f", deployDir]);
    // If deployment was successful, copy the deploy dir to the expected dir
    this.deployTask.execArgs(["rm", "-fr", this.snapshotDir]);
    this.deployTask.execArgs(["mv", deployDir, this.snapshotDir]);

    // Run a snapshot
    this.snapshotTask.execArgs(["rm", "-fr", this.snapshotDir]);
    this.snapshotTask.execArgs([
      "cdk8s",
      "synth",
      "--app",
      app,
      "-o",
      this.snapshotDir,
    ]);

    // Assert that the snapshot has not changed (run during tests)
    this.assertTask.exec(
      `cdk8s synth --app "${app}" -o ${assertDir} > /dev/null`,
    );
    this.assertTask.execArgs(["diff", `${this.snapshotDir}/`, `${assertDir}/`]);
  }
}
