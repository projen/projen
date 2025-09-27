// tests for `projen new`: we run `projen new` for each supported project type
// and compare against a golden snapshot.
import { execSync } from "child_process";
import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";
import { join, resolve } from "path";
import {
  directorySnapshot,
  execProjenCLI,
  mkdtemp,
  sanitizeOutput,
  synthSnapshot,
  synthSnapshotWithPost,
  TestProject,
  withProjectDirSync,
} from "./util";
import * as inventory from "../src/inventory";
import { execCapture, normalizePersistedPath } from "../src/util";

const EXCLUDE_FROM_SNAPSHOT = [".git/**", "node_modules/**"];
const EXCLUDE_FROM_SNAPSHOT_EXTENDED = [
  ...EXCLUDE_FROM_SNAPSHOT,
  ".github/**",
  "yarn.lock",
];

for (const type of inventory.discover()) {
  test(`projen new ${type.pjid}`, () => {
    withProjectDirSync((projectdir) => {
      // execute `projen new PJID --no-synth` in the project directory
      execProjenCLI(projectdir, ["new", "--no-synth", type.pjid]);

      // compare generated snapshot
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: EXCLUDE_FROM_SNAPSHOT,
      });

      expect(actual).toMatchSnapshot();
    });
  });
}

describe("projen new --from", () => {
  describe("using registry", () => {
    test("existing package", () => {
      withProjectDirSync((projectdir) => {
        // execute `projen new --from @pepperize/projen-awscdk-app-ts@0.0.333` in the project directory
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@0.0.333",
          "--no-post",
        ]);

        // patch the projen version in package.json to match the current version
        // otherwise, every bump would need to update these snapshots.
        sanitizeOutput(projectdir);

        // compare generated snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        expect(actual["package.json"]).toBeDefined();
        expect(actual["package.json"]).toMatchSnapshot();
        expect(actual[".projenrc.ts"]).toBeDefined();
        expect(actual[".projenrc.ts"]).toMatchSnapshot();
      });
    });

    test("non-existing package", () => {
      try {
        withProjectDirSync((projectdir) => {
          const nonExistentPackage = `@projen/some-non-existent-package`;
          execProjenCLI(projectdir, [
            "new",
            "--from",
            nonExistentPackage,
            "--no-post",
          ]);
        });
      } catch (error: any) {
        expect(error.message).toContain(
          `Could not find '@projen/some-non-existent-package' in this registry. Please ensure that the package exists, you have access it and try again.`
        );
      }
    });

    test("non-jsii module", () => {
      try {
        withProjectDirSync((projectdir) => {
          execProjenCLI(projectdir, [
            "new",
            "--from",
            "typescript", // valid package, but not a jsii module
            "--no-post",
          ]);
        });
      } catch (error: any) {
        // expect an error since this tarball doesn't exist as it wasn't added via `npm pack`
        expect(error.message).toContain(
          `Module 'typescript' does not look like it is compatible with projen. Reason: Cannot find 'typescript/.jsii'. All projen modules must be jsii modules!`
        );
      }
    });

    test("using dist tag", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@latest",
          "--no-post",
        ]);

        // compare generated to the snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        // Not doing a snapshot test because @latest is used
        expect(actual[".projenrc.ts"]).toBeDefined();
      });
    });

    test("can choose from one of multiple external project types", () => {
      withProjectDirSync((projectdir) => {
        // execute `projen new --from @taimos/projen@0.0.187 taimos-ts-lib` in the project directory
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@taimos/projen@0.0.187",
          "taimos-ts-lib",
          "--no-post",
        ]);

        // compare generated to the snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        expect(actual[".projenrc.ts"]).toContain("@taimos/projen@0.0.187");
      });
    });

    test("with pjid that is similar to a built-in one", () => {
      withProjectDirSync((projectdir) => {
        try {
          execProjenCLI(projectdir, [
            "new",
            "--from",
            "cdklabs-projen-project-types@0.1.48",
            "jsi", // almost jsii on purpose
            "--no-post",
          ]);
        } catch (error: any) {
          // expect an error since this project type doesn't exist in the package
          // however it is important that the project type is passed to the package
          expect(error.message).toContain('Project type "jsi" not found');
        }
      });
    });
  });

  describe("using tarball", () => {
    test.each([
      ["tarball", "pepperize-projen-awscdk-app-ts-0.0.333.tgz"],
      [
        "named tarball",
        "@pepperize/projen-awscdk-app-ts@file:./pepperize-projen-awscdk-app-ts-0.0.333.tgz",
      ],
      ["relative path", "./pepperize-projen-awscdk-app-ts-0.0.333.tgz"],
    ])("projen new --from %s ", (_, external) => {
      withProjectDirSync((projectdir) => {
        const shell = (command: string) =>
          execSync(command, { cwd: projectdir });
        // downloads pepperize-projen-awscdk-app-ts-0.0.333.tgz
        shell("npm pack @pepperize/projen-awscdk-app-ts@0.0.333");

        execProjenCLI(projectdir, ["new", "--from", external, "--no-post"]);

        // patch the projen version in package.json to match the current version
        // otherwise, every bump would need to update these snapshots.
        sanitizeOutput(projectdir);

        // compare generated to the snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        expect(actual["package.json"]).toBeDefined();
        expect(actual["package.json"]).toMatchSnapshot();
        expect(actual[".projenrc.ts"]).toBeDefined();
        expect(actual[".projenrc.ts"]).toMatchSnapshot();
      });
    });

    test("projen new --from from external tarball (absolute path)", () => {
      withProjectDirSync((projectdir) => {
        const shell = (command: string) =>
          execSync(command, { cwd: projectdir });
        // downloads pepperize-projen-awscdk-app-ts-0.0.333.tgz
        shell("npm pack @pepperize/projen-awscdk-app-ts@0.0.333");
        const tarball = resolve(
          projectdir,
          "pepperize-projen-awscdk-app-ts-0.0.333.tgz"
        );
        const normalizedTarball = normalizePersistedPath(tarball);

        execProjenCLI(projectdir, ["new", "--from", tarball, "--no-post"]);

        // patch the projen version in package.json to match the current version
        // otherwise, every bump would need to update these snapshots.
        sanitizeOutput(projectdir);

        // compare generated to the snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        // Cannot use snapshots because absolute path is system dependent
        // We use an approximation. This is good enough because we have plenty of other tests covering this
        expect(actual["package.json"]).toBeDefined();
        expect(actual["package.json"]).toHaveProperty("devDependencies");
        expect(actual["package.json"].devDependencies).toMatchObject({
          [normalizedTarball]: "*",
        });
        expect(actual[".projenrc.ts"]).toBeDefined();
        expect(actual[".projenrc.ts"]).toContain(
          `import { AwsCdkTypeScriptApp } from "@pepperize/projen-awscdk-app-ts`
        );
        expect(actual[".projenrc.ts"]).toContain(normalizedTarball);
      });
    });

    test.each([
      ["none-existent-package-0.0.1.tgz"],
      ["@projen/non-existing-package@file:./none-existent-package-0.0.1.tgz"],
    ])("non-existent tarball %s", (external) => {
      withProjectDirSync((projectdir) => {
        try {
          execProjenCLI(projectdir, ["new", "--from", external, "--no-post"]);
        } catch (error: any) {
          // expect an error since this tarball doesn't exist as it wasn't added via `npm pack`
          expect(error.message).toContain(
            `Could not find '${external}' in this path. Please ensure that the package exists, you have access it and try again.`
          );
        }
      });
    });
  });

  describe("project options", () => {
    describe("post-synthesis option", () => {
      test("is enabled", () => {
        const project = new TestProject();
        expect(synthSnapshotWithPost(project)[".postsynth"]).toContain(
          "postsynth"
        );
      });

      test("is disabled", () => {
        const project = new TestProject();
        expect(synthSnapshot(project)[".postsynth"]).toBeUndefined();
      });
    });

    test("with enum values", () => {
      withProjectDirSync((projectdir) => {
        // execute `projen new --from @pepperize/projen-awscdk-app-ts@0.0.333` in the project directory
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@0.0.333",
          "--package-manager=npm",
          "--no-post",
        ]);

        // patch the projen version in package.json to match the current version
        // otherwise, every bump would need to update these snapshots.
        sanitizeOutput(projectdir);

        // compare generated snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        expect(actual[".projenrc.ts"]).toContain(
          "javascript.NodePackageManager.NPM"
        );
      });
    });

    test("with array option", () => {
      withProjectDirSync((projectdir) => {
        // execute `projen new --from @pepperize/projen-awscdk-app-ts@0.0.333` in the project directory
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@0.0.333",
          "--no-post",
          "--deps",
          "glob@8",
          "--deps",
          "lodash@4",
        ]);

        // compare generated snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        expect(actual[".projenrc.ts"]).toContain('deps: ["glob@8","lodash@4"]');
      });
    });

    test("options are not overwritten when creating from external project types", () => {
      withProjectDirSync((projectdir) => {
        // execute `projen new --from @pepperize/projen-awscdk-app-ts@0.0.333` in the project directory
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@0.0.333",
          "--no-synth",
          "--cdk-version",
          "2.50.0",
        ]);

        // compare generated to the snapshot
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
        });

        expect(actual[".projenrc.ts"]).toContain('cdkVersion: "2.50.0"');
      });
    });

    test("will fail when a required option without a default is not provided", () => {
      withProjectDirSync((projectdir) => {
        try {
          execProjenCLI(projectdir, [
            "new",
            "--from",
            "mrpj@0.0.1",
            "projen",
            "--no-synth",
          ]);
        } catch (error: any) {
          expect(error.message).toMatch('Cannot create "mrpj.ProjenProject"');
          expect(error.message).toMatch("Missing required option:");
          expect(error.message).toMatch("--repo [string]");
        }
      });
    });

    test("--no-comments", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "node",
          "--no-comments",
          "--no-synth",
        ]);

        const projenrc = directorySnapshot(projectdir)[".projenrc.js"];
        expect(projenrc).toBeDefined();
        expect(projenrc).not.toMatch("//");
      });
    });

    test("projen new with unknown option works", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "node",
          "--DOES_NOT_EXIST",
          "--no-synth",
        ]);

        const projenrc = directorySnapshot(projectdir)[".projenrc.js"];
        expect(projenrc).toBeDefined();
        expect(projenrc).toMatchSnapshot();
      });
    });

    test("creating node project with enum-typed CLI arg", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "node",
          "--package-manager",
          "npm",
          "--no-synth",
        ]);

        const projenrc = directorySnapshot(projectdir)[".projenrc.js"];
        expect(projenrc).toMatchSnapshot();
      });
    });

    test("creating python project with enum-typed CLI arg", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "python",
          "--project-type",
          "lib",
          "--projenrc-python",
          "--no-synth",
        ]);

        const projenrc = directorySnapshot(projectdir)[".projenrc.py"];
        expect(projenrc).toMatchSnapshot();
      });
    });

    test("creating java project with enum-typed CLI arg", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "java",
          "--project-type",
          "lib",
          "--projenrc-java",
          "--no-synth",
        ]);

        const projenrc =
          directorySnapshot(projectdir)["src/test/java/projenrc.java"];
        expect(projenrc).toMatchSnapshot();
      });
    });

    test("projenrc-json creates node-project", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "node",
          "--projenrc-json",
          "--no-synth",
        ]);

        const projenrc = directorySnapshot(projectdir)[".projenrc.json"];
        expect(projenrc).toMatchSnapshot();
      });
    });

    test("projenrc-json creates java project", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "java",
          "--projenrc-json",
          "--no-synth",
        ]);

        expect(
          directorySnapshot(projectdir, {
            excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
          })
        ).toMatchSnapshot();
      });
    });

    test("projenrc-json creates external project type", () => {
      withProjectDirSync((projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@0.0.333",
          "--projenrc-json",
          "--no-synth",
        ]);

        // exclude node_modules to work around bug where node_modules is generated AND one of the
        // dependencies includes a file with .json extension that isn't valid JSON
        const projenrc = directorySnapshot(projectdir)[".projenrc.json"];
        expect(projenrc).toMatchSnapshot();
      });
    });

    test("--outdir path/to/mydir", () => {
      withProjectDirSync((projectdir) => {
        // GIVEN
        const shell = (command: string) =>
          execSync(command, { cwd: projectdir });
        shell(`mkdir -p ${join("path", "to", "mydir")}`);

        // WHEN
        execProjenCLI(projectdir, [
          "new",
          "node",
          "--outdir",
          "path/to/mydir",
          "--no-post",
        ]);

        // THEN
        const targetDirSnapshot = directorySnapshot(
          join(projectdir, "path", "to", "mydir"),
          { excludeGlobs: EXCLUDE_FROM_SNAPSHOT }
        );
        expect(targetDirSnapshot[".projenrc.js"]).toMatchSnapshot();
        expect(targetDirSnapshot["package.json"]).toBeDefined();
      });
    });
  });
});

