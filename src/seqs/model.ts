/**
 * Schema for `.projen/sequences.json`.
 */
export interface SequenceManifest {
  /**
   * All sequences supporteds by this project.
   */
  readonly seqs?: { [name: string]: SequenceSpec };

  /**
   * Environment variables to use for all sequences in this project.
   */
  readonly env?: { [name: string]: string };
}

export interface SequenceSpec {
  readonly name: string;
  readonly description?: string;
  readonly commands: SequenceCommand[];
  readonly env?: { [name: string]: string };
}

export interface SequenceCommandOptions {
  readonly sources?: string[];
  readonly artifacts?: string[];

  /**
   * What invalidates the task so it is executed again.
   */
  readonly invalidation?: TaskInvalidation;
}

export interface SequenceCommand extends SequenceCommandOptions {
  readonly commands?: string[];
  readonly sequences?: string[];
}

export enum TaskInvalidation {
  /**
   * Task will always be executed, regardless of the artifact.
   */
  ALWAYS,

  // /**
  //  * Task is only executed if the hash of all files listed in `sources`
  //  * is different from the hash associated with the artifact.
  //  *
  //  * For example, if `sources` is `[ 'file1.txt' ]` and `artifacts` is
  //  * [ `output.foo` ], then a hash will be calculated on `file1.txt` and
  //  * will be stored under `output.foo`
  //  */
  // HASH
}
