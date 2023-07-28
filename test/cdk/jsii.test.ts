import * as yaml from "yaml";
import { javascript } from "../../src";
import { JsiiProject } from "../../src/cdk";
import { synthSnapshot } from "../util";

describe("JsiiProject with default settings", () => {
  it("synthesizes", () => {
    const project = new JsiiProject({
      authorAddress: "hello@hello.com",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "project",
      defaultReleaseBranch: "main",
    });

    const output = synthSnapshot(project);
    expect(output).toMatchSnapshot();
  });
});

describe("author", () => {
  test("authorEmail and authorAddress can be the same value", () => {
    const project = new JsiiProject({
      authorAddress: "hello@hello.com",
      authorEmail: "hello@hello.com",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "project",
      defaultReleaseBranch: "master",
    });

    const pkgjson = synthSnapshot(project)["package.json"];
    expect(pkgjson.author).toStrictEqual({
      email: "hello@hello.com",
      name: "My Name",
      organization: false,
    });
  });

  test("authorUrl and authorAddress can be the same value", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "project",
      defaultReleaseBranch: "master",
    });

    const pkgjson = synthSnapshot(project)["package.json"];
    expect(pkgjson.author).toStrictEqual({
      name: "My Name",
      organization: false,
      url: "https://foo.bar",
    });
  });
});