describe("typescript project", () => {
  test("projenrc-ts creates typescript projenrc", () => {
    withProjectDirSync((projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "typescript",
        "--no-synth",
        "--projenrc-ts",
      ]);

      const projenrc = directorySnapshot(projectdir)[".projenrc.ts"];

      expect(projenrc).toBeDefined();
      expect(projenrc).toMatchSnapshot();
    });
  });
});

describe("python project", () => {
  test("includes .projenrc.py by default", () => {
    withProjectDirSync((projectdir) => {
      execProjenCLI(projectdir, ["new", "python", "--no-synth"]);

      const output = directorySnapshot(projectdir);
      expect(output[".projenrc.py"]).toBeDefined();
    });
  });

  test("can include .projenrc.js", () => {
    withProjectDirSync((projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "python",
        "--no-synth",
        "--projenrc-js",
      ]);

      const output = directorySnapshot(projectdir);
      expect(output[".projenrc.py"]).toBeUndefined();
      expect(output[".projenrc.js"]).toBeDefined();
    });
  });

  test("can include .projenrc.ts", () => {
    withProjectDirSync((projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "python",
        "--no-synth",
        "--projenrc-ts",
      ]);

      const output = directorySnapshot(projectdir);
      expect(output[".projenrc.py"]).toBeUndefined();
      expect(output[".projenrc.js"]).toBeUndefined();
      expect(output[".projenrc.ts"]).toBeDefined();
      expect(output[".projenrc.ts"]).toContain(
        'import { python } from "projen"'
      );
    });
  });

  test("can define an array option", () => {
    withProjectDirSync((projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "python",
        "--no-synth",
        "--deps",
        "python@^3.9",
      ]);

      const output = directorySnapshot(projectdir);
      expect(output[".projenrc.py"]).toBeDefined();
      expect(output[".projenrc.py"]).toContain(`deps=["python@^3.9"]`);
    });
  });
});

