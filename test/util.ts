import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { Project } from '../src';
import * as logging from '../src/logging';

logging.disable(); // no logging during tests

export class TestProject extends Project {
  constructor() {
    const tmpdir = mkdtemp();
    super({ outdir: tmpdir });
  }

  postSynthesize() {
    fs.writeFileSync(path.join(this.outdir, '.postsynth'), '# postsynth');
  }
}

export interface SynthOutput {
  [filePath: string]: any;
}

export function mkdtemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'));
}

export function synthSnapshot(project: Project, postSynth: boolean, ...includeFiles: string[]) {
  try {
    process.env.POST_SYNTHESIS_ENABLED = postSynth.toString();
    project.synth();
    return directorySnapshot(project.outdir, includeFiles);
  } finally {
    fs.removeSync(project.outdir);
  }
}

function directorySnapshot(root: string, includeFiles: string[]) {
  const output: SynthOutput = { };

  const readdir = (relativeDir: string) => {
    const dirPath = path.join(root, relativeDir);
    for (const file of fs.readdirSync(dirPath)) {
      const filePath = path.join(dirPath, file);
      const relPath = path.join(relativeDir, file);

      if (fs.statSync(filePath).isDirectory()) {
        readdir(relPath);
        continue;
      }

      if (includeFiles.length > 0 && !includeFiles.includes(relPath)) {
        continue;
      }

      let content;
      if (path.extname(filePath) === '.json') {
        content = fs.readJsonSync(filePath);
      } else {
        content = fs.readFileSync(filePath, 'utf-8');
      }

      output[relPath] = content;
    }
  };

  readdir('.');

  return output;
}