/**
 * Parses a projenrc.json file, uses it to generate a corresponding
 * projenrc.js file, and then run it to synthesize its contents.
 *
 * Environment variables:
 *
 * - PROJENRC_FILE: (optional) the name of the JSON file to parse from.
 *   Defaults to `.projenrc.json`.
 */
import * as path from 'path';
import * as vm from 'vm';
import * as fs from 'fs-extra';
import { resolveProjectType } from '../inventory';
import { renderJavaScriptOptions } from '../javascript/render-options';
import { NewProjectOptionHints } from '../option-hints';

let filename = process.env.PROJENRC_FILE;

if (!filename || filename == '') {
  filename = '.projenrc.json';
}

const { projectTypeFqn, ...json } = fs.readJsonSync(filename, { encoding: 'utf8' });
const projectType = resolveProjectType(projectTypeFqn);
if (!projectType) {
  throw new Error(`Could not find project type with the fully qualified name "${projectTypeFqn}".`);
}

// Default project resolution location
let modPath = '../index';

// External projects need to load the module from the modules directory
if (projectType.moduleName !== 'projen') {
  try {
    modPath = path.dirname(
      require.resolve(path.join(projectType.moduleName, 'package.json'), { paths: [process.cwd()] }),
    );
  } catch (err) {
    throw new Error(`External project module '${projectType.moduleName}' could not be resolved.`);
  }
}

// pass the FQN of the project type to the project initializer so it can
// generate the projenrc.js file.
const { renderedOptions } = renderJavaScriptOptions({
  bootstrap: false,
  comments: NewProjectOptionHints.NONE,
  type: projectType,
  args: json,
});

const newProjectCode = `const project = new ${projectType.typename}(${renderedOptions});`;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mod = require(modPath);
const ctx = vm.createContext(mod);

vm.runInContext([
  newProjectCode,
  'project.synth();',
].join('\n'), ctx);
