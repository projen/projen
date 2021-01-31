import { FileBase, IResolver } from '../file';
import { PythonProject } from './python-project';

/**
 * Fields to pass in the setup() function of setup.py
 *
 * @see https://docs.python.org/3/distutils/setupscript.html
 */
export interface SetupPyConfigOptions {
  /**
   * Name of the package
   */
  readonly name?: string;

  /**
   * List of submodules to be packaged
   */
  readonly packages?: string[];

  /**
   * Author's name
   */
  readonly authorName?: string;

  /**
   * Author's e-mail
   */
  readonly authorEmail?: string;

  /**
   * Manually specify package version
   */
  readonly version?: string;

  /**
   * A short project description
   */
  readonly description?: string;

  /**
   * The project license
   */
  readonly license?: string;

  /**
   * Package's Homepage / Website
   */
  readonly homepage?: string;

  /**
   * A list of PyPI trove classifiers that describe the project.
   *
   * @see https://pypi.org/classifiers/
   */
  readonly classifiers?: string[];

  /**
   * Escape hatch to allow any value
   */
  readonly [name: string]: any;
}

export interface SetupPyOptions {
  /**
   * Fields to pass in the setup() function
   */
  readonly setupConfig?: SetupPyConfigOptions;
}

export class SetupPy extends FileBase {
  private readonly setupConfig: any;

  constructor(project: PythonProject, options: SetupPyOptions) {
    super(project, 'setup.py');

    this.setupConfig = {
      name: project.name,
      packages: [project.moduleName],
      python_requires: '>=3.6',
      classifiers: [
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
      ],
      ...options.setupConfig ? this.renameFields(options.setupConfig) : [],
    };
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const lines = [
      `# ${FileBase.PROJEN_MARKER}`,
      '',
      'import json',
      'from setuptools import setup',
      '',
      'kwargs = json.loads(',
      '    """',
      JSON.stringify(this.setupConfig, null, 4),
      '"""',
      ')',
      '',
      'setup(**kwargs)',
    ];

    return `${resolver.resolve(lines).join('\n')}\n`;
  }

  // modify some key names since JSII interfaces must have camelCase fields
  private renameFields(options: SetupPyConfigOptions): any {
    const obj: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(options)) {
      if (key === 'authorName') {
        obj.author = value;
      } else if (key === 'authorEmail') {
        obj.author_email = value;
      } else if (key === 'homepage') {
        obj.url = value;
      } else {
        obj[key] = value;
      }
    }
    return obj;
  }
}