# jsii-library-template

Template for a jsii library project.

## Configuration

1. Edit `package.json` and go through all the fields to update for your project.
2. Add the following GitHub secrets to your project (see [jsii-release](https://github.com/eladb/jsii-release) for instructions):
   - `NPM_TOKEN`
   - `MAVEN_USERNAME`, `MAVEN_PASSWORD`, `MAVEN_GPG_PRIVATE_KEY`, `MAVEN_GPG_PRIVATE_KEY_PASSPHRASE`, `MAVEN_STAGING_PROFILE_ID`, 
   - `TWINE_USERNAME`, `TWINE_PASSWORD`
   - `NUGET_API_KEY`


## Usage

| Command          | Description                                       |
|------------------|---------------------------------------------------|
|`yarn install`    |Install dependencies                               |
|`yarn compile`    |Compile to JavaScript                              |
|`yarn watch`      |Watch for changes and compile                      |
|`yarn test`       |Run tests                                          |
|`yarn run package`|Create `dist` with bundles for all languages       |
|`yarn build`      |Compile + test + package                           |
|`yarn bump`       |Bump a new version (based on conventional commits) |
|`yarn compat`     |Run API compatibility check against latest         |

## GitHub Workflows

- [Build](./.github/workflows/build.yml): when a PR is created/updated, runs `yarn build`
- [Release](./.github/workflows/release.yml): `yarn build` and publish to all package managers for every commit to `master` (ignore if current version is already released).
