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
  switch: string;
  type: string;
  parent: string;
  docs?: string;
  default?: string;
  optional?: boolean;
  deprecated?: boolean;
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
  const jsii: JsiiTypes = {};

  // read all .jsii manifests from all modules (incl. projen itself) and merge
  // them all into a single map of fqn->type.
  for (const dir of [...moduleDirs, PROJEN_MODULE_ROOT]) {
    const jsiiFile = path.join(dir, '.jsii');
    if (!fs.existsSync(jsiiFile)) { continue; } // no jsii manifest
    const manifest = fs.readJsonSync(jsiiFile);

    for (const [fqn, type] of Object.entries(manifest.types as JsiiTypes)) {
      jsii[fqn] = type;
    }
  }

  const result = new Array<ProjectType>();

  for (const [fqn, typeinfo] of Object.entries(jsii)) {
    if (!isProjectType(jsii, fqn)) {
      continue;
    }

    const [, typename] = fqn.split('.');
    const docsurl = `https://github.com/projen/projen/blob/master/API.md#projen-${typename.toLocaleLowerCase()}`;
    let pjid = typeinfo.docs?.custom?.pjid ?? decamelize(typename).replace(/_project$/, '');
    result.push({
      moduleName: typeinfo.assembly,
      typename,
      pjid,
      fqn,
      options: discoverOptions(jsii, fqn).sort((o1, o2) => o1.name.localeCompare(o2.name)),
      docs: typeinfo.docs?.summary,
      docsurl,
    });
  }

  return result.sort((r1, r2) => r1.pjid.localeCompare(r2.pjid));
}

function discoverOptions(jsii: JsiiTypes, fqn: string): ProjectOption[] {
  const options: { [name: string]: ProjectOption } = { };
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

      const defaultValue = prop.docs?.default;

      // protect against double-booking
      if (prop.name in options) {
        throw new Error(`duplicate option "${prop.name}" in ${fqn}`);
      }

      let typeName;
      if (prop.type?.primitive) {
        typeName = prop.type?.primitive;
      } else if (prop.type?.fqn) {
        typeName = prop.type?.fqn.split('.').pop();
      } else {
        typeName = 'unknown';
      }

      options[prop.name] = filterUndefined({
        path: propPath,
        parent: struct.name,
        name: prop.name,
        docs: prop.docs.summary,
        type: typeName,
        switch: propPath.map(p => decamelize(p).replace(/_/g, '-')).join('-'),
        default: defaultValue,
        optional: optional || prop.optional,
        deprecated: prop.docs.stability === 'deprecated',
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
