import * as glob from 'glob';
import * as fs from 'fs-extra';
import { PROJEN_MARKER } from './common';

export function cleanup() {
  try {
    for (const f of findGeneratedFiles()) {
      fs.removeSync(f);
    }
  } catch (e) {
    console.error(`warning: failed to clean up generated files: ${e.stack}`);
  }
}

function findGeneratedFiles() {
  const ignore = readGitIgnore();

  const files = glob.sync('**', {
    ignore,
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

function readGitIgnore() {
  if (!fs.pathExistsSync('.gitignore')) {
    return [];
  }

  return fs.readFileSync('.gitignore', 'utf-8')
    .split('\n')
    .filter(x => !x.startsWith('#') && !x.startsWith('!'))
    .map(x => `${x}\n${x}/**`)
    .join('\n')
    .split('\n')
}

