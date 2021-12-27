import { ArrowParens, Eslint, NodeProject, TrailingComma } from '../src/javascript';
import { synthSnapshot } from './util';

describe('prettier', () => {
  test('snapshot', () => {
    // GIVEN
    const project = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'master',
      prettierIgnoreEnabled: true,
      prettier: true,
      prettierOptions: { printWidth: 140 },
    });

    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    // THEN
    expect(synthSnapshot(project)['.prettierrc.json']).toMatchSnapshot();
  });

  test('snapshot with ignore', () => {
    // GIVEN
    const project = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'master',
      prettierIgnoreEnabled: true,
      prettier: true,
      prettierOptions: { printWidth: 140 },
    });


    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    project.prettierIgnore?.addPatterns('build');

    // THEN
    expect(synthSnapshot(project)['.prettierignore']).toMatchSnapshot();
  });

  test('sample config is created', () => {
    // GIVEN
    const project = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'master',
      prettier: true,
      prettierOptions: {
        trailingComma: TrailingComma.ALL,
        bracketSpacing: true,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        arrowParens: ArrowParens.ALWAYS,
        printWidth: 140,
        useTabs: false,
        parser: 'typescript',
      },
    });

    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    // THEN
    expect(project.prettier?.config).toMatchObject({
      trailingComma: 'all',
      bracketSpacing: true,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      arrowParens: 'always',
      printWidth: 140,
      useTabs: false,
      parser: 'typescript',
    });
  });
});
