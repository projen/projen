import * as yargs from 'yargs';
import { Sequences } from '../seqs';
import { synth } from './synth';

function main() {
  const ya = yargs;
  ya.commandDir('cmds');

  addSequences(ya);

  ya.recommendCommands();
  ya.wrap(yargs.terminalWidth());
  ya.help();

  const args = ya.argv;

  // no command means just require .projenrc.js
  if (args._.length === 0) {
    synth();
  }
}

function addSequences(ya: yargs.Argv) {
  const workdir = '.';
  const builds = new Sequences(workdir);
  for (const cmd of Object.values(builds.all)) {
    ya.command(cmd.name, cmd.description ?? cmd.name, args => {
      args.option('inspect', { alias: 'i', desc: 'show all commands in this sequence' });

      const argv = args.argv;
      if (argv.inspect) {
        const inspect = (name: string, indent = 0) => {
          const prefix = ' '.repeat(indent);
          const c = builds.all[name];
          for (const t of c.tasks) {
            if (t.sequences) {
              for (const seq of t.sequences) {
                console.log(prefix + `${seq}:`);
                inspect(seq, indent + 2);
              }
            } else if (t.commands) {
              console.log(prefix + t.commands.join(' && '));
            }
          }
        };

        inspect(cmd.name);

        return;
      }

      builds.run(workdir, cmd.name);
    });
  }
}

main();