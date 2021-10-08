import * as path from 'path';
import * as vm from 'vm';
import { resolveProjectType } from './inventory';
import { renderJavaScriptOptions } from './javascript/render-options';
import { NewProjectOptionHints } from './option-hints';

export interface CreateProjectOptions {
  /**
   * Directory that the project will be generated in.
   */
  readonly dir: string;

  /**
   * Fully-qualified name of the project type (usually formatted
   * as `module.ProjectType`).
   * @example `projen.TypescriptProject`
   */
  readonly projectFqn: string;

  /**
   * Option values.
   */
  readonly params: Record<string, any>;

  /**
   * Should we render commented-out default options in the projenrc file?
   * Does not apply to projenrc.json files.
   */
  readonly comments: NewProjectOptionHints;

  /**
   * Should we call `project.synth()` or instantiate the project (could still
   * have side-effects) and render the .projenrc file.
   */
  readonly synth: boolean;

  /**
   * Should we execute post synthesis hooks? (usually package manager install).
   */
  readonly post: boolean;
}

/**
 * Programmatic API for projen.
 */
export class Projects {
  /**
   * Creates a new project with defaults.
   *
   * This function creates the project type in-process (with in VM) and calls
   * `.synth()` on it (if `options.synth` is not `false`).
   *
   * At the moment, it also generates a `.projenrc.js` file with the same code
   * that was just executed. In the future, this will also be done by the project
   * type, so we can easily support multiple languages of projenrc.
   */
  public static createProject(options: CreateProjectOptions) {
    createProject(options);
  }
}

function createProject(opts: CreateProjectOptions) {
  const projectType = resolveProjectType(opts.projectFqn);

  // Default project resolution location
  let mod = './index';

  // External projects need to load the module from the modules directory
  if (projectType.moduleName !== 'projen') {
    try {
      mod = path.dirname(
        require.resolve(path.join(projectType.moduleName, 'package.json'), { paths: [process.cwd()] }),
      );
    } catch (err) {
      throw new Error(`External project module '${projectType.moduleName}' could not be resolved.`);
    }
  }

  if (opts.params.outdir) {
    throw new Error('Output directory of the project cannot be specified, use \'dir\' option instead.');
  }
  opts.params.outdir = opts.dir;

  // pass the FQN of the project type to the project initializer so it can
  // generate the projenrc file.
  const { renderedOptions } = renderJavaScriptOptions({
    bootstrap: true,
    comments: opts.comments,
    type: projectType,
    args: opts.params,
    omitFromBootstrap: ['outdir'],
  });

  const newProjectCode = `const project = new ${projectType.typename}(${renderedOptions});`;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const module = require(mod);
  const ctx = vm.createContext(module);

  process.env.PROJEN_DISABLE_POST = (!opts.post).toString();
  vm.runInContext([
    newProjectCode,
    opts.synth ? 'project.synth();' : '',
  ].join('\n'), ctx);
}