describe("maven repository options", () => {
  test("use maven central as repository", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToMaven: {
        javaPackage: "io.github.cdklabs.watchful",
        mavenGroupId: "io.github.cdklabs",
        mavenArtifactId: "cdk-watchful",
      },
      defaultReleaseBranch: "master",
      publishTasks: true,
    });

    const outdir = synthSnapshot(project);

    expect(outdir[".projen/tasks.json"].tasks["publish:maven"]).toStrictEqual({
      name: "publish:maven",
      description: "Publish this package to Maven Central",
      requiredEnv: [
        "MAVEN_GPG_PRIVATE_KEY",
        "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE",
        "MAVEN_PASSWORD",
        "MAVEN_USERNAME",
        "MAVEN_STAGING_PROFILE_ID",
      ],
      steps: [
        { exec: 'test "$(git branch --show-current)" = "master"' },
        { exec: "npx -p publib@latest publib-maven" },
      ],
    });

    const workflow = outdir[".github/workflows/release.yml"];
    expect(workflow).toContain("run: npx -p publib@latest publib-maven");
    expect(workflow).toContain("MAVEN_USERNAME: ${{ secrets.MAVEN_USERNAME }}");
    expect(workflow).not.toContainEqual("MAVEN_SERVER_ID");
    expect(workflow).not.toContainEqual("MAVEN_REPOSITORY_URL");
    expect(workflow).not.toContain("packages: write");
  });

  test("use nexus repo new endpoint", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToMaven: {
        javaPackage: "io.github.cdklabs.watchful",
        mavenGroupId: "io.github.cdklabs",
        mavenArtifactId: "cdk-watchful",
        mavenEndpoint: "https://s01.oss.sonatype.org",
      },
      defaultReleaseBranch: "master",
      publishTasks: true,
    });

    const outdir = synthSnapshot(project);

    expect(outdir[".projen/tasks.json"].tasks["publish:maven"]).toStrictEqual({
      name: "publish:maven",
      description: "Publish this package to Maven Central",
      env: {
        MAVEN_ENDPOINT: "https://s01.oss.sonatype.org",
      },
      requiredEnv: [
        "MAVEN_GPG_PRIVATE_KEY",
        "MAVEN_GPG_PRIVATE_KEY_PASSPHRASE",
        "MAVEN_PASSWORD",
        "MAVEN_USERNAME",
        "MAVEN_STAGING_PROFILE_ID",
      ],
      steps: [
        { exec: 'test "$(git branch --show-current)" = "master"' },
        { exec: "npx -p publib@latest publib-maven" },
      ],
    });

    const workflow = outdir[".github/workflows/release.yml"];
    expect(workflow).toContain("run: npx -p publib@latest publib-maven");
    expect(workflow).toContain("MAVEN_ENDPOINT: https://s01.oss.sonatype.org");
    expect(workflow).toContain("MAVEN_USERNAME: ${{ secrets.MAVEN_USERNAME }}");
    expect(workflow).not.toContainEqual("MAVEN_SERVER_ID");
    expect(workflow).not.toContainEqual("MAVEN_REPOSITORY_URL");
    expect(workflow).not.toContain("packages: write");
  });

  test("use github as repository", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToMaven: {
        javaPackage: "io.github.cdklabs.watchful",
        mavenGroupId: "io.github.cdklabs",
        mavenArtifactId: "cdk-watchful",
        mavenRepositoryUrl: "https://maven.pkg.github.com/eladb",
      },
      defaultReleaseBranch: "master",
      publishTasks: true,
    });

    const outdir = synthSnapshot(project);

    expect(outdir[".projen/tasks.json"].tasks["publish:maven"]).toStrictEqual({
      name: "publish:maven",
      description: "Publish this package to Maven Central",
      env: {
        MAVEN_SERVER_ID: "github",
        MAVEN_REPOSITORY_URL: "https://maven.pkg.github.com/eladb",
      },
      requiredEnv: ["MAVEN_PASSWORD", "MAVEN_USERNAME"],
      steps: [
        { exec: 'test "$(git branch --show-current)" = "master"' },
        { exec: "npx -p publib@latest publib-maven" },
      ],
    });

    const workflow = outdir[".github/workflows/release.yml"];
    expect(workflow).toContain("MAVEN_SERVER_ID: github");
    expect(workflow).toContain(
      "MAVEN_REPOSITORY_URL: https://maven.pkg.github.com/eladb"
    );
    expect(workflow).toContain("MAVEN_USERNAME: ${{ github.actor }}");
    expect(workflow).toContain("MAVEN_PASSWORD: ${{ secrets.GITHUB_TOKEN }}");
    expect(workflow).toContain("packages: write");
  });

  test("using github as repository with incorrect server id should throw", () => {
    expect(
      () =>
        new JsiiProject({
          authorAddress: "https://foo.bar",
          authorUrl: "https://foo.bar",
          repositoryUrl: "https://github.com/foo/bar.git",
          author: "My Name",
          name: "testproject",
          publishToMaven: {
            javaPackage: "io.github.cdklabs.watchful",
            mavenGroupId: "io.github.cdklabs",
            mavenArtifactId: "cdk-watchful",
            mavenServerId: "something-else",
            mavenRepositoryUrl: "https://maven.pkg.github.com/eladb",
          },
          defaultReleaseBranch: "master",
          publishTasks: true,
        })
    ).toThrow(
      'publishing to GitHub Packages requires the "mavenServerId" to be "github"'
    );
  });
});

