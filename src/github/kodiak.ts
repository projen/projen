import { Component } from "../component";
import { TomlFile } from "../toml";
import { GitHub } from "./github";

/**
 * Options for Kodiak.
 */
export interface KodiakOptions {
  /**
   * Automatically merge pull requests when they are ready.
   *
   * @default true
   */
  readonly autoMerge?: boolean;
}

/**
 * Kodiak is a GitHub app that merges pull requests when they are ready.
 *
 * @see https://kodiakhq.com/
 */
export class Kodiak extends Component {
  constructor(github: GitHub, options: KodiakOptions = {}) {
    super(github.project);

    new TomlFile(github.project, ".kodiak.toml", {
      obj: {
        version: 1,
        merge: {
          autoconfigure: options.autoMerge ?? true,
        },
      },
    });
  }
}
