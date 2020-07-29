import { NodeProject } from './node-project';

/**
 * Checks for new versions of projen and creates a PR with an upgrade change.
 */
export class ProjenUpgrade {
  constructor(project: NodeProject) {
    project.replaceScript('projen:upgrade',
      'chmod +w package.json',
      'yarn upgrade -L projen',
      'chmod -w package.json',
      'yarn projen');
  }
}