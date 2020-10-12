# AWS CDK - Construct library

This projen type is used for building AWS CDK constructs using the JSII.

Use this if you'd like to build and distribute CDK constructs for others to use.

# Getting Started

Create a new instance of the project and set the appropriate fields.

```typescript
const project = new AwsCdkConstructLibrary({
  authorAddress: "",
  authorName: "",
  description: "",
  name: "",
  license: "",
  repository: "",
  keywords: [],

  cdkVersion: "",
  cdkDependencies: [],
  cdkTestDependencies: [],

  dotnet: {
    dotNetNamespace:'',
    packageId: ''
  },
  java: {
    javaPackage: '',
    mavenArtifactId: '',
    mavenGroupId: ''
  },
  python: {
    distName: '',
    module: '',
    twineRegistryUrl: ''
  },
 
  catalog: {
    announce: true,
    twitter: '@mattbonig'
  }
});
```

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

And will render out a package.json that looks like:

```json
  "name": "cdk-watchful",
  "description": "Watching your CDK apps since 2019",
  "repository": {
    "type": "git",
    "url": "https://github.com/eladb/cdk-watchful.git"
  },
  "author": {
    "name": "Elad Ben-Israel",
    "email": "benisrae@amazon.com",
    "organization": false
  },
  "keywords": [
    "cloudwatch",
    "monitoring"
  ],
  "license": "MIT",
```

All are pretty standard setup and nothing CDK-specific at this point. The `keywords` automatically gets 'cdk' so you don't
need to specify it. 

### CDK Dependencies

Next are getting CDK dependencies added:

```typescript
  entrypoint: 'lib/index.js',
  cdkVersion: "1.67.0",
  cdkDependencies: ["@aws-cdk/aws-ec2"],
  cdkTestDependencies: ["@aws-cdk/assert"],
```

With the above example you'll get a package.json that looks like this:

```json
  "main": "lib/index.js",
  "dependencies": {
    "@aws-cdk/assert": "^1.67.0",
    "@aws-cdk/aws-ec2": "^1.67.0",
    ...
  },
```

Additionally, you can add CDK dependencies using the method:

```typescript
project.addCdkDependencies("aws-cdk/aws-sqs", "aws-cdk/aws-sns");
```

### JSII Packaging

You can setup any number of JSII target languages. 

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

Will render out the following to the package.json:

```json
  "jsii": {
    "outdir": "dist",
    "targets": {
      "java": {
        "package": "com.acme.hello",
        "maven": {
          "groupId": "com.acme.hello",
          "artifactId": "hello-jsii"
        }
      },
      "python": {
        "distName": "acme.hello-jsii",
        "module": "acme.hello_jsii"
      },
      "dotnet": {
        "namespace": "Acme.HelloNamespace",
        "packageId": "Acme.HelloPackage"
      }
    },
    "tsc": {
      "outDir": "lib",
      "rootDir": "src"
    }
  }
```

If you don't want to publish a particular package, do not include the `dotnet`, `java`, or `python` field.

### Construct Catalog

Finally, a field for setting up publishing to the [construct catalog](https://awscdk.io):

```typescript
  catalog: {
    announce: true,
    twitter: '@yourhandle'
  }
```

These values are optional but allow the construct catalog to mention your handle on the Twitter posts.

# Migrating existing projects

Your existing CDK constructs likely have a different file structure than what this projen project expects. Projen projects
are highly opinionated. A few notes about the expectations of this project:

* Source .ts files are expected to be in the `src/` directory. Existing constructs should all be moved there. However, 
you can override this directory by setting `srcdir`.
* Compiled .js and .d.ts files will go into the `lib/` directory. This directory will be removed and rebuilt each build.

  