import { Component } from "./component";
import { FileBase, FileBaseOptions, IResolver } from "./file";
import { Project } from "./project";

/**
 * Represents a single instruction in a Dockerfile.
 */
export interface DockerfileInstruction {
  /**
   * The command to execute in the Dockerfile.
   * This is typically a Dockerfile instruction like `RUN`, `COPY`, etc.
   */
  readonly command: string;
  /**
   * The arguments to pass to the command.
   * This is a string that contains the arguments for the command.
   */
  readonly arguments: string;
}

/**
 * Options for defining a stage in a Dockerfile.
 */
export interface DockerfileStageOptions {
  /**
   * A list of instructions to include in this stage of the Dockerfile.
   * Each instruction represents a command or directive in the Dockerfile.
   *
   * @default - No instructions are specified.
   */
  readonly instructions?: DockerfileInstruction[];

  /**
   * The base image to use for this stage of the Dockerfile.
   * This is specified using the `FROM` directive in the Dockerfile.
   *
   * @default - No base image is specified.
   */
  readonly fromImage?: string;

  /**
   * An optional identifier for this stage of the Dockerfile.
   * This can be used to reference the stage in multi-stage builds.
   *
   * @default - No identifier is specified.
   */
  readonly id?: string;

  /**
   * The platform to use for this stage of the Dockerfile.
   * This is specified using the `--platform` option in the Dockerfile.
   *
   * @default - No platform is specified.
   */
  readonly platform?: string;
}

/**
 * Options for configuring a Dockerfile.
 */
export interface DockerfileOptions extends FileBaseOptions {
  /**
   * A list of stages to include in the Dockerfile.
   * Each stage is defined using the `DockerfileStageOptions` interface.
   *
   * @default - No stages are specified.
   */
  readonly stages?: DockerfileStageOptions[];
}

/**
 * A Dockerfile.
 */
export class Dockerfile extends FileBase {
  private readonly stages: DockerfileStage[];
  readonly project: Project;

  /**
   * Defines a text file.
   *
   * @param project The project
   * @param filePath File path
   * @param options DockerfileOptions
   */
  constructor(
    project: Project,
    filePath: string,
    options: DockerfileOptions = {}
  ) {
    super(project, filePath, options);
    this.project = project;
    this.stages = options.stages
      ? options.stages.map((stage) => new DockerfileStage(project, stage))
      : [];
  }

  /**
   * Adds a new stage to the Dockerfile with the specified options.
   *
   * @param stageOptions - The configuration options for the new Dockerfile stage.
   * @returns The newly created `DockerfileStage` instance.
   */
  public addStage(stageOptions: DockerfileStageOptions): DockerfileStage {
    const updatedStage = new DockerfileStage(this.project, stageOptions);
    this.stages.push(updatedStage);
    return updatedStage;
  }

  /**
   * Attempts to find a Dockerfile stage by its identifier.
   *
   * The identifier can either be a string or a number. If the identifier is a string,
   * it will search for a stage with a matching `id`. If the identifier is a number,
   * it will attempt to retrieve the stage at the corresponding index in the stages array,
   * provided the number is within valid bounds.
   *
   * @param stageId - The identifier of the stage to find. Can be a string or a number.
   * @returns The matching `DockerfileStage` if found, or `undefined` if no match is found.
   */
  public tryFindStage(stageId: string | number): DockerfileStage | undefined {
    const stage = this.stages.find((stage) => stage.id === stageId);
    if (!stage) {
      const numId = Number(stageId);
      if (!isNaN(numId) && numId >= 0 && numId < this.stages.length) {
        return this.stages[numId];
      }
    }
    return stage;
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const lines: string[] = [];
    lines.push(...(this.marker ? [`# ${this.marker}`] : []));
    this.stages.forEach((stage) => {
      const fromParts = [
        stage.platform ? `--platform=${stage.platform}` : null,
        stage.fromImage,
        stage.id ? `AS ${stage.id}` : null,
      ].filter(Boolean); // Remove null or undefined parts
      lines.push(`FROM ${fromParts.join(" ")}`);
      stage.instructions?.forEach((instruction) =>
        lines.push(`${instruction.command} ${instruction.arguments}`)
      );
      lines.push("");
    });
    return `${resolver.resolve(lines).join("\n")}`;
  }
}

