---
sidebar_position: 1
---

# Build

Projen defines a standard way for building software through a fixed set of
*build phases*. This is implemented via a set of [tasks](../concepts/tasks.md) defined in
the `Project` base class.

The `build` task spawns a set of sub-tasks which represent the various build phases:

* `default` - this task is responsible to execute your projenrc and synthesize all project files.
* `pre-compile` - runs before compilation (eg. bundle assets)
* `compile` - compile your code (if needed)
* `post-compile` - runs immediately after a successful compilation
* `test` - runs tests
* `package` - creates a distribution package

To extend the build process, components and projects can use
`project.projectBuild.xxxTask` and interact with the `Task` object (i.e.
`project.projectBuild.postCompileTask.execArgs(["echo", "hi"])` will execute `echo hi` after
compilation).

> NOTE: the `build` task is locked. This means that any attempt to extend it
> (i.e. call `spawn`, `execArgs`, `reset`, etc) will throw an exception. Instead of
> extending `build`, just extend one of the phases. This ensures that phases are
> always executed in the right order.

## Build Workflow

The `build` workflow is responsible to build your project when a pull request is
submitted against it.

### Self-mutation

Self-mutation pushes files that change during a pull request build back to the pull request branch.
This way, a pull request always contains every file projen synthesizes, without the contributor running projen locally.

Builds change files more often than you might expect.
When you change your projenrc, the `default` task synthesizes the project files again.
Snapshot tests update their snapshots, and installs can update the lockfile.

Self-mutation is enabled by default for projects derived from `NodeProject`, which are currently the only ones that
support it. It adds a `self-mutation` workflow next to the `build` workflow.
To disable it, set `buildWorkflowOptions.mutableBuild` to `false`.

#### How it works

When a build changes files, it uploads the changes as a patch and fails.
The `self-mutation` workflow runs after every failed pull request build.
If the build uploaded a patch, the workflow applies it to the pull request branch and pushes it as a
`chore: self mutation` commit, using the [projen credentials](../integrations/github/index.md#github-api-access).
The push starts a new build.

**A pull request only passes the build once its branch contains every changed file.**
That is why the build fails even when the changes are pushed for you.

The `self-mutation` workflow is triggered by `workflow_run`.
GitHub always runs the version of this workflow on your default branch, not the one in the pull request.
Changes to the workflow only take effect once they are merged.

#### When nothing is pushed

The workflow does not push in these cases:

* **The pull request comes from a fork.** You can [allow pushes to forks](#pull-requests-from-forks).
* **The head branch is your default branch**, for example in a pull request from `main` into a release branch.
  Pushing would add a commit to your default branch that nobody reviewed.
* **The branch changed after the build started.** If the branch was deleted or received new commits, the push is
  rejected. New commits start a build of their own.
* **The build ran on a self-mutation commit.** If a build still changes files after a self-mutation commit, the build
  is not deterministic, and pushing again would start an endless loop of builds.

The build still fails, and the contributor has to run the build locally and commit the changed files.

#### Pull requests from forks

Pushes to pull requests from forks are disabled by default.
You can enable them with `allowFromForks`:

```ts
const { javascript } = require('projen');

const project = new javascript.NodeProject({
  // ...other options
  buildWorkflowOptions: {
    mutableBuildOptions: { allowFromForks: true },
  },
});
```

The pull request must allow edits from maintainers, and the projen credentials must be able to push to the fork.

A contributor can make their build write any change into the patch, for example to your source code.
That change then arrives in a `chore: self mutation` commit by your automation user, where reviewers might be less likely
to look for it.
Review these commits like the rest of the pull request.

Self-mutation commits also skip the approval of workflow runs from forks.
GitHub decides whether a run needs approval based on who pushed, and your automation user has write access.
**After a maintainer approves a build, the build of the self-mutation commit runs without approval.**
Like every pull request build from a fork, it has no access to your secrets and only a read-only `GITHUB_TOKEN`.
Because self-mutation never pushes twice in a row, this is limited to one build per approved build.
