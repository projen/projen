import { basename, dirname, join } from 'path';
import { Component } from '../component';
import { DependencyType } from '../dependencies';
import { Project } from '../project';
import { Task } from '../task';
import { FEATURE_FLAGS, TYPESCRIPT_INTEG_EXT } from './internal';

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
export interface IntegrationTestOptions extends IntegrationTestCommonOptions {
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
 * Cloud integration tests.
 */
export class IntegrationTest extends Component {
  /**
   * Deploy the integration test and update the snapshot upon success.
   */
  public readonly deployTask: Task;

  /**
   * Destroys a deployed stack.
   */
  public readonly destroyTask: Task;

  /**
   * Synthesizes the integration test and compares against a local copy (runs during build).
   */
  public readonly assertTask: Task;

  /**
   * Just update snapshot (without deployment).
   */
  public readonly snapshotTask: Task;

  /**
   * The watch task.
   */
  public readonly watchTask: Task;

  constructor(project: Project, options: IntegrationTestOptions) {
    super(project);
    const entry = options.entrypoint;
    const name = basename(entry, TYPESCRIPT_INTEG_EXT);
    const dir = dirname(entry);

    const deploydir = join(dir, '.tmp', `${name}.integ`, 'deploy.cdk.out');
    const actualdir = join(dir, '.tmp', `${name}.integ`, 'synth.cdk.out');
    const snapshotdir = join(dir, `${name}.integ.snapshot`);

    const app = `ts-node ${entry} -P ${options.tsconfigPath}`;

    if (!project.deps.getDependency('ts-node')) {
      project.deps.addDependency('ts-node', DependencyType.BUILD);
    }

    const opts = [
      `--app "${app}"`,
      '--no-version-reporting',
    ];

    // add all feature flags
    const features = [
      ...FEATURE_FLAGS,
      '@aws-cdk/core:newStyleStackSynthesis', // simplifies asset coordinates in synth output
    ];

    for (const feature of features) {
      opts.push(`--context ${feature}=true`);
    }

    const cdkopts = opts.join(' ');

    const deployTask = project.addTask(`integ:${name}:deploy`, {
      description: `deploy integration test '${name}' and capture snapshot`,
    });

    deployTask.exec(`rm -fr ${deploydir}`);
    deployTask.exec(`cdk deploy ${cdkopts} --require-approval=never -o ${deploydir}`);

    // if deployment was successful, copy the deploy dir to the expected dir
    deployTask.exec(`rm -fr ${snapshotdir}`);
    deployTask.exec(`mv ${deploydir} ${snapshotdir}`);

    const watchTask = project.addTask(`integ:${name}:watch`, {
      description: `watch integration test '${name}' (without updating snapshots)`,
      exec: `cdk watch ${cdkopts} -o ${deploydir}`,
    });

    const destroyTask = project.addTask(`integ:${name}:destroy`, {
      description: `destroy integration test '${name}'`,
      exec: `cdk destroy --app ${snapshotdir} --no-version-reporting`,
    });

    const destroyAfterDeploy = options.destroyAfterDeploy ?? true;
    if (destroyAfterDeploy) {
      deployTask.spawn(destroyTask);
    }

    const exclude = ['asset.*', 'cdk.out', 'manifest.json', 'tree.json'];

    const assertTask = project.addTask(`integ:${name}:assert`, {
      description: `assert the snapshot of integration test '${name}'`,
    });

    assertTask.exec(`[ -d "${snapshotdir}" ] || (echo "No snapshot available for integration test '${name}'. Run 'projen ${deployTask.name}' to capture." && exit 1)`);
    assertTask.exec(`cdk synth ${cdkopts} -o ${actualdir} > /dev/null`);
    assertTask.exec(`diff -r ${exclude.map(x => `-x ${x}`).join(' ')} ${snapshotdir}/ ${actualdir}/`);

    const snapshotTask = project.addTask(`integ:${name}:snapshot`, {
      description: `update snapshot for integration test "${name}"`,
      exec: `cdk synth ${cdkopts} -o ${snapshotdir} > /dev/null`,
    });

    // synth as part of our tests, which means that if outdir changes, anti-tamper will fail
    project.testTask.spawn(assertTask);
    project.addGitIgnore(`!${snapshotdir}`); // commit outdir to git but not assets

    // do not commit all files we are excluding
    for (const x of exclude) {
      project.addGitIgnore(`${snapshotdir}/${x}`);
      project.addGitIgnore(`${snapshotdir}/**/${x}`); // nested assemblies
    }

    project.addGitIgnore(deploydir);
    project.addPackageIgnore(deploydir);
    project.addGitIgnore(actualdir);
    project.addPackageIgnore(actualdir);

    // commit the snapshot (but not into the tarball)
    project.addGitIgnore(`!${snapshotdir}`);
    project.addPackageIgnore(snapshotdir);

    this.deployTask = deployTask;
    this.assertTask = assertTask;
    this.destroyTask = destroyTask;
    this.snapshotTask = snapshotTask;
    this.watchTask = watchTask;
  }
}