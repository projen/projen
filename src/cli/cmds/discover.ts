import { execSync } from 'child_process';
import * as path from 'path';
import { Readable } from 'stream';
import * as zlib from 'zlib';
import * as fs from 'fs-extra';
import * as tar from 'tar-fs';
import * as yargs from 'yargs';

import { JsiiType } from '../../inventory';

// const decamelize = require('decamelize');

const targetTmp = './tmp';

class Command implements yargs.CommandModule {
  public readonly command = 'discover NPM-MODULE';
  public readonly describe = 'Discovers project types from remote npm packages';

  public builder(args: yargs.Argv) {
    return args;
  }

  async handler(opts: any) {
    const module = opts.npmModule;
    const packageDir = await downloadExtractRemoteModule(module);
    const libDir = path.join(__dirname, '..', '..');

    const externalJsii: { [name: string]: JsiiType } = fs.readJsonSync(path.join(packageDir, '.jsii')).types;

    const projenJsonPath = path.join(__dirname, '..', '..', '..', '.jsii');
    const projenJsii = fs.readJsonSync(projenJsonPath);
    const projenTypes: { [name: string]: JsiiType } = projenJsii.types;

    let projectFound = false;
    let assembly = '';

    // TODO: Check this against the inventory types as well? To make sure it's a proper subtype?
    for (const [fqn, typeinfo] of Object.entries(externalJsii)) {
      if (!isProjenType(fqn, externalJsii, projenJsii)) continue;

      assembly = typeinfo.assembly ?? '';
      projenTypes[fqn] = typeinfo;
      projectFound = true;
    }

    if (projectFound) {
      const assemblyFilePath = path.join(packageDir, 'lib', 'index.js');
      const assemblyTypesFilePath = path.join(packageDir, 'lib', 'index.d.ts');

      fs.copyFileSync(assemblyFilePath, path.join(libDir, `${assembly}.js`));
      fs.copyFileSync(assemblyTypesFilePath, path.join(libDir, `${assembly}.d.ts`));

      fs.appendFileSync(path.join(libDir, 'index.js'), `\n__exportStar(require('./${assembly}'), exports);`);
      fs.appendFileSync(path.join(libDir, 'index.d.ts'), `\nexport * from './${assembly}';`);
    }

    fs.writeJSONSync(projenJsonPath, projenJsii);
    cleanup();
  }
}

async function downloadExtractRemoteModule(module: string): Promise<string> {
  const output = execSync(`npm pack ${module}`, { stdio: ['inherit', 'pipe', 'ignore'] });

  const baseDir = process.cwd();
  const packageZip = path.join(baseDir, output.toString('utf-8').trim());

  const fileData = fs.readFileSync(packageZip);
  const tarData = zlib.gunzipSync(fileData);

  // Readable.from() doesn't work in TS?
  // const stream = Readable.from(tarData);
  // stream.pipe(tar.extract(target),); // consume the stream

  const readable = new Readable();
  readable._read = () => { }; // _read is required but you can noop it
  readable.push(tarData);
  readable.push(null);

  await new Promise((resolve, reject) => {
    // consume the stream
    readable.pipe(
      tar.extract(targetTmp)
        .on('finish', resolve)
        .on('error', reject),
    );
  });

  fs.removeSync(packageZip);

  return path.join(baseDir, targetTmp, 'package');
}

function cleanup() {
  const baseDir = process.cwd();
  const tmpDir = path.join(baseDir, targetTmp);
  fs.removeSync(tmpDir);
}

function isProjenType(fqn: string, externalJsii: { [name: string]: JsiiType }, projenJsii: { [name: string]: JsiiType }) {
  const type = externalJsii[fqn];

  if (type.kind !== 'class') {
    return false;
  }
  if (type.abstract) {
    return false;
  }

  if (type.docs?.deprecated) {
    return false;
  }

  let curr = type;
  while (true) {
    if (curr.fqn === 'projen.Project') {
      return true;
    }

    if (!curr.base) {
      return false;
    }

    curr = projenJsii[curr.base];
    if (!curr) {
      return false;
    }
  }
}


module.exports = new Command();