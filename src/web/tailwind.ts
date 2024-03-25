import { NodeProject } from "../javascript";
import { JsonFile } from "../json";

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
    this.fileName = options?.fileName ?? "tailwind.config.json";

    this.file = new JsonFile(project, this.fileName, {
      obj: {
        content: [],
        media: false,
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
