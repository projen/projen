import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import { PROJEN_MARKER } from './common';
import * as logging from './logging';

export function cleanup(dir: string) {
  try {
    for (const f of findGeneratedFiles(dir)) {
      fs.removeSync(f);
    }
  } catch (e) {
    logging.warn(`warning: failed to clean up generated files: ${e.stack}`);
  }
}

function findGeneratedFiles(dir: string) {
  const ignore = [...readGitIgnore(dir), 'node_modules/**'];

  const files = glob.sync('**', {
    ignore,
    cwd: dir,
    dot: true,
    nodir: true,
  });

  const generated = new Array<string>();

  for (const file of files) {

    const contents = fs.readFileSync(file, 'utf-8');

    if (contents.includes(PROJEN_MARKER)) {
      generated.push(file);
    }
  }

  return generated;
}

function readGitIgnore(dir: string) {
  const filepath = path.join(dir, '.gitignore');
  if (!fs.pathExistsSync(filepath)) {
    return [];
  }

  return fs.readFileSync(filepath, 'utf-8')
    .split('\n')
    .filter(x => !x.startsWith('#') && !x.startsWith('!'))
    .map(x => `${x}\n${x}/**`)
    .join('\n')
    .split('\n')
}

