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
  targets: string[];

  /**
   * Files that are used as inputs to create a target.
   */
  prerequisites?: string[];

  /**
   * Commands that are run (using prerequisites as inputs) to create a target.
   */
  recipe?: string[];

  /**
   * Marks whether the target is phony.
   *
   * False by default.
   */
  phony?: boolean;
}

/**
 * Options for Makefiles.
 */
export interface MakefileOptions extends FileBaseOptions {
  /**
   * List of targets to build when Make is invoked without specifying any targets.
   */
  readonly all?: string[];

  /**
   * Rules to include in the Makefile.
   */
  readonly rules: Rule[];
}

/**
 * Minimal Makefile.
 */
export class Makefile extends FileBase {
  /**
   * Targets to make by default.
   */
  public readonly all?: string[];

  /**
   * List of rule definitions.
   */
  public readonly rules: Rule[];


  constructor(project: Project, filePath: string, options: MakefileOptions) {
    super(project, filePath, options);

    if (!options.rules) {
      throw new Error('"rules" cannot be undefined');
    }

    this.all = options.all;
    this.rules = options.rules;
  }

  synthesizeContent(resolver: IResolver) {
    const rules = resolver.resolve(this.rules);
    const all = resolver.resolve(this.all);

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
