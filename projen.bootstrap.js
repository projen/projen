// this script is what we use as the projen command in this project
// it will compile the project if needed and then run the cli.

const fs = require('fs')
const path = require('path')
const child = require('child_process')

if (!fs.existsSync(path.join(__dirname, 'lib', 'cli', 'index.js'))) {
  const bootstrapCommand = 'npx jsii --silence-warnings=reserved-word --no-fix-peer-dependencies';
  console.log(`bootstrap | ${bootstrapCommand}`)
  child.execSync(bootstrapCommand, {
    stdio: ['inherit', 'inherit', 'inherit']
  })
}
child.execSync(`${path.join(__dirname, 'bin', 'projen')} ${process.argv.slice(2).join(' ')}`, {
  stdio: ['inherit', 'inherit', 'inherit']
})