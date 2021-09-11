import * as path from 'path';
import * as fs from 'fs-extra';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const decamelize = require('decamelize');
const PROJEN_MODULE_ROOT = path.join(__dirname, '..');
const PROJECT_BASE_FQN = 'projen.Project';

type JsiiTypes = { [name: string]: JsiiType };

export interface ProjectOption {
  path: string[];
  name: string;
  fqn?: string;
  switch: string;
  type: string;
  kind?: string;
  parent: string;
  docs?: string;
  default?: string;
  optional?: boolean;
  deprecated?: boolean;
  featured?: boolean;
}

export interface ProjectType {
  moduleName: string;
  pjid: string;
  fqn: string;
  typename: string;
  options: ProjectOption[];
  docs?: string;
  docsurl: string;
}

interface JsiiType {
  name: string;
  assembly: string;
  kind: string;
  abstract?: boolean;
  base?: string;
  fqn: string;
  interfaces?: string[];
  initializer?: {
    parameters?: Array<{
      name: string;
      type?: { fqn?: string };
    }>;
  };
  properties?: Array<{
    name: string;
    docs: {
      summary?: string;
      default?: string;
      deprecated?: string;
      stability?: string;
      custom?: { [name: string]: string };
    };
    optional?: boolean;
    type?: {
      primitive?: string;
      fqn?: string;
    };
  }>;
  docs?: {
    summary?: string;
    deprecated?: string;
    custom?: {
      pjid?: string;
    };
  };
}

/**
 * Returns a list of project types exported the modules defined in `moduleDirs`.
 * This list will always also include the built-in projen project types.
 * Modules without a .jsii manifest are skipped.
 *
 * @param moduleDirs A list of npm module directories
 */
export function discover(...moduleDirs: string[]) {

  const jsii = discoverJsiiTypes(...moduleDirs);

  const result = new Array<ProjectType>();

  for (const fqn of Object.keys(jsii)) {
    const p = toProjectType(jsii, fqn);
    if (!p) {
      continue;
    }

    result.push(p);
  }

  return result.sort((r1, r2) => r1.pjid.localeCompare(r2.pjid));
}

/**
 * Resolve all jsii types from @modulesDirs.
 * When a jsii module is found it will recusively list the types from the dependant module as well
 *
 * @param moduleDirs
 * @returns
 */
function discoverJsiiTypes(...moduleDirs: string[]) {
  const jsii: JsiiTypes = {};

  const discoverJsii = (dir: string) => {
    const jsiiFile = path.join(dir, '.jsii');
    if (!fs.existsSync(jsiiFile)) { return; } // no jsii manifest

    const manifest = fs.readJsonSync(jsiiFile);
    for (const [fqn, type] of Object.entries(manifest.types as JsiiTypes)) {
      jsii[fqn] = {
        ...type,
      };
    }

    // Also search recursively in nested project dependencies. If the requested module is an external module
    // this will also end-up in the projen module and add the projen types
    if (manifest.dependencies) {
      for (const dependency of Object.keys(manifest.dependencies)) {
        const nestedDependencyFolder = path.dirname(require.resolve(`${dependency}/package.json`, {
          paths: [dir],
        }));

        if (fs.existsSync(nestedDependencyFolder)) {
          discoverJsii(nestedDependencyFolder);
        }
      }
    }
  };

  // read all .jsii manifests from all requested modules and merge
  // them all into a single map of fqn->type.
  for (const dir of [...moduleDirs, PROJEN_MODULE_ROOT]) {
    discoverJsii(dir);

    // Read from scoped packages
    if (dir.includes('@') && fs.lstatSync(dir).isDirectory()) {
      const childDirs = fs.readdirSync(dir).map(file => path.join(dir, file));
      for (const child of childDirs) {
        discoverJsii(child);
      }
    }
  }

  return jsii;
}

export function resolveProjectType(projectFqn: string) {
  let [moduleName] = projectFqn.split('.');
  if (moduleName === 'projen') {
    moduleName = PROJEN_MODULE_ROOT;
  }

  // try picking the manifest. We only need the base folder but this is directly a nice check if we request from a valid jsii package
  const jsiiManifestFile = require.resolve(`${moduleName}/.jsii`, {
    paths: [
      process.cwd(),
    ],
  });
  const moduleFolder = path.dirname(jsiiManifestFile);

  // Read all jsii types that can be loaded from this project type
  const jsii = discoverJsiiTypes(moduleFolder);
  return toProjectType(jsii, projectFqn);
}

function toProjectType(jsii: JsiiTypes, fqn: string) {
  if (!isProjectType(jsii, fqn)) {
    return undefined;
  }

  const typeinfo = jsii[fqn];

  // projen.web.ReactProject -> web.ReactProject
  const typename = fqn.substring(fqn.indexOf('.') + 1);

  const docsurl = `https://github.com/projen/projen/blob/master/API.md#projen-${typename.toLocaleLowerCase().replace(/\./g, '-')}`;
  let pjid = typeinfo.docs?.custom?.pjid ?? decamelize(typename).replace(/_project$/, '');
  return {
    moduleName: typeinfo.assembly,
    typename,
    pjid,
    fqn,
    options: discoverOptions(jsii, fqn).sort((o1, o2) => o1.name.localeCompare(o2.name)),
    docs: typeinfo.docs?.summary,
    docsurl,
  } as ProjectType;
}

