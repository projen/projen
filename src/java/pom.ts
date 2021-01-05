import { Component } from '../component';
import { Dependency, DependencyType } from '../deps';
import { Project } from '../project';
import { XmlFile } from '../xmlfile';

export interface PomOptions {
  /**
   * File name.
   *
   * @default "pom.xml"
   */
  readonly fileName?: string;

  /**
   * This is generally unique amongst an organization or a project. For example,
   * all core Maven artifacts do (well, should) live under the groupId
   * org.apache.maven. Group ID's do not necessarily use the dot notation, for
   * example, the junit project. Note that the dot-notated groupId does not have
   * to correspond to the package structure that the project contains. It is,
   * however, a good practice to follow. When stored within a repository, the
   * group acts much like the Java packaging structure does in an operating
   * system. The dots are replaced by OS specific directory separators (such as
   * '/' in Unix) which becomes a relative directory structure from the base
   * repository. In the example given, the org.codehaus.mojo group lives within
   * the directory $M2_REPO/org/codehaus/mojo.
   */
  readonly groupId: string;

  /**
   * The artifactId is generally the name that the project is known by. Although
   * the groupId is important, people within the group will rarely mention the
   * groupId in discussion (they are often all be the same ID, such as the
   * MojoHaus project groupId: org.codehaus.mojo). It, along with the groupId,
   * creates a key that separates this project from every other project in the
   * world (at least, it should :) ). Along with the groupId, the artifactId
   * fully defines the artifact's living quarters within the repository. In the
   * case of the above project, my-project lives in
   * $M2_REPO/org/codehaus/mojo/my-project.
   */
  readonly artifactId: string;

  /**
   * This is the last piece of the naming puzzle. groupId:artifactId denotes a
   * single project but they cannot delineate which incarnation of that project
   * we are talking about. Do we want the junit:junit of 2018 (version 4.12), or
   * of 2007 (version 3.8.2)? In short: code changes, those changes should be
   * versioned, and this element keeps those versions in line. It is also used
   * within an artifact's repository to separate versions from each other.
   * my-project version 1.0 files live in the directory structure
   * $M2_REPO/org/codehaus/mojo/my-project/1.0.
   */
  readonly version: string;

  /**
   * Project packaging format.
   *
   * @default "jar"
   */
  readonly packaging?: string;

  /**
   * Projects tend to have conversational names, beyond the artifactId.
   *
   * @default undefined
   */
  readonly name?: string;

  /**
   * Description of a project is always good. Although this should not replace
   * formal documentation, a quick comment to any readers of the POM is always
   * helpful.
   *
   * @default undefined
   */
  readonly description?: string;

  /**
   * The URL, like the name, is not required. This is a nice gesture for
   * projects users, however, so that they know where the project lives.
   *
   * @default undefined
   */
  readonly url?: string;
}

export class Pom extends Component {
  private readonly properties: any[] = [];

  public readonly fileName: string;
  public readonly groupId: string;
  public readonly artifactId: string;
  public readonly version: string;
  public readonly packaging: string;
  public readonly name?: string;
  public readonly description?: string;
  public readonly url?: string;

  constructor(project: Project, options: PomOptions) {
    super(project);

    this.fileName = options.fileName ?? 'pom.xml';
    this.groupId = options.groupId;
    this.artifactId = options.artifactId;
    this.version = options.version;
    this.packaging = options.packaging ?? 'jar';
    this.name = options.name;
    this.description = options.description;
    this.url = options.url;

    new XmlFile(project, this.fileName, { obj: () => this.synthPom() });
  }

  /**
   * Adds a key/value property to the pom.
   * @param key the key
   * @param value the value
   */
  public addProperty(key: string, value: string) {
    this.properties.push({ [key]: value });
  }

