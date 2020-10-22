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
   * Targets to make by default.
   *
   * @default []
   */
  public readonly all?: string[];

  /**
   * List of rule definitions.
   *
   * @default []
   */
  public readonly rules: Rule[];


  constructor(project: Project, filePath: string, options: MakefileOptions) {
    super(project, filePath, options);

    const all = options.all ? options.all : [];
    const rules = options.rules ? options.rules : [];

    for (const rule of rules) {
      if (!rule.targets || !rule.targets.length) {
        throw new Error('"targets" cannot be undefined or empty for items in "rules"');
      }
    }

    this.all = all;
    this.rules = rules;
  }

  protected synthesizeContent(resolver: IResolver) {
    const all = resolver.resolve(this.all);
    const rules = resolver.resolve(this.rules);

    const lines = [
      ...(all ? [`.PHONY: all\nall: ${all.join(' ')}`] : []),
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

    return `${lines.join('\n\n')}`;
  }
}