describe("initial values", () => {
  test("cli can override initial values", () => {
    withProjectDirSync((projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "typescript",
        "--projenrc-ts",
        "false",
        "--no-post",
      ]);
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: EXCLUDE_FROM_SNAPSHOT_EXTENDED,
      });
      expect(actual[".projenrc.js"]).toBeDefined();
      expect(actual[".projenrc.ts"]).not.toBeDefined();
    });
  });
});

describe("git", () => {
  test("--git (default) will initialize a git repo and create a commit", () => {
    withProjectDirSync(
      (projectdir) => {
        execProjenCLI(projectdir, ["new", "project"]);
        expect(
          execCapture("git log", { cwd: projectdir })
            .toString("utf8")
            .includes("chore: project created with projen")
        ).toBeTruthy();
      },
      { git: false }
    );
  });

  test("--git (default) respects init.defaultBranch setting", () => {
    withProjectDirSync(
      (projectdir) => {
        const defaultBranch = "test-default-branch";

        // Simulate git config using env variables
        // We don't want to change the user's git config
        const env = {
          ...process.env,
          GIT_CONFIG_COUNT: "1",
          GIT_CONFIG_KEY_0: "init.defaultBranch",
          GIT_CONFIG_VALUE_0: defaultBranch,
        };

        execProjenCLI(projectdir, ["new", "project"], env);
        expect(
          execCapture("git rev-parse --abbrev-ref HEAD", {
            cwd: projectdir,
          }).toString()
        ).toContain(defaultBranch);
      },
      { git: false }
    );
  });

  test("--no-git will not create a git repo", () => {
    withProjectDirSync(
      (projectdir) => {
        execProjenCLI(projectdir, ["new", "project", "--no-git"]);
        expect(existsSync(join(projectdir, ".git"))).toBeFalsy();
      },
      { git: false }
    );
  });
});

