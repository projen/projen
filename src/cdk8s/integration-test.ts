import { join } from "path/posix";
import { IntegrationTestBaseOptions, IntegrationTestBase } from "../cdk";
import { DependencyType } from "../dependencies";
import { Project } from "../project";

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

    if (!project.deps.tryGetDependency("cdk8s-cli")) {
      project.deps.addDependency(`cdk8s-cli`, DependencyType.BUILD);
    }

    if (!project.deps.tryGetDependency("ts-node")) {
      project.deps.addDependency("ts-node", DependencyType.BUILD);
    }

    const deployDir = join(this.tmpDir, "deploy.cdk.out");
    const assertDir = join(this.tmpDir, "assert.cdk.out");
    const app = `ts-node -P ${options.tsconfigPath} ${options.entrypoint}`;

    // Synth, deploy, and capture the snapshot
    this.deployTask.exec(`rm -fr ${deployDir}`);
    this.deployTask.exec(`cdk8s synth --app "${app}" -o ${deployDir}`);
    this.deployTask.exec(`kubectl apply -f ${deployDir}`);
    // If deployment was successful, copy the deploy dir to the expected dir
    this.deployTask.exec(`rm -fr ${this.snapshotDir}`);
    this.deployTask.exec(`mv ${deployDir} ${this.snapshotDir}`);

    // Run a snapshot
    this.snapshotTask.exec(`rm -fr ${this.snapshotDir}`);
    this.snapshotTask.exec(`cdk8s synth --app "${app}" -o ${this.snapshotDir}`);

    // Assert that the snapshot has not changed (run during tests)
    this.assertTask.exec(
      `cdk8s synth --app "${app}" -o ${assertDir} > /dev/null`,
    );
    this.assertTask.exec(`diff ${this.snapshotDir}/ ${assertDir}/`);
  }
}
