import * as yaml from "yaml";
import { Component } from "../../src";
import { PROJEN_MARKER } from "../../src/common";
import { DependencyType } from "../../src/dependencies";
import { GithubCredentials } from "../../src/github";
import { secretToString } from "../../src/github/private/util";
import { JobPermission } from "../../src/github/workflows-model";
import {
  CodeArtifactAuthProvider,
  NodePackage,
  NodePackageManager,
  NodeProject,
  NodeProjectOptions,
  NpmAccess,
} from "../../src/javascript";
import { JsonFile } from "../../src/json";
import * as logging from "../../src/logging";
import { Project } from "../../src/project";
import { SampleFile } from "../../src/sample-file";
import { TaskRuntime } from "../../src/task-runtime";
import { synthSnapshot, TestProject } from "../util";

logging.disable();

test("license file is added by default", () => {
  // WHEN
  const project = new TestNodeProject();

  // THEN
  expect(synthSnapshot(project).LICENSE).toContain("Apache License");
});

test("license file is not added if licensed is false", () => {
  // WHEN
  const project = new TestNodeProject({
    licensed: false,
  });

  // THEN
  const snapshot = synthSnapshot(project);
  expect(snapshot.LICENSE).toBeUndefined();
  expect(snapshot[".gitignore"]).not.toContain("LICENSE");
  expect(snapshot["package.json"].license).toEqual("UNLICENSED");
});

describe("deps", () => {
  test("runtime deps", () => {
    // GIVEN
    const project = new TestNodeProject({
      deps: ["aaa@^1.2.3", "bbb@~4.5.6"],
    });

    // WHEN
    project.addDeps("ccc");
    project.deps.addDependency("ddd", DependencyType.RUNTIME);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.dependencies).toStrictEqual({
      aaa: "^1.2.3",
      bbb: "~4.5.6",
      ccc: "*",
      ddd: "*",
    });
    expect(pkgjson.peerDependencies).toBeUndefined();
  });

  test("dev dependencies", () => {
    // GIVEN
    const project = new TestNodeProject({
      devDeps: ["aaa@^1.2.3", "bbb@~4.5.6"],
    });

    // WHEN
    project.addDevDeps("ccc");
    project.deps.addDependency("ddd", DependencyType.TEST);
    project.deps.addDependency("eee@^1", DependencyType.DEVENV);
    project.deps.addDependency("fff@^2", DependencyType.BUILD);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.devDependencies.aaa).toStrictEqual("^1.2.3");
    expect(pkgjson.devDependencies.bbb).toStrictEqual("~4.5.6");
    expect(pkgjson.devDependencies.ccc).toStrictEqual("*");
    expect(pkgjson.devDependencies.ddd).toStrictEqual("*");
    expect(pkgjson.devDependencies.eee).toStrictEqual("^1");
    expect(pkgjson.devDependencies.fff).toStrictEqual("^2");
    expect(pkgjson.peerDependencies).toBeUndefined();
    expect(pkgjson.dependencies).toBeUndefined();
  });

  test("peerDependencies", () => {
    // GIVEN
    const project = new TestNodeProject({
      peerDeps: ["aaa@^1.2.3", "bbb@~4.5.6"],
    });

    // WHEN
    project.addPeerDeps("ccc");
    project.deps.addDependency("ddd", DependencyType.PEER);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.peerDependencies).toStrictEqual({
      aaa: "^1.2.3",
      bbb: "~4.5.6",
      ccc: "*",
      ddd: "*",
    });

    // devDependencies are added with pinned versions
    expect(pkgjson.devDependencies.aaa).toStrictEqual("1.2.3");
    expect(pkgjson.devDependencies.bbb).toStrictEqual("4.5.6");
    expect(pkgjson.devDependencies.ccc).toStrictEqual("*");
    expect(pkgjson.devDependencies.ddd).toStrictEqual("*");
    expect(pkgjson.dependencies).toBeUndefined();
  });

  test("peerDependencies without pinnedDevDep", () => {
    // GIVEN
    const project = new TestNodeProject({
      peerDependencyOptions: {
        pinnedDevDependency: false,
      },
      peerDeps: ["aaa@^1.2.3", "bbb@~4.5.6"],
    });

    // WHEN
    project.addPeerDeps("ccc");
    project.deps.addDependency("ddd", DependencyType.PEER);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.peerDependencies).toStrictEqual({
      aaa: "^1.2.3",
      bbb: "~4.5.6",
      ccc: "*",
      ddd: "*",
    });

    // sanitize
    [
      "npm-check-updates",
      "jest",
      "jest-junit",
      "projen",
      "constructs",
      "commit-and-tag-version",
    ].forEach((d) => delete pkgjson.devDependencies[d]);

    expect(pkgjson.devDependencies).toStrictEqual({});
    expect(pkgjson.dependencies).toBeUndefined();
  });

  test("devDeps are only added for peerDeps if a runtime dep does not already exist", () => {
    // GIVEN
    const project = new TestNodeProject();

    // WHEN
    project.addPeerDeps("ccc@^2");
    project.addDeps("ccc@^2.3.3");

    // THEN
    const pkgjson = packageJson(project);

    // sanitize
    [
      "npm-check-updates",
      "jest",
      "jest-junit",
      "projen",
      "constructs",
      "commit-and-tag-version",
    ].forEach((d) => delete pkgjson.devDependencies[d]);

    expect(pkgjson.peerDependencies).toStrictEqual({ ccc: "^2" });
    expect(pkgjson.dependencies).toStrictEqual({ ccc: "^2.3.3" });
    expect(pkgjson.devDependencies).toStrictEqual({});
  });

  test("bundled deps are automatically added as normal deps", () => {
    // GIVEN
    const project = new TestNodeProject({
      bundledDeps: ["hey@2.1.1"],
    });

    // WHEN
    project.addBundledDeps("foo@^1.2.3");
    project.deps.addDependency("bar@~1.0.0", DependencyType.BUNDLED);

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.dependencies).toStrictEqual({
      hey: "2.1.1",
      foo: "^1.2.3",
      bar: "~1.0.0",
    });
    expect(pkgjson.bundledDependencies).toStrictEqual(["bar", "foo", "hey"]);
  });

  test("can override projen devDep on constructs", () => {
    // GIVEN
    const project = new TestNodeProject({
      devDeps: ["constructs@^10.3.0"],
    });

    // THEN
    const pkgjson = packageJson(project);
    expect(pkgjson.devDependencies.constructs).toStrictEqual("^10.3.0");
  });
});

