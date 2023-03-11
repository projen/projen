import { resolve } from "path";
import * as fs from "fs-extra";
import * as yargs from "yargs";
import newCommand from "./cmds/new";
import { synth } from "./synth";
import { discoverTaskCommands } from "./tasks";
import {
  PROJEN_RC,
  PROJEN_RC_JAVA,
  PROJEN_RC_JSON,
  PROJEN_RC_PY,
  PROJEN_RC_TS,
  PROJEN_VERSION,
} from "../common";
import * as logging from "../logging";
import { TaskRuntime } from "../task-runtime";
import { getNodeMajorVersion } from "../util";

const DEFAULT_RC = findProjenRcJs(process.cwd());

async function main() {
  const ya = yargs;
  ya.command(newCommand);

  const pathToProjenRcDir = resolve(DEFAULT_RC ?? resolve(PROJEN_RC), "..");
  const runtime = new TaskRuntime(pathToProjenRcDir ?? ".");
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
    desc: "path to .projenrc.js file",
    default: DEFAULT_RC ?? PROJEN_RC,
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

  const args = ya.argv;

  if (args.debug) {
    process.env.DEBUG = "true";
  }

  const nodeVersion = getNodeMajorVersion();
  if (nodeVersion && nodeVersion < 14) {
    logging.warn(
      `WARNING: You are using Node v${nodeVersion}, which reaches end of life on April 30, 2022. Support for EOL Node releases may be dropped by projen in the future. Please consider upgrading to Node >= 14 as soon as possible.`
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

/** Run up project tree to find .projenrc
 *
 * @param cwd current working directory
 * @returns file path to .projenrc or undefined if not found
 */
function findProjenRcJs(cwd: string): string | undefined {
  if (cwd === "/") {
    return undefined;
  }

  if (fs.existsSync(resolve(cwd, PROJEN_RC))) {
    return resolve(cwd, PROJEN_RC);
  } else if (fs.existsSync(resolve(cwd, PROJEN_RC_TS))) {
    return resolve(cwd, PROJEN_RC_TS);
  } else if (fs.existsSync(resolve(cwd, PROJEN_RC_PY))) {
    return resolve(cwd, PROJEN_RC_PY);
  } else if (fs.existsSync(resolve(cwd, PROJEN_RC_JAVA))) {
    return resolve(cwd, PROJEN_RC_JAVA);
  } else if (fs.existsSync(resolve(cwd, PROJEN_RC_JSON))) {
    return resolve(cwd, PROJEN_RC_JSON);
  }

  return findProjenRcJs(resolve(cwd, ".."));
}
