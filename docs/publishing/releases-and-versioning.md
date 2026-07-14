---
sidebar_position: 4
---

# Releases and Versioning

Projen takes care of managing versioning and releases of your project.

The release model is based on (scaled) [trunk-based development](https://trunkbaseddevelopment.com/) and relies on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Semantic Versioning](https://semver.org/)
to automatically determine the next version for every release.

This means that commits to the default branch (`main`) are considered ready for production and by default every commit will be released and published to package managers (see [Release Triggers](#release-triggers) for additional information on this behavior).

## Initial development phase

New projects start with version `0.0.0`.
Anything may change at any time and public APIs should not be considered stable.
Commits marked as a breaking change will increase the *minor* version. All other commits will increase the *patch* version.

Projen will **never** release `v1.0.0` without your intervention. Once the project is ready, you have to make a one-time change to bump the major version.

Before the release and versioning support will work, an initial tag **MUST** exist in the git repository for the project.
The tag **MUST** conform to [Semantic Versioning](https://semver.org/) conventions.
For example, find an appropriate commit on the `main` branch of the git repository and run command:

```bash
git tag v0.0.0 <commitId>
```

Use the `git log --oneline` command to list commits to select from.

Whatever initial semver tag is specified, the release and versioning support will calculate the next semantic version to use based on this tag.

## Major Versions

To bump the major version for the default branch, set the `majorVersion` option to the desired version and push the change.
For example:

```js
majorVersion: 1
```

For major versions 1 and above, if a release includes `fix` commits *only*, it will increase the *patch* version.
If a release includes any `feat` commits, then the new version will be a *minor* version.

## Prerelease Versions

To release prerelease versions from the main branch, set the `prerelease` option to the desired prerelease prefix.
For example:

```js
prerelease: 'beta'
```

You can also use this with release branches or manual releases (see example below).

## Breaking Changes

Conventional Commits allows changes to be marked as breaking by appending a `!` after the type/scope in the commit message or adding a `BREAKING CHANGE:` footer ([see examples](https://www.conventionalcommits.org/en/v1.0.0/#examples)).

If a release includes breaking changes and the major version was not explicitly updated at the same time, **the release will fail**.

If you rather want to automatically release major versions,
use `minMajorVersion` instead of `majorVersion` and breaking changes will now increase the major version:

```js
minMajorVersion: 1
```

In the initial development phase of major version zero, breaking changes will never fail the release and instead increase the *minor* version (see above).

## Release Branches

You can release multiple major versions from different branches at the same time through the `releaseBranches` option.
A separate workflow will be created for each release branch to publish the commits to this branch.

Each release branch must be associated with a different version. 

Normally it is sufficient to specify only `majorVersion`. If fixes to an earlier minor version should be released, `minorVersion` can also be specified.

```js
releaseBranches: {
  '2.0': {
    majorVersion: 2,
    minorVersion: 0,
  },
  '2.x': {
    majorVersion: 2,
  },
  '3.x': {
    majorVersion: 3,
    prerelease: 'beta',
  },
}
```

## Release Triggers

If the project type supports it, then you can specify a `releaseTrigger`. You can use this to control whether
or not your releases are automated as well as any unique artifacts associated with releases such as project-level
changelogs.

The default setting for `releaseTrigger` is `ReleaseTrigger.continuous()`.  This setting implies that any commit
to the `main` branch will result in a release being created.  However, this presumes that GitHub and GitHub actions
are being used and that the carrying out of the release activity will take place within a GitHub action (see `.github/workflows/release.yml`
to understand this behavior). Running `pnpm release` on a locally cloned repository with this `releaseTrigger` setting
**will** create release-related artifacts in the `dist` folder, but **will not** update the git repository with
any tag-related information, nor will it update a `CHANGELOG.md` file in the local repository (see [Manual Releases](#manual-releases)
for additional information).

## Scheduled Releases

This setting relies on GitHub and GitHub actions being used. Releases will be created on the CRON-based schedule indicated.

```js
releaseTrigger: ReleaseTrigger.scheduled({ schedule: '0 17 * * *' }),
```

## Selective Releases

It is possible to only bump the version on a subset of commits.
For example you could only release a new version for every feature and fix that was added to the repo.

```js
releasableCommits: ReleasableCommits.featuresAndFixes(),
```

This check only runs according to the release trigger, but serves as an additional check to not create unnecessary releases.

A custom check can be implemented `ReleasableCommits.exec()`.
This command should return a list of commit hashes that are considered releasable.
I.e. to not not bump the version, the command must print nothing and exit successfully.

```js
releasableCommits: ReleasableCommits.exec("./custom-script.sh"),
```

### How the `bump` task works

The `bump` task decides the next version and writes the release artifacts. It
runs as a pipeline of steps, where each step passes its result to later steps
through an environment variable, using the task step
[`outputEnv`](../concepts/tasks.md#capturing-a-steps-output) option. Two of the
steps `spawn` standalone tasks, so you can run and configure them on their own.

The steps, in order:

1. **`resolve-latest-tag`** (builtin) — finds the latest release tag for the
   current branch and seeds the version file with the current version. It
   outputs the tag into `LATEST_TAG`, which is empty on a first release (no tag
   exists yet).
2. **`bump:releasable-commits`** (spawned task) — runs your `releasableCommits`
   command (by default, every commit since `$LATEST_TAG`) and outputs the
   matching commits into `RELEASABLE_COMMITS`. It is skipped on a first release,
   since there is no tag to diff against.
3. **`suggest-version-bump`** (builtin) — reads `RELEASABLE_COMMITS` and the
   commit history to derive the bump implied by the commits
   (`major`/`minor`/`patch`/`none`) and outputs it into `SUGGESTED_BUMP`.
4. **`bump:next-version`** (spawned task, only present when `nextVersionCommand`
   is set) — runs your command with `$VERSION`, `$LATEST_TAG` and
   `$SUGGESTED_BUMP` available, and outputs its decision into `BUMP_TYPE`,
   overriding the suggestion.
5. **`apply-version-bump`** (builtin) — uses `BUMP_TYPE` if set, otherwise
   `SUGGESTED_BUMP`, invokes `commit-and-tag-version`, and writes the resolved
   version and tag into the artifacts directory.

Because each step reads what it needs from the environment the previous steps
left behind, there is no shared state file: the current version is read back
from the version file that `resolve-latest-tag` seeds, and a first release is
signalled by an empty `LATEST_TAG`.

`bump:releasable-commits` and `bump:next-version` are ordinary tasks. You can
run them directly to inspect what they do (e.g. `projen bump:releasable-commits`)
and configure each independently, including its shell — useful when a command
relies on bash-specific syntax:

```ts
import { TaskShell } from "projen";

project.tasks.tryFind("bump:next-version")?.shell = TaskShell.bash();
```

## Manual Releases

If you don't want projen to automatically release your project, you can configure a manual release trigger:

```js
releaseTrigger: ReleaseTrigger.manual(),
```

This will create a `release` task. Run it locally (`projen release`) to cut a release. It will build the project and create releasable artifacts inside the `dist` directory.

It will also trigger a `publish:git` task. This task does
manage a project-level changelog, commit any changes, tag the release (adds a git tag to the commit used
to update the `CHANGELOG.md` file), and push any commits and tags to the remote repository.

The command used for pushing can be customized by specifying
`gitPushCommand`. Set to an empty string to disable pushing entirely.
If working completely local, setting `gitPushCommand` to an empty string ( `''` )
results in the local git repository getting appropriate tags added.

Note that setting `releaseTrigger` to `ReleaseTrigger.manual()` also has the side-effect of **removing**
the GitHub action workflow related to release processing. There is no `.github/workflows/release.yml` file
created for the repository.

### Publishing modules for manual releases

With manual releases, projen will *not* automatically publish packages to their respective package repositories.
You are expected to publish release artifacts from the `dist` directory manually.

Please note that the repository itself will **not** be a releasable state. Publishing anything else but the release artifacts from `dist`, will fail.

For example in a Node.js project, you might run:

- `projen release` *(runs tests & builds a releasable artifact)*
- `npm publish dist/js/my-package-1.2.3.tgz`

Or for a multi language jsii project, the necessary steps could look something like:

- `projen release`
- `npx -p publib@latest publib-npm`
- `npx -p publib@latest publib-pypi`
- `npx -p publib@latest publib-nuget`

It is also your responsibility to ensure credentials are setup and available for each package repository published to.

## FAQ

### How can I force a different version?

You may be adopting projen in a project that has already been published to previous versions.
Projen uses tags to determine the version to start with before bumping according to the rules previously mentioned.

You can force the base version number by adding a tag to your repo. For example, if the latest version of your project is 1.2.3, then add a tag to your main branch of `v1.2.3`.
The next time the release workflow runs, it will bump from version 1.2.3.
As explained above, this is based on the conventional commits so the next release will either be 1.2.4, 1.3.0, or 2.0.0 on a breaking change.

### Can I change the format of the release tag?

Yes, it is possible to change the tag prefix:

```js
releaseTagPrefix: 'stable/'
```

Please note that this also changes the behavior of finding existing tags and projen will now be looking for tags like `stable/1.2.3` to determine the current version.
If you are migrating to a new tag format, make sure to re-tag at least the current version with the new format.

The default prefix for release tags is `v*`. So if `releaseTagPrefix` is not defined in your `.projenrc.js` configuration you must define your tags as `v1.0.0`, `v2.0.0.0` and so on.

### Why is the version in `package.json` set to `0.0.0`?

Projen uses tags to keep track of the current version of the project.
While Node.js packages natively track theirs versions in `package.json`, not all languages supported by projen provide a mechanism like this.
Consequently projen uses git tags as a mechanism that is independent of any target language.
To convey this message, the version in `package.json` is kept at `0.0.0`.

Additionally, Node.js packages are often published directly by running `npm publish` in the root of the repository.
This does not work in projen.
Instead, projen requires you to run `projen release` to create releasable artifacts and manually publish these artifacts.

### Can I do a manual one-off prerelease?

If you wanted to generate a manual prerelease you can set the `PRERELEASE` environment variable.

For example in a Node.js project, you might run:

- `PRERELEASE=beta projen release` *(runs tests & builds a releasable artifact)*
- `npm publish dist/js/my-package-1.2.3-beta.0.tgz`

Make sure to also read the [Manual Releases](#manual-releases) section above.
