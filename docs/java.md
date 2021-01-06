# Java Projects

To create a new Java project, use `projen new maven`:

```shell
$ projen new maven --group-id org.acme --artifact-id hello-maven
```

This will synthesize a standard Maven project directory structure with a
`pom.xml` file and some sample code:

```shell
├── pom.xml
└── src
    ├── main/java/org/acme
    │   └── Main.java
    └── test/java/org/acme
         └── MyTest.java
```

At this point, you should be able to now simply run `projen build` to build your
project:

```shell
$ projen build
[INFO] BUILD SUCCESS
```

> Since this is a standard Maven project, so you can also use `mvn package`,
> `mvn test`, etc. IDEs should also feel at home with this project.

The `projen new` command will also generate a `.projenrc.js` file which includes
the definition of your project with any options you specified in the command
line:

```js
const { java } = require('projen');

const project = new java.MavenProject({
  artifactId: 'hello-maven',
  groupId: 'org.acme',
  name: 'hello-maven',
  version: '0.1.0',
});

project.synth();
```

> At this point, projenrc is in JavaScript, but in the future we plan to allow
> specifying your project definitions in Java.

To modify your project definitions, edit `.projenrc.js` and run `projen` again
to re-synthesize your project. The following sections describe the various
features of your project.

The following sections describe the various features of Java projects.

## Versioning

You can set the project version through the `version` options:

```ts
const project = new java.MavenProject({
  version: '1.2.3'
};
```

## Project Metadata

You can specify additional metadata for your project by passing options to the
constructor of `MavenProject`. For example, let's add a description and a URL
for your project:

```ts
const project = new java.MavenProject({
  // ...

  description: 'My first java projen project',
  url: 'https://github.com/projen/projen'
});
```

See the API reference for [PomOptions](../API.md#projen-java-pomoptions) for a
detailed list of options.

## Dependencies

Java projects have three types of supported dependencies:

1. Runtime dependencies (or just "dependencies").
2. Test dependencies
3. Maven plugins (modeled as build dependencies).

You can define dependencies when defining the project itself:

```ts
const project = new MavenProject({
  deps: [
    'software.amazon.awscdk/core@^1.2.3',
    'software.amazon.awscdk/aws-s3@^1',
  ]
});
```

Or using the APIs:

```ts
project.addTestDependency('org.assertj/assertj-core@^3');
```

Notice the syntax for dependencies:

```text
<groupId>/<artifactId>[@version]
```

Where `groupID` and `artifactId` are the Maven coordinates and `version` is the
[semantic version requirement](https://semver.org) for the dependency. The
semver syntax will be converted to POM syntax. For example, `^3.1.0` will be
converted to `[3.1.0,4.0.0)`.

## Maven Plugins

You can add Maven build plugins to your project using `project.addPlugin()`:

```ts
project.addPlugin('org.apache.maven.plugins/maven-compiler-plugin@3.8.1', {
  configuration: {
    source: '1.8',
    target: '1.8',
  },
});
```

## Unit Testing with JUnit

The `JUnit` component adds support for writing Java tests with
[JUnit](https://junit.org/). The component will add the required test
dependencies to your POM file.

Test sources are placed under `src/test` and can be executed via `mvn test` or
`projen test` (same).

To disable JUnit tests, set `junit: false` when you define the `MavenProject`.

## Packaging

Java projects include definitionds for producing an output that is
ready-to-publish to Maven using tools like
[jsii-release](https://www.npmjs.com/package/jsii-release). In future versions
of projen we will also support auto-publishing through CI/CD.

The packaging component adds a `package` task which uses `mvn deploy` to create
a local maven directory with artifacts that can be uploaded to a Maven
repository such as Maven Central, CodeArtifact or GitHub Packages.

By default, packages includes *javadocs* and *sources*. Those can be disabled
through `packagingOptions`.

## Publishing

TBD.

> Publishing to Maven is still not supported output of the box. Since the
> package output of `MavenProject` is compatible with
> [jsii-release](https://www.npmjs.com/package/jsii-release), and we already
> release to Maven from jsii projects, it should be possible to reuse quite a
> lot.
