# AWS CDK Construct Library

This projen type is used for building AWS CDK constructs using the jsii. The [jsii](https://github.com/aws/jsii) allows 
you to write code once in Typescript and it will generate the Python, .net, and Java equivalents. Use this if you'd 
like to build and distribute CDK constructs for others to use.

Class heirarchy: `AwsCdkConstructLibrary` -> `ConstructLibrary` -> `JsiiProject` -> `TypeScriptProject` -> `NodeProject` -> `Project`

# Table of Contents

* [Getting Started](#getting-started)
  * [Standard Node Module Fields](#standard-node-module-fields)
  * [Dependencies](#dependencies)
  * [jsii Publishing](#jsii-publishing)
* [Workflows](#workflows)
* [Scripts](#scripts)
* [Construct Catalog](#construct-catalog)
* [API Documentation](#api-documentation)
* [Project structure](#project-structure)
* [Migrating existing projects](#migrating-existing-projects)
* [Feedback](#feedback)

# Getting Started

Start like all projen projects:

```sh
npx projen new awscdk-construct
```

Review the resulting .projenrc.js file and make changes as needed. The following are some specific areas
you may want to set explicitly.

## Module Metadata

These fields are your basic Node module setup:

```typescript
authorAddress: 'benisrae@amazon.com',
authorName: 'Elad Ben-Israel',
description: 'Watching your CDK apps since 2019',
name: 'cdk-watchful',
license: 'MIT',
repository: 'https://github.com/eladb/cdk-watchful.git',
keywords: ['cloudwatch', 'monitoring']
```

All are pretty standard setup and nothing CDK-specific at this point. The `keywords` automatically gets 'cdk' so you don't
need to specify it. 

## Dependencies

### Depending on AWS CDK modules

Next are getting CDK dependencies added:

```typescript
cdkVersion: '1.67.0',
cdkDependencies: ['@aws-cdk/aws-ec2'],
cdkTestDependencies: ['@aws-cdk/assert'],
```

`cdkDependencies` will add both dependencies and peerDependencies to your package.json file with a caret semver 
requirement (e.g. `^1.67.0`). CDK dependencies must be both direct and peer dependencies, 
see [this issue](https://github.com/aws/aws-cdk/issues/5064). You can set `cdkVersionPinning` to `true` to use a fixed 
version, but this means that any consumer of your library will have to use this exact CDK version. 
Likewise, `cdkTestDependencies` will add dependencies to the `devDependencies`. 

Additionally, you can add CDK dependencies using the methods:

```typescript
project.addCdkDependencies('aws-cdk/aws-sqs', 'aws-cdk/aws-sns');
project.addCdkTestDependencies('aws-cdk/something-else');
```

> The `@aws-cdk/assert` library is already added to the `cdkTestDependencies` for you.

### Depending on other modules

If your library consumes other jsii modules, you should declare them thorugh the `deps` or `peerDeps` options. `deps` should be used if 
types from the consumed module is _not_ part of the public API of the library (the module is used as an implementation detail), 
while `peerDeps` _must_ be used if types from the consumed module are exported as part of your library's API. You can read more 
[here](https://github.com/aws/jsii/blob/master/docs/configuration.md#dependency-considerations).

```ts
deps: [ 'cdk-time-bomb' ]
```

A [dependabot](https://dependabot.com/) file will be added unless `dependabot` is set to 'false'.

## jsii Publishing

As this is a [jsii project](./jsii.md), it will cross-compile to other languages.  You can set up 
any number of jsii target languages. 

```typescript
  dotnet: {
    dotNetNamespace: 'Acme.HelloNamespace',
    packageId: 'Acme.HelloPackage'
  },
  java: {
    javaPackage: 'com.acme.hello',
    mavenArtifactId: 'hello-jsii',
    mavenGroupId: 'com.acme.hello'
    serverId: 'github',
    repositoryUrl: 'https://maven.pkg.github.com/example/hello-jsii',
  },
  python: {
    distName: 'acme.hello-jsii',
    module: 'acme.hello_jsii'
  },
```

[jsii-release](https://github.com/aws/jsii-release) is used for publishing, and requires uploading [Github project secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) based on the repositories you wish to publish to:

* npm - `NPM_TOKEN` ([docs](https://github.com/aws/jsii-release#npm))
* .NET - `NUGET_API_KEY` ([docs](https://github.com/aws/jsii-release#nuget))
* Java: `MAVEN_GPG_PRIVATE_KEY`, `MAVEN_GPG_PRIVATE_KEY_PASSPHRASE`, `MAVEN_PASSWORD`, `MAVEN_USERNAME`, `MAVEN_STAGING_PROFILE_ID` ([docs](https://github.com/aws/jsii-release#maven))
* Python: `TWINE_USERNAME`, `TWINE_PASSWORD` ([docs](https://github.com/aws/jsii-release#pypi))
  
For help in getting these secrets for your project, read the [jsii-release](https://github.com/aws/jsii-release).
  
If you don't want to publish a particular package, do not include the `dotnet`, `java`, or `python` field.

# Workflows

Two workflows will be created as Github Actions:

* The Build workflow - controlled by the `buildWorkflow` field. On a 'pull_request' or 'workflow_dispatch' the library
will be built and checked for anti-tamper (ensure no manual changes to generated files).
* The Release workflow - controlled by the `releaseWorkflow` field. On a push to `main` (overridden at
 `props.defaultReleaseBranch`) the library is built, anti-tampered, version bumped with a commit, pushed back to git, 
 and then published to the configured artifact repositories (e.g. npm, pypi).

# Scripts

There are a number of package scripts that are created for you. Any of them can be overwritten using the `addScript*` 
methods.

script|description
---|---
start|starts an interactive command menu
projen|regenerates the projen config. Run this if you edit .projenrc.js
no-changes|a helper script to prevent unnecessary releases.
bump|bumps the package version number
release|bumps the library's version and pushes to origin
projen:upgrade|upgrades the projen cli tool
compile|builds the library and generates docs
watch|compiles and then re-compiles of further changes
package|runs jsii-pacmak to package your library for publishing
test|compiles and runs automated tests
test:watch|watches for file changes, re-compiles and re-tests
test:update|update any test snapshots
eslint|runs eslint against all `src` and `test` .ts files
compat|checks for jsii compatibility. See [here](https://github.com/aws/jsii/tree/master/packages/jsii-diff) for more info.
docgen|generate documentation

As you develop your library you'll likely be using the `test:watch` command the most.

# Construct Catalog

Finally, a field for setting up publishing to the [construct catalog](https://awscdk.io):

```typescript
  catalog: {
    announce: true,
    twitter: '@yourhandle'
  }
```

These values are optional but allow the construct catalog's Twitter account to mention your handle on the tweet. Setting `announce`
to 'false' will stop all tweets about the library. However, the library will still be indexed.

# API Documentation

Docs will be generated from [Typescript comments](https://typedoc.org/guides/doccomments/) and saved in the `API.md` file.
Please review this file regularly and document your constructs liberally. 

# Project structure

```
.
|--lib/ (generated)
|--src/
   |--main.ts
|--test/
   |--main.test.ts
```

Source .ts files should reside in the `src` directory. Constructs should be exported from the main.ts file. 
Compiled files will be put in the `lib` directory. Tests are in the `test` directory. If you need additional 
resources that are packaged with your library, add those to a `resources` directory that is besides the `src` directory
and modify your references accordingly:

```typescript
const thing = require('../resources/some-resource.json')
```

# Migrating existing projects

Your existing CDK constructs likely have a different file structure than what this projen project expects. Projen projects
are highly opinionated. There are a few expectations of this project you should modify your existing library to conform to:

* All .ts files are expected to be in the `src/` directory. Existing constructs should all be moved there. However, 
you can override this directory by setting `srcdir`.
* Compiled .js and .d.ts files will go into the `lib/` directory. This directory will be removed and rebuilt each build.
Do not store source .ts files in your `lib/` or 'libdir'.
* The entrypoint file for all constructs should be `src/main.ts`. If your existing library is not in the main.ts file, 
you can add the following to export it:

```typescript
export * from './our-s3-bucket'
```

# Feedback

If you find there is anything we missed, please submit Issues or (better yet) Pull Requests on Github.

  