describe("deps upgrade", () => {
  test("throws when trying to auto approve deps but auto approve is not defined", () => {
    expect(() => {
      new TestNodeProject({ autoApproveUpgrades: true });
    }).toThrow(
      "Automatic approval of dependencies upgrades requires configuring `autoApproveOptions`"
    );
  });

  test("workflow can be auto approved", () => {
    const project = new TestNodeProject({
      autoApproveOptions: {
        allowedUsernames: ["dummy"],
        secret: "dummy",
      },
      autoApproveUpgrades: true,
    });

    const snapshot = yaml.parse(
      synthSnapshot(project)[".github/workflows/upgrade-main.yml"]
    );
    expect(snapshot.jobs.pr.steps[4].with.labels).toStrictEqual(
      project.autoApprove?.label
    );
  });

  test("commit can be signed", () => {
    const project = new TestNodeProject({
      depsUpgradeOptions: {
        signoff: true,
      },
    });

    const snapshot = yaml.parse(
      synthSnapshot(project)[".github/workflows/upgrade-main.yml"]
    );
    expect(snapshot.jobs.pr).toMatchSnapshot();
  });

  test("dependabot can be auto approved", () => {
    const project = new TestNodeProject({
      dependabot: true,
      autoApproveOptions: {
        allowedUsernames: ["dummy"],
        secret: "dummy",
      },
      autoApproveUpgrades: true,
    });

    const snapshot = yaml.parse(
      synthSnapshot(project)[".github/dependabot.yml"]
    );
    expect(snapshot.updates[0].labels).toStrictEqual(["auto-approve"]);
  });

  test("throws when dependabot is configued with depsUpgrade", () => {
    expect(() => {
      new TestNodeProject({ dependabot: true, depsUpgrade: true });
    }).toThrow("'dependabot' cannot be configured together with 'depsUpgrade'");
  });

  test("can specity nested config withtout loosing default values", () => {
    const project = new TestNodeProject({
      autoApproveUpgrades: true,
      autoApproveOptions: {
        label: "auto-approve",
        secret: "GITHUB_TOKEN",
      },
      depsUpgradeOptions: {
        workflowOptions: {
          projenCredentials: GithubCredentials.fromPersonalAccessToken({
            secret: "PROJEN_SECRET",
          }),
        },
      },
    });
    const snapshot = synthSnapshot(project);
    const upgrade = yaml.parse(snapshot[".github/workflows/upgrade-main.yml"]);

    // we expect the default auto-approve label to be applied
    expect(upgrade.jobs.pr.steps[4].with.labels).toEqual("auto-approve");
  });

  test("git identity of the upgrade workflow is customizable", () => {
    const project = new TestNodeProject({
      workflowGitIdentity: {
        name: "hey",
        email: "there@foo.com",
      },
    });

    const snapshot = synthSnapshot(project);
    const upgrade = yaml.parse(snapshot[".github/workflows/upgrade-main.yml"]);

    // we expect the default auto-approve label to be applied
    expect(upgrade.jobs.pr.steps[3]).toStrictEqual({
      name: "Set git identity",
      run: [
        'git config user.name "hey"',
        'git config user.email "there@foo.com"',
      ].join("\n"),
    });
  });
});

