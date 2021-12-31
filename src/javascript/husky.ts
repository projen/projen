import { NodeProject } from './node-project';
import { TextFile } from '../textfile';
import { NodePackageManager } from '.';

/**
 * The list of git cient-side hooks
 * @see https://git-scm.com/docs/githooks 
 */
export enum GitClientHook {
    APPLYPATCH_MSG = 'applypatch-msg',
    PRE_APPLYPATCH = 'pre-applypatch',
    POST_APPLYPATCH = 'post-applypatch',
    PRE_COMMIT = 'pre-commit',
    PRE_MERGE_COMMIT = 'pre-merge-commit',
    PREPARE_COMMIT_MSG = 'prepare-commit-msg',
    COMMIT_MSG = 'commit-msg',
    POST_COMMIT = 'post-commit',
    PRE_REBASE = 'pre-rebase',
    POST_CHECKOUT = 'post-checkout',
    POST_MERGE = 'post-merge',
    PRE_PUSH = 'pre-push',
    PRE_AUTO_GC = 'pre-auto-gc',
    POST_REWRITE = 'post-rewrite',
}

/**
 * Options for opinionated premade hooks for Husky.
 */
export interface HuskyPremadeOptions {
    /**
     * Enforce convential commits standards on commit messages.
     * @see https://www.conventionalcommits.org/en/v1.0.0/#summary
     * 
     * @default true
     */
    enforceConventialCommits?: boolean;

    /**
     * Enable linting and re-adding of staged files pre commit..
     * 
     * @default true
     */
    lintStaged?: boolean;
};

/**
 * A Husky configuration
 * @see https://typicode.github.io/husky/#/
 */
export class Husky {
    readonly project: NodeProject;
    /**
     * Whether or not conventional commits are enforced through commit-lint
     * @see https://github.com/conventional-changelog/commitlint
     */
    private areConventionalCommitsEnforced: boolean = false;
    /**
     * Whether or not staged files are linted by lint-staged
     * @see https://github.com/okonet/lint-staged
     */
    private areStagedFilesLinted: boolean = false;
    /**
     * The client-side git hooks maintained by Husky 
     */
    private hooks: Partial<Record<GitClientHook, TextFile>> = {};

    constructor(project: NodeProject, options?: HuskyPremadeOptions) {
        if (project.parent) {
            throw Error(`${project}: Husky can only be configured on the root project.`)
        }
        this.project = project
        this.project.addDevDeps('husky@^7');
        const script = this.project.package.packageManager === NodePackageManager.YARN ? 'postinstall' : 'prepare'
        this.project.package.setScript(script, 'npx husky install');
        if (options?.enforceConventialCommits !== false) {
            this.enableConventialCommitEnforcement()
        }
        if (options?.lintStaged !== false) {
            this.enableLintStaged()
        }
    }

    /**
     * Enable enforcement of convential commits standards on commit messages.
     * @see https://www.conventionalcommits.org/en/v1.0.0/#summary
     */
    public enableConventialCommitEnforcement() {
        if (this.areConventionalCommitsEnforced === false) {
            this.areConventionalCommitsEnforced = true
            this.project.addDevDeps(
                'commitlint',
                '@commitlint/config-conventional'
            );
            this.project.package.addField('commitlint', {
                extends: ['@commitlint/config-conventional'],
            });
            this.addHookCommands(GitClientHook.COMMIT_MSG, ['npx --no -- commitlint --edit "$1"'])
        }
    }

    /**
     * Enable linting and re-adding of staged files pre commit.
     */
    public enableLintStaged() {
        if (this.areStagedFilesLinted === false) {
            this.areStagedFilesLinted = true
            this.project.addDevDeps('lint-staged',);
            this.project.tasks.tryFind
            this.project.package.addField('lint-staged', {
                '*': ['npx projen eslint', 'git add -u'],
            });
            this.addHookCommands(GitClientHook.PRE_COMMIT, ['npx lint-staged'])
        }
    }

    /**
     * Add a command to a Husky controlled git Hook.
     * @param hook The Git Hook.
     * @param commands The command to add.
     */
    public addHookCommands(hook: GitClientHook, commands: string[]) {
        if (this.tryFindHook(hook) ?? true) {
            this.hooks[hook] = this.createHook(hook)
        }
        commands.forEach(c => this.hooks[hook]?.addLine(c))
    }

    /**
     * Finds a Hook by name. Returns `undefined` if the hook cannot be found.
     * @param hook The name of the GitHub workflow
     */
    public tryFindHook(hook: GitClientHook): TextFile | undefined {
        return this.hooks[hook];
    }

    /**
     * Create a Husky hook file. 
     * @param hook The Git Hook.
     * @returns The Husky hook file.
     */
    private createHook(hook: GitClientHook): TextFile {
        return new TextFile(this.project, `.husky/${hook}`, {
            executable: true,
            lines: [
                `#${TextFile.PROJEN_MARKER}`,
            ],
        });
    }
}
