import { resolve } from "path";
import * as yargs from "yargs";
import newCommand from "./cmds/new";
import { synth } from "./synth";
import { discoverTaskCommands } from "./tasks";
import { PROJEN_DIR, PROJEN_RC, PROJEN_VERSION } from "../common";
import * as logging from "../logging";
import { TaskRuntime } from "../task-runtime";
import { findUp, getNodeMajorVersion } from "../util";

const DEFAULT_RC = resolve(PROJEN_RC);

async function main() {
  const ya = yargs;
  ya.command(newCommand);

  const pathToProjenDir = findUp(PROJEN_DIR, process.cwd());
  const runtime = new TaskRuntime(pathToProjenDir ?? ".");
  discoverTaskCommands(runtime, ya);

  ya.recommendCommands();
  ya.strictCommands();
  ya.showHelpOnFail(false);
  ya.wrap(yargs.terminalWidth());
  ya.option("post", {
    type: "boolean",
    default: true,
    desc: "Run post-synthesis steps such as installing dependencies. Use --no-post to skip",
  });
  ya.option("watch", {
    type: "boolean",
    default: false,
    desc: "Keep running and resynthesize when projenrc changes",
    alias: "w",
  });
  ya.options("debug", { type: "boolean", default: false, desc: "Debug logs" });
  ya.options("rc", {
    deprecated: true,
    desc: "path to .projenrc.js file",
    default: DEFAULT_RC,
    type: "string",
  });
  ya.completion();
  ya.help();

  // do not use the default yargs '--version' implementation since it is
  // global by default (it appears on all subcommands)
  ya.version(false);
  ya.option("version", {
    type: "boolean",
    description: "Show version number",
    global: false,
  });

  const args = await ya.argv;

  if (args.debug) {
    process.env.DEBUG = "true";
  }

  const nodeVersion = getNodeMajorVersion();
  if (nodeVersion && nodeVersion < 16) {
    logging.warn(
      `WARNING: You are using Node v${nodeVersion}, which reaches end of life on April 30, 2023. Support for EOL Node releases may be dropped by projen in the future. Please consider upgrading to Node >= 16 as soon as possible.`
    );
  }

  // no command means synthesize
  if (args._.length === 0) {
    if (args.version) {
      console.log(PROJEN_VERSION);
      process.exit(0);
    }
    await synth(runtime, {
      post: args.post as boolean,
      watch: args.watch as boolean,
      rcfile: args.rc as string,
    });
  }
}

main().catch((e) => {
  console.error(e.stack);
  process.exit(1);
});