describe("npm publishing options", () => {
  describe("unscoped package", () => {
    test("defaults with npmProvenance enabled", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const npm = new NodePackage(project, {
        packageName: "my-package",
        npmProvenance: true,
      });

      // THEN
      expect(npm.npmAccess).toStrictEqual(NpmAccess.PUBLIC);
      expect(npm.npmRegistry).toStrictEqual("registry.npmjs.org");
      expect(npm.npmRegistryUrl).toStrictEqual("https://registry.npmjs.org/");
      expect(npm.npmTokenSecret).toStrictEqual("NPM_TOKEN");

      // npmProvenance requires publish config to be present
      expect(
        synthSnapshot(project)["package.json"].publishConfig
      ).toHaveProperty("access", "public");
    });

    test("defaults with npmProvenance disabled", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const npm = new NodePackage(project, {
        packageName: "my-package",
        npmProvenance: false,
      });

      // THEN
      expect(npm.npmAccess).toStrictEqual(NpmAccess.PUBLIC);
      expect(npm.npmRegistry).toStrictEqual("registry.npmjs.org");
      expect(npm.npmRegistryUrl).toStrictEqual("https://registry.npmjs.org/");
      expect(npm.npmTokenSecret).toStrictEqual("NPM_TOKEN");

      // without npmProvenance we don't need to render publishConfig
      expect(
        synthSnapshot(project)["package.json"].publishConfig
      ).toBeUndefined();
    });

    test("unscoped package cannot be RESTRICTED", () => {
      // GIVEN
      const project = new TestProject();

      // THEN
      expect(
        () =>
          new NodePackage(project, {
            packageName: "my-package",
            npmAccess: NpmAccess.RESTRICTED,
          })
      ).toThrow(/"npmAccess" cannot be RESTRICTED for non-scoped npm package/);
    });
  });

  describe("scoped package", () => {
    test("scoped packages default to RESTRICTED access", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const npm = new NodePackage(project, {
        packageName: "scoped@my-package",
      });

      // THEN
      expect(npm.npmAccess).toStrictEqual(NpmAccess.RESTRICTED);
      expect(npm.npmProvenance).toStrictEqual(false);

      // since these are all defaults, publishConfig is not defined.
      expect(packageJson(project).publishConfig).toBeUndefined();
    });

    test.each([[true, false]])(
      "public with npmProvenance=%s",
      (npmProvenance: boolean) => {
        // GIVEN
        const project = new TestProject();

        // WHEN
        const npm = new NodePackage(project, {
          packageName: "@projen/my-package",
          npmAccess: NpmAccess.PUBLIC,
          npmProvenance,
        });

        // THEN
        expect(npm.npmAccess).toStrictEqual(NpmAccess.PUBLIC);
        expect(npm.npmRegistry).toStrictEqual("registry.npmjs.org");
        expect(npm.npmRegistryUrl).toStrictEqual("https://registry.npmjs.org/");
        expect(npm.npmTokenSecret).toStrictEqual("NPM_TOKEN");

        // Since public is not the standard access, we always expect access to be rendered
        expect(
          synthSnapshot(project)["package.json"].publishConfig
        ).toHaveProperty("access", "public");
      }
    );

    test("custom settings", () => {
      // GIVEN
      const project = new TestProject();

      // WHEN
      const npm = new NodePackage(project, {
        packageName: "scoped@my-package",
        npmRegistryUrl: "https://foo.bar",
        npmAccess: NpmAccess.PUBLIC,
        npmTokenSecret: "GITHUB_TOKEN",
      });

      // THEN
      expect(npm.npmRegistry).toStrictEqual("foo.bar");
      expect(npm.npmRegistryUrl).toStrictEqual("https://foo.bar/");
      expect(npm.npmAccess).toStrictEqual(NpmAccess.PUBLIC);
      expect(npm.npmTokenSecret).toStrictEqual("GITHUB_TOKEN");
      expect(packageJson(project).publishConfig).toStrictEqual({
        access: "public",
        registry: "https://foo.bar/",
      });
    });
  });

  test("registry with path", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl: "https://foo.bar/path/",
    });

    // THEN
    expect(npm.npmRegistry).toStrictEqual("foo.bar/path/");
    expect(npm.npmRegistryUrl).toStrictEqual("https://foo.bar/path/");
    expect(packageJson(project).publishConfig).toHaveProperty(
      "registry",
      "https://foo.bar/path/"
    );
  });

  test("AWS CodeArtifact registry with default authProvider", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
    });

    // THEN
    expect(npm.npmRegistry).toStrictEqual(
      "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/"
    );
    expect(npm.npmRegistryUrl).toStrictEqual(
      "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/"
    );
    expect(packageJson(project).publishConfig).toHaveProperty(
      "registry",
      "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/"
    );
    expect(npm.codeArtifactOptions?.accessKeyIdSecret).toStrictEqual(
      "AWS_ACCESS_KEY_ID"
    );
    expect(npm.codeArtifactOptions?.secretAccessKeySecret).toStrictEqual(
      "AWS_SECRET_ACCESS_KEY"
    );
  });

  test("AWS CodeArtifact registry with explicit access/secret key pair authProvider", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
    });

    // THEN
    expect(npm.npmRegistry).toStrictEqual(
      "my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/"
    );
    expect(npm.npmRegistryUrl).toStrictEqual(
      "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/"
    );
    expect(packageJson(project).publishConfig).toHaveProperty(
      "registry",
      "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/"
    );
    expect(npm.codeArtifactOptions?.accessKeyIdSecret).toStrictEqual(
      "AWS_ACCESS_KEY_ID"
    );
    expect(npm.codeArtifactOptions?.secretAccessKeySecret).toStrictEqual(
      "AWS_SECRET_ACCESS_KEY"
    );
  });

  test("AWS CodeArtifact registry custom access/secret key values with default authProvider", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        accessKeyIdSecret: "OTHER_AWS_ACCESS_KEY_ID",
        secretAccessKeySecret: "OTHER_AWS_SECRET_ACCESS_KEY",
      },
    });

    // THEN
    expect(npm.codeArtifactOptions?.authProvider).toStrictEqual(
      CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR
    );
    expect(npm.codeArtifactOptions?.accessKeyIdSecret).toStrictEqual(
      "OTHER_AWS_ACCESS_KEY_ID"
    );
    expect(npm.codeArtifactOptions?.secretAccessKeySecret).toStrictEqual(
      "OTHER_AWS_SECRET_ACCESS_KEY"
    );
  });

  test("AWS CodeArtifact registry custom access/secret key values with explicit access/secret key authProvider", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        authProvider: CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR,
        accessKeyIdSecret: "OTHER_AWS_ACCESS_KEY_ID",
        secretAccessKeySecret: "OTHER_AWS_SECRET_ACCESS_KEY",
      },
    });

    // THEN
    expect(npm.codeArtifactOptions?.authProvider).toStrictEqual(
      CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR
    );
    expect(npm.codeArtifactOptions?.accessKeyIdSecret).toStrictEqual(
      "OTHER_AWS_ACCESS_KEY_ID"
    );
    expect(npm.codeArtifactOptions?.secretAccessKeySecret).toStrictEqual(
      "OTHER_AWS_SECRET_ACCESS_KEY"
    );
  });

  test("throw when 'npmTokenSecret' is used with AWS CodeArtifact", () => {
    // GIVEN
    const project = new TestProject();

    // THEN
    expect(() => {
      new NodePackage(project, {
        npmRegistryUrl:
          "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
        npmTokenSecret: "INVALID_VALUE",
      });
    }).toThrow(
      '"npmTokenSecret" must not be specified when publishing AWS CodeArtifact.'
    );
  });

  test("throw when 'codeArtifactOptions.accessKeyIdSecret' or 'codeArtifactOptions.secretAccessKeySecret' is used without AWS CodeArtifact", () => {
    // GIVEN
    const project = new TestProject();

    // THEN
    expect(() => {
      new NodePackage(project, {
        codeArtifactOptions: {
          accessKeyIdSecret: "INVALID_AWS_ACCESS_KEY_ID",
        },
      });
    }).toThrow(
      "codeArtifactOptions must only be specified when publishing AWS CodeArtifact or used in scoped packages."
    );
    expect(() => {
      new NodePackage(project, {
        codeArtifactOptions: {
          secretAccessKeySecret: "INVALID_AWS_SECRET_ACCESS_KEY",
        },
      });
    }).toThrow(
      "codeArtifactOptions must only be specified when publishing AWS CodeArtifact or used in scoped packages."
    );
  });

  test("AWS CodeArtifact registry role to assume", () => {
    // GIVEN
    const project = new TestProject();
    const roleArn = "role-arn";

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        roleToAssume: roleArn,
      },
    });

    // THEN
    expect(npm.codeArtifactOptions?.authProvider).toStrictEqual(
      CodeArtifactAuthProvider.ACCESS_AND_SECRET_KEY_PAIR
    );
    expect(npm.codeArtifactOptions?.roleToAssume).toStrictEqual(roleArn);
  });

  test("AWS CodeArtifact registry with Github OIDC auth", () => {
    // GIVEN
    const project = new TestProject();
    const roleArn = "role-arn";

    // WHEN
    const npm = new NodePackage(project, {
      npmRegistryUrl:
        "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
      codeArtifactOptions: {
        authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
        roleToAssume: roleArn,
      },
    });

    // THEN
    expect(npm.codeArtifactOptions?.authProvider).toStrictEqual(
      CodeArtifactAuthProvider.GITHUB_OIDC
    );
    expect(npm.codeArtifactOptions?.roleToAssume).toStrictEqual(roleArn);
    expect(npm.codeArtifactOptions?.accessKeyIdSecret).toBeUndefined();
    expect(npm.codeArtifactOptions?.secretAccessKeySecret).toBeUndefined();
  });

  test("throw when 'codeArtifactOptions.accessKeyIdSecret' or 'codeArtifactOptions.secretAccessKeySecret' is used with Github OIDC auth provider for AWS CodeArtifact", () => {
    // GIVEN
    const project = new TestProject();

    // THEN
    expect(() => {
      new NodePackage(project, {
        npmRegistryUrl:
          "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
        codeArtifactOptions: {
          authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
          accessKeyIdSecret: "INVALID_AWS_ACCESS_KEY_ID",
          secretAccessKeySecret: "INVALID_AWS_SECRET_ACCESS_KEY",
        },
      });
    }).toThrow(
      "access and secret key pair should not be provided when using GITHUB_OIDC auth provider for AWS CodeArtifact"
    );
  });

  test("throw when 'codeArtifactOptions.roleToAssume' not defined when using Github OIDC auth provider for AWS CodeArtifact", () => {
    // GIVEN
    const project = new TestProject();

    // THEN
    expect(() => {
      new NodePackage(project, {
        npmRegistryUrl:
          "https://my-domain-111122223333.d.codeartifact.us-west-2.amazonaws.com/npm/my_repo/",
        codeArtifactOptions: {
          authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
        },
      });
    }).toThrow(
      '"roleToAssume" property is required when using GITHUB_OIDC for AWS CodeArtifact options'
    );
  });

  test("deprecated npmRegistry can be used instead of npmRegistryUrl and then https:// is assumed", () => {
    // GIVEN
    const project = new TestProject();

    // WHEN
    const npm = new NodePackage(project, {
      packageName: "scoped@my-package",
      npmRegistry: "foo.bar.com",
    });

    // THEN
    expect(npm.npmRegistry).toStrictEqual("foo.bar.com");
    expect(npm.npmRegistryUrl).toStrictEqual("https://foo.bar.com/");
    expect(packageJson(project).publishConfig).toStrictEqual({
      registry: "https://foo.bar.com/",
    });
  });
});

test("extend github release workflow", () => {
  const project = new TestNodeProject();

  project.release?.addJobs({
    publish_docker_hub: {
      permissions: {
        contents: JobPermission.READ,
      },
      runsOn: ["ubuntu-latest"],
      env: {
        CI: "true",
      },
      steps: [
        {
          name: "Check out the repo",
          uses: "actions/checkout@v4",
        },
        {
          name: "Push to Docker Hub",
          uses: "docker/build-push-action@v1",
          with: {
            username: "${{ secrets.DOCKER_USERNAME }}",
            password: "${{ secrets.DOCKER_PASSWORD }}",
            repository: "projen/projen-docker",
            tag_with_ref: "true",
          },
        },
      ],
    },
  });

  const workflow = synthSnapshot(project)[".github/workflows/release.yml"];
  expect(workflow).toContain(
    "publish_docker_hub:\n    runs-on: ubuntu-latest\n"
  );
  expect(workflow).toContain(
    "username: ${{ secrets.DOCKER_USERNAME }}\n          password: ${{ secrets.DOCKER_PASSWORD }}"
  );
});

