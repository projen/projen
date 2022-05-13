import { dirname, join } from "path";
import { snake } from "case";
import { existsSync, mkdirpSync, writeFileSync } from "fs-extra";
import { PROJEN_VERSION } from "../common";
import { Component } from "../component";
import { DependencyType } from "../dependencies";
import { readJsiiManifest } from "../inventory";
import { Project } from "../project";

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

    const projenVersion = options.projenVersion ?? PROJEN_VERSION;
    this.rcfile = options.filename ?? ".projenrc.py";

    project.deps.addDependency(
      `projen@${projenVersion}`,
      DependencyType.DEVENV
    );

    // set up the "default" task which is the task executed when `projen` is executed for this project.
    project.defaultTask?.exec("python .projenrc.py");

    // if this is a new project, generate a skeleton for projenrc.py
    this.generateProjenrc();
  }

  private generateProjenrc() {
    const bootstrap = this.project.initProject;
    if (!bootstrap) {
      return;
    }
    const jsiiFqn = bootstrap.fqn;
    const jsiiManifest = readJsiiManifest(jsiiFqn);
    const jsiiType = jsiiManifest.types[jsiiFqn];
    const optionsTypeFqn = jsiiType.initializer?.parameters?.[0].type?.fqn;
    if (!optionsTypeFqn) {
      this.project.logger.warn(
        "cannot determine jsii type for project options"
      );
      return;
    }

    const pythonFile = join(this.project.outdir, this.rcfile);

    // skip if file exists
    if (existsSync(pythonFile)) {
      return;
    }

    const lines = new Array<string>();

    let indent = 0;
    const emit = (line: string = "") =>
      lines.push(" ".repeat(indent * 4) + line);
    // const openBlock = (line: string = '') => { emit(line + ' {'); indent++; };
    // const closeBlock = () => { indent--; emit('}'); };

    const optionFqns: Record<string, string> = {};
    for (const option of bootstrap.type.options) {
      if (option.fqn) {
        optionFqns[option.name] = option.fqn;
      }
    }

    const { renderedOptions, imports } = renderPythonOptions(
      indent,
      optionFqns,
      bootstrap.args
    );

    const moduleName = jsiiManifest.targets.python.module;
    // Module name prefix should take precedence in the event moduleName !== fqn prefix
    const importName = [moduleName, ...jsiiFqn.split(".").slice(1)].join(".");
    emit(toPythonImport(importName));

    for (const fqn of imports) {
      emit(toPythonImport(fqn));
    }
    emit();
    emit(`project = ${jsiiType.name}(${renderedOptions})`);
    emit();
    emit("project.synth()");

    mkdirpSync(dirname(pythonFile));
    writeFileSync(pythonFile, lines.join("\n"));

    this.project.logger.info(
      `Project definition file was created at ${pythonFile}`
    );
  }
}

function renderPythonOptions(
  indent: number,
  optionFqns: Record<string, string>,
  initOptions?: Record<string, any>
) {
  const imports = new Set<string>();
  if (!initOptions || Object.keys(initOptions).length === 0) {
    // no options
    return { renderedOptions: "", imports };
  }

  const lines = [""];

  for (const [name, value] of Object.entries(initOptions)) {
    const { pythonValue, importName } = toPythonValue(value, name, optionFqns);
    if (importName) imports.add(importName);
    lines.push(`${toPythonProperty(name)}=${pythonValue},`);
  }

  const renderedOptions = lines
    .join(`\n${" ".repeat((indent + 1) * 4)}`)
    .concat("\n");
  return { renderedOptions, imports };
}

function toPythonProperty(prop: string) {
  return snake(prop);
}

function toPythonValue(
  value: any,
  name: string,
  optionFqns: Record<string, string>
) {
  if (typeof value === "boolean") {
    return { pythonValue: value ? "True" : "False" };
  } else if (typeof value === "number") {
    return { pythonValue: JSON.stringify(value) };
  } else if (typeof value === "string") {
    if (optionFqns[name] !== undefined) {
      const parts = optionFqns[name].split(".");
      const base = parts[parts.length - 1];
      const choice = String(value).toUpperCase().replace(/-/g, "_");
      return { pythonValue: `${base}.${choice}`, importName: optionFqns[name] };
    } else {
      return { pythonValue: JSON.stringify(value) };
    }
  } else if (value === undefined || value === null) {
    return { pythonValue: "None" };
  } else {
    return { pythonValue: JSON.stringify(value) };
  }
}

function toPythonImport(fqn: string) {
  const parts = fqn.split(".");
  if (parts.length === 1) {
    return `import ${parts[0]}`;
  } else {
    return `from ${parts.slice(0, -1).join(".")} import ${
      parts[parts.length - 1]
    }`;
  }
}
