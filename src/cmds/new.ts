import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import * as path from 'path';
import { PROJEN_RC } from '../common';
import * as inventory from '../inventory';

const projen = path.dirname(require.resolve('../../package.json'));
export const templatesPath = path.join(projen, 'templates');
export const availableTemplates = fs.readdirSync(templatesPath);

class Command implements yargs.CommandModule {
  public readonly command = 'new PROJECT-TYPE [OPTIONS]';
  public readonly describe = 'Creates a new projen project';

  public builder(args: yargs.Argv) {
    for (const type of inventory.discover()) {
      args.command(type.pjid, type.docs ?? '', {
        builder: args => {
          args.showHelpOnFail(true);

          for (const option of type.options ?? []) {
            if (option.type !== 'string' && option.type !== 'number' && option.type !== 'boolean') {
              continue;
            }

            let desc = [ option.docs?.replace(/\ *\.$/, '') ?? '' ];

            if (option.default && option.default !== 'undefined') {
              desc.push(`(default: ${option.default.replace(/^\ +\-/, '')})`);
            }

            const required = !option.optional;

            args.option(option.switch, {
              group: required ? 'Required:' : 'Optional:',
              type: option.type,
              description: desc.join(' '),
              required,
            });
          }

          return args;
        },
        handler: args => {

          // fail if .projenrc.js already exists
          if (fs.existsSync(PROJEN_RC)) {
            console.error(`Directory already contains ${PROJEN_RC}`);
            process.exit(1);
          }

          const params: any = { };
          for (const [ key, value ] of Object.entries(args)) {
            for (const opt of type.options) {
              if (opt.switch === key) {
                let curr = params;
                const queue = [ ...opt.path ];
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

          console.error(`Project config created for "${type.typename}" project in ${PROJEN_RC}.`);
          console.error('Now run `npx projen && yarn install` (or `pj` if you are one of the cool kids with an alias).');
        },
      });
    }

    return args;
  }

  public async handler(args: any) {
    console.log({args});
  }
}

function generateProjenConfig(type: inventory.ProjectType, params: any) {
  const lines = [
    `const { ${type.typename} } = require('projen');`,
    '',
    `const project = new ${type.typename}(${JSON.stringify(params, undefined, 2)});`,
    '',
    'project.synth();',
    '',
  ];

  fs.writeFileSync(PROJEN_RC, lines.join('\n'));
}

module.exports = new Command();
