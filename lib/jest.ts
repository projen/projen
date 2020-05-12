import { Construct } from 'constructs';
import { NodeProject } from './node-project';
import { Semver } from './semver';

export class Jest extends Construct {
  constructor(project: NodeProject) {
    super(project, 'jest');

    project.addDevDependencies({
      jest: Semver.caret('26.0.1'),
      '@types/jest': Semver.caret('25.2.1'),
    });

    project.addTestCommands('jest');
    project.addFields({
      jest: {
        clearMocks: true,
        coverageDirectory: 'coverage',
        coveragePathIgnorePatterns: [ '/node_modules/' ],
        moduleFileExtensions: [ 'js' ],
      },
    });
  }
}
