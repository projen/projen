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

export function execProjenCLI(workdir: string, args: string[] = []) {
  const command = [
    process.execPath,
    PROJEN_CLI,
    ...args,
  ];

  const sCommand = command.map(x => `"${x}"`).join(' ');
  console.log(`${sCommand} [cwd:${workdir}]`);
  return exec(sCommand, { cwd: workdir, stdio: 'inherit' });
}

export interface SynthOutput {
  [filePath: string]: any;
}

const autoRemove = new Set<string>();

// Hook to automatically remove temporary directories without needing each
// place to actually handle this specifically.
afterAll((done) => {
  // Array.from used to get a copy, so we can safely remove from the set
  for (const dir of Array.from(autoRemove)) {
    try {
      // Note - fs-extra.removeSync is idempotent, so we're safe if the
      // directory has already been cleaned up before we get there!
      fs.removeSync(dir);
    } catch (e) {
      done.fail(e);
    }
    autoRemove.delete(dir);
  }
  done();
});

export function mkdtemp() {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'));
  // autoRemove.add(tmpdir);
  return tmpdir;
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
  }); // returns relative file paths with POSIX separators

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
