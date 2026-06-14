import * as fs from "fs";
import * as path from "path";
import { mkdtemp } from "../util";
import { resolveExternalDevDep } from "../../src/cli/cmds/new";

/**
 * Creates a mock module directory with a .jsii manifest and package.json.
 * Also creates a mock projen dependency with its own .jsii manifest so
 * the type hierarchy can be resolved.
 */
function createMockModule(options: {
  types: Record<string, { base?: string; kind?: string }>;
  targets?: Record<string, any>;
  version?: string;
  dependencies?: string[];
}): string {
  const tmpdir = mkdtemp();
  const moduleDir = path.join(tmpdir, "mock-module");
  fs.mkdirSync(moduleDir, { recursive: true });

  // Create the projen dependency with base types
  const projenDir = path.join(moduleDir, "node_modules", "projen");
  fs.mkdirSync(projenDir, { recursive: true });
  fs.writeFileSync(
    path.join(projenDir, "package.json"),
    JSON.stringify({ name: "projen", version: "0.0.0" }),
  );
  fs.writeFileSync(
    path.join(projenDir, ".jsii"),
    JSON.stringify({
      fingerprint: "projen-mock",
      types: {
        "projen.Project": { kind: "class", name: "Project" },
        "projen.github.GitHubProject": {
          kind: "class",
          name: "GitHubProject",
          base: "projen.Project",
        },
        "projen.python.PythonProject": {
          kind: "class",
          name: "PythonProject",
          base: "projen.github.GitHubProject",
        },
        "projen.java.JavaProject": {
          kind: "class",
          name: "JavaProject",
          base: "projen.github.GitHubProject",
        },
      },
    }),
  );

  // Create the module's .jsii manifest
  const manifest: any = {
    fingerprint: "mock-module",
    types: {},
    targets: options.targets ?? {},
  };
  if (options.dependencies?.length) {
    manifest.dependencies = {};
    for (const dep of options.dependencies) {
      manifest.dependencies[dep] = {};
    }
  }
  for (const [fqn, type] of Object.entries(options.types)) {
    manifest.types[fqn] = { kind: type.kind ?? "class", ...type };
  }
  fs.writeFileSync(
    path.join(moduleDir, ".jsii"),
    JSON.stringify(manifest),
  );

  // Create package.json
  fs.writeFileSync(
    path.join(moduleDir, "package.json"),
    JSON.stringify({
      name: "mock-module",
      version: options.version ?? "1.2.3",
    }),
  );

  return moduleDir;
}

describe("resolveExternalDevDep", () => {
  test("returns npm spec when no targets in manifest", () => {
    const moduleDir = createMockModule({
      types: {
        "mock.MyProject": { base: "projen.Project" },
      },
    });
    expect(
      resolveExternalDevDep(moduleDir, "mock.MyProject", "@org/my-pkg@^1.0"),
    ).toBe("@org/my-pkg@^1.0");
  });

  test("returns python distName for PythonProject subclass", () => {
    const moduleDir = createMockModule({
      types: {
        "mock.MyPythonProject": {
          base: "projen.python.PythonProject",
        },
      },
      targets: {
        python: { distName: "my-python-pkg", module: "my_python_pkg" },
      },
      dependencies: ["projen"],
      version: "2.0.0",
    });
    expect(
      resolveExternalDevDep(
        moduleDir,
        "mock.MyPythonProject",
        "@org/my-pkg@^1.0",
      ),
    ).toBe("my-python-pkg@2.0.0");
  });

  test("returns python distName without version when package.json has no version", () => {
    const moduleDir = createMockModule({
      types: {
        "mock.MyPythonProject": {
          base: "projen.python.PythonProject",
        },
      },
      targets: {
        python: { distName: "my-python-pkg", module: "my_python_pkg" },
      },
      dependencies: ["projen"],
    });
    // Remove version from package.json
    const pkgJsonPath = path.join(moduleDir, "package.json");
    fs.writeFileSync(
      pkgJsonPath,
      JSON.stringify({ name: "mock-module" }),
    );
    expect(
      resolveExternalDevDep(
        moduleDir,
        "mock.MyPythonProject",
        "@org/my-pkg",
      ),
    ).toBe("my-python-pkg");
  });

  test("returns java maven coordinates for JavaProject subclass", () => {
    const moduleDir = createMockModule({
      types: {
        "mock.MyJavaProject": {
          base: "projen.java.JavaProject",
        },
      },
      targets: {
        java: {
          package: "com.example",
          maven: {
            groupId: "com.example",
            artifactId: "my-java-pkg",
          },
        },
      },
      dependencies: ["projen"],
      version: "3.0.0",
    });
    expect(
      resolveExternalDevDep(
        moduleDir,
        "mock.MyJavaProject",
        "@org/my-pkg@^1.0",
      ),
    ).toBe("com.example/my-java-pkg@3.0.0");
  });

  test("returns npm spec for non-Python/Java project even with targets", () => {
    const moduleDir = createMockModule({
      types: {
        "mock.MyJsProject": {
          base: "projen.github.GitHubProject",
        },
      },
      targets: {
        python: { distName: "my-python-pkg", module: "my_python_pkg" },
      },
      dependencies: ["projen"],
    });
    expect(
      resolveExternalDevDep(
        moduleDir,
        "mock.MyJsProject",
        "@org/my-pkg@^1.0",
      ),
    ).toBe("@org/my-pkg@^1.0");
  });

  test("handles deep inheritance chain for Python", () => {
    const moduleDir = createMockModule({
      types: {
        "mock.BasePythonProject": {
          base: "projen.python.PythonProject",
        },
        "mock.MyCustomPythonProject": {
          base: "mock.BasePythonProject",
        },
      },
      targets: {
        python: { distName: "custom-python-pkg", module: "custom_python_pkg" },
      },
      dependencies: ["projen"],
      version: "1.0.0",
    });
    expect(
      resolveExternalDevDep(
        moduleDir,
        "mock.MyCustomPythonProject",
        "@org/my-pkg",
      ),
    ).toBe("custom-python-pkg@1.0.0");
  });

  test("returns npm spec when manifest has no .jsii file", () => {
    const tmpdir = mkdtemp();
    const moduleDir = path.join(tmpdir, "no-jsii");
    fs.mkdirSync(moduleDir, { recursive: true });
    fs.writeFileSync(
      path.join(moduleDir, "package.json"),
      JSON.stringify({ name: "no-jsii", version: "1.0.0" }),
    );
    expect(
      resolveExternalDevDep(moduleDir, "mock.MyProject", "no-jsii@^1.0"),
    ).toBe("no-jsii@^1.0");
  });
});