describe("publish to go", () => {
  test("defaults", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToGo: {
        moduleName: "github.com/foo/bar",
      },
      defaultReleaseBranch: "master",
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    const targets = output["package.json"].jsii.targets;
    expect(targets).toStrictEqual({
      go: {
        moduleName: "github.com/foo/bar",
      },
    });

    expect(output[".github/workflows/release.yml"]).toMatchSnapshot();
  });

  test("release to npm undefined", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      defaultReleaseBranch: "main",
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    expect(output[".github/workflows/release.yml"]).toContain("release_npm");
  });

  test("release to npm true", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      defaultReleaseBranch: "main",
      releaseToNpm: true,
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    expect(output[".github/workflows/release.yml"]).toContain("release_npm");
  });

  test("release to npm false", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      defaultReleaseBranch: "main",
      releaseToNpm: false,
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    expect(output[".github/workflows/release.yml"]).not.toContain(
      "release_npm"
    );
  });

  test("workflowBootstrap steps", () => {
    const workflowBootstrapStep = {
      id: "test_setup",
      env: {
        TEST: "TEST_VALUE",
      },
      name: "Workflow setup step",
    };
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      defaultReleaseBranch: "main",
      releaseToNpm: true,
      publishTasks: true,
      workflowBootstrapSteps: [workflowBootstrapStep],
    });

    const output = synthSnapshot(project);
    const build = yaml.parse(output[".github/workflows/build.yml"]);
    const release = yaml.parse(output[".github/workflows/release.yml"]);
    expect(build.jobs.build.steps).toContainEqual(workflowBootstrapStep);
    expect(release.jobs.release.steps).toContainEqual(workflowBootstrapStep);
    expect(release.jobs.release_npm.steps).toContainEqual(
      workflowBootstrapStep
    );
  });

  test("customizations", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToGo: {
        moduleName: "github.com/foo/bar",

        gitBranch: "custom-branch",
        gitCommitMessage: "custom commit message",
        gitUserEmail: "custom@email.com",
        gitUserName: "custom user",
        githubRepo: "github.com/foo/bar",
        githubTokenSecret: "CUSTOM_SECRET",
      },
      defaultReleaseBranch: "master",
      excludeTypescript: ["src/**/test/*.ts", "src/**/__tests__/*.ts"],
    });

    const output = synthSnapshot(project);
    expect(output["package.json"].jsii.targets.go).toStrictEqual({
      moduleName: "github.com/foo/bar",
    });
    expect(output[".github/workflows/release.yml"]).toMatchSnapshot();
    expect(output["package.json"].jsii.excludeTypescript).toStrictEqual([
      "src/**/test/*.ts",
      "src/**/__tests__/*.ts",
    ]);
  });
});

