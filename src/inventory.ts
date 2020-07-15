import * as fs from 'fs-extra';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const decamelize = require('decamelize');
const projen = path.dirname(require.resolve('../package.json'));
const jsii: { [name: string]: JsiiType } = fs.readJsonSync(path.join(projen, '.jsii')).types;

export interface ProjectOption {
  path: string[];
  name: string;
  switch: string;
  type: string;
  docs?: string;
  default?: string;
  optional?: boolean;
}

export interface ProjectType {
  pjid: string;
  fqn: string;
  typename: string;
  options: ProjectOption[];
  docs?: string;
}

interface JsiiType {
  kind: string;
  abstract?: boolean;
  base?: string;
  fqn: string;
  interfaces?: string[];
  initializer?: {
    parameters?: Array<{
      name: string;
      type?: { fqn?: string };
    }>
  };
  properties?: Array<{
    name: string;
    docs: {
      summary?: string;
      default?: string;
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

export function discover() {
  const result = new Array<ProjectType>();

  for (const [ fqn, typeinfo ] of Object.entries(jsii)) {
    if (!isProjectType(fqn)) {
      continue;
    }

    const [ , typename ] = fqn.split('.');
    let pjid = typeinfo.docs?.custom?.pjid ?? decamelize(typename).replace(/_project$/, '');
    result.push({
      typename,
      pjid,
      fqn,
      options: discoverOptions(fqn),
      docs: typeinfo.docs?.summary,
    });
  }

  return result.sort((r1, r2) => r1.pjid.localeCompare(r2.pjid));
}
function discoverOptions(fqn: string): ProjectOption[] {
  const options = new Array<ProjectOption>();
  const params = jsii[fqn]?.initializer?.parameters ?? [];
  const optionsParam = params[0];
  const optionsTypeFqn = optionsParam?.type?.fqn;
  if (params.length !== 1 || optionsParam?.name !== 'options' || !optionsTypeFqn) {
    throw new Error(`constructor for project ${fqn} must have a single "options" argument of a struct type. got ${JSON.stringify(params)}`);
  }

  addOptions(optionsTypeFqn);

  function addOptions(ofqn: string, path: string[] = [], optional = false) {
    const struct = jsii[ofqn];
    if (!struct) {
      throw new Error(`unable to find options type ${ofqn} for project ${fqn}`);
    }

    for (const prop of struct.properties ?? []) {
      const propPath = [ ...path, prop.name ];

      if (prop.type?.fqn) {
        addOptions(prop.type?.fqn, propPath, true);
        continue;
      }

      options.push(filterUndefined({
        path: propPath,
        name: prop.name,
        docs: prop.docs.summary,
        type: prop.type?.primitive ?? 'unknown',
        switch: propPath.map(p => decamelize(p).replace(/_/g, '-')).join('-'),
        default: prop.docs?.default?.replace(/^\ *\-/, '').trim(),
        optional: optional || prop.optional,
      }));
    }

    for (const ifc of struct.interfaces ?? []) {
      addOptions(ifc);
    }
  }

  return options.sort((a, b) => a.name.localeCompare(b.name));
}

function filterUndefined(obj: any) {
  const ret: any = {};
  for (const [k,v] of Object.entries(obj)) {
    if (v !== undefined) {
      ret[k] = v;
    }
  }
  return ret;
}

function isProjectType(fqn: string) {
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
    if (curr.fqn === 'projen.Project') {
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
