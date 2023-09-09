// tests for `projen new`: we run `projen new` for each supported project type
// and compare against a golden snapshot.
import { execSync } from "child_process";
import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import {
  directorySnapshot,
  execProjenCLI,
  mkdtemp,
  sanitizeOutput,
  synthSnapshot,
  synthSnapshotWithPost,
  TestProject,
  withProjectDir,
} from "./util";
import * as inventory from "../src/inventory";
import { execCapture } from "../src/util";

for (const type of inventory.discover()) {
  test(`projen new ${type.pjid}`, () => {
    withProjectDir((projectdir) => {
      // execute `projen new PJID --no-synth` in the project directory
      execProjenCLI(projectdir, ["new", "--no-synth", type.pjid]);

      // compare generated snapshot
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: [".git/**"],
      });

      expect(actual).toMatchSnapshot();
    });
  });
}

test("post-synthesis option enabled", () => {
  const project = new TestProject();

  expect(synthSnapshotWithPost(project)[".postsynth"]).toContain("postsynth");
});

test("post-synthesis option disabled", () => {
  const project = new TestProject();

  expect(synthSnapshot(project)[".postsynth"]).toBeUndefined();
});

test("projen new --from external", () => {
  withProjectDir((projectdir) => {
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
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual["package.json"]).toBeDefined();
    expect(actual["package.json"]).toMatchSnapshot();
    expect(actual[".projenrc.ts"]).toBeDefined();
    expect(actual[".projenrc.ts"]).toMatchSnapshot();
  });
});

test("projen new --from external with enum values", () => {
  withProjectDir((projectdir) => {
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
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.ts"]).toContain(
      "javascript.NodePackageManager.NPM"
    );
  });
});

test("projen new --from external can use array option", () => {
  withProjectDir((projectdir) => {
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
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.ts"]).toContain('deps: ["glob@8","lodash@4"]');
  });
});

test("projen new --from external tarball", () => {
  withProjectDir((projectdir) => {
    const shell = (command: string) => execSync(command, { cwd: projectdir });
    // downloads pepperize-projen-awscdk-app-ts-0.0.333.tgz
    shell("npm pack @pepperize/projen-awscdk-app-ts@0.0.333");

    execProjenCLI(projectdir, [
      "new",
      "--from",
      "./pepperize-projen-awscdk-app-ts-0.0.333.tgz",
      "--no-post",
    ]);

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(projectdir);

    // compare generated to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual["package.json"]).toBeDefined();
    expect(actual["package.json"]).toMatchSnapshot();
    expect(actual[".projenrc.ts"]).toBeDefined();
    expect(actual[".projenrc.ts"]).toMatchSnapshot();
  });
});

test("projen new --from external dist tag", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, [
      "new",
      "--from",
      "@pepperize/projen-awscdk-app-ts@latest",
      "--no-post",
    ]);

    // compare generated to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    // Not doing a snapshot test because @latest is used
    expect(actual[".projenrc.ts"]).toBeDefined();
  });
});

test("projen new --from can use pjid that is similar to a built-in one", () => {
  withProjectDir((projectdir) => {
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

test("options are not overwritten when creating from external project types", () => {
  withProjectDir((projectdir) => {
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
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.ts"]).toContain('cdkVersion: "2.50.0"');
  });
});

test("projen new --from will fail when a required option without a default is not provided", () => {
  withProjectDir((projectdir) => {
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

test("projen new --from does not fail when save=false in npm config", () => {
  withProjectDir((projectdir) => {
    // Tells Node to not save packages on install. However we must save the external package to determine its name.
    writeFileSync(join(projectdir, ".npmrc"), "save=false\n");

    // execute `projen new --from @pepperize/projen-awscdk-app-ts@0.0.333` in the project directory
    execProjenCLI(projectdir, [
      "new",
      "--from",
      "@pepperize/projen-awscdk-app-ts@0.0.333",
      "--no-post",
      "--no-synth",
      "--no-git",
    ]);

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

test("can choose from one of multiple external project types", () => {
  withProjectDir((projectdir) => {
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
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.ts"]).toContain("@taimos/projen@0.0.187");
  });
});

test("projen new --no-comments", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "node", "--no-comments", "--no-synth"]);

    const projenrc = directorySnapshot(projectdir)[".projenrc.js"];
    expect(projenrc).toBeDefined();
    expect(projenrc).not.toMatch("//");
  });
});

test("projen new with unknown option works", () => {
  withProjectDir((projectdir) => {
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

test("projen new without any arguments displays full help", () => {
  withProjectDir((projectdir) => {
    try {
      execProjenCLI(projectdir, ["new"]);
    } catch (error: any) {
      expect(error.message).toMatch("Creates a new projen project");
      expect(error.message).toMatch("Commands:");
      expect(error.message).toMatch("Multi-language jsii library project.");
    }
  });
});

test("creating node project with enum-typed CLI arg", () => {
  withProjectDir((projectdir) => {
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
  withProjectDir((projectdir) => {
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
  withProjectDir((projectdir) => {
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
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "node", "--projenrc-json", "--no-synth"]);

    const projenrc = directorySnapshot(projectdir)[".projenrc.json"];
    expect(projenrc).toMatchSnapshot();
  });
});

test("projenrc-json creates java project", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "java", "--projenrc-json", "--no-synth"]);

    expect(directorySnapshot(projectdir)).toMatchSnapshot();
  });
});

test("projenrc-json creates external project type", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, [
      "new",
      "--from",
      "@pepperize/projen-awscdk-app-ts@0.0.333",
      "--projenrc-json",
      "--no-synth",
    ]);

    // exclude node_modules to work around bug where node_modules is generated AND one of the
    // dependencies includes a file with .json extension that isn't valid JSON
    const projenrc = directorySnapshot(projectdir, {
      excludeGlobs: ["node_modules/**"],
    })[".projenrc.json"];
    expect(projenrc).toMatchSnapshot();
  });
});

test("projenrc-ts creates typescript projenrc", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, [
      "new",
      "typescript",
      "--projenrc-ts",
      "--no-synth",
    ]);
    const projenrc = directorySnapshot(projectdir)[".projenrc.ts"];
    expect(projenrc).toBeDefined();
    expect(projenrc).toMatchSnapshot();
  });
});

