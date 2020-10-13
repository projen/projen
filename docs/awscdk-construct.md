# AWS CDK Construct Library

This projen type is used for building AWS CDK constructs using the jsii. The [jsii](https://github.com/aws/jsii) allows 
you to write code once in Typescript and it will generate the Python, .net, and Java equivalents. Use this if you'd 
like to build and distribute CDK constructs for others to use.

# Getting Started

Start like all projen projects:

```sh
npx projen new awscdk-construct
```

Review the resulting .projenrc.js file and make changes as needed. The following are some specific areas
you may want to set explicitly.

A `README.md` file is not created but encouraged. It is required for publishing your construct for Python (see [jsii publishing](#jsii-publishing)).

### Standard Node Module Fields

These fields are your basic Node module setup:

```typescript
  authorAddress: "benisrae@amazon.com",
  authorName: "Elad Ben-Israel",
  description: 'Watching your CDK apps since 2019',
  name: 'cdk-watchful',
  license: "MIT",
  repository: "https://github.com/eladb/cdk-watchful.git",
  keywords: ["cloudwatch", "monitoring"]
```

All are pretty standard setup and nothing CDK-specific at this point. The `keywords` automatically gets 'cdk' so you don't
need to specify it. 

### CDK Dependencies

Next are getting CDK dependencies added:

```typescript
  entrypoint: 'lib/our-s3-bucket.js',
  cdkVersion: "1.67.0",
  cdkDependencies: ["@aws-cdk/aws-ec2"],
  cdkTestDependencies: ["@aws-cdk/assert"],
```

The entrypoint can be set to point at your existing file, if not at `lib/index.js`. However, it's recommended that you
rename your file to `index.js` and leave this un-set.

`cdkDependencies` will add both dependencies and peerDependencies to your package.json file with a caret semver 
requirement (e.g. `^1.67.0`). You can set cdkVersionPinning to true to use a fixed version, but this means that any 
consumer of your library will have to use this exact CDK version. Likewise, `cdkTestDependencies` will add dependencies 
to the `devDependencies`. 

Additionally, you can add CDK dependencies using the methods:

```typescript
project.addCdkDependencies("aws-cdk/aws-sqs", "aws-cdk/aws-sns");
project.addCdkTestDependencies("aws-cdk/something-else");
```

The `@aws-cdk/assert` library is already added to the cdkTestDependencies for you.

### jsii Publishing

As this is a [jsii](https://github.com/aws/jsii) constructs, it will cross-compile to other languages.  You can set up 
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
  },
  python: {
    distName: 'acme.hello-jsii',
    module: 'acme.hello_jsii'
  },
```

Each target requires a specific [Github project secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) 
to be setup:

* npm - NPM_TOKEN
* .net - NUGET_API_KEY
* Java:
  * MAVEN_GPG_PRIVATE_KEY
  * MAVEN_GPG_PRIVATE_KEY_PASSPHRASE
  * MAVEN_PASSWORD
  * MAVEN_USERNAME
  * MAVEN_STAGING_PROFILE_ID
* Python
  * TWINE_USERNAME
  * TWINE_PASSWORD
  
If you don't want to publish a particular package, do not include the `dotnet`, `java`, or `python` field.

### Workflows

Two workflows will be created as Github Actions:

* The Build workflow - controlled by the `buildWorkflow` field. On a 'pull_request' or 'workflow_dispatch' the construct
will be built and checked for anti-tamper (ensure no manual changes to generated files).
* The Release workflow - controlled by the `releaseWorkflow` field. On a push to `master` (overridden at
 `props.defaultReleaseBranch`) the construct is built, anti-tampered, version bumped with a commit, pushed back to git, 
 and then published to the configured artifact repositories (e.g. npm, pypi)

Additionally, a [dependabot](https://dependabot.com/) file will be added unless `dependabot` is set to 'false'.

### Construct Catalog

Finally, a field for setting up publishing to the [construct catalog](https://awscdk.io):

```typescript
  catalog: {
    announce: true,
    twitter: '@yourhandle'
  }
```

These values are optional but allow the construct catalog's Twitter account to mention your handle on the tweet. Setting `announce`
to 'false' will stop all tweets about the construct. However, the construct will still be indexed.

### docgen

Docs will be generated from [Typescript comments](https://typedoc.org/guides/doccomments/) and saved in the `API.md` file.
Please review this file regularly and document your constructs liberally. 

# Migrating existing projects

Your existing CDK constructs likely have a different file structure than what this projen project expects. Projen projects
are highly opinionated. There are a few expectations of this project you should modify your existing library to conform to:

* All .ts files are expected to be in the `src/` directory. Existing constructs should all be moved there. However, 
you can override this directory by setting `srcdir`.
* Compiled .js and .d.ts files will go into the `lib/` directory. This directory will be removed and rebuilt each build.
Do not store source .ts files in your `lib/` or 'libdir'.
* The entrypoint file for all constructs should be `src/main.ts`.

```
.
|--lib/ (generated)
|--src/
   |--main.ts
|--test/
   |--main.test.ts
```

# Feedback

If you find there is anything we missed, please submit Issues or (better yet) Pull Requests on Github.

  
