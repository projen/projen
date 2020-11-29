import * as yargs from 'yargs';
import { SequenceRuntime } from '../seqs';
import { synth } from './synth';

async function main() {
  const ya = yargs;
  ya.commandDir('cmds');

  addSequences(ya);

  ya.recommendCommands();
  ya.wrap(yargs.terminalWidth());
  ya.help();

  const args = ya.argv;

  // no command means just require .projenrc.js
  if (args._.length === 0) {
    await synth();
  }
}

function addSequences(ya: yargs.Argv) {
  const workdir = '.';
  const runtime = new SequenceRuntime(workdir);
  const seqs = runtime.manifest.seqs ?? {};
  for (const seq of Object.values(seqs)) {
    ya.command(seq.name, seq.description ?? seq.name, args => {
      args.option('inspect', { alias: 'i', desc: 'show all commands in this sequence' });

      const argv = args.argv;
      if (argv.inspect) {
        const inspect = (name: string, indent = 0) => {
          const prefix = ' '.repeat(indent);
          const c = seqs[name];
          for (const t of c.commands ?? []) {
            if (t.sequences) {
              for (const other of t.sequences) {
                console.log(prefix + `${other}:`);
                inspect(other, indent + 2);
              }
            } else if (t.commands) {
              console.log(prefix + t.commands.join(' && '));
            }
          }
        };

        inspect(seq.name);

        return;
      }

      runtime.run(workdir, seq.name);
    });
  }
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
