import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import * as inquirer from 'inquirer';
import { StartEntryOptions, StartEntryCategory } from '../start';

const EXIT_MARKER = '$exit';

export async function showStartMenu() {

  const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

  const { command } = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Scripts:',
      choices: renderChoices(manifest),
      pageSize: 100,
      loop: false,
    },
  ]);

  if (command === EXIT_MARKER) {
    return;
  }

  child_process.spawnSync('yarn', [ '-s', command ], { stdio: 'inherit' });
}


function renderChoices(manifest: any) {
  const start: { [name: string]: StartEntryOptions } = manifest.start ?? {};
  const result = new Array();
  let category;

  const width = Math.max(...Object.keys(start).map(k => k.length));

  for (const [k, entry] of Object.entries(start).sort(sortByPriority)) {
    const cat = entry.category ?? StartEntryCategory.MISC;
    if (cat !== category) {
      result.push(new inquirer.Separator('  '));
      result.push(new inquirer.Separator(headingForCategory(cat)));
    }
    category = cat;
    result.push({
      name: `${k.padEnd(width)}   ${entry.descrtiption}`,
      value: k,
      short: entry.descrtiption,
    });
  }

  result.push(new inquirer.Separator('  '));
  result.push({
    name: 'EXIT',
    value: EXIT_MARKER,
  });

  return result;
}

function headingForCategory(category: StartEntryCategory) {
  switch (category) {
    case StartEntryCategory.BUILD: return 'BUILD';
    case StartEntryCategory.TEST: return 'TEST';
    case StartEntryCategory.RELEASE: return 'RELEASE';
    case StartEntryCategory.MAINTAIN: return 'MAINTAIN';
    case StartEntryCategory.MISC:
    default:
      return 'Misc.';
  }
}

function sortByPriority([_1,e1]: [string, StartEntryOptions], [_2,e2]: [string,StartEntryOptions]) {
  const p1 = e1.category ?? StartEntryCategory.MISC;
  const p2 = e2.category ?? StartEntryCategory.MISC;
  if (p1 > p2) return 1;
  if (p1 < p2) return -1;
  return 0;
}