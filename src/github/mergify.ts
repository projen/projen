import { Component } from "../component";
import { YamlFile } from "../yaml";
import { GitHub } from "./github";

export interface MergifyRule {
  readonly name: string;
  readonly conditions: string[];
  readonly actions: { [action: string]: any };
}

export interface MergifyOptions {
  readonly rules?: MergifyRule[];
}

export class Mergify extends Component {
  private readonly rules = new Array<MergifyRule>();
  // The actual YAML file will only be created if at least 1 rule is added.
  private yamlFile?: YamlFile;

  constructor(github: GitHub, options: MergifyOptions = {}) {
    super(github.project);

    for (const rule of options.rules ?? []) {
      this.addRule(rule);
    }
  }

  public addRule(rule: MergifyRule) {
    this.rules.push(rule);
    if (this.yamlFile == null) {
      this.yamlFile = new YamlFile(this.project, ".mergify.yml", {
        obj: {
          pull_request_rules: this.rules,
        },
      });
    }
  }
}