export function readJsiiManifest(jsiiFqn: string): any {
  let [moduleName] = jsiiFqn.split('.');
  if (moduleName === 'projen') {
    moduleName = PROJEN_MODULE_ROOT;
  }

  const jsiiManifestFile = require.resolve(`${moduleName}/.jsii`);
  return fs.readJsonSync(jsiiManifestFile);
}

function discoverOptions(jsii: JsiiTypes, fqn: string): ProjectOption[] {
  const options: { [name: string]: ProjectOption } = {};
  const params = jsii[fqn]?.initializer?.parameters ?? [];
  const optionsParam = params[0];
  const optionsTypeFqn = optionsParam?.type?.fqn;

  if (params.length > 1 || (params.length === 1 && optionsParam?.name !== 'options')) {
    throw new Error(`constructor for project ${fqn} must have a single "options" argument of a struct type. got ${JSON.stringify(params)}`);
  }

  addOptions(optionsTypeFqn);

  const opts = Object.values(options);

  return opts.sort((a, b) => a.switch.localeCompare(b.switch));

  function addOptions(ofqn?: string, basePath: string[] = [], optional = false) {
    if (!ofqn) {
      return;
    }

    const struct = jsii[ofqn];
    if (!struct) {
      throw new Error(`unable to find options type ${ofqn} for project ${fqn}`);
    }

    for (const prop of struct.properties ?? []) {
      const propPath = [...basePath, prop.name];

      // protect against double-booking
      if (prop.name in options) {
        throw new Error(`duplicate option "${prop.name}" in ${fqn} (already declared in ${options[prop.name].parent})`);
      }

      let typeName;
      let jsiiKind;
      if (prop.type?.primitive) {
        typeName = prop.type?.primitive; // e.g. 'string', 'boolean', 'number'
      } else if (prop.type?.fqn) {
        typeName = prop.type?.fqn.split('.').pop(); // projen.NodeProjectOptions -> NodeProjectOptions
        jsiiKind = jsii[prop.type?.fqn].kind; // e.g. 'class', 'interface', 'enum'
      } else { // any other types such as collection types
        typeName = 'unknown';
      }

      const isOptional = optional || prop.optional;
      let defaultValue = prop.docs?.default;

      if (defaultValue === 'undefined') {
        defaultValue = undefined;
      }

      // if this is a mandatory option and we have a default value, it has to be JSON-parsable to the correct type
      if (!isOptional && defaultValue) {
        if (!prop.type?.primitive) {
          throw new Error(`required option "${prop.name}" with a @default must use primitive types (string, number or boolean). type found is: ${typeName}`);
        }

        checkDefaultIsParsable(prop.name, defaultValue, prop.type?.primitive);
      }

      options[prop.name] = filterUndefined({
        path: propPath,
        parent: struct.name,
        name: prop.name,
        fqn: prop.type?.fqn,
        docs: prop.docs.summary,
        type: typeName,
        kind: jsiiKind,
        switch: propPath.map(p => decamelize(p).replace(/_/g, '-')).join('-'),
        default: defaultValue,
        optional: isOptional,
        featured: prop.docs?.custom?.featured === 'true',
        deprecated: prop.docs.stability === 'deprecated' ? true : undefined,
      });
    }

    for (const ifc of struct.interfaces ?? []) {
      addOptions(ifc);
    }
  }
}

function filterUndefined(obj: any) {
  const ret: any = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      ret[k] = v;
    }
  }
  return ret;
}

function isProjectType(jsii: JsiiTypes, fqn: string) {
  const type = jsii[fqn];

  if (type.kind !== 'class') {
    return false;
  }
  if (type.abstract) {
    return false;
  }

  if (type.docs?.deprecated) {
    return false;
  }

  let curr = type;
  while (true) {
    if (curr.fqn === PROJECT_BASE_FQN) {
      return true;
    }

    if (!curr.base) {
      return false;
    }

    curr = jsii[curr.base];
    if (!curr) {
      return false;
    }
  }
}

function checkDefaultIsParsable(prop: string, value: string, type: string) {
  // macros are pass-through
  if (value.startsWith('$')) {
    return;
  }
  try {
    const parsed = JSON.parse(value);
    if (typeof(parsed) !== type) {
      throw new Error(`cannot parse @default value for mandatory option ${prop} as a ${type}: ${parsed}`);
    }

  } catch (e) {
    throw new Error(`unable to JSON.parse() value "${value}" specified as @default for mandatory option "${prop}": ${e.message}`);
  }
}
