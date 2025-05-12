import { Component } from "./component";
import { FileBase, FileBaseOptions, IResolver } from "./file";
import { Project } from "./project";

/**
 * Represents a single instruction in a Dockerfile.
 * Each instruction consists of a command and its arguments that will be written to the Dockerfile.
 */
export interface DockerfileInstruction {
  /**
   * The command to execute in the Dockerfile (e.g., RUN, COPY, ENV).
   * This corresponds to the instruction keyword in the Dockerfile syntax.
   */
  readonly command: string;

  /**
   * The arguments for the command, formatted as a string.
   * This can include flags, parameters, and values specific to the command.
   */
  readonly arguments: string;
}

/**
 * Options for defining a stage in a Dockerfile.
 * Multi-stage builds are useful for creating optimized production images.
 */
export interface DockerfileStageOptions {
  /**
   * A list of instructions to include in the stage.
   * These instructions will be executed in order during the build.
   *
   * @default []
   */
  readonly instructions?: DockerfileInstruction[];

  /**
   * The base image for this stage.
   * Specified using the FROM instruction at the start of the stage.
   *
   * Can be:
   * - An image from a docker registry
   * - Scratch image for minimal builds ('scratch')
   * - Previous stage in multi-stage build
   *
   */
  readonly fromImage: string;

  /**
   * An identifier for this stage that can be referenced in subsequent stages.
   * While useful for readability in multi-stage builds, it's optional as stages
   * can also be referenced by their positional index (0, 1, 2, etc.).
   *
   */
  readonly id?: string;

  /**
   * The target platform for this stage.
   * Used for multi-platform builds or ensuring consistent builds.
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
   * @default []
   */
  readonly stages?: DockerfileStageOptions[];
}

