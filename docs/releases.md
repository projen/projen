# Releases and Versioning

Projen takes care of managing versioning and releases of your project. A project starts with version `0.0.0` and the version
is "bumped" automatically in every release, based on the contents of the release.

The content of the release is determined by listing all the commits since the last release and parsing them according to
[conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/). If the release only includes `fix` commits, then
the new version will be a patch version. If the release includes `feat` commits, then the new version will be a minor version.

If the release includes breaking changes and the major version was not explicitly updated in projenrc (see below), the release will fail.

## Major Versions

Each branch is associated with a major version. By default, the major version of the default branch is `0`.

To bump the major version for the default branch, set the `majorVersion` option to the desired version and push the change.

For example:

```js
majorVersion: 1
```

It is possible to release the same major version to different branches by specifying a prefix that is applied to all tags for a particular branch.

For example:

```js
releaseTagPrefix: 'stable/'
```

It is also possible to release multiple major versions from the same branch.
By adding a `!` to your commit message you can indicate a breaking change, thus triggering a major version change.
If you start out with the `0` major version a breaking change in this pre-stable version will lead to the minor version increasing.
You can set the `minMajorVersion` to `1` so that breaking changes increase the major version.

```js
minMajorVersion: 1
```

## Forcing Versions

You may be adopting projen in a project that has already been published to previous versions. Projen uses tags to determine the version to start with
before bumping according to the rules previously mentioned.

You can force the base version number by adding a tag to your repo. For example, if the latest version of your project is 1.2.3, then add a tag to your trunk ('main') branch of `v1.2.3`.
The next time the release workflow runs it will bump from version 1.2.3. As mentioned above, this is based on the conventional commits so on the next release you will either get 1.2.4 or 1.3.0.

## Release Branches

Our release model is based on [trunk-based development](https://trunkbaseddevelopment.com/).
This means that commits to the default branch (`main`) are considered ready for production and by default every commit will be released and published to package managers.

You can add additional release branches (e.g. for different major versions) through the `releaseBranches` option. Each release branch must
be associated with a different major version.

```js
releaseBranches: {
  '2.x': {
    majorVersion: 2,
  },
  '3.x': {
    majorVersion: 3,
    prerelease: true,
  },
}
```

## Release Triggers

If the project type supports it, then you can specify a `releaseTrigger`. You can use this to control whether
or not your releases are automated as well as any unique artifacts associated with releases such as project-level
changelogs.

```js
releaseTrigger: ReleaseTrigger.scheduled({ schedule: '0 17 * * *' }),
```

## Local Releases

If you do not want Projen to handle releases, you can configure a manual release trigger:

```js
releaseTrigger: ReleaseTrigger.manual(),
```

This will create a `release` task. Run it locally to cut a release. It will build the project and create releasable artifacts inside the `dist` directory.

It will also trigger a `publish:git` task. This task does
manage a project-level changelog, commit any changes, tag the release, and push any commits and tags to the remote repository.

The command used for pushing can be customized by specifying
`gitPushCommand`. Set to an empty string to disable pushing entirely.

### Publishing modules for local releases

Publishing modules to their respective package repositories is modelled as a separate task in Projen. While automated release triggers take care of this for you, this is **NOT** the case when using `ReleaseTrigger.manual()`.

You are expected to publish the release artifacts from the `dist` directory manually. **Do not attempt to publish the repository directly, it will fail.**

For example in a Node.js project, you might run:

- `projen release`
- `npm publish dist/js/my-package-1.2.3.tgz`

Or for a multi language jsii project, the necessary steps could look something like:

- `projen release`
- `npx -p publib@latest publib-npm`
- `npx -p publib@latest publib-pypi`
- `npx -p publib@latest publib-nuget`

It is also your responsibility to ensure credentials are setup and available for each package repository published to.
