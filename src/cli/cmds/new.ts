import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as yargs from 'yargs';
import { PROJEN_RC } from '../../common';
import * as inventory from '../../inventory';
import * as logging from '../../logging';
import { synth } from '../synth';
import { exec } from '../../util';

class Command implements yargs.CommandModule {
  public readonly command = 'new [PROJECT-TYPE] [OPTIONS]';
  public readonly describe = 'Creates a new projen project';

  public builder(args: yargs.Argv) {
    args.positional('PROJECT-TYPE', { describe: 'optional only when --from is used and there is a single project type in the external module', type: 'string' });
    args.option('synth', { type: 'boolean', default: true, desc: 'Synthesize after creating .projenrc.js' });
    args.option('from', { type: 'string', alias: 'f', desc: 'External jsii npm module to create project from. Supports any package spec supported by yarn (such as "my-pack@^2.0")' });
    args.example('projen new awscdk-app-ts', 'Creates a new project of built-in type "awscdk-app-ts"')
    args.example('projen new --from projen-vue@^2', 'Creates a new project from an external module "projen-vue" with the specified version');

    for (const type of inventory.discover()) {
      args.command(type.pjid, type.docs ?? '', {
        builder: cargs => {
          cargs.showHelpOnFail(true);

          for (const option of type.options ?? []) {
            if (option.type !== 'string' && option.type !== 'number' && option.type !== 'boolean') {
              continue; // we don't support non-primitive fields as command line options
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
        handler: argv => newProject(process.cwd(), type, argv)
      });
    }

    return args;
  }

  public async handler(args: any) {
    // handle --from which means we want to first install a jsii module and then
    // create a project defined within this module.
    if (args.from) {
      return newProjectFromModule(process.cwd(), args.from, args);
    }

    // project type is defined but was not matched by yargs, so print the list of supported types
    if (args.projectType) {
      console.log(`Invalid project type ${args.projectType}. Supported types:`);
      for (const pjid of inventory.discover().map(x => x.pjid)) {
        console.log(`  ${pjid}`);
      }
      return;
    }

    // Handles the use case that nothing was specified since PROJECT-TYPE is now an optional positional parameter
    yargs.showHelp();
  }
}

function generateProjenConfig(baseDir: string, type: inventory.ProjectType, params: any) {
  const configPath = path.join(baseDir, PROJEN_RC);
  if (fs.existsSync(configPath)) {
    logging.error(`Directory ${baseDir} already contains ${PROJEN_RC}`);
    process.exit(1);
  }

  const lines = [
    `const { ${type.typename} } = require('${type.moduleName}');`,
    '',
    `const project = new ${type.typename}(${renderParams(params)});`,
    '',
    'project.synth();',
    '',
  ];

  fs.writeFileSync(configPath, lines.join('\n'));
  logging.info(`Created ${PROJEN_RC} for ${type.typename}`);
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

/**
 * Converts yargs command line switches to project type props.
 * @param type Project type
 * @param argv Command line switches
 */
function commandLineToProps(type: inventory.ProjectType, argv: any): Record<string, any> {
  const props: any = {};

  // initialize props with default values
  for (const prop of type.options) {
    if (prop.default && prop.default !== 'undefined' && !prop.optional) {
      props[prop.name] = processDefault(prop.default);
    }
  }

  for (const [arg, value] of Object.entries(argv)) {
    for (const prop of type.options) {
      if (prop.switch === arg) {
        let curr = props;
        const queue = [...prop.path];
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

  return props;
}

/**
 * Generates a new project from an external module.
 * 
 * @param spec The name of the external module to load
 * @param args Command line arguments (incl. project type)
 */
function newProjectFromModule(baseDir: string, spec: string, args: any) {
  yarnAdd(baseDir, spec);

  // collect projects by looking up all .jsii modules in `node_modules`.
  const modulesDir = path.join(baseDir, 'node_modules');
  const modules = fs.readdirSync(modulesDir).map(file => path.join(modulesDir, file));
  const projects = inventory
    .discover(...modules)
    .filter(x => x.moduleName !== 'projen'); // filter built-in project types

  if (projects.length < 1) {
    throw new Error(`No projects found after installing ${spec}. The module must export at least one class which extends projen.Project`);
  }

  const requested = args.projectType;
  const types = projects.map(p => p.pjid);

  // if user did not specify a project type but the module has more than one, we need them to tell us which one...
  if (!requested && projects.length > 1) {
    throw new Error(`Multiple projects found in after installing ${spec}: ${types.join(',')}. Please specify a project name.\nExample: npx projen new --from ${spec} ${types[0]}`);
  }

  // if user did not specify a type (and we know we have only one), the select it. otherwise, search by pjid.
  const type = !requested ? projects[0] : projects.find(p => p.pjid === requested);
  if (!type) {
    throw new Error(`Project type ${requested} not found. Found ${types.join(',')}`);
  }

  // include a dev dependency for the external module
  newProject(baseDir, type, args, {
    devDeps: [spec]
  });
}

/**
 * Generates a new project.
 * @param type Project type
 * @param args Command line arguments
 * @param additionalProps Additional parameters to include in .projenrc.js
 */
function newProject(baseDir: string, type: inventory.ProjectType, args: any, additionalProps?: any) {
  // convert command line arguments to project props using type information
  const props = commandLineToProps(type, args);

  // merge in additional props if specified
  for (const [k, v] of Object.entries(additionalProps ?? {})) {
    props[k] = v;
  }

  // generate .projenrc.js
  generateProjenConfig(baseDir, type, props);

  // synthesize if synth is enabled (default).
  if (args.synth) {
    synth();
  }
}

/**
 * Installs the npm module (through `yarn add`) to node_modules under `projectDir`.
 * @param spec The npm package spec (e.g. foo@^1.2)
 */
function yarnAdd(baseDir: string, spec: string) {
  const packageJsonPath = path.join(baseDir, 'package.json');
  const packageJsonExisted = fs.existsSync(packageJsonPath);

  // workaround: yarn fails to extract tgz if it contains '@' in the name, so we
  // create a temp copy called pkg.tgz and install from there.
  // see: https://github.com/yarnpkg/yarn/issues/6339
  if (spec.endsWith('.tgz') && spec.includes('@')) {
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'projen-'))
    const copy = path.join(tmpdir, 'pkg.tgz');
    fs.copyFileSync(spec, copy);
    spec = copy;
  }

  logging.info(`installing external module ${spec}...`);
  exec(`yarn add --modules-folder=${baseDir}/node_modules --silent --no-lockfile --dev ${spec}`, { cwd: baseDir });

  // if package.json did not exist before calling yarn add, we should remove it
  // so we can start off clean.
  if (!packageJsonExisted) {
    fs.removeSync(packageJsonPath);
  }
}

module.exports = new Command();