test("python project includes .projenrc.py by default", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "python", "--no-synth"]);

    const output = directorySnapshot(projectdir);
    expect(output[".projenrc.py"]).toBeDefined();
  });
});

test("python project can include .projenrc.js", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "python", "--projenrc-js", "--no-synth"]);

    const output = directorySnapshot(projectdir);
    expect(output[".projenrc.py"]).toBeUndefined();
    expect(output[".projenrc.js"]).toBeDefined();
  });
});

test("python project can include .projenrc.ts", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "python", "--projenrc-ts", "--no-synth"]);

    const output = directorySnapshot(projectdir);
    expect(output[".projenrc.py"]).toBeUndefined();
    expect(output[".projenrc.js"]).toBeUndefined();
    expect(output[".projenrc.ts"]).toBeDefined();
    expect(output[".projenrc.ts"]).toContain('import { python } from "projen"');
  });
});

test("python project can define an array option", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, [
      "new",
      "python",
      "--no-synth",
      "--deps",
      "python@^3.9",
    ]);

    const output = directorySnapshot(projectdir);
    expect(output[".projenrc.py"]).toBeDefined();
    expect(output[".projenrc.py"]).toMatchInlineSnapshot(`
      "from projen.python import PythonProject

      project = PythonProject(
          author_email="my@user.email.com",
          author_name="My User Name",
          deps=["python@^3.9"],
          module_name="my_project",
          name="my-project",
          version="0.1.0",
      )

      project.synth()"
    `);
  });
});

test("projen new node --outdir path/to/mydir", () => {
  withProjectDir((projectdir) => {
    // GIVEN
    const shell = (command: string) => execSync(command, { cwd: projectdir });
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
      { excludeGlobs: ["node_modules/**"] }
    );
    expect(targetDirSnapshot[".projenrc.js"]).toMatchSnapshot();
    expect(targetDirSnapshot["package.json"]).toBeDefined();
  });
});

test("can create external project in directory path containing a space", () => {
  const pathWithSpace = join(mkdtemp(), "path with space");
  mkdirSync(pathWithSpace, { recursive: true });

  withProjectDir(
    (projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "--from",
        "@pepperize/projen-awscdk-app-ts@latest",
        "--no-post",
      ]);
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
      });
      expect(actual[".projenrc.ts"]).toBeDefined();
    },
    {
      chdir: true,
      tmpdir: pathWithSpace,
    }
  );
});

describe("initial values", () => {
  test("cli can override initial values", () => {
    withProjectDir((projectdir) => {
      execProjenCLI(projectdir, [
        "new",
        "typescript",
        "--projenrc-ts",
        "false",
        "--no-post",
      ]);
      const actual = directorySnapshot(projectdir, {
        excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
      });
      expect(actual[".projenrc.js"]).toBeDefined();
      expect(actual[".projenrc.ts"]).not.toBeDefined();
    });
  });
});

describe("git", () => {
  test("--git (default) will initialize a git repo and create a commit", () => {
    withProjectDir(
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
    withProjectDir(
      (projectdir) => {
        const defaultBranch = "test-default-branch";

        process.env.XDG_CONFIG_HOME = projectdir;
        mkdirSync(join(projectdir, "git"));
        writeFileSync(join(projectdir, "git", "config"), "");
        execCapture(`git config --global init.defaultBranch ${defaultBranch}`, {
          cwd: projectdir,
        });

        execProjenCLI(projectdir, ["new", "project"]);
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
    withProjectDir(
      (projectdir) => {
        execProjenCLI(projectdir, ["new", "project", "--no-git"]);
        expect(existsSync(join(projectdir, ".git"))).toBeFalsy();
      },
      { git: false }
    );
  });
});
