import { Construct } from 'constructs';
import { NodeProject } from './node-project';
import { Semver } from './semver';

export interface JestOptions {
  readonly globalCoverageThreshold?: CoverageThreshold;
  readonly typescript?: boolean;
}

export interface CoverageThreshold {
  readonly branches?: number;
  readonly functions?: number;
  readonly lines?: number;
  readonly statements?: number;
}

export class Jest extends Construct {
  constructor(project: NodeProject, options: JestOptions = { }) {
    super(project, 'jest');

    project.addDevDependencies({ jest: Semver.caret('26.0.1') });

    const config: any = {
      clearMocks: true,
      collectCoverage: true,
      coveragePathIgnorePatterns: [ '/node_modules/' ],
    };

    if (options.typescript) {
      config.preset = 'ts-jest';
      project.addDevDependencies({
        '@types/jest': Semver.caret('25.2.1'),
        'ts-jest': Semver.caret('26.1.0'),
      })
    }

    if (options.globalCoverageThreshold) {
      config.coverageThreshold = {
        global: options.globalCoverageThreshold,
      };
    }

    project.addTestCommands('jest');
    project.addFields({ jest: config });
  }
}