/**
 * Options for `RUN` instruction in a Dockerfile
 */
export interface RunOptions {
  /**
   * Command to execute
   * @example 'npm install' or ['npm', 'install'] or 'npm install && npm run build'
   */
  command: string | string[];

  /**
   * Mount options
   * @example ["type=cache,target=/var/cache/apt"]
   */
  mounts?: string[];

  /**
   * Run in a specific network mode
   * @example "none"
   * @default "default"
   */
  network?: "default" | "none" | "host";

  /**
   * Run with specific security options
   * @example "insecure"
   */
  security?: "insecure" | "sandbox";
}

/**
 * Options for the `COPY` instruction in a Dockerfile.
 *
 * @extends AddCopyOptions
 *
 */
export interface DockerfileCopyOptions extends AddCopyOptions {
  /**
   *  The stage to copy from in a multi-stage Dockerfile build.
   *  This can be specified as a string (stage name) or a number
   *  (stage index).
   */
  from?: string | number;
}

/**
 * Options for the `ADD` instruction in a Dockerfile.
 *
 * @extends AddCopyOptions
 *
 */
export interface DockerfileAddOptions extends AddCopyOptions {
  /**
   * Option to add .git directory along with rest of repo content when <src> is a remote Git repository.
   * @default false
   */
  keepGitDir?: boolean;

  /**
   * Only SHA256 checksum is supported.
   * Formatted as sha256:<hash>
   */
  checksum?: string;
}

/**
 * This interface contains common options used by both the `COPY` and `ADD` instructions.
 */
interface AddCopyOptions {
  /**
   * The source path(s) to copy from.
   */
  src: string | string[];

  /**
   * The destination path to copy to.
   */
  dest: string;

  /**
   * The user/group to set ownership to.
   * This is a string in the format "user:group" or "user".
   */
  chown?: string;

  /**
   * The file permissions to set on the copied files.
   * This is a string in the format "u+x" or "755".
   */
  chmod?: string;

  /**
   * Files remain independent on their own layer and don't get invalidated when commands on previous layers are changed.
   * Creates much better conditions for cache reuse.
   * @default false
   */
  link?: boolean;
}

/**
 * Options for Dockerfile healthcheck configuration
 */
export interface HealthCheckOptions {
  /**
   * The command to run to check health
   * Required when disable is false or not provided
   */
  command?: string[] | string;

  /**
   * The interval between health checks (in seconds)
   * @default 30s
   */
  interval?: string;

  /**
   * How long to wait before considering the check to have hung (in seconds)
   * @default 30s
   */
  timeout?: string;

  /**
   * The number of consecutive failures needed to consider the container as unhealthy
   * @default 3
   */
  retries?: number;

  /**
   * The optional grace period before starting health checks (in seconds)
   * @default 0s
   */
  startPeriod?: string;

  /**
   * The interval between health checks during the start period (in seconds)
   * @default 5s
   */
  startInterval?: string;

  /**
   * Set to true to disable any healthcheck inherited from the base image
   */
  disable?: boolean;
}

/**
 * Represents a stage in a Dockerfile, allowing the construction of Dockerfile instructions
 * programmatically. This class provides methods to add various Dockerfile commands such as
 * `RUN`, `COPY`, `ENV`, and more.
 *
 * @example
 * ```typescript
 * const stage = new DockerfileStage({
 *   fromImage: "node:14",
 *   id: "build",
 *   instructions: [],
 * });
 *
 * stage
 *   .run(["npm install"])
 *   .copy({ src: "src/", dest: "/app/src" })
 *   .env("NODE_ENV=production");
 * ```
 *
 * @remarks
 * Each method appends a corresponding Dockerfile instruction to the `instructions` array.
 * The `fromImage` and `id` properties define the base image and identifier for the stage,
 * respectively.
 *
 */
