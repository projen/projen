const { JsiiProject, JsonFile, Semver } = require('./lib');

const project = new JsiiProject({
  name: 'projen',
  description: 'A new generation of project generators',
  repository: 'https://github.com/eladb/projen.git',
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
  compileBeforeTest: true,
});

// since this is projen, we need to compile before running projen, dah!
project.addScript('projen', 'yarn compile && node .projenrc.js');

project.gitignore.include('templates/**');

// expand markdown macros in readme
project.addBuildCommand(
  'mv README.md README.md.bak',
  'cat README.md.bak | npx markmac > README.md',
  'rm README.md.bak',
);

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