describe("regressions", () => {
  // https://github.com/projen/projen/issues/2837
  test("projen new --from does not fail when save=false in npm config", () => {
    withProjectDirSync((projectdir) => {
      // Tells Node to not save packages on install. However we must save the external package to determine its name.
      writeFileSync(join(projectdir, ".npmrc"), "save=false\n");

      // execute `projen new --from @pepperize/projen-awscdk-app-ts@0.0.333` in the project directory
      execProjenCLI(
        projectdir,
        [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@0.0.333",
          "--no-post",
          "--no-git",
        ],
        undefined,
        {
          preInstallProjen: false,
        }
      );

      // Load the package.json
      const packageJson = JSON.parse(
        readFileSync(join(projectdir, "package.json"), "utf-8")
      );
      const packageName = Object.keys(packageJson.devDependencies).find(
        (name) => name !== "projen"
      );

      expect(packageName).toBe("@pepperize/projen-awscdk-app-ts");
    });
  });

  // https://github.com/projen/projen/issues/2649
  test("projen new without any arguments displays full help", () => {
    withProjectDirSync((projectdir) => {
      try {
        execProjenCLI(projectdir, ["new"]);
      } catch (error: any) {
        expect(error.message).toMatch("Creates a new projen project");
        expect(error.message).toMatch("Commands:");
        expect(error.message).toMatch("Multi-language jsii library project.");
      }
    });
  });

  // https://github.com/projen/projen/issues/2443
  test("can create external project in directory path containing a space", () => {
    const pathWithSpace = join(mkdtemp(), "path with space");
    mkdirSync(pathWithSpace, { recursive: true });

    withProjectDirSync(
      (projectdir) => {
        execProjenCLI(projectdir, [
          "new",
          "--from",
          "@pepperize/projen-awscdk-app-ts@latest",
          "--no-post",
        ]);
        const actual = directorySnapshot(projectdir, {
          excludeGlobs: EXCLUDE_FROM_SNAPSHOT,
        });
        expect(actual[".projenrc.ts"]).toBeDefined();
      },
      {
        chdir: true,
        tmpdir: pathWithSpace,
      }
    );
  });
});
