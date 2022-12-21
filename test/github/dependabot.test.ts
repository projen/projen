import { Dependabot, DependabotRegistryType } from "../../src/github";
import { NodeProject, NodeProjectOptions } from "../../src/javascript";
import { synthSnapshot } from "../util";

describe("dependabot", () => {
  test("default", () => {
    const project = createProject();

    new Dependabot(project.github!);

    const snapshot = synthSnapshot(project);
    expect(snapshot[".github/dependabot.yml"]).toBeDefined();
    expect(snapshot[".github/dependabot.yml"]).toMatchSnapshot();
  });

  test("private registries", () => {
    const project = createProject();

    const registryName = "npm-registry-npm-pkg-github-com";

    new Dependabot(project.github!, {
      registries: {
        [registryName]: {
          type: DependabotRegistryType.NPM_REGISTRY,
          url: "https://npm.pkg.github.com",
          token: "${{ secrets.TOKEN }}",
          replacesBase: true,
          username: "test",
          password: "${{ secrets.TOKEN }}",
          key: "abc123",
        },
      },
    });

    const snapshot = synthSnapshot(project);
    const dependabot = snapshot[".github/dependabot.yml"];
    expect(dependabot).toBeDefined();
    expect(dependabot).toMatchSnapshot();
    expect(dependabot).toContain("registries");
    expect(dependabot).toContain(registryName);
  });

  describe("ignoring", () => {
    test("ignores projen by default", () => {
      const project = createProject();
      new Dependabot(project.github!, {});
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("ignore:");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("ignore with ignoreProjen set to false", () => {
      const project = createProject();
      new Dependabot(project.github!, { ignoreProjen: false });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("ignore:");
      expect(dependabot).not.toContain("dependency-name: projen");
    });

    test("ignore with no version", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        ignore: [{ dependencyName: "testlib" }],
      });

      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("ignore");
      expect(dependabot).toContain("dependency-name: testlib");
      expect(dependabot).not.toContain("versions");
    });

    test("ignore with a single version", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        ignore: [{ dependencyName: "testlib", versions: [">10.x"] }],
      });

      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("ignore");
      expect(dependabot).toContain("dependency-name: testlib");
      expect(dependabot).toContain("versions");
      expect(dependabot).toContain(">10.x");
    });

    test("ignore with multiple versions", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        ignore: [{ dependencyName: "testlib", versions: ["10.x", "20.x"] }],
      });

      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("ignore");
      expect(dependabot).toContain("dependency-name: testlib");
      expect(dependabot).toContain("versions");
      expect(dependabot).toContain("10.x");
      expect(dependabot).toContain("20.x");
    });
  });

  describe("github-actions", () => {
    test("should include github actions", () => {
      const project = createProject();

      new Dependabot(project.github!, { includeGithubActions: true });

      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toBeDefined();
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("package-ecosystem: github-actions");
    });
  });
});

type ProjectOptions = Omit<
  NodeProjectOptions,
  "outdir" | "defaultReleaseBranch" | "name"
>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: "main",
    name: "node-project",
    ...options,
  });
}