test("codecov upload added to github release workflow", () => {
  const project = new TestNodeProject({
    codeCov: true,
  });

  const workflow = synthSnapshot(project)[".github/workflows/release.yml"];
  expect(workflow).toContain("uses: codecov/codecov-action@v4");
});

test("codecov upload not added to github release workflow", () => {
  const project = new TestNodeProject({
    codeCov: false,
  });

  const workflow = synthSnapshot(project)[".github/workflows/release.yml"];
  expect(workflow).not.toContain("uses: codecov/codecov-action@v4");
});

describe("scripts", () => {
  test("addTask and setScript", () => {
    const p = new TestNodeProject();
    p.addTask("chortle", { exec: 'echo "frabjous day!"' });
    p.setScript("slithy-toves", "gyre && gimble");
    const pkg = packageJson(p);
    expect(pkg.scripts).toHaveProperty("chortle");
    expect(pkg.scripts).toHaveProperty("slithy-toves");
  });

  test("removeScript will remove tasks and scripts", () => {
    const p = new TestNodeProject();

    p.addTask("chortle", { exec: 'echo "frabjous day!"' });
    p.setScript("slithy-toves", "gyre && gimble");
    p.removeScript("chortle");
    p.removeScript("slithy-toves");
    const pkg = packageJson(p);
    expect(pkg.scripts).not.toHaveProperty("chortle");
    expect(pkg.scripts).not.toHaveProperty("slithy-toves");
  });

  test("addScripts will add multiple scripts", () => {
    const p = new TestNodeProject();

    p.addScripts({
      "slithy-toves": "gyre && gimble",
      chortle: 'echo "frabjous day!"',
    });
    const pkg = packageJson(p);
    expect(pkg.scripts).toHaveProperty("slithy-toves");
    expect(pkg.scripts).toHaveProperty("chortle");
  });
});

test("mutableBuild will push changes to PR branches", () => {
  // WHEN
  const project = new TestNodeProject({
    buildWorkflowOptions: { mutableBuild: true },
  });

  // THEN
  const workflowYaml = synthSnapshot(project)[".github/workflows/build.yml"];
  const workflow = yaml.parse(workflowYaml);
  expect(workflow.jobs.build.steps).toMatchSnapshot();
  expect(Object.keys(workflow.jobs)).toContain("self-mutation");
  expect(workflow.jobs["self-mutation"].steps).toMatchSnapshot();
});

test("disabling mutableBuild will skip pushing changes to PR branches", () => {
  // WHEN
  const project = new TestNodeProject({
    buildWorkflowOptions: { mutableBuild: false },
  });

  // THEN
  const workflowYaml = synthSnapshot(project)[".github/workflows/build.yml"];
  const workflow = yaml.parse(workflowYaml);
  expect(workflow.jobs.build.steps).toMatchSnapshot();
  expect(Object.keys(workflow.jobs)).not.toContain("self-mutation");
});

test("provided preBuildSteps for build workflow get combined with setup steps", () => {
  // WHEN
  const project = new TestNodeProject({
    buildWorkflowOptions: {
      preBuildSteps: [{ name: "hello", run: "echo hello" }],
    },
  });

  // THEN
  const workflowYaml = synthSnapshot(project)[".github/workflows/build.yml"];
  const workflow = yaml.parse(workflowYaml);
  expect(workflow.jobs.build.steps).toMatchSnapshot();
  expect(workflow.jobs.build.steps[0]?.name).toEqual("Checkout");
  expect(workflow.jobs.build.steps[1]?.name).toEqual("Install dependencies");
  expect(workflow.jobs.build.steps[2]?.name).toEqual("hello");
});

test("projen synth is only executed for subprojects", () => {
  // GIVEN
  const root = new TestNodeProject();

  // WHEN
  new TestNodeProject({ parent: root, outdir: "child" });

  // THEN
  const snapshot = synthSnapshot(root);
  const rootBuildTask = snapshot[".projen/tasks.json"].tasks.build;
  const childBuildTask = snapshot["child/.projen/tasks.json"].tasks.build;
  expect(rootBuildTask).toStrictEqual({
    description: "Full release build",
    name: "build",
    steps: [
      { spawn: "default" },
      { spawn: "pre-compile" },
      { spawn: "compile" },
      { spawn: "post-compile" },
      { spawn: "test" },
      { spawn: "package" },
    ],
  });
  expect(childBuildTask).toStrictEqual({
    description: "Full release build",
    name: "build",
    steps: [
      { spawn: "pre-compile" },
      { spawn: "compile" },
      { spawn: "post-compile" },
      { spawn: "test" },
      { spawn: "package" },
    ],
  });
});

test("javascript subprojects do not add a Projenrc component", () => {
  // GIVEN
  const root = new TestNodeProject();

  // WHEN
  const child = new TestNodeProject({ parent: root, outdir: "child" });

  // THEN
  const rcFiles = child.components.filter((o: Component) =>
    o.constructor.name.toLowerCase().includes("projenrc")
  );
  expect(rcFiles.length).toBe(0);
});

test("enabling dependabot does not overturn mergify: false", () => {
  // WHEN
  const project = new TestNodeProject({
    dependabot: true,
    mergify: false,
  });

  // THEN
  const snapshot = synthSnapshot(project);
  // Note: brackets important, they prevent "." in filenames to be interpreted
  //       as JSON object path delimiters.
  expect(snapshot).not.toHaveProperty([".mergify.yml"]);
  expect(snapshot).toHaveProperty([".github/dependabot.yml"]);
});

test("enabling renovatebot does not overturn mergify: false", () => {
  // WHEN
  const project = new TestNodeProject({
    renovatebot: true,
    mergify: false,
  });

  // THEN
  const snapshot = synthSnapshot(project);
  // Note: brackets important, they prevent "." in filenames to be interpreted
  //       as JSON object path delimiters.
  expect(snapshot).not.toHaveProperty([".mergify.yml"]);
  expect(snapshot).toHaveProperty(["renovate.json5"]);
  expect(snapshot["renovate.json5"].ignoreDeps).toMatchObject([
    "commit-and-tag-version",
    "constructs",
    "jest-junit",
    "projen",
  ]);
  expect(snapshot["renovate.json5"]).toMatchSnapshot();
});

test("renovatebot ignored dependency overrides", () => {
  // WHEN
  const project = new TestNodeProject({
    renovatebot: true,
    mergify: false,
  });

  project.package.addPackageResolutions(
    "axios",
    "some-overriden-package@1.0.0"
  );

  // THEN
  const snapshot = synthSnapshot(project);
  // Note: brackets important, they prevent "." in filenames to be interpreted
  //       as JSON object path delimiters.
  expect(snapshot).toHaveProperty(["renovate.json5"]);
  expect(snapshot["renovate.json5"].ignoreDeps).toMatchObject([
    "commit-and-tag-version",
    "constructs",
    "jest-junit",
    "axios",
    "some-overriden-package",
    "projen",
  ]);
  expect(snapshot["renovate.json5"]).toMatchSnapshot();
});

