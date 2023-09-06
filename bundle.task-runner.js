const fs = require('fs')
const path = require('path')

const runTaskPath = path.join(__dirname, 'lib', 'run-task.js');
const runTask = fs.readFileSync(runTaskPath, { encoding: 'utf-8'});
fs.writeFileSync(runTaskPath, `#!/usr/bin/env node\n${runTask}\nconst runtime = new TaskRuntime(".");\nruntime.runTask(process.argv[2]);`)