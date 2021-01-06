import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

/**
 * A Make rule.
 */
export interface Rule {
  /**
   * Files to be created or updated by this rule.
   *
   * If the rule is phony then instead this represents the command's name(s).
   */
  readonly targets: string[];

  /**
   * Files that are used as inputs to create a target.
   *
   * @default []
   */
  readonly prerequisites?: string[];

  /**
   * Commands that are run (using prerequisites as inputs) to create a target.
   *
   * @default []
   */
  readonly recipe?: string[];

  /**
   * Marks whether the target is phony.
   *
   * @default false
   */
  readonly phony?: boolean;
}

interface AllRule extends Rule {
  readonly prerequisites: string[];
}

/**
 * Options for Makefiles.
 */
export interface MakefileOptions extends FileBaseOptions {
  /**
   * List of targets to build when Make is invoked without specifying any targets.
   *
   * @default []
   */
  readonly all?: string[];

  /**
   * Rules to include in the Makefile.
   *
   * @default []
   */
  readonly rules?: Rule[];
}

/**
 * Minimal Makefile.
 */
export class Makefile extends FileBase {
  /**
   * List of rule definitions.
   */
  public readonly rules: Rule[];

  private readonly all: AllRule;


  constructor(project: Project, filePath: string, options: MakefileOptions = {}) {
    super(project, filePath, options);

    const all = options.all ? options.all : [];
    const rules = options.rules ? options.rules : [];

    rules.forEach(e => this.validateRule(e));

    this.all = {
      targets: ['all'],
      prerequisites: all,
      phony: true,
    };
    this.rules = [
      this.all,
      ...rules,
    ];
  }

  /**
   * Add a target to all
   */
  public addAll(target: string): Makefile {
    this.all.prerequisites.push(target);
    return this;
  }

  /**
   * Add multiple targets to all
   */
  public addAlls(...targets: string[]): Makefile {
    targets.forEach(e => this.addAll(e));
    return this;
  }

  /**
   * Add a rule to the Makefile.
   */
  public addRule(rule: Rule): Makefile {
    this.validateRule(rule);
    this.rules.push(rule);
    return this;
  }

  /**
   * Add multiple rules to the Makefile.
   */
  public addRules(...rules: Rule[]): Makefile {
    rules.forEach(e => this.addRule(e));
    return this;
  }

  private validateRule(rule: Rule) {
    if (!rule.targets || !rule.targets.length) {
      throw new Error('"targets" cannot be undefined or empty for items in "rules"');
    }
  }

  protected synthesizeContent(resolver: IResolver): string | undefined {
    const rules = resolver.resolve(this.rules);

    const lines = [
      ...rules.map((rule: Rule) => {
        const targets = rule.targets.join(' ');
        const prerequisites = (rule.prerequisites ? rule.prerequisites : []).join(' ');
        const recipe = rule.recipe ? rule.recipe : [];

        const phony = rule.phony ? [`.PHONY: ${targets}`] : [];

        return [
          ...phony,
          `${targets}: ${prerequisites}`.trim(),
          ...recipe.map(step => `\t${step}`),
        ].join('\n');
      }),
    ];

    return `${lines.join('\n\n')}\n`;
  }
}