export class DockerfileStage extends Component {
  readonly instructions: DockerfileInstruction[];
  readonly fromImage?: string;
  readonly platform?: string;
  readonly id?: string;

  constructor(project: Project, options: DockerfileStageOptions) {
    super(project);
    this.instructions = options.instructions ?? [];
    this.platform = options.platform;
    this.fromImage = options.fromImage;
    if (options.id !== "default") {
      this.id = options.id;
    }
  }

  /**
   * The RUN instruction executes commands in a new layer on top of the current image
   *
   * @param options - Configuration for the RUN instruction
   * @returns The current instance for method chaining
   *
   * @example
   * ```typescript
   * stage.run({ command: 'npm install' });
   *
   * stage.run({
   *   command: 'apt-get update && apt-get install -y curl',
   *   mounts: ['type=cache,target=/var/cache/apt'],
   *   network: 'none'
   * });
   * ```
   */
  public run(options: RunOptions): DockerfileStage {
    const flags: string[] = [];

    // Add mount options
    if (options.mounts?.length) {
      options.mounts.forEach((mount) => {
        flags.push(`--mount=${mount}`);
      });
    }

    // Add network option
    if (options.network) {
      flags.push(`--network=${options.network}`);
    }

    // Add security option
    if (options.security) {
      flags.push(`--security=${options.security}`);
    }

    let commandArgs = options.command;
    if (typeof commandArgs === "string") {
      const splitOperators = [";", "&&", "||"];
      const hasOperators = splitOperators.some((op) =>
        commandArgs.includes(op)
      );

      if (hasOperators) {
        const parts = commandArgs
          .split(/(?<=;|&&|\|\|)/g)
          .map((part) => part.trim())
          .filter(Boolean);

        commandArgs = parts
          .map((part, index, array) => {
            if (
              index < array.length - 1 &&
              splitOperators.some((op) => part.includes(op))
            ) {
              return part + " \\";
            }
            return part;
          })
          .join("\n    ");
      }
    }

    // Combine flags with command
    const finalCommand =
      flags.length > 0 ? `${flags.join(" ")} ${commandArgs}` : commandArgs;

    this.addShellOrExecInstruction("RUN", finalCommand);
    return this;
  }

  public copy(options: DockerfileCopyOptions) {
    const src = Array.isArray(options.src)
      ? options.src.join(" ")
      : options.src;

    const linkOption = options.link ? "--link" : "";

    const args = [
      options.chown ? `--chown=${options.chown}` : "",
      options.chmod ? `--chmod=${options.chmod}` : "",
      typeof options.from !== undefined ? `--from=${options.from}` : "",
      linkOption,
      src,
      options.dest,
    ]
      .filter((arg) => arg !== "") // Remove empty arguments
      .join(" ");

    this.instructions.push({
      command: "COPY",
      arguments: args,
    });
    return this;
  }

  /**
   * The `ENV` instruction sets environment variables in the container.
   * Only for backward compatibility docker allows `ENV MY_VAR my-value` syntax
   * It is not recommended to use it anymore.
   *
   * @param args - A single environment variable (e.g., `KEY=value`), an array of variables,
   *               or an object where keys are variable names and values are their values.
   * @returns The current instance for method chaining.
   */
  public env(args: string | string[] | Record<string, string | number>) {
    this.addKeyValueInstruction("ENV", args);
    return this;
  }

  public add(options: DockerfileAddOptions) {
    const src = Array.isArray(options.src)
      ? options.src.join(" ")
      : options.src;
    const args = [
      options.keepGitDir ? "--keep-git-dir" : "",
      options.checksum ? `--checksum=${options.checksum}` : "",
      options.chown ? `--chown=${options.chown}` : "",
      options.chmod ? `--chmod=${options.chmod}` : "",
      src,
      options.dest,
    ]
      .filter((arg) => arg !== "") // Remove empty arguments
      .join(" ");

    this.instructions.push({ command: "ADD", arguments: args });
    return this;
  }

