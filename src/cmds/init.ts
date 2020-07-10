import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import {availableTemplates, templatesPath} from '../cli';
import * as path from 'path';

class Command implements yargs.CommandModule {

  public readonly command = 'init TEMPLATE';
  public readonly describe = 'Initializes a projen project using a template.';
  public readonly builder = (args: yargs.Argv) => args
    .positional('TEMPLATE', {demandOption: true, desc: 'Project template'})
    .showHelpOnFail(true)
    .choices('TEMPLATE', availableTemplates);

  public async handler(args: any) {
    // fails if .projenrc.js already exists
    if (fs.readdirSync('.').filter(f => f !== 'node_modules').length > 0) {
      process.stderr.write('Cannot initialize a projen project in a non-empty directory.\n');
      process.exit(1);
    }
    const templatePath = path.join(templatesPath, args['TEMPLATE']);
    try {
      fs.copySync(templatePath, '.', {recursive: true});
      process.stdout.write(`Projen project generated from the "${args['TEMPLATE']}" template. \n` +
        'Now, go edit it (nothing there is what you want).\n' + 
        'When you are done, simply run "npx projen" to get the magic going.\n');
    } catch (e) {
      process.stderr.write(`Error when trying to copy template files: ${e}\n`);
      throw e;
    }
  }
}


module.exports = new Command();
