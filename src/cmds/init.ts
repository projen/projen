import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import {availableTemplates, templatesPath} from '../cli';
import * as path from 'path';
import { PROJEN_RC } from '../common';

class Command implements yargs.CommandModule {
  public readonly command = 'init TEMPLATE';
  public readonly describe = 'Initializes a projen project using a template.';
  public readonly builder = (args: yargs.Argv) => args
    .positional('TEMPLATE', {demandOption: true, desc: 'Project template'})
    .showHelpOnFail(true)
    .choices('TEMPLATE', availableTemplates);

  public async handler(args: any) {
    // fail if .projenrc.js already exists
    if (fs.existsSync(PROJEN_RC)) {
      console.error(`Directory already contains ${PROJEN_RC}`);
      process.exit(1);
    }

    const templatePath = path.join(templatesPath, args['TEMPLATE']);
    fs.copySync(templatePath, '.', {recursive: true});
    console.error(`${PROJEN_RC} generated from the "${args['TEMPLATE']}" template.`);
    console.error('Now, go edit it (nothing there is what you want).');
    console.error('When you are done, simply run "npx projen" to get the magic going.');
  }
}


module.exports = new Command();