test("github: false disables github integration", () => {
  // WHEN
  const project = new TestNodeProject({
    github: false,
    autoApproveUpgrades: true,
    autoApproveOptions: {},
  });

  // THEN
  const output = synthSnapshot(project);
  expect(
    Object.keys(output).filter((p) => p.startsWith(".github/"))
  ).toStrictEqual([]);
});

test("githubOptions.workflows:false disables github workflows but not github integration", () => {
  // WHEN
  const project = new TestNodeProject({
    githubOptions: {
      workflows: false,
    },
  });

  // THEN
  const output = synthSnapshot(project);
  expect(
    Object.keys(output).filter((p) => p.startsWith(".github/"))
  ).toStrictEqual([".github/pull_request_template.md"]);
});

test("using GitHub npm registry will default npm secret to GITHUB_TOKEN", () => {
  // GIVEN
  const project = new TestNodeProject({
    npmRegistryUrl: "https://npm.pkg.github.com",
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".github/workflows/release.yml"]).not.toMatch("NPM_TOKEN");
});

function packageJson(project: Project) {
  return synthSnapshot(project)["package.json"];
}

test("buildWorkflow can use GitHub App for API access", () => {
  // GIVEN
  const appId = "APP_ID";
  const privateKey = "PRIVATE_KEY";
  const project = new TestNodeProject({
    githubOptions: {
      projenCredentials: GithubCredentials.fromApp({
        appIdSecret: appId,
        privateKeySecret: privateKey,
      }),
    },
  });

  // THEN
  const output = synthSnapshot(project);
  const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
  expect(buildWorkflow.jobs["self-mutation"].steps[0]).toMatchObject({
    name: "Generate token",
    with: {
      app_id: `\${{ secrets.${appId} }}`,
      private_key: `\${{ secrets.${privateKey} }}`,
    },
  });
  expect(buildWorkflow.jobs["self-mutation"].steps[1]).toMatchObject({
    name: "Checkout",
    with: {
      token: "${{ steps.generate_token.outputs.token }}",
    },
  });
});

test("workflowGitIdentity can be used to customize the git identity used in build workflows", () => {
  // GIVEN
  const project = new TestNodeProject({
    workflowGitIdentity: {
      name: "heya",
      email: "there@z.com",
    },
  });

  // THEN
  const output = synthSnapshot(project);
  const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
  expect(buildWorkflow.jobs["self-mutation"].steps[3]).toStrictEqual({
    name: "Set git identity",
    run: [
      'git config user.name "heya"',
      'git config user.email "there@z.com"',
    ].join("\n"),
  });
});

describe("Setup bun", () => {
  const setupBunIndex = (job: any) =>
    job.steps.findIndex((step: any) => step.name === "Setup bun");
  const setupNodeIndex = (job: any) =>
    job.steps.findIndex((step: any) => step.name === "Setup Node.js");

  test("Setup bun should not run without bun selected as the package manager", () => {
    // WHEN
    const options = {};

    const project = new TestNodeProject(options);

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(setupBunIndex(buildWorkflow.jobs.build)).toEqual(-1);
    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(setupBunIndex(releaseWorkflow.jobs.release)).toEqual(-1);
    const upgradeWorkflow = yaml.parse(
      output[".github/workflows/upgrade-main.yml"]
    );
    expect(setupBunIndex(upgradeWorkflow.jobs.upgrade)).toEqual(-1);
  });

  test("Setup Node.js should not be used if bun is selected as the package manager", () => {
    // WHEN
    const options = {
      workflowPackageCache: true,
      packageManager: NodePackageManager.BUN,
    };

    const project = new TestNodeProject(options);

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(setupBunIndex(buildWorkflow.jobs.build)).toBeGreaterThanOrEqual(0);
    expect(setupNodeIndex(buildWorkflow.jobs.build)).toEqual(-1);

    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(setupBunIndex(releaseWorkflow.jobs.release)).toBeGreaterThanOrEqual(
      0
    );
    expect(setupNodeIndex(releaseWorkflow.jobs.release)).toEqual(-1);

    const upgradeWorkflow = yaml.parse(
      output[".github/workflows/upgrade-main.yml"]
    );
    expect(setupBunIndex(upgradeWorkflow.jobs.upgrade)).toBeGreaterThanOrEqual(
      0
    );
    expect(setupNodeIndex(upgradeWorkflow.jobs.upgrade)).toEqual(-1);
  });
});

describe("Setup pnpm", () => {
  const setupPnpmIndex = (job: any) =>
    job.steps.findIndex((step: any) => step.name === "Setup pnpm");
  const setupNodeIndex = (job: any) =>
    job.steps.findIndex((step: any) => step.name === "Setup Node.js");

  test("Setup pnpm should not run without pnpm option", () => {
    // WHEN
    const options = {};
    const project = new TestNodeProject(options);

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(setupPnpmIndex(buildWorkflow.jobs.build)).toEqual(-1);
    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(setupPnpmIndex(releaseWorkflow.jobs.release)).toEqual(-1);
    const upgradeWorkflow = yaml.parse(
      output[".github/workflows/upgrade-main.yml"]
    );
    expect(setupPnpmIndex(upgradeWorkflow.jobs.upgrade)).toEqual(-1);
  });

  test("Setup pnpm should run before Setup Node.js", () => {
    // WHEN
    const options = {
      workflowPackageCache: true,
      packageManager: NodePackageManager.PNPM,
    };
    const project = new TestNodeProject(options);

    // THEN
    const output = synthSnapshot(project);
    const buildJob = yaml.parse(output[".github/workflows/build.yml"]).jobs
      .build;
    expect(setupPnpmIndex(buildJob)).toBeGreaterThanOrEqual(0);
    expect(setupPnpmIndex(buildJob)).toBeLessThan(setupNodeIndex(buildJob));
    const releaseJob = yaml.parse(output[".github/workflows/release.yml"]).jobs
      .release;
    expect(setupPnpmIndex(releaseJob)).toBeGreaterThanOrEqual(0);
    expect(setupPnpmIndex(releaseJob)).toBeLessThan(setupNodeIndex(releaseJob));
    const upgradeJob = yaml.parse(output[".github/workflows/upgrade-main.yml"])
      .jobs.upgrade;
    expect(setupPnpmIndex(upgradeJob)).toBeGreaterThanOrEqual(0);
    expect(setupPnpmIndex(upgradeJob)).toBeLessThan(setupNodeIndex(upgradeJob));
  });
});

describe("workflowPackageCache", () => {
  const cache = (job: any) =>
    job.steps.find((step: any) => step.name === "Setup Node.js")?.with?.cache;

  test.each([
    { name: "default to false", options: {}, expected: undefined },
    {
      name: "only nodeVersion to be disabled",
      options: { workflowNodeVersion: "18" },
      expected: undefined,
    },
    {
      name: "npm to be enabled",
      options: {
        workflowPackageCache: true,
        packageManager: NodePackageManager.NPM,
      },
      expected: "npm",
    },
    {
      name: "yarn to be enabled",
      options: {
        workflowPackageCache: true,
        packageManager: NodePackageManager.YARN_CLASSIC,
      },
      expected: "yarn",
    },
    {
      name: "yarn berry to be enabled",
      options: {
        workflowPackageCache: true,
        packageManager: NodePackageManager.YARN_BERRY,
      },
      expected: "yarn",
    },
    {
      name: "pnpm to be enabled",
      options: {
        workflowPackageCache: true,
        packageManager: NodePackageManager.PNPM,
      },
      expected: "pnpm",
    },
  ])("$name", ({ options, expected }) => {
    // WHEN
    const project = new TestNodeProject(options);

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(cache(buildWorkflow.jobs.build)).toEqual(expected);
    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(cache(releaseWorkflow.jobs.release)).toEqual(expected);
    const upgradeWorkflow = yaml.parse(
      output[".github/workflows/upgrade-main.yml"]
    );
    expect(cache(upgradeWorkflow.jobs.upgrade)).toEqual(expected);
  });
});