  /**
   * The `ARG` instruction defines one or more variables that users can pass at build-time
   * to the builder with the `--build-arg` flag. This is useful for parameterizing
   * the build process.
   *
   * @param args - A single argument string (e.g., `name=value`), an array of strings,
   *               or an object where keys are argument names and values are their defaults.
   * @returns The current instance for method chaining.
   */
  public arg(
    args: string | string[] | Record<string, string | number | undefined>
  ) {
    this.addKeyValueInstruction("ARG", args);
    return this;
  }

  public healthcheck(options: HealthCheckOptions) {
    if (options.disable) {
      this.instructions.push({
        command: "HEALTHCHECK",
        arguments: "NONE",
      });
      return this;
    }

    if (!options.command) {
      throw new Error("command is required when healthcheck is not disabled");
    }

    const parts = [];

    if (options.interval) {
      parts.push(`--interval=${options.interval}`);
    }

    if (options.timeout) {
      parts.push(`--timeout=${options.timeout}`);
    }

    if (options.retries) {
      parts.push(`--retries=${options.retries}`);
    }

    if (options.startPeriod) {
      parts.push(`--start-period=${options.startPeriod}`);
    }

    if (options.startInterval) {
      parts.push(`--start-interval=${options.startInterval}`);
    }

    if (Array.isArray(options.command)) {
      parts.push("CMD " + options.command.join(" "));
    } else {
      parts.push("CMD " + options.command);
    }

    this.instructions.push({
      command: "HEALTHCHECK",
      arguments: parts.join(" "),
    });
    return this;
  }

  public shell(args: string[]) {
    this.addShellOrExecInstruction("SHELL", args);
    return this;
  }

  public label(args: string | string[] | Record<string, string | number>) {
    this.addKeyValueInstruction("LABEL", args);
    return this;
  }

  /**
   * The `VOLUME` instruction creates a mount point with the specified name and marks it
   * as holding externally mounted volumes from native host or other containers.
   *
   * @param mountpoints - A single mountpoint path (e.g., "/data") or an array of paths (e.g., ["/data", "/var/log"]).
   * @returns The current instance for method chaining.
   *
   * @example
   * ```typescript
   * stage.volume("/data");                     // Single volume
   * stage.volume(["/data", "/var/log"]);      // Multiple volumes
   * ```
   */
  public volume(mountpoints: string | string[]) {
    const args = Array.isArray(mountpoints)
      ? JSON.stringify(mountpoints)
      : mountpoints;
    this.instructions.push({
      command: "VOLUME",
      arguments: JSON.stringify(args),
    });
    return this;
  }

  /**
   * The `WORKDIR` instruction sets the working directory for any subsequent
   * `RUN`, `CMD`, `ENTRYPOINT`, `COPY` and `ADD` instructions that follow it.
   * If the directory doesn't exist, it will be created.
   *
   * @param path - The path to set as the working directory. Can be absolute or relative.
   *              If relative, it is relative to the previous WORKDIR instruction.
   * @returns The current instance for method chaining.
   *
   * @example
   * ```typescript
   * stage.workdir("/app");               // Absolute path
   * stage.workdir("src");                // Relative to previous WORKDIR
   * stage.workdir("/usr/local/app");     // Nested absolute path
   * ```
   */
  public workdir(path: string) {
    this.instructions.push({
      command: "WORKDIR",
      arguments: path,
    });
    return this;
  }

  /**
   * The `USER` instruction sets the user name (or UID) and optionally the user group (or GID)
   * to use when running the image and for any subsequent instructions in the Dockerfile.
   *
   * @param args - The user name/UID and optionally the group name/GID. Can be in the following formats:
   *               - <user>[:<group>]
   *               - <UID>[:<GID>]
   * @returns The current instance for method chaining.
   *
   * @example
   * ```typescript
   * stage.user("nginx");              // Set user
   * stage.user("nginx:www-data");     // Set user and group
   * stage.user("1000:1000");          // Set UID and GID
   * ```
   */
  public user(args: string) {
    this.instructions.push({ command: "USER", arguments: args });
    return this;
  }

