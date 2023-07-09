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

  describe("groups", () => {
    test("no groups", () => {
      const project = createProject();
      new Dependabot(project.github!, {});
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("groups:");
      expect(dependabot).not.toContain("patterns:");
      expect(dependabot).not.toContain("exclude-patterns:");
    });

    test("two groups", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        groups: {
          groupOne: {
            patterns: ["testlib-*"],
          },
          groupTwo: {
            patterns: ["*"],
            excludePatterns: ["otherlib-*"],
          },
        },
      });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("groups:");
      expect(dependabot).toContain("patterns:");
      expect(dependabot).toContain("exclude-patterns:");
    });
  });

  describe("allowing", () => {
    test("allows testlib only", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        allow: [{ dependencyName: "testlib" }],
      });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("allow:");
      expect(dependabot).toContain("dependency-name: testlib");
    });
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

  describe("open-pull-requests-limit", () => {
    test("open pull requests limit set to positive integer", () => {
      const project = createProject();
      new Dependabot(project.github!, { openPullRequestsLimit: 5 });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("open-pull-requests-limit: 5");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("open pull requests limit set to 0", () => {
      const project = createProject();
      new Dependabot(project.github!, { openPullRequestsLimit: 0 });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("open-pull-requests-limit: 0");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("open pull requests limit not set", () => {
      const project = createProject();
      new Dependabot(project.github!);
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("open-pull-requests-limit:");
      expect(dependabot).toContain("dependency-name: projen");
    });
  });

  describe("assignees", () => {
    test("one assignee", () => {
      const project = createProject();
      new Dependabot(project.github!, { assignees: ["testUserOne"] });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("assignees:");
      expect(dependabot).toContain("testUserOne");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("multiple assignees", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        assignees: ["testUserOne", "testUserTwo"],
      });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("assignees:");
      expect(dependabot).toContain("testUserOne");
      expect(dependabot).toContain("testUserTwo");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("empty assignees", () => {
      const project = createProject();
      new Dependabot(project.github!, { assignees: [] });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("assignees:");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("no assignees", () => {
      const project = createProject();
      new Dependabot(project.github!);
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("assignees:");
      expect(dependabot).toContain("dependency-name: projen");
    });
  });

  describe("reviewers", () => {
    test("one reviewer", () => {
      const project = createProject();
      new Dependabot(project.github!, { reviewers: ["testUserOne"] });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("reviewers:");
      expect(dependabot).toContain("testUserOne");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("multiple reviewers", () => {
      const project = createProject();
      new Dependabot(project.github!, {
        reviewers: ["testUserOne", "testUserTwo"],
      });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).toContain("reviewers:");
      expect(dependabot).toContain("testUserOne");
      expect(dependabot).toContain("testUserTwo");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("empty reviewers", () => {
      const project = createProject();
      new Dependabot(project.github!, { reviewers: [] });
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("reviewers:");
      expect(dependabot).toContain("dependency-name: projen");
    });

    test("no reviewers", () => {
      const project = createProject();
      new Dependabot(project.github!);
      const snapshot = synthSnapshot(project);
      const dependabot = snapshot[".github/dependabot.yml"];
      expect(dependabot).toMatchSnapshot();
      expect(dependabot).not.toContain("reviewers:");
      expect(dependabot).toContain("dependency-name: projen");
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
