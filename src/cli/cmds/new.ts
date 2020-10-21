import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import { PROJEN_RC } from '../../common';
import * as inventory from '../../inventory';
import * as logging from '../../logging';
import { synth } from '../synth';

interface PackageInfo {
  packageDir: string;
  modulePath: string;
  moduleName: string;
  moduleVersion: string;
  moduleNameAndVersion: string;
}

class Command implements yargs.CommandModule {
  public readonly command = 'new [PROJECT-TYPE] [OPTIONS]';
  public readonly describe = 'Creates a new projen project';

  public builder(args: yargs.Argv) {
    args.positional('PROJECT-TYPE', { describe: 'optional only when --from is used and there is a single project type in the external module', type: 'string' })
      .example('projen new awscdk-app-ts', '')
      .example('projen new --from projen-vue@^2', '');
    args.option('synth', { type: 'boolean', default: true, desc: 'Synthesize after creating .projenrc.js' });
    args.option('from', { type: 'string', alias: 'f', desc: 'External jsii npm module to create project from. Supports any package spec supported by yarn (such as "my-pack@^2.0")' });
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
          checkForExistingProjenRc();

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
    if (args.from) {
      return handleFromNPM(args);
    }

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

function handleFromNPM(args: any) {
  // fail if .projenrc.js already exists
  checkForExistingProjenRc();

  const packageInfo = addRemoteNpmModule(args.from);

  const externalJsiiTypes: { [name: string]: inventory.JsiiType } = fs.readJsonSync(path.join(packageInfo.packageDir, '.jsii')).types;
  const projects = inventory.discover(externalJsiiTypes);
  if (projects.length < 1) {
    throw new Error(`No projects found in remote module ${packageInfo.moduleName}. ${packageInfo.moduleName} .jsii must specify at least one project with a base of project.Project`);
  }

  let type: inventory.ProjectType | undefined = projects[0];

  if (projects.length > 1) {
    const projectType = args.projectType;
    if (!projectType) {
      const projectNames = projects.map(project => project.typename);
      throw new Error(`Multiple projects found in ${packageInfo.moduleName}: ${JSON.stringify(projectNames)}.\nPlease specify a project name with PROJECT-TYPE.\nExample: npx projen new vuejs-ts --from projen-vue`);
    }

    type = projects.find(project => project.typename === projectType);
    if (!type) {
      throw new Error(`Project with name ${projectType} not found in ${packageInfo.moduleName}.`);
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
        if (opt.default && opt.default !== 'undefined' && required) params[opt.name] = processDefault(opt.default);
      }
    }
  }

  params.devDeps = [packageInfo.moduleNameAndVersion];

  generateProjenConfig(type, params, packageInfo.moduleName);
  logging.info(`Created ${PROJEN_RC} for ${type.typename}`);

  if (args.synth) {
    synth();
  }
}

function addRemoteNpmModule(module: string): PackageInfo {
  let modulePath = module;
  const baseDir = process.cwd();

  // Yarn fails to extract tgz if it contains '@' in the name - see https://github.com/yarnpkg/yarn/issues/6339
  if (module.indexOf('.tgz') > -1) {
    modulePath = packAndMoveGzipModule(module);
  }

  execSync(`yarn add --dev ${modulePath}`, { stdio: ['inherit', 'pipe', 'ignore'] });

  const moduleNameAndVersionArray = modulePath.split('/').slice(-1)[0].trim().split('@'); // Example: ./cdk-project/dist/js/cdk-project@1.0.0.jsii.tgz
  const moduleName = moduleNameAndVersionArray[0].trim();

  let moduleNameAndVersion = moduleNameAndVersionArray.join('@').trim(); // cdk-project || cdk-project@2 || cdk-project@^2
  if (moduleNameAndVersion.indexOf('.tgz') > -1) moduleNameAndVersion = `${moduleName}@${modulePath}`; // Solves the local package usecase

  return {
    packageDir: path.join(baseDir, 'node_modules', moduleName),
    modulePath: modulePath,
    moduleName: moduleName,
    moduleVersion: moduleNameAndVersionArray[1].trim(),
    moduleNameAndVersion: moduleNameAndVersion,
  };
}

function packAndMoveGzipModule(module: string) {
  const baseDir = process.cwd();
  const localNodeModules = './node_modules.local';
  fs.mkdirpSync(path.join(baseDir, localNodeModules));

  // Run pack to get the package from the module if it's local
  const npmPackOutput = execSync(`npm pack ${module}`, { stdio: ['inherit', 'pipe', 'ignore'] });

  // Move the package to node_modules.local for yarn to work - see https://github.com/yarnpkg/yarn/issues/6339
  const packagePath = path.join(baseDir, npmPackOutput.toString('utf-8').trim());
  const newPackagePath = path.join(baseDir, localNodeModules, npmPackOutput.toString('utf-8').trim());
  fs.moveSync(packagePath, newPackagePath);

  return newPackagePath;
}

function checkForExistingProjenRc() {
  if (fs.existsSync(PROJEN_RC)) {
    logging.error(`Directory already contains ${PROJEN_RC}`);
    process.exit(1);
  }
}

module.exports = new Command();
