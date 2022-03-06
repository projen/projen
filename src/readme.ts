import { Construct } from "constructs";
import { SampleFile } from "./sample-file";

/**
 * SampleReadme Properties
 */
export interface SampleReadmeProps {
  /**
   * The name of the README.md file
   *
   * @default "README.md"
   * @example "readme.md"
   */
  readonly filename?: string;

  /**
   * The contents
   * @default "# replace this"
   */
  readonly contents?: string;
}

/**
 * Represents a README.md sample file.
 * You are expected to manage this file after creation.
 *
 * @param text - The initial contents of the README.md file. Defaults to '# replace this'
 */
export class SampleReadme extends SampleFile {
  constructor(scope: Construct, props?: SampleReadmeProps) {
    super(scope, props?.filename ?? "README.md", {
      contents: props?.contents ?? "# replace this",
    });
  }
}