describe("workflowRunsOn", () => {
  test("default to ubuntu-latest", () => {
    // WHEN
    const project = new TestNodeProject();

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build["runs-on"]).toEqual("ubuntu-latest");
    expect(buildWorkflow.jobs["self-mutation"]["runs-on"]).toEqual(
      "ubuntu-latest"
    );
  });

  test("use github runner specified in workflowRunsOn", () => {
    // WHEN
    const project = new TestNodeProject({
      workflowRunsOn: ["self-hosted"],
    });

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.jobs.build["runs-on"]).toEqual("self-hosted");
    expect(buildWorkflow.jobs["self-mutation"]["runs-on"]).toEqual(
      "self-hosted"
    );
  });

  test("use github runner group specified in workflowRunsOn", () => {
    // WHEN
    const project = new TestNodeProject({
      workflowRunsOnGroup: {
        group: "Default",
        labels: ["self-hosted", "linux", "x64"],
      },
    });

    // THEN
    const output = synthSnapshot(project);
    const build = yaml.parse(output[".github/workflows/build.yml"]);

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
  });
});

describe("buildWorkflowTriggers", () => {
  test("default to pull request and workflow dispatch", () => {
    // WHEN
    const project = new TestNodeProject();

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.on).toEqual({
      pull_request: {},
      workflow_dispatch: {},
      merge_group: {},
    });
  });

  test("use custom triggers in build workflow", () => {
    // WHEN
    const project = new TestNodeProject({
      buildWorkflowOptions: {
        workflowTriggers: {
          push: {
            branches: ["feature/*"],
          },
        },
      },
    });

    // THEN
    const output = synthSnapshot(project);
    const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
    expect(buildWorkflow.on).toEqual({
      merge_group: {},
      push: {
        branches: ["feature/*"],
      },
    });
  });
});

test("post-upgrade workflow", () => {
  // GIVEN
  const project = new TestNodeProject();

  // THEN
  const snapshot = synthSnapshot(project);
  const tasks = snapshot[TaskRuntime.MANIFEST_FILE].tasks;
  expect(tasks.upgrade.steps[tasks.upgrade.steps.length - 1]).toStrictEqual({
    spawn: "post-upgrade",
  });
});

test("node project can be ejected", () => {
  // GIVEN
  // equivalent to running "eject" task - needs to be enabled at construction time
  process.env.PROJEN_EJECTING = "true";

  // WHEN
  const p = new TestNodeProject();
  p.deps.addDependency("test", DependencyType.BUILD);
  new JsonFile(p, "foo/bar.json", { obj: { hello: "world!" } });
  new SampleFile(p, "sample.txt", {
    contents: "the file",
  });

  // THEN
  const outdir = synthSnapshot(p);
  expect(outdir["package.json"]).toMatchSnapshot();
  expect(outdir["package.json"]).not.toContain(PROJEN_MARKER);
  expect(outdir["package.json"]["//"]).toBeUndefined();
  expect(outdir["package.json"].scripts.eject).toBeUndefined();
  expect(outdir["package.json"].scripts.default).toBeUndefined();
  expect(outdir["package.json"].devDependencies.projen).toBeUndefined();
  expect(outdir["scripts/run-task"]).toBeDefined();
  expect(outdir["foo/bar.json"]).not.toContain(PROJEN_MARKER);
  expect(outdir["sample.txt"]).not.toContain(PROJEN_MARKER);
  expect(outdir[".projenrc.js"]).toBeUndefined();
  expect(outdir[".projen/deps.json"]).toBeUndefined();
  expect(outdir[".projen/files.json"]).toBeUndefined();
});

class TestNodeProject extends NodeProject {
  constructor(options: Partial<NodeProjectOptions> = {}) {
    super({
      name: "test-node-project",
      defaultReleaseBranch: "main",
      ...options,
    });
  }
}

