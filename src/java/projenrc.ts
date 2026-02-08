import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { Pom } from "./pom";
import { PROJEN_VERSION } from "../common";
import { DependencyType } from "../dependencies";
import { ProjectOption, readJsiiManifest } from "../inventory";
import { Project } from "../project";
import { ProjenrcFile } from "../projenrc";
import { normalizePersistedPath } from "../util";

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
export class Projenrc extends ProjenrcFile {
  /**
   * The name of the java class that includes the projen entrypoint.
   */
  public readonly className: string;

  /**
   * Whether the class is in the "test" or "main" scope?
   */
  private readonly testScope: boolean;

  constructor(project: Project, pom: Pom, options: ProjenrcOptions = {}) {
    super(project);

    const projenVersion = options.projenVersion ?? PROJEN_VERSION;
    this.className = options.className ?? "projenrc";
    this.testScope = options.testScope ?? true;

    const depType = this.testScope
      ? DependencyType.TEST
      : DependencyType.RUNTIME;
    const execOpts = this.testScope ? ' -Dexec.classpathScope="test"' : "";
    const compileGoal = this.testScope
      ? "compiler:testCompile"
      : "compiler:compile";

    project.deps.addDependency(
      `io.github.cdklabs/projen@${projenVersion}`,
      depType,
    );
    pom.addPlugin("org.codehaus.mojo/exec-maven-plugin@3.0.0");

    // set up the "default" task which is the task executed when `projen` is executed for this project.
    project.defaultTask?.exec(`mvn ${compileGoal} --quiet`);
    project.defaultTask?.exec(
      `mvn exec:java --quiet -Dexec.mainClass=${this.className}${execOpts}`,
    );

    // if this is a new project, generate a skeleton for projenrc.java
    this.generateProjenrc();
  }

  private get javaClass(): string {
    const split = this.className.split(".");
    if (split.length === 1) {
      return split[0];
    }
    return split[split.length - 1];
  }

  private get javaPackage(): string[] {
    const split = this.className.split(".");
    if (split.length === 1) {
      return [];
    }
    return split.slice(0, split.length - 2);
  }

  /**
   * The path of the projenrc file.
   */
  public get filePath(): string {
    const dir = this.testScope ? "src/test/java" : "src/main/java";

    const javaFile = join(
      this.project.outdir,
      dir,
      ...this.javaPackage,
      this.javaClass + ".java",
    );

    const relativePath = relative(this.project.outdir, javaFile);

    return normalizePersistedPath(relativePath);
  }

  private generateProjenrc() {
    const bootstrap = this.project.initProject;
    if (!bootstrap) {
      return;
    }
    const jsiiFqn = bootstrap.fqn;
    const jsiiManifest = readJsiiManifest(jsiiFqn);
    const jsiiType = jsiiManifest.types[jsiiFqn];
    const javaTarget = jsiiManifest.targets.java;
    const optionsTypeFqn = jsiiType.initializer?.parameters?.[0].type?.fqn;
    if (!optionsTypeFqn) {
      this.project.logger.warn(
        "cannot determine jsii type for project options",
      );
      return;
    }
    const jsiiOptionsType = jsiiManifest.types[optionsTypeFqn];
    if (!jsiiOptionsType) {
      this.project.logger.warn(
        `cannot find jsii type for project options: ${optionsTypeFqn}`,
      );
      return;
    }
    // skip if file exists
    if (existsSync(this.filePath)) {
      return;
    }

    const lines = new Array<string>();

    let indent = 0;
    const emit = (line: string = "") =>
      lines.push(" ".repeat(indent * 4) + line);
    const openBlock = (line: string = "") => {
      emit(line + " {");
      indent++;
    };
    const closeBlock = () => {
      indent--;
      emit("}");
    };

    const optionFqns: Record<string, string> = generateJavaOptionNames(
      bootstrap.type.options,
      jsiiManifest,
    );

    if (this.javaPackage.length > 0) {
      emit(`package ${this.javaPackage.join(".")};`);
      emit();
    }

    const { renderedOptions, imports } = renderJavaOptions(
      2,
      jsiiOptionsType.name,
      optionFqns,
      bootstrap.args,
    );

    emit(`import ${getJavaImport(jsiiType, jsiiManifest)};`);
    emit(`import ${getJavaImport(jsiiOptionsType, jsiiManifest)};`);
    for (const optionTypeName of imports) {
      emit(`import ${javaTarget.package}.${optionTypeName};`);
    }
    emit();
    openBlock(`public class ${this.javaClass}`);
    openBlock("public static void main(String[] args)");
    emit(
      `${jsiiType.name} project = new ${jsiiType.name}(${renderedOptions});`,
    );
    emit("project.synth();");
    closeBlock();
    closeBlock();

    const filePath = join(this.project.outdir, this.filePath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, lines.join("\n"));

    this.project.logger.info(
      `Project definition file was created at ${this.filePath}`,
    );
  }
}

export function generateJavaOptionNames(
  options: ProjectOption[],
  jsiiManifest: any,
) {
  const optionFqns: Record<string, string> = {};
  for (const option of options) {
    if (option.fqn && jsiiManifest.types[option.fqn]) {
      optionFqns[option.name] = toJavaFullTypeName(
        jsiiManifest.types[option.fqn],
      );
    }
  }

  return optionFqns;
}

function renderJavaOptions(
  indent: number,
  optionsTypeName: string,
  optionFqns: Record<string, string>,
  initOptions?: Record<string, any>,
) {
  const imports = new Set<string>();
  if (!initOptions || Object.keys(initOptions).length === 0) {
    return { renderedOptions: "", imports }; // no options
  }

  const lines = [`${optionsTypeName}.builder()`];

  for (const [name, value] of Object.entries(initOptions)) {
    const { javaValue, importName } = toJavaValue(value, name, optionFqns);
    if (importName) imports.add(importName);
    lines.push(`.${toJavaProperty(name)}(${javaValue})`);
  }

  lines.push(".build()");

  const renderedOptions = lines.join(`\n${" ".repeat((indent + 1) * 4)}`);
  return { renderedOptions, imports };
}

function toJavaProperty(prop: string) {
  return prop;
}

function toJavaValue(
  value: any,
  name: string,
  optionFqns: Record<string, string>,
) {
  if (typeof value === "string" && optionFqns[name] !== undefined) {
    const parts = optionFqns[name].split(".");
    const base = parts[parts.length - 1];
    const choice = String(value).toUpperCase().replace(/-/g, "_");
    return { javaValue: `${base}.${choice}`, importName: optionFqns[name] };
  } else {
    return { javaValue: JSON.stringify(value) };
  }
}

function toJavaFullTypeName(jsiiType: any) {
  return [jsiiType.namespace, jsiiType.name].filter((x) => x).join(".");
}

export function getJavaImport(jsiiType: any, jsiiManifest: any) {
  const packageName =
    jsiiManifest?.submodules?.[`${jsiiType.assembly}.${jsiiType?.namespace}`]
      ?.targets?.java?.package ||
    [jsiiManifest.targets.java.package, jsiiType.namespace]
      .filter((x) => x)
      .join(".");

  return `${packageName}.${jsiiType.name}`;
}