  /**
   * The `STOPSIGNAL` instruction sets the system call signal that will be sent to the container to exit.
   * The signal can be a valid unsigned number that matches a position in the kernel's syscall table (e.g., 9),
   * or a signal name in the format SIGNAME (e.g., SIGKILL).
   *
   * @param signal - The signal to send to the container. Can be a number (1-64) or a signal name (e.g., SIGKILL).
   * @returns The current instance for method chaining.
   *
   * @example
   * ```typescript
   * stage.stopsignal("SIGTERM");
   * stage.stopsignal(9); // SIGKILL
   * ```
   */
  public stopsignal(signal: string | number) {
    if (typeof signal === "number") {
      if (signal < 1 || signal > 64) {
        throw new Error("Signal number must be between 1 and 64");
      }
    }
    this.instructions.push({
      command: "STOPSIGNAL",
      arguments: signal.toString(),
    });
    return this;
  }

  /**
   *
   * The `CMD` instruction is used to specify the default command to run when a container is started.
   *
   * @param args - The arguments for the `CMD` instruction. This can be a command string (shell form)
   *               or an array of strings (exec form).
   * @returns The current instance for method chaining.
   */
  public cmd(args: string | string[]) {
    this.addShellOrExecInstruction("CMD", args);
    return this;
  }

  /**
   * @param args - The command to set as the entrypoint. Can be a single string
   *               (shell form) or an array of strings (exec form).
   * @returns The current instance for method chaining.
   */
  public entrypoint(args: string | string[]) {
    this.addShellOrExecInstruction("ENTRYPOINT", args);
    return this;
  }

  public instruction(instruction: DockerfileInstruction) {
    this.instructions.push(instruction);
    return this;
  }

  /**
   * The `EXPOSE` instruction informs Docker that the container listens on specific network ports at runtime.
   * By default, the protocol is `tcp`, but `udp` can also be specified.
   *
   * @param ports - A single port (e.g., `8080`), an array of ports (e.g., `[8080, 9090]`),
   *                or an object where keys are ports and values are protocols (`tcp` or `udp`).
   * @returns The current instance for method chaining.
   */
  public expose(ports: number | string | (number | string)[]) {
    let argumentsString: string;

    if (Array.isArray(ports)) {
      // Array of ports
      argumentsString = ports.map((port) => port.toString()).join(" ");
    } else {
      argumentsString = ports.toString();
    }
    this.instructions.push({ command: "EXPOSE", arguments: argumentsString });
    return this;
  }

  public comment(comment: string) {
    this.instructions.push({ command: "#", arguments: comment });
    return this;
  }

  /**
   * Handles both shell and exec forms for Dockerfile instructions and adds them to the instructions array.
   *
   * @param command - The Dockerfile command (e.g., `CMD`, `ENTRYPOINT`).
   * @param args - The arguments for the command. Can be a string (shell form) or an array of strings (exec form).
   */
  private addShellOrExecInstruction(command: string, args: string | string[]) {
    const argumentsString =
      typeof args === "string" ? args : JSON.stringify(args); // Convert array to JSON for exec form
    this.instructions.push({ command, arguments: argumentsString });
  }

  /**
   * Handles key-value pair instructions and adds them to the instructions array.
   *
   * @param command - The Dockerfile command (e.g., `ENV`, `ADD`).
   * @param args - The arguments for the command. Can be a string, an array of strings, or an object.
   */
  private addKeyValueInstruction(
    command: string,
    args: string | string[] | Record<string, string | number | undefined>
  ) {
    let argumentsString: string;

    if (typeof args === "string") {
      // Single argument string
      argumentsString = args;
    } else if (Array.isArray(args)) {
      // Array of argument strings
      argumentsString = args.join(" ");
    } else {
      // Object with key-value pairs
      argumentsString = Object.entries(args)
        .map(([key, value]) =>
          value !== undefined
            ? `${key}="${String(value).replace(/"/g, '\\"')}"`
            : key
        )
        .join(" ");
    }

    this.instructions.push({ command, arguments: argumentsString });
  }
}
