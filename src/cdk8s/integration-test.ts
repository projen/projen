import { basename, dirname, join } from "path";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { Project } from "../project";
import { Task } from "../task";
import { TYPESCRIPT_INTEG_EXT } from "./internal";

/**
 * Options for IntegrationTest
 */
export interface IntegrationTestOptions {
  /**
   * Name of the integration test
   * @default - Derived from the entrypoint filename.
   */
  readonly name?: string;

  /**
   * A path from the project root directory to a TypeScript file which contains
   * the integration test app.
   *
   * This is relative to the root directory of the project.
   *
   * @example "test/subdir/foo.integ.ts"
   */
  readonly entrypoint: string;

  /**
   * The path of the tsconfig.json file to use when running integration test cdk apps.
   */
  readonly tsconfigPath: string;
}

/**
 * CDK8S integration test.
 */
export class IntegrationTest extends Component {
  /**
   * Deploy the integration test and update the snapshot upon success.
   */
  public readonly deployTask: Task;

  /**
   * Synthesizes the integration test and compares against a local copy (runs during build).
   */
  public readonly assertTask: Task;

  /**
   * Just update snapshot (without deployment).
   */
  public readonly snapshotTask: Task;

  constructor(project: Project, options: IntegrationTestOptions) {
    super(project);

    const entry = options.entrypoint;
    const name = options.name ?? basename(entry, TYPESCRIPT_INTEG_EXT);
    const dir = dirname(entry);

    const tmpDir = join(dir, ".tmp");
    project.addGitIgnore(tmpDir);
    project.addPackageIgnore(tmpDir);

    const deployDir = join(tmpDir, `${name}.integ`, "deploy.cdk.out");
    const assertDir = join(tmpDir, `${name}.integ`, "synth.cdk.out");
    const snapshotDir = join(dir, `${name}.integ.snapshot`);

    const app = `ts-node -P ${options.tsconfigPath} ${options.entrypoint}`;

    if (!project.deps.tryGetDependency("cdk8s-cli")) {
      project.deps.addDependency(`cdk8s-cli`, DependencyType.BUILD);
    }

    if (!project.deps.tryGetDependency("ts-node")) {
      project.deps.addDependency("ts-node", DependencyType.BUILD);
    }

    const deployTask = project.addTask(`integ:${name}:deploy`, {
      description: `deploy integration test '${name}' and capture snapshot`,
    });
    deployTask.exec(`rm -fr ${deployDir}`);
    deployTask.exec(`cdk8s synth --app "${app}" -o ${deployDir}`);
    deployTask.exec(`kubectl apply -f ${deployDir}`);
    // if deployment was successful, copy the deploy dir to the expected dir
    deployTask.exec(`rm -fr ${snapshotDir}`);
    deployTask.exec(`mv ${deployDir} ${snapshotDir}`);

    const snapshotTask = project.addTask(`integ:${name}:snapshot`, {
      description: `update snapshot for integration test "${name}"`,
    });
    snapshotTask.exec(`rm -fr ${snapshotDir}`);
    snapshotTask.exec(`cdk8s synth --app "${app}" -o ${snapshotDir}`);

    const assertTask = project.addTask(`integ:${name}:assert`, {
      description: `assert the snapshot of integration test '${name}'`,
    });
    project.testTask.spawn(assertTask);

    assertTask.exec(
      `[ -d "${snapshotDir}" ] || (echo "No snapshot available for integration test '${name}'. Run 'projen ${deployTask.name}' to capture." && exit 1)`
    );
    assertTask.exec(`cdk8s synth --app "${app}" -o ${assertDir} > /dev/null`);
    assertTask.exec(`diff ${snapshotDir}/ ${assertDir}/`);

    let snapshotAllTask = project.tasks.tryFind("integ:snapshot-all");
    if (!snapshotAllTask) {
      snapshotAllTask = project.addTask("integ:snapshot-all", {
        description: "update snapshot for all integration tests",
      });
    }
    snapshotAllTask.spawn(snapshotTask);

    this.deployTask = deployTask;
    this.snapshotTask = snapshotTask;
    this.assertTask = assertTask;
  }
}
