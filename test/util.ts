import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';
import { Project } from '../src';
import * as logging from '../src/logging';

logging.disable(); // no logging during tests

export interface SynthOutput {
  [filePath: string]: any;
}

export function mkdtemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'projen-test-'));
}

export function synthSnapshot(project: Project) {
  const outdir = mkdtemp();
  try {
    project.synth(outdir);
    return directorySnapshot(outdir);
  } finally {
    fs.removeSync(outdir);
  }
}

function directorySnapshot(root: string) {
  const output: SynthOutput = { };

  const readdir = (relativeDir: string) => {
    const dirPath = path.join(root, relativeDir);
    for (const file of fs.readdirSync(dirPath)) {
      const filePath = path.join(dirPath, file);
      const relPath = path.join(relativeDir, file);

      if (fs.statSync(filePath).isDirectory()) {
        readdir(relPath);
        return;
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