describe("publish to nuget", () => {
  test("minimal options", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToNuget: {
        dotNetNamespace: "DotNet.Namespace",
        packageId: "PackageId",
      },
      defaultReleaseBranch: "master",
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    const targets = output["package.json"].jsii.targets;
    expect(targets).toStrictEqual({
      dotnet: {
        namespace: "DotNet.Namespace",
        packageId: "PackageId",
      },
    });

    expect(output[".github/workflows/release.yml"]).toMatchSnapshot();
  });
  test("all options", () => {
    const project = new JsiiProject({
      authorAddress: "https://foo.bar",
      authorUrl: "https://foo.bar",
      repositoryUrl: "https://github.com/foo/bar.git",
      author: "My Name",
      name: "testproject",
      publishToNuget: {
        dotNetNamespace: "DotNet.Namespace",
        packageId: "PackageId",
        iconUrl: "https://example.com/logo.png",
      },
      defaultReleaseBranch: "master",
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    const targets = output["package.json"].jsii.targets;
    expect(targets).toStrictEqual({
      dotnet: {
        namespace: "DotNet.Namespace",
        packageId: "PackageId",
        iconUrl: "https://example.com/logo.png",
      },
    });

    expect(output[".github/workflows/release.yml"]).toMatchSnapshot();
  });
});

describe("docgen", () => {
  test("true should just work", () => {
    const project = new JsiiProject({
      author: "My name",
      name: "testproject",
      authorAddress: "https://foo.bar",
      defaultReleaseBranch: "main",
      repositoryUrl: "https://github.com/foo/bar.git",
      docgen: true,
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    expect(
      output[".projen/tasks.json"].tasks.docgen.steps[0].exec
    ).toStrictEqual("jsii-docgen -o API.md");
  });

  test("can customize output", () => {
    const project = new JsiiProject({
      author: "My name",
      name: "testproject",
      authorAddress: "https://foo.bar",
      defaultReleaseBranch: "main",
      repositoryUrl: "https://github.com/foo/bar.git",
      docgen: true,
      docgenFilePath: "docs.md",
      publishTasks: true,
    });

    const output = synthSnapshot(project);
    expect(
      output[".projen/tasks.json"].tasks.docgen.steps[0].exec
    ).toStrictEqual("jsii-docgen -o docs.md");
  });
});

describe("compile options", () => {
  test("be default, assembly is not compressed", () => {
    const project = new JsiiProject({
      author: "My name",
      name: "testproject",
      authorAddress: "https://foo.bar",
      defaultReleaseBranch: "main",
      repositoryUrl: "https://github.com/foo/bar.git",
    });

    const output = synthSnapshot(project);
    expect(
      output[".projen/tasks.json"].tasks.compile.steps[0].exec
    ).toStrictEqual("jsii --silence-warnings=reserved-word");
  });

  test("assembly can be compressed", () => {
    const project = new JsiiProject({
      author: "My name",
      name: "testproject",
      authorAddress: "https://foo.bar",
      defaultReleaseBranch: "main",
      repositoryUrl: "https://github.com/foo/bar.git",
      compressAssembly: true,
    });

    const output = synthSnapshot(project);
    expect(
      output[".projen/tasks.json"].tasks.compile.steps[0].exec
    ).toStrictEqual(
      "jsii --silence-warnings=reserved-word --compress-assembly"
    );
  });
});

describe("language bindings", () => {
  const project = new JsiiProject({
    author: "My name",
    name: "testproject",
    authorAddress: "https://foo.bar",
    defaultReleaseBranch: "main",
    repositoryUrl: "https://github.com/foo/bar.git",
    publishToGo: { moduleName: "github.com/foo/bar" },
    publishToMaven: {
      javaPackage: "io.github.cdklabs.watchful",
      mavenGroupId: "io.github.cdklabs",
      mavenArtifactId: "cdk-watchful",
    },
    publishToNuget: {
      dotNetNamespace: "DotNet.Namespace",
      packageId: "PackageId",
    },
    publishToPypi: { distName: "dist-name", module: "module-name" },
  });

  const output = synthSnapshot(project);
  const build = yaml.parse(output[".github/workflows/build.yml"]);
  const release = yaml.parse(output[".github/workflows/release.yml"]);
  const tasks = output[".projen/tasks.json"].tasks;

  test("build workflow includes packaging jobs", () => {
    expect(Object.keys(build.jobs)).toStrictEqual([
      "build",
      "self-mutation",
      "package-js",
      "package-java",
      "package-python",
      "package-dotnet",
      "package-go",
    ]);
  });

  test.each(["js", "java", "python", "dotnet", "go"])(
    "snapshot %s",
    (language) => {
      expect(build.jobs[`package-${language}`]).toMatchSnapshot();
    }
  );

  test.each(["js", "java", "python", "dotnet", "go"])(
    "package:%s task",
    (language) => {
      expect(tasks[`package:${language}`]).toMatchSnapshot();
    }
  );

  test("package-all creates all bindings", () => {
    expect(tasks["package-all"]).toBeDefined();
    expect(tasks["package-all"]).toMatchSnapshot();
  });

  test.each(["pypi", "nuget", "npm", "maven", "golang"])(
    "release workflow includes release_%s job",
    (language) => {
      const job = release.jobs[`release_${language}`];
      expect(job).toBeDefined();
      expect(job).toMatchSnapshot();
    }
  );
});

describe("workflows use global workflowRunsOn option", () => {
  const project = new JsiiProject({
    author: "My name",
    name: "testproject",
    authorAddress: "https://foo.bar",
    defaultReleaseBranch: "main",
    repositoryUrl: "https://github.com/foo/bar.git",
    publishToGo: { moduleName: "github.com/foo/bar" },
    publishToMaven: {
      javaPackage: "io.github.cdklabs.watchful",
      mavenGroupId: "io.github.cdklabs",
      mavenArtifactId: "cdk-watchful",
    },
    publishToNuget: {
      dotNetNamespace: "DotNet.Namespace",
      packageId: "PackageId",
    },
    publishToPypi: { distName: "dist-name", module: "module-name" },
    workflowRunsOn: ["self-hosted", "linux", "x64"],
  });

  const output = synthSnapshot(project);
  const build = yaml.parse(output[".github/workflows/build.yml"]);
  const release = yaml.parse(output[".github/workflows/release.yml"]);

  const EXPECTED_RUNS_ON = ["self-hosted", "linux", "x64"];

  expect(build).toHaveProperty("jobs.build.runs-on", EXPECTED_RUNS_ON);
  expect(build).toHaveProperty("jobs.self-mutation.runs-on", EXPECTED_RUNS_ON);

  test.each(["js", "java", "python", "dotnet", "go"])(
    "snapshot %s",
    (language) => {
      expect(build).toHaveProperty(
        `jobs.package-${language}.runs-on`,
        EXPECTED_RUNS_ON
      );
    }
  );

  test.each(["pypi", "nuget", "npm", "maven", "golang"])(
    "release workflow includes release_%s job",
    (language) => {
      expect(release).toHaveProperty(
        `jobs.release_${language}.runs-on`,
        EXPECTED_RUNS_ON
      );
    }
  );
});

describe("workflows use global workflowRunsOn option - runner group extended", () => {
  const project = new JsiiProject({
    author: "My name",
    name: "testproject",
    authorAddress: "https://foo.bar",
    defaultReleaseBranch: "main",
    repositoryUrl: "https://github.com/foo/bar.git",
    publishToGo: { moduleName: "github.com/foo/bar" },
    publishToMaven: {
      javaPackage: "io.github.cdklabs.watchful",
      mavenGroupId: "io.github.cdklabs",
      mavenArtifactId: "cdk-watchful",
    },
    publishToNuget: {
      dotNetNamespace: "DotNet.Namespace",
      packageId: "PackageId",
    },
    publishToPypi: { distName: "dist-name", module: "module-name" },
    workflowRunsOnGroup: {
      group: "Default",
      labels: ["self-hosted", "linux", "x64"],
    },
    depsUpgradeOptions: {
      workflowOptions: {
        runsOnGroup: {
          group: "Default",
          labels: ["self-hosted", "linux", "x64"],
        },
      },
    },
    githubOptions: {
      pullRequestLintOptions: {
        runsOnGroup: {
          group: "Default",
          labels: ["self-hosted", "linux", "x64"],
        },
      },
    },
  });

  const output = synthSnapshot(project);
  const build = yaml.parse(output[".github/workflows/build.yml"]);
  const release = yaml.parse(output[".github/workflows/release.yml"]);
  const upgrade = yaml.parse(output[".github/workflows/upgrade-main.yml"]);
  const prLint = yaml.parse(output[".github/workflows/pull-request-lint.yml"]);

  const EXPECTED_RUNS_ON = JSON.parse(
    '{"group":"Default","labels":["self-hosted", "linux", "x64"]}'
  );

  expect(build).toHaveProperty("jobs.build.runs-on.group", "Default");
  expect(build).toHaveProperty("jobs.build.runs-on.labels", [
    "self-hosted",
    "linux",
    "x64",
  ]);
  expect(build).toHaveProperty("jobs.self-mutation.runs-on.group", "Default");
  expect(build).toHaveProperty("jobs.self-mutation.runs-on.labels", [
    "self-hosted",
    "linux",
    "x64",
  ]);

  expect(upgrade).toHaveProperty("jobs.upgrade.runs-on.group", "Default");
  expect(upgrade).toHaveProperty("jobs.upgrade.runs-on.labels", [
    "self-hosted",
    "linux",
    "x64",
  ]);
  expect(upgrade).toHaveProperty("jobs.pr.runs-on.group", "Default");
  expect(upgrade).toHaveProperty("jobs.pr.runs-on.labels", [
    "self-hosted",
    "linux",
    "x64",
  ]);

  expect(prLint).toHaveProperty("jobs.validate.runs-on.group", "Default");
  expect(prLint).toHaveProperty("jobs.validate.runs-on.labels", [
    "self-hosted",
    "linux",
    "x64",
  ]);

  test.each(["js", "java", "python", "dotnet", "go"])(
    "snapshot %s",
    (language) => {
      expect(build).toHaveProperty(
        `jobs.package-${language}.runs-on`,
        EXPECTED_RUNS_ON
      );
    }
  );

  test.each(["pypi", "nuget", "npm", "maven", "golang"])(
    "release workflow includes release_%s job",
    (language) => {
      expect(release).toHaveProperty(
        `jobs.release_${language}.runs-on`,
        EXPECTED_RUNS_ON
      );
    }
  );
});

describe("workflows use global workflowContainerImage option", () => {
  const project = new JsiiProject({
    author: "My name",
    name: "testproject",
    authorAddress: "https://foo.bar",
    defaultReleaseBranch: "main",
    repositoryUrl: "https://github.com/foo/bar.git",
    publishToGo: { moduleName: "github.com/foo/bar" },
    publishToMaven: {
      javaPackage: "io.github.cdklabs.watchful",
      mavenGroupId: "io.github.cdklabs",
      mavenArtifactId: "cdk-watchful",
    },
    publishToNuget: {
      dotNetNamespace: "DotNet.Namespace",
      packageId: "PackageId",
    },
    publishToPypi: { distName: "dist-name", module: "module-name" },
    workflowContainerImage: "node:16",
  });

  const output = synthSnapshot(project);
  const build = yaml.parse(output[".github/workflows/build.yml"]);
  const release = yaml.parse(output[".github/workflows/release.yml"]);

  const EXPECTED_CONTAINER = { image: "node:16" };

  expect(build).toHaveProperty("jobs.build.container", EXPECTED_CONTAINER);

  test.each(["js", "java", "python", "dotnet", "go"])(
    "snapshot %s",
    (language) => {
      expect(build).toHaveProperty(
        `jobs.package-${language}.container`,
        EXPECTED_CONTAINER
      );
    }
  );

  test.each(["pypi", "nuget", "npm", "maven", "golang"])(
    "release workflow includes release_%s job",
    (language) => {
      expect(release).toHaveProperty(
        `jobs.release_${language}.container`,
        EXPECTED_CONTAINER
      );
    }
  );
});

describe("release workflow use packageManager option", () => {
  const project = new JsiiProject({
    author: "My name",
    name: "testproject",
    authorAddress: "https://foo.bar",
    defaultReleaseBranch: "main",
    repositoryUrl: "https://github.com/foo/bar.git",
    publishToGo: { moduleName: "github.com/foo/bar" },
    publishToMaven: {
      javaPackage: "io.github.cdklabs.watchful",
      mavenGroupId: "io.github.cdklabs",
      mavenArtifactId: "cdk-watchful",
    },
    publishToNuget: {
      dotNetNamespace: "DotNet.Namespace",
      packageId: "PackageId",
    },
    publishToPypi: { distName: "dist-name", module: "module-name" },
    packageManager: javascript.NodePackageManager.PNPM,
  });

  const output = synthSnapshot(project);
  const release = yaml.parse(output[".github/workflows/release.yml"]);

  const EXPECTED_STEP = "pnpm/action-setup";

  test.each(["pypi", "nuget", "npm", "maven", "golang"])(
    "release workflow includes release_%s job have pnpm action setup step",
    (language) => {
      expect(release).toHaveProperty(
        `jobs.release_${language}.steps`,
        expect.arrayContaining([
          expect.objectContaining({
            uses: expect.stringContaining(EXPECTED_STEP),
          }),
        ])
      );
    }
  );
});
