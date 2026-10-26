import { readFileSync } from "fs";
import { join } from "path";
import { convert } from "xmlbuilder2";
import type { ICompareString } from "../../src/compare";
import { DependencyType } from "../../src/dependencies";
import type { PluginOptions, PomOptions } from "../../src/java";
import { ChecksumPolicy, JavaProject, Pom, UpdatePolicy } from "../../src/java";
import { synthSnapshot, TestProject } from "../util";

test("group/artifact/version", () => {
  const pom = new TestPom({
    groupId: "my.group.id",
    artifactId: "mfoo-bar",
    version: "1.2.3",
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("optional metadata", () => {
  const pom = new TestPom({
    groupId: "my.group.id",
    artifactId: "mfoo-bar",
    version: "1.2.3",

    parentPom: {
      groupId: "my.parent.group.id",
      artifactId: "foo-bar-parent",
      relativePath: "../home",
      version: "0.0.1",
    },
    description: "hello, world!",
    url: "https://foo/bar",
    packaging: "not_jar",
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addProperty()", () => {
  const pom = new TestPom();
  pom.addProperty("project.build.sourceEncoding", "UTF-8");
  pom.addProperty("junit.version", "5.7.0");

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addDependency()", () => {
  const pom = new TestPom();
  pom.addDependency("software.amazon.awscdk/core");

  // dependencies are managed at the project level
  pom.project.deps.addDependency(
    "org.assertj/assertj-core@^3.18.1",
    DependencyType.TEST,
  );

  expect(actualPom(pom)).toMatchSnapshot();

  // check that pom.addDependency() updates the project
  expect(
    pom.project.deps.getDependency("software.amazon.awscdk/core"),
  ).toStrictEqual({
    name: "software.amazon.awscdk/core",
    type: "runtime",
  });
});

test("addPlugin()", () => {
  const pom = new TestPom();

  pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
    dependencies: ["org.projen/projen@^0.14"],
    configuration: {
      source: "1.8",
      target: "1.8",
    },
  });

  pom.addPlugin("org.apache.maven.plugins/maven-shade-plugin@3.2.2", {
    configuration: {
      createDependencyReducedPom: false,
    },
    executions: [
      {
        id: "shade-task",
        phase: "package",
        goals: ["shade"],
      },
    ],
  });

  // alteratively
  pom.project.deps.addDependency(
    "org.codehaus.mojo/exec-maven-plugin@3.0.0",
    DependencyType.BUILD,
    {
      configuration: {
        mainClass: "com.myorg.Play202101050157App",
      },
    },
  );

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addPlugin() with multiple executions", () => {
  const pom = new TestPom();

  pom.addPlugin("org.apache.maven.plugins/maven-compiler-plugin@3.8.1", {
    dependencies: ["org.projen/projen@^0.14"],
    configuration: {
      source: "1.8",
      target: "1.8",
    },
  });

  pom.addPlugin("org.apache.maven.plugins/maven-shade-plugin@3.2.2", {
    configuration: {
      createDependencyReducedPom: false,
    },
    executions: [
      {
        id: "shade-task",
        phase: "package",
        goals: ["shade"],
      },
      {
        id: "default-compile",
        phase: "none",
        goals: [],
        configuration: {
          source: 1.8,
        },
      },
    ],
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addRepository()", () => {
  const pom = new TestPom();

  pom.addRepository({
    id: "my-local-repository",
    url: "file://my/local/repository",
  });

  pom.addRepository({
    id: "my-remote-repository",
    name: "Remote Repo",
    url: "https://myserver/repo",
    layout: "default",
  });

  expect(actualPom(pom)).toMatchSnapshot();
});

test("addPluginRepository()", () => {
  const pom = new TestPom();

  pom.addPluginRepository({
    id: "my-local-repository",
    url: "file://my/local/repository",
  });
  pom.addPluginRepository({
    id: "my-remote-repository",
    name: "Remote Repo",
    url: "https://myserver/repo",
    layout: "default",
    snapshots: {
      checksumPolicy: ChecksumPolicy.FAIL,
      updatePolicy: UpdatePolicy.interval(50),
    },
  });
  expect(actualPom(pom)).toMatchSnapshot();
});

describe("plugin ordering", () => {
  test("sorts only top-level plugins using full coordinates without versions", () => {
    const order = [
      "org.b/shared",
      "org.a/shared",
      "org.c/other",
      "org.z/beta",
      "org.z/alpha",
    ];
    const compare = jest.fn(
      (a: string, b: string) => order.indexOf(a) - order.indexOf(b),
    );
    const pluginOptions: PluginOptions = {
      configuration: { message: "preserve me" },
      dependencies: ["org.z/beta@1.0.0", "org.z/alpha@2.0.0"],
      executions: [
        {
          id: "z-execution",
          phase: "compile",
          goals: ["z-goal", "a-goal"],
          configuration: { mode: "first" },
        },
        { id: "a-execution", phase: "compile", goals: ["other"] },
      ],
    };
    const originalOptions = JSON.parse(JSON.stringify(pluginOptions));
    const defaults = configuredPom(pluginOptions);
    const custom = configuredPom(pluginOptions, { compare });
    const equal = configuredPom(pluginOptions, { compare: () => 0 });
    const dependencies = JSON.parse(JSON.stringify(custom.project.deps.all));
    const defaultXml = actualPom(defaults);
    const defaultPom = parsePom(defaultXml);
    const customPom = repeatedPom(custom);

    expect(pluginIds(defaultPom)).toStrictEqual([
      "org.a/shared",
      "org.b/shared",
      "org.c/other",
      "org.z/alpha",
      "org.z/beta",
    ]);
    expect(pluginIds(customPom)).toStrictEqual(order);
    expect(new Set(compare.mock.calls.flat())).toStrictEqual(new Set(order));
    expect(actualPom(equal)).toBe(defaultXml);
    expect(customPom).toStrictEqual(withPluginOrder(defaultPom, order));
    expect(custom.project.deps.all).toStrictEqual(dependencies);
    expect(pluginOptions).toStrictEqual(originalOptions);

    const shared = plugins(customPom)[0];
    expect(shared.version).toBe("2.0.0");
    expect(shared.configuration).toStrictEqual({ message: "preserve me" });
    expect(shared.dependencies.dependency.map(coordinates)).toStrictEqual([
      "org.z/beta",
      "org.z/alpha",
    ]);
    expect(shared.executions.execution.map((e: any) => e.id)).toStrictEqual([
      "z-execution",
      "a-execution",
    ]);
    expect(shared.executions.execution[0].goals).toStrictEqual([
      { goal: "z-goal" },
      { goal: "a-goal" },
    ]);
    expect(
      customPom.project.dependencies.dependency.map(coordinates),
    ).toStrictEqual([
      "org.runtime/alpha",
      "org.runtime/beta",
      "org.test/alpha",
      "org.test/beta",
    ]);
    for (const repositories of [
      customPom.project.repositories.repository,
      customPom.project.pluginRepositories.pluginRepository,
    ]) {
      expect(
        repositories.map((repository: any) => repository.id),
      ).toStrictEqual(["z-repository", "a-repository"]);
    }
  });

  test("preserves the default relative order for ties and includes late plugins", () => {
    const pom = new TestPom({
      groupId: "org.acme",
      artifactId: "my-artifact",
      version: "1.2.3",
      sortPlugins: {
        compare: (a: string, b: string) =>
          Number(b === "org.c/other") - Number(a === "org.c/other"),
      },
    });
    pom.addPlugin("org.b/shared@1.0.0");
    pom.addPlugin("org.c/other@1.0.0");
    pom.addPlugin("org.a/shared@1.0.0");
    pom.project.synth();
    const first = readFileSync(join(pom.project.outdir, pom.fileName), "utf8");
    expect(pluginIds(parsePom(first))).toStrictEqual([
      "org.c/other",
      "org.a/shared",
      "org.b/shared",
    ]);

    pom.addPlugin("org.d/late@1.0.0");
    expect(pluginIds(repeatedPom(pom))).toStrictEqual([
      "org.c/other",
      "org.a/shared",
      "org.b/shared",
      "org.d/late",
    ]);
  });

  test.each([{ specs: [] }, { specs: ["org.example/single@1.0.0"] }])(
    "handles $specs without invoking the comparator",
    ({ specs }) => {
      const compare = jest.fn(() => 0);
      const pom = new TestPom({
        groupId: "org.acme",
        artifactId: "my-artifact",
        version: "1.2.3",
        sortPlugins: { compare },
      });
      for (const spec of specs) {
        pom.addPlugin(spec);
      }
      expect(pluginIds(repeatedPom(pom))).toStrictEqual(
        specs.map((spec) => spec.split("@")[0]),
      );
      expect(compare).not.toHaveBeenCalled();
    },
  );

  test("accepts the option through JavaProject without affecting other projects", () => {
    const options = {
      name: "my-java-project",
      groupId: "org.acme",
      artifactId: "my-artifact",
      version: "1.2.3",
      projenrcJava: false,
      sample: false,
    };
    const defaults = new JavaProject(options);
    const custom = new JavaProject({
      ...options,
      sortPlugins: { compare: (a: string, b: string) => b.localeCompare(a) },
    });
    defaults.addPlugin("org.z/custom@1.0.0");
    custom.addPlugin("org.z/custom@1.0.0");
    defaults.synth();
    const defaultXml = readFileSync(
      join(defaults.outdir, defaults.pom.fileName),
      "utf8",
    );
    const defaultPom = parsePom(defaultXml);
    const order = pluginIds(defaultPom).reverse();
    expect(repeatedPom(custom.pom)).toStrictEqual(
      withPluginOrder(defaultPom, order),
    );
    expect(actualPom(defaults.pom)).toBe(defaultXml);
  });

  function configuredPom(
    pluginOptions: PluginOptions,
    sortPlugins?: ICompareString,
  ) {
    const pom = new TestPom({
      groupId: "org.acme",
      artifactId: "my-artifact",
      version: "1.2.3",
      ...(sortPlugins === undefined ? {} : { sortPlugins }),
    });
    pom.addPlugin("org.b/shared@1.0.0", {
      configuration: { replaced: "old" },
    });
    pom.addPlugin("org.c/other@3.0.0");
    pom.addPlugin("org.a/shared@4.0.0");
    pom.addPlugin("org.b/shared@2.0.0", pluginOptions);
    pom.addDependency("org.runtime/beta@1.0.0");
    pom.addDependency("org.runtime/alpha@1.0.0");
    pom.addTestDependency("org.test/beta@1.0.0");
    pom.addTestDependency("org.test/alpha@1.0.0");
    for (const id of ["z-repository", "a-repository"]) {
      const repository = { id, url: `https://example.com/${id}` };
      pom.addRepository(repository);
      pom.addPluginRepository(repository);
    }
    return pom;
  }

  function parsePom(contents: string) {
    return JSON.parse(convert(contents, { format: "json" }));
  }

  function plugins(pom: any): any[] {
    const value = pom.project.build?.plugins?.plugin;
    return value === undefined ? [] : Array.isArray(value) ? value : [value];
  }

  function coordinates(plugin: any): string {
    return `${plugin.groupId}/${plugin.artifactId}`;
  }

  function pluginIds(pom: any): string[] {
    return plugins(pom).map(coordinates);
  }

  function withPluginOrder(pom: any, order: string[]) {
    return {
      ...pom,
      project: {
        ...pom.project,
        build: {
          ...pom.project.build,
          plugins: {
            plugin: order.map((id) =>
              plugins(pom).find((plugin) => coordinates(plugin) === id),
            ),
          },
        },
      },
    };
  }

  function repeatedPom(pom: Pom) {
    pom.project.synth();
    const first = readFileSync(join(pom.project.outdir, pom.fileName), "utf8");
    const second = actualPom(pom);
    expect(second).toBe(first);
    return parsePom(second);
  }
});

function actualPom(p: Pom) {
  const snap = synthSnapshot(p.project);
  return snap[p.fileName];
}

class TestPom extends Pom {
  constructor(options?: PomOptions) {
    super(
      new TestProject(),
      options ?? {
        groupId: "org.acme",
        artifactId: "my-artifact",
        version: "1.2.3",
      },
    );
  }
}
