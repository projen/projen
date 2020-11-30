const { JsiiProject, JsonFile, NpmTaskExecution } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  description: 'A new generation of project generators',
  repository: 'https://github.com/projen/projen.git',
  authorName: 'Elad Ben-Israel',
  authorEmail: 'benisrae@amazon.com',
  stability: 'experimental',

  bundledDeps: [
    'yaml',
    'fs-extra',
    'yargs',
    'decamelize',
    'glob@^7',
    'semver',
    'inquirer',
    'chalk',
    '@iarna/toml',
  ],

  devDeps: [
    '@types/fs-extra@^8',
    '@types/yargs',
    '@types/glob',
    '@types/inquirer',
    '@types/semver',
    'markmac',
  ],

  projenDevDependency: false, // because I am projen
  releaseToNpm: true,
  minNodeVersion: '10.17.0',
  codeCov: true,
  compileBeforeTest: true, // since we want to run the cli in tests
  npmTaskExecution: NpmTaskExecution.SHELL,
});

project.addExcludeFromCleanup('test/**');

// since this is projen, we need to be able to compile without `projen` itself
project.setScript('projen', 'yarn compile && node bin/projen');

project.gitignore.include('templates/**');

// expand markdown macros in readme
const macros = project.addTask('readme-macros')
macros.exec('mv README.md README.md.bak');
macros.exec('cat README.md.bak | markmac > README.md');
macros.exec('rm README.md.bak');
project.buildTask.spawn(macros);

new JsonFile(project, '.markdownlint.json', {
  obj: {
    "default": true,
    "commands-show-output": false,
    "line-length": {
      "line_length": 200
    }
  }
});

project.synth();
