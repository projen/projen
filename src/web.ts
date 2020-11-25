import { JsonFile } from './json';
import { NodeProject } from './node-project';

export interface PostCssOptions {
  /**
   * @default "postcss.config.json"
   */
  readonly fileName?: string;

  /**
   * Install Tailwind CSS as a PostCSS plugin.
   *
   * @default true
   */
  readonly tailwind?: boolean;

  /**
   * Tailwind CSS options.
   */
  readonly tailwindOptions?: TailwindConfigOptions;
}

/**
 * Declares a PostCSS dependency with a default config file.
 */
export class PostCss {
  public readonly fileName: string;
  public readonly file: JsonFile;
  public readonly tailwind?: TailwindConfig;

  constructor(project: NodeProject, options?: PostCssOptions) {
    this.fileName = options?.fileName ?? 'postcss.config.json';

    project.addDeps('postcss');

    const config: { [key: string]: any } = { plugins: {} };

    if (options?.tailwind ?? true) {
      config.plugins.tailwindcss = {};
      config.plugins.autoprefixer = {};
      this.tailwind = new TailwindConfig(project, options?.tailwindOptions);
      project.addDeps('tailwindcss', 'autoprefixer');
    }

    this.file = new JsonFile(project, this.fileName, { obj: config });

    project.npmignore?.exclude(`/${this.fileName}`);
  }
}

export interface TailwindConfigOptions {
  /**
   * @default "tailwind.config.json"
   */
  readonly fileName?: string;
}

/**
 * Declares a Tailwind CSS configuration file.
 *
 * There are multiple ways to add Tailwind CSS in your node project - see:
 * https://tailwindcss.com/docs/installation
 *
 * @see PostCss
 */
export class TailwindConfig {
  public readonly fileName: string;
  public readonly file: JsonFile;

  constructor(project: NodeProject, options?: TailwindConfigOptions) {
    this.fileName = options?.fileName ?? 'tailwind.config.json';

    this.file = new JsonFile(project, this.fileName, {
      obj: {
        purge: [],
        darkMode: false,
        theme: {
          extend: {},
        },
        variants: {
          extend: {},
        },
        plugins: [],
      },
    });

    project.npmignore?.exclude(`/${this.fileName}`);
  }
}
