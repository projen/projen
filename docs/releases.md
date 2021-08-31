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

## Release Branches

Our release model is based on [trunk-based development](https://trunkbaseddevelopment.com/). This means that commits to the default 
branch (`main`) are considered ready for production and by default every commit will be released and published to package managers.

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
