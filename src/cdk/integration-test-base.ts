import { basename, dirname, join } from "path";
import { TYPESCRIPT_INTEG_EXT } from "./internal";
import { Component } from "../component";
import { Project } from "../project";
import { Task } from "../task";

/**
 * Options for IntegrationTest
 */
export interface IntegrationTestBaseOptions {
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

export abstract class IntegrationTestBase extends Component {
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

  /**
   * Temporary directory for each integration test.
   */
  protected readonly tmpDir: string;

  /**
   * Snapshot output directory.
   */
  protected readonly snapshotDir: string;

  /**
   * Integration test name.
   */
  protected readonly name: string;

  constructor(project: Project, options: IntegrationTestBaseOptions) {
    super(project);

    const entry = options.entrypoint;
    const name = options.name ?? basename(entry, TYPESCRIPT_INTEG_EXT);
    this.name = name;
    const dir = dirname(entry);

    const tmpRoot = join(dir, ".tmp");
    project.addGitIgnore(tmpRoot);
    project.addPackageIgnore(tmpRoot);

    this.tmpDir = join(tmpRoot, `${name}.integ`);

    this.snapshotDir = join(dir, `${name}.integ.snapshot`);
    project.addPackageIgnore(this.snapshotDir);

    this.deployTask = project.addTask(`integ:${name}:deploy`, {
      description: `deploy integration test '${name}' and capture snapshot`,
    });

    this.snapshotTask = project.addTask(`integ:${name}:snapshot`, {
      description: `update snapshot for integration test "${name}"`,
    });

    this.assertTask = project.addTask(`integ:${name}:assert`, {
      description: `assert the snapshot of integration test '${name}'`,
      exec: `[ -d "${this.snapshotDir}" ] || (echo "No snapshot available for integration test '${name}'. Run 'projen ${this.deployTask.name}' to capture." && exit 1)`,
    });

    // synth as part of our tests, which means that if outdir changes, anti-tamper will fail
    project.testTask.spawn(this.assertTask);

    let snapshotAllTask = project.tasks.tryFind("integ:snapshot-all");
    if (!snapshotAllTask) {
      snapshotAllTask = project.addTask("integ:snapshot-all", {
        description: "update snapshot for all integration tests",
      });
    }

    // integ:snapshot-all should snapshot all integration tests, including
    // this one.
    snapshotAllTask.spawn(this.snapshotTask);
  }
}
