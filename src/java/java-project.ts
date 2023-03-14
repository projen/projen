import { Junit, JunitOptions } from "./junit";
import { MavenCompile, MavenCompileOptions } from "./maven-compile";
import { MavenPackaging, MavenPackagingOptions } from "./maven-packaging";
import { MavenSample } from "./maven-sample";
import { PluginOptions, Pom, PomOptions } from "./pom";
import { Projenrc as ProjenrcJava, ProjenrcOptions } from "./projenrc";
import { GitHubProject, GitHubProjectOptions } from "../github";
import { anySelected, multipleSelected } from "../util";

/**
 * Options for `JavaProject`.
 */
export interface JavaProjectCommonOptions
  extends GitHubProjectOptions,
    PomOptions {
  /**
   * Final artifact output directory.
   *
   * @default "dist/java"
   */
  readonly distdir?: string;

  // -- dependencies --

  /**
   * List of runtime dependencies for this project.
   *
   * Dependencies use the format: `<groupId>/<artifactId>@<semver>`
   *
   * Additional dependencies can be added via `project.addDependency()`.
   *
   * @default []
   * @featured
   */
  readonly deps?: string[];

  /**
   * List of test dependencies for this project.
   *
   * Dependencies use the format: `<groupId>/<artifactId>@<semver>`
   *
   * Additional dependencies can be added via `project.addTestDependency()`.
   *
   * @default []
   * @featured
   */
  readonly testDeps?: string[];

  // -- components --

  /**
   * Include junit tests.
   * @default true
   */
  readonly junit?: boolean;

  /**
   * junit options
   * @default - defaults
   */
  readonly junitOptions?: JunitOptions;

  /**
   * Packaging options.
   * @default - defaults
   */
  readonly packagingOptions?: MavenPackagingOptions;

  /**
   * Compile options.
   * @default - defaults
   */
  readonly compileOptions?: MavenCompileOptions;

  /**
   * Use projenrc in java.
   *
   * This will install `projen` as a java dependency and will add a `synth` task which
   * will compile & execute `main()` from `src/main/java/projenrc.java`.
   *
   * @default true
   */
  readonly projenrcJava?: boolean;

  /**
   * Options related to projenrc in java.
   * @default - default options
   */
  readonly projenrcJavaOptions?: ProjenrcOptions;
}

/**
 * Options for `JavaProject`.
 */
export interface JavaProjectOptions extends JavaProjectCommonOptions {
  /**
   * Include sample code and test if the relevant directories don't exist.
   * @default true
   */
  readonly sample?: boolean;

  /**
   * The java package to use for the code sample.
   * @default "org.acme"
   */
  readonly sampleJavaPackage?: string;
}

/**
 * Java project.
 *
 * @pjid java
 */
export class JavaProject extends GitHubProject {
  /**
   * API for managing `pom.xml`.
   */
  public readonly pom: Pom;

  /**
   * JUnit component.
   */
  public readonly junit?: Junit;

  /**
   * Packaging component.
   */
  public readonly packaging: MavenPackaging;

  /**
   * Compile component.
   */
  public readonly compile: MavenCompile;

  /**
   * Projenrc component.
   */
  public readonly projenrc?: ProjenrcJava;

  /**
   * Maven artifact output directory.
   */
  public readonly distdir: string;

  constructor(options: JavaProjectOptions) {
    super(options);

    this.distdir = options.distdir ?? "dist/java";
    this.pom = new Pom(this, options);

    const rcFileTypeOptions = [options.projenrcJava, options.projenrcJson];

    if (multipleSelected(rcFileTypeOptions)) {
      throw new Error(
        "Only one of projenrcJava and projenrcJson can be selected."
      );
    }

    // default to projenrc.java if no other projenrc type was elected
    if (
      !this.parent &&
      (options.projenrcJava ?? !anySelected(rcFileTypeOptions))
    ) {
      this.projenrc = new ProjenrcJava(
        this,
        this.pom,
        options.projenrcJavaOptions
      );
    }

    const sampleJavaPackage = options.sampleJavaPackage ?? "org.acme";

    if (options.junit ?? true) {
      this.junit = new Junit(this, {
        pom: this.pom,
        sampleJavaPackage,
        ...options.junitOptions,
      });
    }

    if (options.sample ?? true) {
      new MavenSample(this, { package: sampleJavaPackage });
    }

    // platform independent build
    this.pom.addProperty("project.build.sourceEncoding", "UTF-8");

    this.gitignore.exclude(".classpath");
    this.gitignore.exclude(".project");
    this.gitignore.exclude(".settings");

    this.compile = new MavenCompile(this, this.pom, options.compileOptions);
    this.packaging = new MavenPackaging(
      this,
      this.pom,
      options.packagingOptions
    );

    this.addPlugin("org.apache.maven.plugins/maven-enforcer-plugin@3.0.0-M3", {
      executions: [{ id: "enforce-maven", goals: ["enforce"] }],
      configuration: {
        rules: [{ requireMavenVersion: [{ version: "3.6" }] }],
      },
    });

    for (const dep of options.deps ?? []) {
      this.addDependency(dep);
    }

    for (const dep of options.testDeps ?? []) {
      this.addTestDependency(dep);
    }
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<groupId>/<artifactId>@<semver>`
   */
  public addDependency(spec: string) {
    return this.pom.addDependency(spec);
  }

  /**
   * Adds a test dependency.
   *
   * @param spec Format `<groupId>/<artifactId>@<semver>`
   */
  public addTestDependency(spec: string) {
    return this.pom.addTestDependency(spec);
  }

  /**
   * Adds a build plugin to the pom.
   *
   * The plug in is also added as a BUILD dep to the project.
   *
   * @param spec dependency spec (`group/artifact@version`)
   * @param options plugin options
   */
  public addPlugin(spec: string, options: PluginOptions = {}) {
    return this.pom.addPlugin(spec, options);
  }
}
