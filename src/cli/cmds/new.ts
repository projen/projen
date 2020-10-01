import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import { PROJEN_RC } from '../../common';
import * as inventory from '../../inventory';
import * as logging from '../../logging';
import { synth } from '../synth';

class Command implements yargs.CommandModule {
  public readonly command = 'new PROJECT-TYPE [OPTIONS]';
  public readonly describe = 'Creates a new projen project';

  public builder(args: yargs.Argv) {
    args.option('synth', { type: 'boolean', default: true, desc: 'Synthesize after creating .projenrc.js' });
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

          const params: any = { };
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
                    curr[p] = curr[p] ?? { };
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
    console.log(`Invalid project type ${args.projectType}. Supported types:`);
    for (const pjid of inventory.discover().map(x => x.pjid)) {
      console.log(`  ${pjid}`);
    }
  }
}

function generateProjenConfig(type: inventory.ProjectType, params: any) {
  const lines = [
    `const { ${type.typename} } = require('projen');`,
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

module.exports = new Command();
