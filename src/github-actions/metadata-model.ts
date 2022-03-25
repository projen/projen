import { Step } from "../github/workflows-model";

export interface ActionMetadata {
  readonly name: string;
  readonly author: string;
  readonly description: string;
  readonly inputs: Input[];
  readonly outputs: Output[];
  readonly runs: Runs;
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
  readonly steps: ActionStep[];
}

export interface Branding {
  readonly color?: string;
  readonly icon?: string;
}

export interface ActionStep extends Step {
  readonly workingDirectory: string;
}
