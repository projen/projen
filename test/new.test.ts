// tests for `projen new`: we run `projen new` for each supported project type
// and compare against a golden snapshot.
import { execSync } from "child_process";
import { join } from "path";
import { pathExistsSync } from "fs-extra";
import {
  directorySnapshot,
  execProjenCLI,
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

      // compare generated .projenrc.js to the snapshot
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

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual["package.json"]).toMatchSnapshot();
    expect(actual[".projenrc.js"]).toMatchSnapshot();
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

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.js"]).toContain('deps: ["glob@8","lodash@4"]');
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

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual["package.json"]).toMatchSnapshot();
    expect(actual[".projenrc.js"]).toMatchSnapshot();
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

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    // Not doing a snapshot test because @latest is used
    expect(actual[".projenrc.js"]).toBeDefined();
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

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.js"]).toContain('cdkVersion: "2.50.0"');
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

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [".git/**", ".github/**", "node_modules/**", "yarn.lock"],
    });

    expect(actual[".projenrc.js"]).toContain("@taimos/projen@0.0.187");
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
    execProjenCLI(projectdir, ["new", "java", "--projenrc-json"]);

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
          author_email=\\"my@user.email.com\\",
          author_name=\\"My User Name\\",
          module_name=\\"my_project\\",
          name=\\"my-project\\",
          version=\\"0.1.0\\",
          deps=[\\"python@^3.9\\"],
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
    execProjenCLI(projectdir, ["new", "node", "--outdir", "path/to/mydir"]);

    // THEN
    const targetDirSnapshot = directorySnapshot(
      join(projectdir, "path", "to", "mydir"),
      { excludeGlobs: ["node_modules/**"] }
    );
    expect(targetDirSnapshot[".projenrc.js"]).toMatchSnapshot();
    expect(targetDirSnapshot["package.json"]).toBeDefined();
  });
});

describe("git", () => {
  test("--git (default) will initialize a git repo and create a commit", () => {
    withProjectDir((projectdir) => {
      execProjenCLI(projectdir, ["new", "project"]);
      expect(
        execCapture("git log", { cwd: projectdir })
          .toString("utf8")
          .includes("chore: project created with projen")
      ).toBeTruthy();
    });
  });

  test("--no-git will not create a git repo", () => {
    withProjectDir(
      (projectdir) => {
        execProjenCLI(projectdir, ["new", "project", "--no-git"]);
        expect(pathExistsSync(join(projectdir, ".git"))).toBeFalsy();
      },
      { git: false }
    );
  });
});
