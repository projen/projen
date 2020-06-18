import { Construct } from 'constructs';
import { NodeProject } from './node-project';
import { Semver } from './semver';

export interface JestOptions {
  /**
   * Specify the global coverage thresholds
   */
  readonly coverage?: CoverageThreshold;

  /**
   * Typescript support:
   *
   *  - Uses `ts-jest` as a preprocessor and configuration preset.
   *  - Only matches *.ts files
   */
  readonly typescript?: boolean;

  /**
   * Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`
   * @default "/node_modules/"
   */
  readonly ignorePatterns?: string[];
}

export interface CoverageThreshold {
  readonly branches?: number;
  readonly functions?: number;
  readonly lines?: number;
  readonly statements?: number;
}

/**
 * Installs the following npm scripts:
 *
 * - `test` will run `jest --passWithNoTests`
 * - `test:watch` will run `jest --watch`
 * - `test:update` will run `jest -u`
 *
 */
export class Jest extends Construct {
  constructor(project: NodeProject, options: JestOptions = { }) {
    super(project, 'jest');

    project.addDevDependencies({ jest: Semver.caret('26.0.1') });

    const ignorePatterns = options.ignorePatterns ?? [ '/node_modules/' ];

    const config: any = {
      clearMocks: true,
      collectCoverage: true,
      coveragePathIgnorePatterns: ignorePatterns,
      testPathIgnorePatterns: ignorePatterns,
    };

    if (options.typescript) {
      config.preset = 'ts-jest';

      // only processs .ts files
      config.testMatch = [
        '**/__tests__/**/*.ts?(x)',
        '**/?(*.)+(spec|test).ts?(x)',
      ];

      project.addDevDependencies({
        '@types/jest': Semver.caret('25.2.1'),
        'ts-jest': Semver.caret('26.1.0'),
      });;
    }

    if (options.coverage) {
      config.coverageThreshold = {
        global: options.coverage,
      };
    }

    project.addTestCommands('jest --passWithNoTests');

    project.addScripts({
      'test:watch': 'jest --watch',
      'test:update': 'jest -u',
    });

    project.addFields({ jest: config });

  }
}
