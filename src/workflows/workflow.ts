import { Component } from "../component";
import { Project } from "../project";

export interface WorkflowOptions {
  readonly name: string;
  readonly triggers: Triggers;
}

export interface Triggers {
  readonly pullRequest?: boolean;
  readonly manual?: boolean;
}

export class Workflow extends Component {
  public static findAll(project: Project): Workflow[] {
    const isWorkflow = (c: Component): c is Workflow => c instanceof Workflow;
    return project.components.filter(isWorkflow);
  }

  public readonly jobs: Job[] = [];
  public readonly triggers: Triggers;
  public readonly name: string;

  constructor(project: Project, options: WorkflowOptions) {
    super(project);

    this.name = options.name;
    this.triggers = options.triggers;
  }

  public addJob(name: string, options: JobOptions): Job {
    const job = new Job(name, options);
    this.jobs.push(job);
    return job;
  }

  public synthesize(): void {
    super.synthesize();
  }
}

export interface JobOptions {
  readonly image?: string;
  readonly env?: Record<string, string>;
  readonly steps?: Step[];
  readonly needs?: string[];
  readonly condition?: Condition;
  readonly upload?: string[];
  readonly download?: string[];
  readonly tools?: Tools;
  readonly checkout?: boolean;
  readonly push?: boolean;
  // readonly exports?: string[];
}

export interface Step {
  readonly run: string;
}

export class Job {
  constructor(
    public readonly name: string,
    public readonly options: JobOptions = {}
  ) {}
}

/**
 * Supported tools.
 */
export interface Tools {
  /**
   * Setup java (temurin distribution).
   * @default - not installed
   */
  readonly java?: ToolRequirement;

  /**
   * Setup python.
   * @default - not installed
   */
  readonly python?: ToolRequirement;

  /**
   * Setup golang.
   * @default - not installed
   */
  readonly go?: ToolRequirement;

  /**
   * Setup node.js
   * @default - not installed
   */
  readonly node?: ToolRequirement;

  /**
   * Setup .NET Core
   * @default - not installed
   */
  readonly dotnet?: ToolRequirement;
}

/**
 * Version requirement for tools.
 */
export interface ToolRequirement {
  readonly version: string;
}

export class Condition {
  public static always(): Condition {
    return new Condition({ always: true });
  }

  public static isFork(): Condition {
    return new Condition({ isFork: true });
  }
  public static and(...conditions: Condition[]): Condition {
    return new Condition({ and: conditions });
  }

  public static isOutputDefined(job: string, output: string): Condition {
    return new Condition({ isOutputDefined: { job, output } });
  }

  public static not(condition: Condition): Condition {
    return new Condition({ not: condition });
  }

  private constructor(public readonly spec: ConditionSpec) {}
}

export interface ConditionSpec {
  readonly always?: true;
  readonly isFork?: true;
  readonly and?: Condition[];
  readonly isOutputDefined?: IsOutputDefinedCondition;
  readonly not?: Condition;
}

export interface IsOutputDefinedCondition {
  readonly job: string;
  readonly output: string;
}