/**
 * A class representing a Dockerfile with support for multi-stage builds.
 * Provides a type-safe and programmatic way to generate Dockerfile instructions.
 *
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
   * Adds a new stage to the Dockerfile.
   *
   * @param options - The configuration options for the new Dockerfile stage.
   * @returns The newly created `DockerfileStage` instance.
   */
  public addStage(options: DockerfileStageOptions): DockerfileStage {
    const stage = new DockerfileStage(this.project, options);
    this.stages.push(stage);
    return stage;
  }

  /**
   * Attempts to find a Dockerfile stage by its identifier.
   *
   * The identifier can either be a string or a number. If the identifier is a string,
   * it will search for a stage with a matching `id`. If the identifier is a number,
   * it will attempt to retrieve the stage at the corresponding index in the stages array,
   * provided the number is within valid bounds.
   *
   * @param id - The identifier of the stage to find. Can be a string or a number.
   * @returns The matching `DockerfileStage` if found, or `undefined` if no match is found.
   */
  public tryFindStage(id: string | number): DockerfileStage | undefined {
    const stage = this.stages.find((stage) => stage.id === id);
    if (!stage) {
      const numId = Number(id);
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
      ].filter(Boolean);
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
 * Options for the `RUN` instruction in a Dockerfile
 */
export interface RunOptions {
  /**
   * Command to execute
   * @example 'yarn install'
   * ['npm', 'install']
   * 'npm install && npm run build'
   */
  readonly command: string | string[];

  /**
   * Mount options
   * @example ["type=cache,target=/var/cache/apt"]
   */
  readonly mounts?: string[];

  /**
   * Run in a specific network mode
   * @default "default"
   */
  readonly network?: "default" | "none" | "host";

  /**
   * Run with specific security options
   */
  readonly security?: "insecure" | "sandbox";
}

/**
 * Options for the `COPY` instruction in a Dockerfile.
 *
 */
export interface DockerfileCopyOptions extends AddCopyOptions {
  /**
   *  Copy files from an image, a build stage, or a named context instead.
   *  This can be specified as a string (stage name) or a number
   *  (stage index).
   */
  readonly from?: string | number;
}

/**
 * Options for the `ADD` instruction in a Dockerfile.
 *
 */
export interface DockerfileAddOptions extends AddCopyOptions {
  /**
   * Option to add .git directory along with rest of repo content when <src> is a remote Git repository.
   * @default false
   */
  readonly keepGitDir?: boolean;

  /**
   * Only SHA256 checksum is supported.
   * Formatted as sha256:<hash>
   */
  readonly checksum?: string;
}

/**
 * This interface contains common options used by both the `COPY` and `ADD` instructions.
 */
interface AddCopyOptions {
  /**
   * The source path(s) to copy from.
   * When string[] is provided, the instruction will use JSON array format.
   */
  readonly src: string | string[];

  /**
   * The destination path to copy to.
   */
  readonly dest: string;

  /**
   * The user/group to set ownership to.
   * This is a string in the format "user:group" or "user".
   */
  readonly chown?: string;

  /**
   * The file permissions to set on the copied files.
   * This is a string in the format "u+x" or "755".
   */
  readonly chmod?: string;

  /**
   * Files remain independent on their own layer and
   * don't get invalidated when commands on previous layers are changed.
   * Creates much better conditions for cache reuse.
   * @default false
   */
  readonly link?: boolean;
}

/**
 * Options for Dockerfile healthcheck configuration
 */
export interface HealthCheckOptions {
  /**
   * The command to run to check health
   * Required when disable is false or not provided
   */
  readonly command?: string[] | string;

  /**
   * The interval between health checks (in seconds)
   * @default 30s
   */
  readonly interval?: string;

  /**
   * How long to wait before considering the check to have hung (in seconds)
   * @default 30s
   */
  readonly timeout?: string;

  /**
   * The number of consecutive failures needed to consider the container as unhealthy
   * @default 3
   */
  readonly retries?: number;

  /**
   * The optional grace period before starting health checks (in seconds)
   * @default 0s
   */
  readonly startPeriod?: string;

  /**
   * The interval between health checks during the start period (in seconds)
   * @default 5s
   */
  readonly startInterval?: string;

  /**
   * Set to true to disable any healthcheck inherited from the base image
   */
  readonly disable?: boolean;
}

/**
 * Represents a stage in a Dockerfile, allowing the construction of Dockerfile instructions
 * programmatically. This class provides methods to add various Dockerfile commands such as
 * `RUN`, `COPY`, `ENV`, and more.
 * Each method appends a corresponding Dockerfile instruction to the `instructions` array.
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
    this.id = options.id;
  }

  /**
   * The `RUN` instruction executes commands in a new layer on top of the current image
   *
   * @param options - Configuration for the RUN instruction
   * @returns The current instance for method chaining.
   *
   */
  public run(options: RunOptions): DockerfileStage {
    const flags: string[] = [];

    if (options.mounts?.length) {
      options.mounts.forEach((mount) => {
        flags.push(`--mount=${mount}`);
      });
    }

    if (options.network) {
      flags.push(`--network=${options.network}`);
    }

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
          .join("\n  ");
      }
    }

    const finalCommand =
      flags.length > 0 ? `${flags.join(" ")} ${commandArgs}` : commandArgs;

    this.addShellOrExecInstruction("RUN", finalCommand);
    return this;
  }

  /**
   * The `COPY` instruction copies files or directories from source to destination in the container's filesystem.
   * Supports both regular file copying and multi-stage build copying with --from flag.
   *
   * When the source is a string[], the instruction uses JSON array format which is preferred
   * for better handling of spaces in filenames.
   *
   * @param options - Configuration options for the COPY instruction
   * @returns The current instance for method chaining.
   *
   *
   * @example
   * // Multiple source files
   * stage.copy({
   *   src: ["package.json", "yarn.lock"],
   *   link: true  // Enables better layer caching
   *   dest: "/app/"
   * });
   * // Produces: COPY --link ["package.json", "yarn.lock", "/app/"]
   *
   * // Multi-stage build copy
   * stage.copy({
   *   from: "builder",
   *   src: "dist",
   *   dest: "/app/",
   *   chown: "node:node"
   * });
   * // Produces: COPY --from=builder --chown=node:node dist /app/
   *
   */
  public copy(options: DockerfileCopyOptions) {
    const flags = [
      options.chown ? `--chown=${options.chown}` : "",
      options.chmod ? `--chmod=${options.chmod}` : "",
      options.from !== undefined ? `--from=${options.from}` : "",
      options.link ? "--link" : "",
    ].filter((arg) => arg !== "");

    const args = Array.isArray(options.src)
      ? [...flags, JSON.stringify([...options.src, options.dest])]
          .join(" ")
          .trim()
      : [...flags, options.src, options.dest].join(" ").trim();

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

  /**
   * The `ADD` instruction copies files, directories, or remote URLs from source to destination.
   * Similar to COPY but with additional features like URL support and tar extraction.
   *
   * When the source is a string[], the instruction uses JSON array format which is preferred
   * for better handling of spaces in filenames.
   *
   * @param options - Configuration options for the ADD instruction
   * @returns The current instance for method chaining.
   *
   * @example
   * // Remote URL
   * stage.add({
   *   src: "https://example.com/app.tar.gz",
   *   dest: "/app/",
   *   checksum: "sha256:a9561eb1b190625c9adb5a9513e72c4dedafc1cb2d4c5236c9a6957ec7dfd5a9"
   * });
   * // Produces: ADD --checksum=sha256:a9561eb... https://example.com/app.tar.gz /app/
   *
   * // Git repository
   * stage.add({
   *   src: "https://github.com/user/repo.git",
   *   dest: "/app/",
   *   keepGitDir: true
   * });
   * // Produces: ADD --keep-git-dir https://github.com/user/repo.git /app/
   */
  public add(options: DockerfileAddOptions) {
    const flags = [
      options.keepGitDir ? "--keep-git-dir" : "",
      options.checksum ? `--checksum=${options.checksum}` : "",
      options.chown ? `--chown=${options.chown}` : "",
      options.chmod ? `--chmod=${options.chmod}` : "",
    ].filter((arg) => arg !== "");

    const args = Array.isArray(options.src)
      ? [...flags, JSON.stringify([...options.src, options.dest])]
          .join(" ")
          .trim()
      : [...flags, options.src, options.dest].join(" ").trim();

    this.instructions.push({
      command: "ADD",
      arguments: args,
    });
    return this;
  }

  /**
   * The `ARG` instruction defines one or more variables that users can pass at build-time
   * to the builder with the `--build-arg` flag. This is useful for parameterizing
   * the build process.
   *
   * @param args - A single argument string (e.g., `name=value`), an array of strings.
   * @returns The current instance for method chaining.
   */
  public arg(args: string | string[]) {
    this.addKeyValueInstruction("ARG", args);
    return this;
  }

  /**
   * The `HEALTHCHECK` instruction tells Docker how to test a container to check that it is still working.
   * This is useful for ensuring that the container is healthy and can respond to requests.
   *
   * @param options - Configuration options for the HEALTHCHECK instruction
   * @returns The current instance for method chaining.
   * @throws {Error} If command is not provided and disable is false
   *
   *
   * @example
   * // HTTP endpoint check
   * stage.healthcheck({
   *   command: ["curl", "-f http://localhost:3000/health || exit 1"],
   *   interval: "30s",
   *   timeout: "10s",
   *   retries: 3,
   *   startPeriod: "40s"
   * });
   * // Produces: HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=40s CMD curl -f http://localhost:3000/health || exit 1
   *
   * // Using command array
   * stage.healthcheck({
   *   command: ["curl", "-f", "http://localhost:3000/health"],
   *   interval: "1m",
   *   timeout: "5s"
   * });
   * // Produces: HEALTHCHECK --interval=1m --timeout=5s CMD curl -f http://localhost:3000/health
   *
   * // Custom script check
   * stage.healthcheck({
   *   command: ["/health-check.sh"],
   *   interval: "45s",
   *   startInterval: "5s"
   * });
   * // Produces: HEALTHCHECK --interval=45s --start-interval=5s CMD /health-check.sh
   *
   * // Disable health check
   * stage.healthcheck({ disable: true });
   * // Produces: HEALTHCHECK NONE
   *
   */
  public healthcheck(options: HealthCheckOptions) {
    if (options.disable) {
      this.instructions.push({
        command: "HEALTHCHECK",
        arguments: "NONE",
      });
      return this;
    }

    if (
      !options.command ||
      (typeof options.command === "string" && options.command.trim() === "") ||
      (Array.isArray(options.command) &&
        (options.command.length === 0 ||
          options.command.every((cmd) => cmd.trim() === "")))
    ) {
      throw new Error(
        "command is required when healthcheck is not disabled and must not be empty"
      );
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

  /**
   * Adds a `SHELL` instruction to the Dockerfile with the specified arguments.
   *
   * The `SHELL` instruction allows you to specify the default shell to use for
   * the `RUN, CMD and ENTRYPOINT` instructions in the Dockerfile when their shell form is used.
   * This can be useful for changing the shell to a different one, such as `bash` or `powershell`,
   * or for providing additional arguments to the shell.
   *
   * @param args - An array of strings representing the shell command and its
   *               arguments. The first element is the shell executable, and
   *               the subsequent elements are its arguments.
   * @returns The current instance for method chaining.
   */
  public shell(args: string[]) {
    this.addShellOrExecInstruction("SHELL", args);
    return this;
  }

  /**
   * Adds a `LABEL` instruction to the Dockerfile with the specified arguments.
   *
   * The `LABEL` instruction is used to add metadata to an image in the form of key-value pairs.
   *
   * @param args - The label arguments to add. This can be:
   * - A string representing a single key-value pair in the format `key=value`.
   * - An array of strings, each representing a key-value pair in the format `key=value`.
   * - A record object where keys are label names and values are their corresponding values (strings or numbers).
   *
   * @returns The current instance for method chaining.
   */
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
   */
  public volume(mountpoints: string | string[]) {
    const args = Array.isArray(mountpoints)
      ? JSON.stringify(mountpoints)
      : mountpoints;
    this.instructions.push({
      command: "VOLUME",
      arguments: args,
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
   * @param args - The user name/UID and optionally the group name/GID.
   *               `<user>[:<group>]` `<UID>[:<GID>]`
   * @returns The current instance for method chaining.
   *
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
   * @param signal - The signal to send to the container. Can be a number or a signal name (e.g., SIGKILL).
   * @returns The current instance for method chaining.
   */
  public stopsignal(signal: string | number) {
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
   * The `ENTRYPOINT` instruction allows you to configure a container that will run as an executable.
   * It is similar to `CMD`, but it is not overridden when arguments are passed to `docker run`.
   * This means that the command specified in `ENTRYPOINT` will always be executed,
   * and any additional arguments will be passed to it.
   * Can be overridden by `docker run --entrypoint`.
   *
   * @param args - The command to set as the entrypoint. Can be a single string
   *               (shell form) or an array of strings (exec form).
   * @returns The current instance for method chaining.
   */
  public entrypoint(args: string | string[]) {
    this.addShellOrExecInstruction("ENTRYPOINT", args);
    return this;
  }

  /**
   * Adds a raw Dockerfile instruction to the list of instructions.
   * This is a low-level method that serves as a fallback when specialized methods
   * (like `run()`, `copy()`, etc.) don't meet specific needs or encounter issues.
   *
   * Consider using specialized methods first, as they provide:
   * - Better type safety
   * - Input validation
   * - Proper argument formatting
   * - Documentation and examples
   *
   * @param instruction - The raw Dockerfile instruction to be added
   * @returns The current instance for method chaining.
   *
   * @example
   * // Fallback for complex or uncommon instructions
   * // When specialized methods don't work as needed:
   * stage.instruction({
   *   command: "RUN",
   *   arguments: "--mount=type=secret,id=mykey cat /run/secrets/mykey"
   * });
   *
   * // For experimental or new Dockerfile features:
   * stage.instruction({
   *   command: "NEW_INSTRUCTION",
   *   arguments: "some special args"
   * });
   */
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
  public expose(ports: number | string | number[] | string[]) {
    let argumentsString: string;

    if (Array.isArray(ports)) {
      argumentsString = ports.map((port) => port.toString()).join(" ");
    } else {
      argumentsString = ports.toString();
    }
    this.instructions.push({ command: "EXPOSE", arguments: argumentsString });
    return this;
  }

  /**
   * Adds a comment to the Dockerfile instructions.
   *
   * @param comment - The comment text to be added. This will be prefixed with `#` in the Dockerfile.
   * @returns The current instance for method chaining.
   */
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
      typeof args === "string" ? args : JSON.stringify(args);
    this.instructions.push({ command, arguments: argumentsString });
  }

  /**
   * Handles key-value pair instructions and adds them to the instructions array.
   *
   * @param command - The Dockerfile command (e.g., `ENV`, `ARG`).
   * @param args - The arguments for the command. Can be a string, an array of strings, or an object.
   */
  private addKeyValueInstruction(
    command: string,
    args: string | string[] | Record<string, string | number>
  ) {
    let argumentsString: string;

    if (typeof args === "string") {
      argumentsString = args;
    } else if (Array.isArray(args)) {
      argumentsString = args.join(" ");
    } else {
      argumentsString = Object.entries(args)
        .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
        .join(" ");
    }

    this.instructions.push({ command, arguments: argumentsString });
  }
}
