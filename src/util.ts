import * as fs from 'fs-extra';
import * as path from 'path';
import * as child_process from 'child_process';

export function exec(command: string, options?: child_process.ExecSyncOptions) {
  return child_process.execSync(command, {
    stdio: [ 'inherit', 'inherit', 'pipe' ],
    ...options,
  });
}

export function writeFile(filePath: string, data: any, options: { readonly?: boolean } = { }) {
  if (fs.existsSync(filePath)) {
    fs.chmodSync(filePath, '600')
  }

  fs.mkdirpSync(path.dirname(filePath));
  fs.writeFileSync(filePath, data);

  if (options.readonly) {
    fs.chmodSync(filePath, '400')
  }
}