import { Component } from './component';
import { NodeProject } from './node-project';

export interface StartOptions {

}

export class Start extends Component {
  private readonly nodeProject: NodeProject;

  constructor(project: NodeProject, _options: StartOptions = { }) {
    super(project);

    this.nodeProject = project;

    project.setScript('start', 'npx projen start -i');

    // we have to explicitly add and not use `addScript` options since
    // this `project.start` is undefined until we finish to initialize.
    this.addEntry('start', {
      command: 'npx projen start',
      desc: 'Shows this menu',
    });
  }

  /**
   * Adds a script to the start menu.
   * @param name The npm script name
   * @param options Entry options
   */
  public addEntry(name: string, options: StartEntryOptions) {
    if (!this.nodeProject.hasScript(name)) {
      throw new Error(`cannot add a start menu item for undefined script ${name}`);
    }

    this.nodeProject.manifest.start = this.nodeProject.manifest.start ?? {};
    this.nodeProject.manifest.start[name] = options;
  }
}

export interface StartEntryOptions {
  /**
   * The description of the start entry.
   */
  readonly desc: string;

  /**
   * The command to execute.
   */
  readonly command: string;

  /**
   * Priority-order (lower values will be shown first).
   *
   * @default StartEntryCategory.MISC
   */
  readonly category?: StartEntryCategory;
}

export enum StartEntryCategory {
  BUILD = 0,
  TEST = 1,
  RELEASE = 2,
  MAINTAIN = 3,
  MISC = 99,
}
