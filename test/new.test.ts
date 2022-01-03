// tests for `projen new`: we run `projen new` for each supported project type
// and compare against a golden snapshot.
import { execSync } from "child_process";
import { join } from "path";
import { pathExistsSync } from "fs-extra";
import * as inventory from "../src/inventory";
import { execCapture } from "../src/util";
import {
  directorySnapshot,
  execProjenCLI,
  synthSnapshot,
  synthSnapshotWithPost,
  TestProject,
  withProjectDir,
} from "./util";

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

/**
 * commented out due to breaking changes in projen@0.37.0

test('projen new --from external', () => {
  withProjectDir(projectdir => {

    // execute `projen new --from cdk-appsync-project` in the project directory
    execProjenCLI(projectdir, ['new', '--from', 'cdk-appsync-project@1.1.3', '--no-post', MIN_NODE_VERSION_OPTION]);

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(projectdir);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    expect(actual).toMatchSnapshot();
    expect(actual['schema.graphql']).toBeDefined();

  });
});

test('projen new --from external tarball', () => {
  withProjectDir(projectdir => {
    const shell = (command: string) => execSync(command, { cwd: projectdir });
    // downloads cdk-appsync-project-1.1.3.tgz
    shell('npm pack cdk-appsync-project@1.1.3');

    execProjenCLI(projectdir, ['new', '--from', './cdk-appsync-project-1.1.3.tgz', '--no-post', MIN_NODE_VERSION_OPTION]);

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(projectdir);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    expect(actual['package.json']).toMatchSnapshot();
    expect(actual['.projenrc.js']).toMatchSnapshot();
    expect(actual['schema.graphql']).toBeDefined();
  });
});

test('projen new --from external dist tag', () => {
  withProjectDir(projectdir => {
    execProjenCLI(projectdir, ['new', '--from', 'cdk-appsync-project@latest', '--no-post', MIN_NODE_VERSION_OPTION]);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    // Not doing a snapshot test because @latest is used
    expect(actual['schema.graphql']).toBeDefined();
  });
});

test('options are not overwritten when creating from external project types', () => {
  withProjectDir(projectdir => {

    // execute `projen new --from cdk-appsync-project` in the project directory
    execProjenCLI(projectdir, ['new', '--from', 'cdk-appsync-project@1.1.3', '--no-synth', '--cdk-version', '1.63.0', MIN_NODE_VERSION_OPTION]);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    expect(actual['.projenrc.js']).toContain('cdkVersion: \'1.63.0\'');
  });
});

test('can choose from one of multiple external project types', () => {
  withProjectDir(projectdir => {

    // execute `projen new --from cdk-appsync-project` in the project directory
    execProjenCLI(projectdir, ['new', '--from', '@taimos/projen@0.0.126', 'taimos-ts-lib', '--no-post', MIN_NODE_VERSION_OPTION]);

    // patch the projen version in package.json to match the current version
    // otherwise, every bump would need to update these snapshots.
    sanitizeOutput(projectdir);

    // compare generated .projenrc.js to the snapshot
    const actual = directorySnapshot(projectdir, {
      excludeGlobs: [
        '.git/**',
        '.github/**',
        'node_modules/**',
        'yarn.lock',
      ],
    });

    expect(actual['.projenrc.js']).toContain('@taimos/projen@0.0.126');
  });
});

**/

test("projen new --no-comments", () => {
  withProjectDir((projectdir) => {
    execProjenCLI(projectdir, ["new", "node", "--no-comments", "--no-synth"]);

    const projenrc = directorySnapshot(projectdir)[".projenrc.js"];
    expect(projenrc).toBeDefined();
    expect(projenrc).not.toMatch("//");
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

/**
 * commented out due to breaking changes in projen@0.37.0

test('projenrc-json creates external project type', () => {
  withProjectDir(projectdir => {
    execProjenCLI(projectdir, ['new', '--from', 'cdk-appsync-project@1.1.3', '--cdk-version', '1.63.0', '--projenrc-json', '--no-synth', MIN_NODE_VERSION_OPTION]);

    // exclude node_modules to work around bug where node_modules is generated AND one of the
    // dependencies includes a file with .json extension that isn't valid JSON
    const projenrc = directorySnapshot(projectdir, { excludeGlobs: ['node_modules/**'] })['.projenrc.json'];
    expect(projenrc).toMatchSnapshot();
  });
});

*/

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
