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
      ? options.stages.map((stage) => new DockerfileStage(stage))
      : [];
  }

  /**
   * Adds a new stage to the Dockerfile with the specified options.
   *
   * @param stageOptions - The configuration options for the new Dockerfile stage.
   * @returns The newly created `DockerfileStage` instance.
   */
  public addStage(stageOptions: DockerfileStageOptions): DockerfileStage {
    const updatedStage = new DockerfileStage(stageOptions);
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
      lines.push(`FROM ${stage.fromImage}${stage.id ? ` AS ${stage.id}` : ""}`);
      stage.instructions?.forEach((instruction) =>
        lines.push(`${instruction.command} ${instruction.arguments}`)
      );
      lines.push("");
    });
    return `${resolver.resolve(lines).join("\n")}`;
  }
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
export class DockerfileStage {
  readonly instructions: DockerfileInstruction[];
  readonly fromImage?: string;
  readonly id?: string;

  constructor(options: DockerfileStageOptions) {
    this.instructions = options.instructions ?? [];
    this.fromImage = options.fromImage;
    if (options.id !== "default") {
      this.id = options.id;
    }
  }

  public instruction(instruction: DockerfileInstruction) {
    this.instructions.push(instruction);
    return this;
  }


}
