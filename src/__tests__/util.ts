import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { glob } from 'glob';
import { LogLevel, Project, ProjectOptions } from '..';
import * as logging from '../logging';
import { exec } from '../util';

const PROJEN_CLI = require.resolve('../../bin/projen');

logging.disable(); // no logging during tests

export class TestProject extends Project {
  constructor(options: Omit<ProjectOptions, 'name'> = {}) {
    const tmpdir = mkdtemp();
    super({
      name: 'my-project',
      outdir: tmpdir,
      clobber: false,
      logging: {
        level: LogLevel.OFF,
      },
      ...options,
    });
  }

  postSynthesize() {
    fs.writeFileSync(path.join(this.outdir, '.postsynth'), '# postsynth');
  }
}

export function execProjenCLI(workdir: string, args: string[]) {
  const command = [
    process.execPath,
    PROJEN_CLI,
    ...args,
  ];
  return exec(command.join(' '), { cwd: workdir });
}

export interface SynthOutput {
  [filePath: string]: any;
}

export function mkdtemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'));
}

export function synthSnapshot(project: Project): any {
  const ENV_PROJEN_DISABLE_POST = process.env.PROJEN_DISABLE_POST;
  try {
    process.env.PROJEN_DISABLE_POST = 'true';
    project.synth();
    return directorySnapshot(project.outdir);
  } finally {
    fs.removeSync(project.outdir);

    // values assigned to process.env.XYZ are automatically converted to strings
    if (ENV_PROJEN_DISABLE_POST === undefined) {
      delete process.env.PROJEN_DISABLE_POST;
    } else {
      process.env.PROJEN_DISABLE_POST = ENV_PROJEN_DISABLE_POST;
    }
  }
}

export function synthSnapshotWithPost(project: Project) {
  try {
    project.synth();
    return directorySnapshot(project.outdir);
  } finally {
    fs.removeSync(project.outdir);
  }
}

export interface DirectorySnapshotOptions {
  /**
   * Globs of files to exclude.
   * @default [] include all files
   */
  readonly excludeGlobs?: string[];
}

export function directorySnapshot(root: string, options: DirectorySnapshotOptions = { }) {
  const output: SynthOutput = { };

  const files = glob.sync('**', {
    ignore: options.excludeGlobs ?? [],
    cwd: root,
    nodir: true,
    dot: true,
  });

  for (const file of files) {
    const filePath = path.join(root, file);

    let content;
    if (path.extname(filePath) === '.json') {
      content = fs.readJsonSync(filePath);
    } else {
      content = fs.readFileSync(filePath, 'utf-8');
    }

    output[file] = content;
  }

  return output;
}