  /**
   * Adds a runtime dependency.
   *
   * @param spec Format `<groupId>/<artifactId>@<semver>`
   */
  public addRuntimeDep(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.RUNTIME);
  }

  /**
   * Adds a test dependency.
   *
   * @param spec Format `<groupId>/<artifactId>@<semver>`
   */
  public addTestDep(spec: string) {
    this.project.deps.addDependency(spec, DependencyType.TEST);
  }

  /**
   * Adds a build plugin to the pom.
   *
   * The plug in is also added as a BUILD dep to the project.
   *
   * @param spec dependency spec (`group/artifact@version`)
   * @param options plugin options
   */
  public addPlugin(spec: string, options: PluginOptions) {
    return this.project.deps.addDependency(spec, DependencyType.BUILD, options);
  }

  private synthPom() {
    const pom: any[] = [];

    pom.push({
      _attr: {
        'xsi:schemaLocation': 'http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd',
        'xmlns': 'http://maven.apache.org/POM/4.0.0',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      },
    });

    pom.push({ modelVersion: '4.0.0' });
    pom.push({ groupId: this.groupId });
    pom.push({ artifactId: this.artifactId });
    pom.push({ version: this.version });
    pom.push({ packaging: this.packaging });

    if (this.name) {
      pom.push({ name: this.name });
    }

    if (this.description) {
      pom.push({ description: this.description });
    }

    if (this.url) {
      pom.push({ url: this.url });
    }

    if (this.properties.length > 0) {
      pom.push({ properties: this.properties });
    }

    this.synthDependencies(pom);

    return {
      project: pom,
    };
  }

  private synthDependencies(pom: any[]) {
    const deps = this.project.deps.all;
    if (deps.length === 0) { return; }

    const dependencies: any[] = [];

    const plugins: any[] = [];
    for (const dep of deps) {
      switch (dep.type) {
        case DependencyType.PEER:
        case DependencyType.RUNTIME:
          dependencies.push({ dependency: mavenCoords(dep) });
          break;

        case DependencyType.TEST:
          dependencies.push({
            dependency: [
              ...mavenCoords(dep),
              { scope: 'test' },
            ],
          });
          break;

        // build maps to plugins
        case DependencyType.BUILD:
          plugins.push({
            plugin: [
              ...mavenCoords(dep),
              ...pluginConfig(dep.metadata as PluginOptions),
            ],
          });
          break;

        default:
          throw new Error(`unsupported dependency type: ${dep.type}`);
      }
    }

    if (plugins.length > 0) {
      pom.push({
        build: [
          { plugins },
        ],
      });
    }

    if (dependencies.length > 0) {
      pom.push({ dependencies });
    }
  }
}

export interface PluginOptions {
  /**
   * Plugin key/value configuration
   * @default {}
   */
  readonly configuration?: { [key: string]: any };

  /**
   * Plugin executions
   * @default []
   */
  readonly executions?: PluginExecution[];
}

export interface PluginExecution {
  readonly id: string;
  readonly goals: string[];
}

function mavenVersion(version: string) {
  return version; // TODO
}

/**
 * Parses maven groupId and artifactId from a dependency name.
 *
 *     name    <=> <groupId>/<artifactId>
 *     version <=> <version>
 */
function mavenCoords(dep: Dependency) {
  const name = dep.name;
  const parts = name.split('/');
  if (parts.length !== 2) {
    throw new Error(`invalid maven coordinates in dependency named "${name}". format is "<groupId>/<artifactId>". For example "org.junit.jupiter/junit-jupiter-engine"`);
  }

  return [
    { groupId: parts[0] },
    { artifactId: parts[1] },
    { version: dep.version ? mavenVersion(dep.version) : undefined },
  ];
}

function pluginConfig(options: PluginOptions = {}) {
  const ret = new Array<any>();

  if (options.configuration) {
    ret.push({ configuration: toXml(options.configuration) });
  }

  const executions = new Array();
  for (const e of options.executions ?? []) {
    executions.push({
      execution: [
        { id: e.id },
        { goals: e.goals.map(goal => ({ goal })) },
      ],
    });
  }

  if (executions.length > 0) {
    ret.push({ executions });
  }

  return ret;
}

function toXml(x: { [key: string]: any }) {
  return Object.entries(x).map(([k, v]) => ({ [k]: v }));
}
