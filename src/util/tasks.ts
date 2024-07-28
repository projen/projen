/**
 * Makes a cross-shell command that works on both Windows and Unix-like systems.
 *
 * @param command The command to make cross-platform.
 * @returns
 */
export function makeCrossPlatform(command: string): string {
  const isWindows = process.platform === "win32";
  if (!isWindows) {
    return command;
  }

  return command
    .split("&&")
    .map((subcommand) => {
      const trimmedSubcommand = subcommand.trim();
      const cmd = trimmedSubcommand.split(" ")[0];

      const supportedByShx = ["cat", "cp", "mkdir", "mv", "rm"].includes(cmd);

      return supportedByShx ? `shx ${trimmedSubcommand}` : trimmedSubcommand;
    })
    .join(" && ");
}
