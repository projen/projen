const { TypeScriptLibraryProject } = require('projen');

const project = new TypeScriptLibraryProject({
  name: 'my-project',
  authorName: 'Joe Schmo',
  authorEmail: 'joe@schno.me',
  repository: 'https://github.com/joe/schmo.git',
});

project.synth();