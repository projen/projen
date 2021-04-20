import { NodeProject } from '../node-project';
import { SampleFile } from '../sample-file';

/**
 * The possible tailwind config file names.
 */
export enum TailwindConfigFileType {
  /**
   * tailwind.config.js
   */
  TAILWIND_CONFIG_JS = 'tailwind.config.js',

  /**
   * tailwind.js
   */
  TAILWIND_JS = 'tailwind.js'
}

/**
 * Tailwind options.
 */
export interface TailwindConfigOptions {
  /**
   * @example TAILWIND_JS
   *
   * @default TAILWIND_CONFIG_JS
   */
  readonly fileName?: TailwindConfigFileType;
}

/**
 * Declares a Tailwind CSS JS configuration file.
 *
 * There are multiple ways to add Tailwind CSS in your node project - see:
 * https://tailwindcss.com/docs/installation
 *
 * https://github.com/tailwindlabs/tailwindcss-intellisense/blob/master/packages/tailwindcss-intellisense/README.md
 *
 * @see PostCss
 */
export class TailwindConfig {
  public readonly fileName: TailwindConfigFileType;
  public readonly file: SampleFile;

  constructor(project: NodeProject, options?: TailwindConfigOptions) {
    this.fileName = options?.fileName ?? TailwindConfigFileType.TAILWIND_CONFIG_JS;

    this.file = new SampleFile(project, this.fileName, {
      contents: [
        'module.exports = {',
        '  purge: [],',
        '  darkMode: false, // or \'media\' or \'class\'',
        '  theme: {',
        '    extend: {},',
        '  },',
        '  variants: {},',
        '  plugins: [],',
        '}',
      ].join('\n'),
    });

    project.npmignore?.exclude(`/${this.fileName}`);
  }
}
