const { JsiiProject } = require('../../lib');

const project = new JsiiProject({
  name: 'my-project',
  authorName: 'Joe Schmo',
  authorEmail: 'joe@schno.me',
  repository: 'https://github.com/eladb/projen.git',
  python: {
    distName: 'my-python-dist-name',
    module: 'my_python_module'
  }
});

project.synth();