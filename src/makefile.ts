import { FileBase, FileBaseOptions, IResolver } from './file';
import { Project } from './project';

export interface Rule {
  targets: string[];
  prerequisites?: string[];
  recipe?: string[];
  isPhony?: boolean;
}

export interface MakefileOptions extends FileBaseOptions {
  all?: string[];
  rules: Rule[];
}

export class Makefile extends FileBase {
  readonly all?: string[];
  readonly rules: Rule[];


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

        const phony = rule.isPhony ? [`.PHONY: ${targets}`] : [];

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
