import { Construct } from 'constructs';
import { NodeProject } from './node-project';
import { Semver } from './semver';

export interface JestOptions {
  readonly globalCoverageThreshold?: CoverageThreshold;
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

    project.addDevDependencies({
      jest: Semver.caret('26.0.1'),
      '@types/jest': Semver.caret('25.2.1'),
    });

    project.addTestCommands('jest');
    project.addFields({
      jest: {
        clearMocks: true,
        collectCoverage: true,
        coverageThreshold: options.globalCoverageThreshold ? {
          global: options.globalCoverageThreshold,
        } : undefined,
        coverageDirectory: 'coverage',
        coveragePathIgnorePatterns: [ '/node_modules/' ],
        moduleFileExtensions: [ 'js' ],
      },
    });
  }
}
