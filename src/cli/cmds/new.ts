import { execSync } from 'child_process';
import * as path from 'path';
import { Readable } from 'stream';
import * as zlib from 'zlib';
import * as fs from 'fs-extra';
import * as tar from 'tar-fs';
import * as yargs from 'yargs';
import { PROJEN_RC } from '../../common';
import * as inventory from '../../inventory';
import * as logging from '../../logging';
import { synth } from '../synth';

const targetTmp = './tmp';

class Command implements yargs.CommandModule {
  // public readonly command = 'new PROJECT-TYPE [OPTIONS]';
  public readonly command = 'new [PROJECT-TYPE] [OPTIONS]';
  public readonly describe = 'Creates a new projen project';

  public builder(args: yargs.Argv) {
    args.positional('PROJECT-TYPE', { describe: 'Required if --from is not specified', type: 'string' });
    args.option('synth', { type: 'boolean', default: true, desc: 'Synthesize after creating .projenrc.js' });
    args.option('from', { type: 'string', alias: 'f', desc: 'External jsii npm module to create project from' });
    args.option('name', { type: 'string', alias: 'n', desc: 'Name of project type if module contains more than one project type' });
    for (const type of inventory.discover()) {
      args.command(type.pjid, type.docs ?? '', {
        builder: cargs => {
          cargs.showHelpOnFail(true);

          for (const option of type.options ?? []) {
            if (option.type !== 'string' && option.type !== 'number' && option.type !== 'boolean') {
              continue;
            }

            let desc = [option.docs?.replace(/\ *\.$/, '') ?? ''];

            const required = !option.optional;
            let defaultValue;

            if (option.default && option.default !== 'undefined') {
              if (!required) {
                // if the field is not required, just describe the default but don't actually assign a value
                desc.push(`(default: ${option.default.replace(/^\ +\-/, '')})`);
              } else {
                // if the field is required and we have a default, then assign the value here
                defaultValue = processDefault(option.default);
              }
            }

            cargs.option(option.switch, {
              group: required ? 'Required:' : 'Optional:',
              type: option.type,
              description: desc.join(' '),
              default: defaultValue,
              required,
            });
          }

          return cargs;
        },

        handler: argv => {

          // fail if .projenrc.js already exists
          if (fs.existsSync(PROJEN_RC)) {
            logging.error(`Directory already contains ${PROJEN_RC}`);
            process.exit(1);
          }

          const params: any = {};
          for (const [key, value] of Object.entries(argv)) {
            for (const opt of type.options) {
              if (opt.switch === key) {
                let curr = params;
                const queue = [...opt.path];
                while (true) {
                  const p = queue.shift();
                  if (!p) {
                    break;
                  }
                  if (queue.length === 0) {
                    curr[p] = value;
                  } else {
                    curr[p] = curr[p] ?? {};
                    curr = curr[p];
                  }
                }

              }
            }
          }

          generateProjenConfig(type, params);
          logging.info(`Created ${PROJEN_RC} for ${type.typename}`);

          if (argv.synth) {
            synth();
          }
        },
      });
    }

    return args;
  }

  public async handler(args: any) {
    if (args.from && args.from !== '') {
      try {
        return await handleFromNPM(args);
      } catch (err) {
        logging.error(err);
        process.exit(1);
      }
    } else {
      yargs.showHelp();
    }
  }
}

function generateProjenConfig(type: inventory.ProjectType, params: any, moduleName: string = 'projen') {
  const lines = [
    `const { ${type.typename} } = require('${moduleName}');`,
    '',
    `const project = new ${type.typename}(${renderParams(params)});`,
    '',
    'project.synth();',
    '',
  ];

  fs.writeFileSync(PROJEN_RC, lines.join('\n'));
}

function renderParams(params: any) {
  return JSON.stringify(params, undefined, 2)
    .replace(/\"(.*)\":/g, '$1:'); // remove quotes from field names
}

function processDefault(value: string) {
  const basedir = path.basename(process.cwd());
  const userEmail = execOrUndefined('git config --get --global user.email') ?? 'user@domain.com';

  switch (value) {
    case '$BASEDIR': return basedir;
    case '$GIT_REMOTE': return execOrUndefined('git remote get-url origin') ?? `https://github.com/${userEmail?.split('@')[0]}/${basedir}.git`;
    case '$GIT_USER_NAME': return execOrUndefined('git config --get --global user.name');
    case '$GIT_USER_EMAIL': return userEmail;
    default:
      return value;
  }
}

function execOrUndefined(command: string): string | undefined {
  try {
    const value = execSync(command, { stdio: ['inherit', 'pipe', 'ignore'] }).toString('utf-8').trim();
    if (!value) { return undefined; } // an empty string is the same as undefined
    return value;
  } catch {
    return undefined;
  }
}

async function handleFromNPM(args: any) {
  const modulePath = args.from;
  const moduleName = modulePath.split('/').slice(-1)[0].trim().split('@')[0].trim(); // Example: ./cdk-project/dist/js/cdk-project@1.0.0.jsii.tgz
  const packageDir = await downloadExtractRemoteModule(modulePath);

  const externalJsii: { [name: string]: inventory.JsiiType } = fs.readJsonSync(path.join(packageDir, '.jsii')).types;

  const projects = inventory.discoverRemote(externalJsii);
  if (projects.length < 1) {
    logging.error('No projects found in remote module');
    cleanup();
    process.exit(1);
  }

  let type: inventory.ProjectType | undefined = projects[0];

  if (projects.length > 1) {
    const projectName = args.name;
    if (!projectName) {
      logging.error('Multiple projects found in package. Please specify a project name with --name option');
      cleanup();
      process.exit(1);
    }

    type = projects.find(project => project.typename === '');
    if (!type) {
      logging.error(`Project with name ${projectName} not found.`);
      cleanup();
      process.exit(1);
    }
  }

  const params: any = {};

  for (const [key, value] of Object.entries(args)) {
    for (const opt of type.options) {
      if (opt.type !== 'string' && opt.type !== 'number' && opt.type !== 'boolean') {
        continue;
      }

      if (opt.switch === key) {
        let curr = params;
        const queue = [...opt.path];
        while (true) {
          const p = queue.shift();
          if (!p) {
            break;
          }
          if (queue.length === 0) {
            curr[p] = value;
          } else {
            curr[p] = curr[p] ?? {};
            curr = curr[p];
          }
        }
      } else {
        const required = !opt.optional;
        if (opt.default && opt.default !== 'undefined') {
          if (required) {
            // if the field is required and we have a default, then assign the value here
            params[opt.name] = processDefault(opt.default);
          }
        }
      }
    }
  }

  params.devDeps = [modulePath];

  console.log('PARAMS');
  console.log(params);

  // TODO: Move this up
  // fail if .projenrc.js already exists
  if (fs.existsSync(PROJEN_RC)) {
    logging.error(`Directory already contains ${PROJEN_RC}`);
    process.exit(1);
  }

  generateProjenConfig(type, params, moduleName);
  logging.info(`Created ${PROJEN_RC} for ${type.typename}`);

  cleanup();
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

module.exports = new Command();