describe("scoped private packages", () => {
  const accountId = "123456789012";
  const domain = "my-domain";
  const region = "my-region-1";
  const repository = "MyRepository";
  const scope = "@stub-scope";
  const defaultAccessKeyIdSecret = "AWS_ACCESS_KEY_ID";
  const defaultSecretAccessKeySecret = "AWS_SECRET_ACCESS_KEY";
  const roleToAssume = `stub-role-to-assume`;
  const registry = `${domain}-${accountId}.d.codeartifact.${region}.amazonaws.com/npm/${repository}/`;
  const registryUrl = `https://${registry}`;

  describe("Auth Provider ACCESS_AND_SECRET_KEY_PAIR", () => {
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
    });
    const output = synthSnapshot(project);

    test("adds AWS Code Artifact Login step prior to install to build workflow", () => {
      const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
      expect(buildWorkflow.jobs.build.steps).toEqual(
        expect.arrayContaining([
          {
            name: "AWS CodeArtifact Login",
            run: "yarn run ca:login",
            env: {
              AWS_ACCESS_KEY_ID: secretToString(defaultAccessKeyIdSecret),
              AWS_SECRET_ACCESS_KEY: secretToString(
                defaultSecretAccessKeySecret
              ),
            },
          },
          { name: "Install dependencies", run: "yarn install --check-files" },
        ])
      );
    });

    test("does not add id-token permission to build workflow", () => {
      const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
      expect(Object.keys(buildWorkflow.jobs.build.permissions)).not.toContain(
        "id-token"
      );
    });

    test("adds AWS Code Artifact Login step prior to install to release workflow", () => {
      const releaseWorkflow = yaml.parse(
        output[".github/workflows/release.yml"]
      );
      expect(releaseWorkflow.jobs.release.steps).toEqual(
        expect.arrayContaining([
          {
            name: "AWS CodeArtifact Login",
            run: "yarn run ca:login",
            env: {
              AWS_ACCESS_KEY_ID: secretToString(defaultAccessKeyIdSecret),
              AWS_SECRET_ACCESS_KEY: secretToString(
                defaultSecretAccessKeySecret
              ),
            },
          },
          {
            name: "Install dependencies",
            run: "yarn install --check-files --frozen-lockfile",
          },
        ])
      );
    });

    test("does not add id-token permission to release workflow", () => {
      const workflow = yaml.parse(output[".github/workflows/release.yml"]);
      expect(Object.keys(workflow.jobs.release.permissions)).not.toContain(
        "id-token"
      );
    });

    test("does not add id-token permission to upgrade workflow", () => {
      const workflow = yaml.parse(output[".github/workflows/upgrade-main.yml"]);
      expect(Object.keys(workflow.jobs.upgrade.permissions)).not.toContain(
        "id-token"
      );
    });
  });

  describe("Auth Provider GITHUB_OIDC", () => {
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
      codeArtifactOptions: {
        authProvider: CodeArtifactAuthProvider.GITHUB_OIDC,
        roleToAssume,
      },
    });
    const output = synthSnapshot(project);

    test("adds AWS Code Artifact Login step prior to install to build workflow", () => {
      const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
      expect(buildWorkflow.jobs.build.steps).toEqual(
        expect.arrayContaining([
          {
            name: "Configure AWS Credentials",
            uses: "aws-actions/configure-aws-credentials@v4",
            with: {
              "aws-region": "us-east-2",
              "role-to-assume": roleToAssume,
              "role-duration-seconds": 900,
            },
          },
          {
            name: "AWS CodeArtifact Login",
            run: "yarn run ca:login",
          },
          {
            name: "Install dependencies",
            run: "yarn install --check-files",
          },
        ])
      );
    });

    test("adds id-token permission to build workflow", () => {
      const buildWorkflow = yaml.parse(output[".github/workflows/build.yml"]);
      expect(buildWorkflow.jobs.build.permissions).toEqual(
        expect.objectContaining({
          "id-token": "write",
        })
      );
    });

    test("adds AWS Code Artifact Login step prior to install to release workflow", () => {
      const releaseWorkflow = yaml.parse(
        output[".github/workflows/release.yml"]
      );
      expect(releaseWorkflow.jobs.release.steps).toEqual(
        expect.arrayContaining([
          {
            name: "Configure AWS Credentials",
            uses: "aws-actions/configure-aws-credentials@v4",
            with: {
              "aws-region": "us-east-2",
              "role-to-assume": roleToAssume,
              "role-duration-seconds": 900,
            },
          },
          {
            name: "AWS CodeArtifact Login",
            run: "yarn run ca:login",
          },
          {
            name: "Install dependencies",
            run: "yarn install --check-files --frozen-lockfile",
          },
        ])
      );
    });

    test("adds id-token permission to release workflow", () => {
      const workflow = yaml.parse(output[".github/workflows/release.yml"]);
      expect(workflow.jobs.release.permissions).toEqual(
        expect.objectContaining({
          "id-token": "write",
        })
      );
    });

    test("adds id-token permission to upgrade workflow", () => {
      const workflow = yaml.parse(output[".github/workflows/upgrade-main.yml"]);
      expect(workflow.jobs.upgrade.permissions).toEqual(
        expect.objectContaining({
          "id-token": "write",
          contents: "read",
        })
      );
    });
  });

  test("adds AWS Code Artifact Login step prior to install to workflow when multiple scoped packages defined", () => {
    const accountId2 = "123456789013";
    const domain2 = "my-domain-2";
    const region2 = "my-region-2";
    const repository2 = "MyRepository2";
    const scope2 = "@stub-scope-2";
    const registryUrl2 = `https://${domain2}-${accountId2}.d.codeartifact.${region2}.amazonaws.com/npm/${repository2}/`;
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
        {
          registryUrl: registryUrl2,
          scope: scope2,
        },
      ],
    });
    const output = synthSnapshot(project);
    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(releaseWorkflow.jobs.release.steps).toEqual(
      expect.arrayContaining([
        {
          name: "AWS CodeArtifact Login",
          run: "yarn run ca:login",
          env: {
            AWS_ACCESS_KEY_ID: secretToString(defaultAccessKeyIdSecret),
            AWS_SECRET_ACCESS_KEY: secretToString(defaultSecretAccessKeySecret),
          },
        },
        {
          name: "Install dependencies",
          run: "yarn install --check-files --frozen-lockfile",
        },
      ])
    );
  });

  test("adds specified AWS secrets and Code Artifact Login step prior to install to workflow", () => {
    const accessKeyIdSecret = "stub-access-key-id";
    const secretAccessKeySecret = "stub-secret-access-key";
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
      codeArtifactOptions: {
        accessKeyIdSecret,
        secretAccessKeySecret,
      },
    });
    const output = synthSnapshot(project);
    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(releaseWorkflow.jobs.release.steps).toEqual(
      expect.arrayContaining([
        {
          name: "AWS CodeArtifact Login",
          run: "yarn run ca:login",
          env: {
            AWS_ACCESS_KEY_ID: secretToString(accessKeyIdSecret),
            AWS_SECRET_ACCESS_KEY: secretToString(secretAccessKeySecret),
          },
        },
        {
          name: "Install dependencies",
          run: "yarn install --check-files --frozen-lockfile",
        },
      ])
    );
  });

  test("adds AWS assume role and Code Artifact Login step prior to install to workflow", () => {
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
      codeArtifactOptions: {
        roleToAssume,
      },
    });
    const output = synthSnapshot(project);
    const releaseWorkflow = yaml.parse(output[".github/workflows/release.yml"]);
    expect(releaseWorkflow.jobs.release.steps).toEqual(
      expect.arrayContaining([
        {
          name: "Configure AWS Credentials",
          uses: "aws-actions/configure-aws-credentials@v4",
          with: {
            "aws-access-key-id": secretToString(defaultAccessKeyIdSecret),
            "aws-secret-access-key": secretToString(
              defaultSecretAccessKeySecret
            ),
            "aws-region": "us-east-2",
            "role-to-assume": roleToAssume,
            "role-duration-seconds": 900,
          },
        },
        {
          name: "AWS CodeArtifact Login",
          run: "yarn run ca:login",
        },
        {
          name: "Install dependencies",
          run: "yarn install --check-files --frozen-lockfile",
        },
      ])
    );
  });

  test("throws error if scope is invalid", () => {
    const anotherScope = "another-scope";
    expect(
      () =>
        new TestNodeProject({
          scopedPackagesOptions: [
            {
              registryUrl,
              scope: anotherScope,
            },
          ],
        })
    ).toThrow(`Scope must start with "@" in options, found ${anotherScope}`);
  });

  test("throws error if registryUrl is invalid", () => {
    expect(
      () =>
        new TestNodeProject({
          scopedPackagesOptions: [
            {
              registryUrl: `https://${accountId}.d.codeartifact.${region}.amazonaws.com/npm/${repository}/`,
              scope,
            },
          ],
        })
    ).toThrow("Could not get CodeArtifact details from npm Registry");
  });

  test("adds ca:login script when single scoped package defined", () => {
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
    });
    const output = synthSnapshot(project);

    const tasks = output[TaskRuntime.MANIFEST_FILE].tasks;
    expect(tasks["ca:login"]).toEqual({
      name: "ca:login",
      requiredEnv: ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"],
      steps: [
        {
          exec: "which aws",
        },
        {
          exec: `npm config set ${scope}:registry ${registryUrl}; CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain ${domain} --region ${region} --domain-owner ${accountId} --query authorizationToken --output text); npm config set //${registry}:_authToken=$CODEARTIFACT_AUTH_TOKEN; npm config set //${registry}:always-auth=true`,
        },
      ],
    });
  });

  test("adds ca:login script without always-auth when min node version is greater than 16", () => {
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
      ],
      minNodeVersion: "18.11.0",
    });
    const output = synthSnapshot(project);

    const tasks = output[TaskRuntime.MANIFEST_FILE].tasks;
    expect(tasks["ca:login"]).toEqual({
      name: "ca:login",
      requiredEnv: ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"],
      steps: [
        {
          exec: "which aws",
        },
        {
          exec: `npm config set ${scope}:registry ${registryUrl}; CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain ${domain} --region ${region} --domain-owner ${accountId} --query authorizationToken --output text); npm config set //${registry}:_authToken=$CODEARTIFACT_AUTH_TOKEN`,
        },
      ],
    });
  });

  test("adds ca:login script when multiple scoped packages defined", () => {
    const accountId2 = "123456789013";
    const domain2 = "my-domain-2";
    const region2 = "my-region-2";
    const repository2 = "MyRepository2";
    const scope2 = "@stub-scope-2";
    const registry2 = `${domain2}-${accountId2}.d.codeartifact.${region2}.amazonaws.com/npm/${repository2}/`;
    const registryUrl2 = `https://${registry2}`;
    const project = new TestNodeProject({
      scopedPackagesOptions: [
        {
          registryUrl,
          scope,
        },
        {
          registryUrl: registryUrl2,
          scope: scope2,
        },
      ],
    });
    const output = synthSnapshot(project);

    const tasks = output[TaskRuntime.MANIFEST_FILE].tasks;
    expect(tasks["ca:login"]).toEqual({
      name: "ca:login",
      requiredEnv: ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"],
      steps: [
        {
          exec: "which aws",
        },
        {
          exec: `npm config set ${scope}:registry ${registryUrl}; CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain ${domain} --region ${region} --domain-owner ${accountId} --query authorizationToken --output text); npm config set //${registry}:_authToken=$CODEARTIFACT_AUTH_TOKEN; npm config set //${registry}:always-auth=true`,
        },
        {
          exec: `npm config set ${scope2}:registry ${registryUrl2}; CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain ${domain2} --region ${region2} --domain-owner ${accountId2} --query authorizationToken --output text); npm config set //${registry2}:_authToken=$CODEARTIFACT_AUTH_TOKEN; npm config set //${registry2}:always-auth=true`,
        },
      ],
    });
  });
});

