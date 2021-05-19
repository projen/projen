import { dirname, join } from 'path';
import { existsSync, mkdirpSync, writeFileSync } from 'fs-extra';
import { PROJEN_VERSION } from '../common';
import { Component } from '../component';
import { DependencyType } from '../deps';
import { readJsiiManifest } from '../inventory';
import { Project } from '../project';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const decamelize = require('decamelize');

/**
 * Options for `Projenrc`.
 */
export interface ProjenrcOptions {
  /**
   * The name of the projenrc file.
   * @default ".projenrc.py"
   */
  readonly filename?: string;

  /**
   * The projen version to use
   * @default - current version
   */
  readonly projenVersion?: string;
}

/**
 * Allows writing projenrc files in python.
 *
 * This will install `projen` as a Python dependency and will add a
 * `synth` task which will run `.projenrc.py`.
 */
export class Projenrc extends Component {
  /**
   * The name of the projenrc file.
   */
  private readonly rcfile: string;

  constructor(project: Project, options: ProjenrcOptions = {}) {
    super(project);

    const projenVersion = options.projenVersion ?? PROJEN_VERSION; // ?
    this.rcfile = options.filename ?? '.projenrc.py';

    project.deps.addDependency(`projen@${projenVersion}`, DependencyType.DEVENV);

    // set up the "default" task which is the task executed when `projen` is executed for this project.
    const defaultTask = project.addTask(Project.DEFAULT_TASK, { description: 'Synthesize the project' });
    defaultTask.exec('python projenrc.py');

    // if this is a new project, generate a skeleton for projenrc.py
    this.generateProjenrc();
  }

  private generateProjenrc() {
    const bootstrap = this.project.newProject;
    if (!bootstrap) {
      return;
    }
    const jsiiFqn = bootstrap.fqn;
    const jsiiManifest = readJsiiManifest(jsiiFqn);
    const jsiiType = jsiiManifest.types[jsiiFqn];
    const pythonTarget = jsiiManifest.targets.python;
    const optionsTypeFqn = jsiiType.initializer?.parameters?.[0].type?.fqn;
    if (!optionsTypeFqn) {
      this.project.logger.warn('cannot determine jsii type for project options');
      return;
    }

    const pythonFile = join(this.project.outdir, this.rcfile);

    // skip if file exists
    if (existsSync(pythonFile)) {
      return;
    }

    const lines = new Array<string>();

    let indent = 0;
    const emit = (line: string = '') => lines.push(' '.repeat(indent * 4) + line);
    // const openBlock = (line: string = '') => { emit(line + ' {'); indent++; };
    // const closeBlock = () => { indent--; emit('}'); };

    emit(toPythonImport(pythonTarget.module, jsiiType));
    emit();
    emit(`project = ${jsiiType.name}(${renderPythonOptions(indent, bootstrap.args)});`);
    emit();
    emit('project.synth();');

    mkdirpSync(dirname(pythonFile));
    writeFileSync(pythonFile, lines.join('\n'));

    this.project.logger.info(`Project definition file was created at ${pythonFile}`);
  }
}

function renderPythonOptions(indent: number, initOptions?: Record<string, any>): string {
  if (!initOptions || Object.keys(initOptions).length === 0) {
    return ''; // no options
  }

  const lines = [''];

  for (const [name, value] of Object.entries(initOptions)) {
    lines.push(`${toPythonProperty(name)}=${toPythonValue(value)},`);
  }

  return lines.join(`\n${' '.repeat((indent + 1) * 4)}`).concat('\n');
}

function toPythonProperty(prop: string) {
  return decamelize(prop);
}

function toPythonValue(value: any) {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  } else if (typeof value === 'number') {
    return JSON.stringify(value);
  } else if (typeof value === 'string') {
    return JSON.stringify(value);
  } else if (value === undefined || value === null) {
    return 'None';
  } else {
    return JSON.stringify(value);
  }
}

function toPythonImport(moduleName: string, jsiiType: any) {
  const parts = [moduleName, jsiiType.namespace, jsiiType.name].filter(x => x);
  if (parts.length === 1) {
    return `import ${parts[0]}`;
  } else {
    return `from ${parts.slice(0, -1).join('.')} import ${parts[parts.length - 1]}`;
  }
}