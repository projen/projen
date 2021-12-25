import { ArrowParens, Eslint, NodeProject, Prettier, TrailingComma } from '../src/javascript';
import { synthSnapshot } from './util';

describe('prettier', () => {
  test('snapshot', () => {
    // GIVEN
    const project = new NodeProject({
      name: 'test',
      defaultReleaseBranch: 'master',
      prettierIgnoreEnabled: true,
    });


    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    new Prettier(project, {
      printWidth: 140,
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
    });


    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    new Prettier(project, {
      printWidth: 140,
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
    });


    // WHEN
    new Eslint(project, {
      dirs: ['mysrc'],
      prettier: true,
    });

    const prettier = new Prettier(project, {
      trailingComma: TrailingComma.ALL,
      bracketSpacing: true,
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      arrowParens: ArrowParens.ALWAYS,
      printWidth: 140,
      useTabs: false,
      parser: 'typescript',
    });

    // THEN
    expect(prettier.config).toMatchObject({
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
