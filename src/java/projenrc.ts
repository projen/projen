import { PROJEN_VERSION } from '../common';
import { Component } from '../component';
import { DependencyType } from '../deps';
import { Project } from '../project';
import { Pom } from './pom';

/**
 * Options for `Projenrc`.
 */
export interface ProjenrcOptions {
  /**
   * The name of the Java class which contains the `main()` method for projen.
   * @default "projenrc"
   */
  readonly className?: string;

  /**
   * The projen version to use
   * @default - current version
   */
  readonly projenVersion?: string;

  /**
   * Defines projenrc under the test scope instead of the main scope, which is
   * reserved to the app. This means that projenrc will be under
   * `src/test/java/projenrc.java` and projen will be defined as a test
   * dependency. This enforces that application code does not take a dependency
   * on projen code.
   *
   * If this is disabled, projenrc should be under
   * `src/main/java/projenrc.java`.
   *
   * @default true
   */
  readonly testScope?: boolean;
}

/**
 * Allows writing projenrc files in java.
 *
 * This will install `org.projen/projen` as a Maven dependency and will add a
 * `synth` task which will compile & execute `main()` from
 * `src/main/java/projenrc.java`.
 */
export class Projenrc extends Component {
  constructor(project: Project, pom: Pom, options: ProjenrcOptions = {}) {
    super(project);

    const projenVersion = options.projenVersion ?? PROJEN_VERSION;
    const className = options.className ?? 'projenrc';
    const testScope = options.testScope ?? true;

    const depType = testScope ? DependencyType.TEST : DependencyType.RUNTIME;
    const execOpts = testScope ? ' -Dexec.classpathScope="test"' : '';
    const compileGoal = testScope ? 'compiler:testCompile' : 'compiler:compile';

    project.deps.addDependency(`com.github.eladb/projen@${projenVersion}`, depType);
    pom.addPlugin('org.codehaus.mojo/exec-maven-plugin@3.0.0');

    const synth = project.addTask('synth', { description: 'Synthesize the project' });
    synth.exec(`mvn ${compileGoal} --quiet`);
    synth.exec(`mvn exec:java --quiet -Dexec.mainClass=${className}${execOpts}`);
  }
}