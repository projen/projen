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

  readonly groupId: string;
  readonly artifactId: string;
  readonly version: string;
}

export class Pom extends Component {
  private readonly properties: any[] = [];

  public readonly fileName: string;
  public readonly groupId: string;
  public readonly artifactId: string;
  public readonly version: string;

  constructor(project: Project, options: PomOptions) {
    super(project);

    this.fileName = options.fileName ?? 'pom.xml';
    this.groupId = options.groupId;
    this.artifactId = options.artifactId;
    this.version = options.version;

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
   * @param configuration optional plugin key/value configuration
   */
  public addPlugin(spec: string, configuration: {[key: string]: string} = {}) {
    return this.project.deps.addDependency(spec, DependencyType.BUILD, {
      configuration,
    });
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
              ...pluginConfiguration(dep.metadata?.configuration),
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

function pluginConfiguration(config: {[key: string]: any} = {}) {
  if (Object.keys(config).length === 0) { return []; }
  return [{ configuration: toXml(config) }];
}

function toXml(map: {[key: string]: string }) {
  return Object.entries(map).map(([k, v]) => ({ [k]: v }));
}