test("sets resolution-mode to highest by default for pnpm", () => {
  const project = new TestNodeProject({
    packageManager: NodePackageManager.PNPM,
  });

  const output = synthSnapshot(project);
  expect(output[".npmrc"]).toContain("resolution-mode=highest");
});

test("can override resolution-mode to lowest for pnpm", () => {
  const project = new TestNodeProject({
    packageManager: NodePackageManager.PNPM,
  });
  project.npmrc.addConfig("resolution-mode", "lowest");

  const output = synthSnapshot(project);
  expect(output[".npmrc"]).toContain("resolution-mode=lowest");
  expect(output[".npmrc"]).not.toContain("resolution-mode=highest");
});

describe("package manager env", () => {
  [
    {
      packageManager: NodePackageManager.NPM,
      cmd: '$(npx -c "node --print process.env.PATH")',
    },
    {
      packageManager: NodePackageManager.YARN,
      cmd: '$(npx -c "node --print process.env.PATH")',
    },
    {
      packageManager: NodePackageManager.YARN_CLASSIC,
      cmd: '$(npx -c "node --print process.env.PATH")',
    },
    {
      packageManager: NodePackageManager.YARN2,
      cmd: '$(npx -c "node --print process.env.PATH")',
    },
    {
      packageManager: NodePackageManager.YARN_BERRY,
      cmd: '$(npx -c "node --print process.env.PATH")',
    },
    {
      packageManager: NodePackageManager.PNPM,
      cmd: '$(pnpm -c exec "node --print process.env.PATH")',
    },
    {
      packageManager: NodePackageManager.BUN,
      cmd: '$(bun --eval "console.log(process.env.PATH)")',
    },
  ].forEach((testCase) => {
    test(testCase.packageManager, () => {
      // GIVEN / WHEN
      const project = new TestNodeProject({
        packageManager: testCase.packageManager,
      });

      // THEN
      expect(project.tasks.env.PATH).toEqual(testCase.cmd);
    });
  });
});

describe("Subproject", () => {
  test("Subproject should create a release workflow in the parent project", () => {
    // GIVEN / WHEN
    const root = new TestNodeProject();
    new TestNodeProject({
      parent: root,
      outdir: "child",
      release: true,
      minNodeVersion: "16.0.0",
      workflowNodeVersion: "18.14.0",
      releaseTagPrefix: "test-node-project@", // to avoid conflicts with the root project
      releaseToNpm: true,
    });

    // THEN
    const snapshot = synthSnapshot(root);

    expect(snapshot).toHaveProperty([
      ".github/workflows/release_test-node-project.yml",
    ]);

    const subprojectReleaseWorkflow = yaml.parse(
      snapshot[".github/workflows/release_test-node-project.yml"]
    );
    expect(
      subprojectReleaseWorkflow.jobs.release.steps.find(
        (step: any) => step.name === "Install dependencies"
      )["working-directory"]
    ).toEqual(
      expect.stringContaining(".") // NodeProject is responsible for setting the install working directory to root
    );
  });

  test("Subproject release workflow options should be used in the workflow in the parent project", () => {
    // GIVEN / WHEN
    const SETUP_JOB_STEP_NAME = "Build Monorepo Dependencies";
    const root = new TestNodeProject();
    new TestNodeProject({
      parent: root,
      outdir: "child",
      release: true,
      minNodeVersion: "16.0.0",
      workflowNodeVersion: "18.14.0",
      releaseTagPrefix: "test-node-project@", // to avoid conflicts with the root project
      releaseToNpm: true,
      releaseWorkflowSetupSteps: [
        {
          name: SETUP_JOB_STEP_NAME,
          run: "nx run-many --target=build-deps",
        },
      ],
    });

    // THEN
    const snapshot = synthSnapshot(root);

    expect(snapshot).toHaveProperty([
      ".github/workflows/release_test-node-project.yml",
    ]);

    const subprojectReleaseWorkflow = yaml.parse(
      snapshot[".github/workflows/release_test-node-project.yml"]
    );
    expect(
      subprojectReleaseWorkflow.jobs.release.steps.find(
        (step: any) => step.name === SETUP_JOB_STEP_NAME
      )
    ).toBeDefined();
  });

  test("should create a build workflow in the parent project", () => {
    // GIVEN / WHEN
    const root = new TestNodeProject();
    new TestNodeProject({
      parent: root,
      outdir: "child",
      buildWorkflow: true,
      minNodeVersion: "18.0.0",
      workflowNodeVersion: "18.14.0",
    });

    // THEN
    const snapshot = synthSnapshot(root);

    expect(snapshot).toHaveProperty([
      ".github/workflows/build_test-node-project.yml",
    ]);

    const subProjecBuildWorkflow = yaml.parse(
      snapshot[".github/workflows/build_test-node-project.yml"]
    );
    expect(
      subProjecBuildWorkflow.jobs.build.defaults.run["working-directory"]
    ).toEqual("./child");
    expect(
      subProjecBuildWorkflow.jobs.build.steps.find(
        (step: any) => step.name === "Install dependencies"
      )["working-directory"]
    ).toEqual(
      expect.stringContaining(".") // NodeProject is responsible for setting the install working directory to root
    );
  });
});

describe("npmignore", () => {
  test("should include sensible default ignore patterns", () => {
    // GIVEN
    const project = new TestNodeProject();

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    expect(output[".npmignore"]).toMatchSnapshot();
    expect(output[".npmignore"]).toContain("/.gitattributes");
  });

  test("should include npmIgnore patterns specified (via npmIgnoreOptions)", () => {
    // GIVEN
    const project = new TestNodeProject({
      npmIgnoreOptions: {
        ignorePatterns: ["/SECURITY.md"],
      },
    });

    // WHEN
    const output = synthSnapshot(project);

    // THEN
    expect(output[".npmignore"]).toMatchSnapshot();
    expect(output[".npmignore"]).toContain("/SECURITY.md");
  });
});
