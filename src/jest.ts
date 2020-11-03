import { NodeProject } from './node-project';
import { StartEntryCategory } from './start';
import { TypescriptConfig } from './typescript';

export interface JestOptions {

  /**
   * Collect coverage.
   * @default true
   */
  readonly coverage?: boolean;

  /**
   * The directory where Jest should output its coverage files.
   * @default "coverage"
   */
  readonly coverageDirectory?: string;

  /**
   * Specify the global coverage thresholds
   */
  readonly coverageThreshold?: CoverageThreshold;

  /**
   * Defines `testPathIgnorePatterns` and `coveragePathIgnorePatterns`
   * @default "/node_modules/"
   */
  readonly ignorePatterns?: string[];

  /**
   * Configure for typescript.
   */
  readonly typescript?: TypescriptConfig;

  /**
   * The version of jest to use.
   *
   * @default - installs the latest jest version
   */
  readonly jestVersion?: string;
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
export class Jest {
  /**
   * Escape hatch.
   */
  public readonly config: any;

  private readonly ignorePatterns: string[];
  private readonly project: NodeProject;

  constructor(project: NodeProject, options: JestOptions = { }) {
    this.project = project;

    const version = options.jestVersion;
    const jestDep = version ? `jest@${version}` : 'jest';
    project.addDevDeps(jestDep);

    this.ignorePatterns = options.ignorePatterns ?? ['/node_modules/'];

    this.config = {
      clearMocks: true,
      collectCoverage: options.coverage ?? true,
      coverageDirectory: options.coverageDirectory ?? 'coverage',
      coveragePathIgnorePatterns: this.ignorePatterns,
      testPathIgnorePatterns: this.ignorePatterns,
    };

    if (options.coverageThreshold) {
      this.config.coverageThreshold = {
        global: options.coverageThreshold,
      };
    }

    const jestOpts = ['--passWithNoTests'];

    // if the project has anti-tamper configured, it should be safe to always run tests
    // with --updateSnapshot because if we forget to commit a snapshot change the CI build will fail.
    if (project.antitamper) {
      jestOpts.push('--updateSnapshot');
    }

    project.addTestCommand(`jest ${jestOpts.join(' ')}`);

    project.addScript('test:watch', 'jest --watch', {
      startDesc: 'Run jest in watch mode',
      startCategory: StartEntryCategory.TEST,
    });

    project.addScript('test:update', 'jest --updateSnapshot');

    project.addFields({ jest: this.config });

    project.npmignore?.exclude('/coverage');
    project.gitignore.exclude('/coverage');

    project.addTip('The VSCode jest extension watches in the background and shows inline test results');
  }

  public addIgnorePattern(pattern: string) {
    this.ignorePatterns.push(pattern);
  }

  /**
   * Configures jest with typescript options
   * @param config The Jest Typescript Config
   */
  public addTypescriptOptions(config: TypescriptConfig) {
    this.config.preset = 'ts-jest';

    // only process .ts files
    this.config.testMatch = [
      '**/__tests__/**/*.ts?(x)',
      '**/?(*.)+(spec|test).ts?(x)',
    ];

    // specify tsconfig.json
    this.config.globals = {
      'ts-jest': {
        tsconfig: config.fileName,
      },
    };

    // add relevant deps
    this.project.addDevDeps(
      '@types/jest',
      'ts-jest',
    );
  }
}
