import { Step } from "../github/workflows-model";

export interface ActionMetadata {
  readonly name: string;
  readonly author: string;
  readonly description: string;
  readonly inputs: Input[];
  readonly outputs: Output[];
  readonly runs: JavaScriptRuns | CompositeRuns | DockerRuns;
  readonly branding?: Branding;
}

export interface Input {
  readonly name: string;
  readonly description: string;
  readonly required?: boolean;
  readonly default?: string;
  readonly deprecationMessage?: string;
}

export interface Output {
  readonly name: string;
  readonly description: string;
  readonly value?: string;
}

export interface Runs {
  readonly using: string;
}

export interface JavaScriptRuns extends Runs {
  readonly main: string;
  readonly pre?: string;
  readonly preIf?: string;
  readonly post?: string;
  readonly postIf?: string;
}

export interface DockerRuns extends Runs {
  readonly preEntrypoint?: string;
  readonly entrypoint?: string;
  readonly postEntrypoint?: string;
  readonly image: string;
  readonly env?: Record<string, string>;
}

export interface CompositeRuns extends Runs {
  readonly steps: ActionStep[];
}

export interface Branding {
  readonly color?: string;
  readonly icon?: string;
}

export interface ActionStep extends Step {
  readonly workingDirectory: string;
}
