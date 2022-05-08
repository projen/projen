import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { readJsonSync } from "fs-extra";
import semver from "semver";
import * as YAML from "yaml";
import { Project } from "../../src";
import { NodePackage } from "../../src/javascript/node-package";
import { minVersion } from "../../src/javascript/util";
import * as util from "../../src/util";
import { mkdtemp, synthSnapshot, TestProject } from "../util";

/**
 * Mocks a yarn install, writing to yarn.lock
 * and creating package.json files in node_modules for all dependencies
 * Will "install" the max version that complies with all dependency ranges
 * NOT A PERFECT MODEL OF YARN. JUST CLOSE ENOUGH.
 * @param outdir Test project's outdir, where package.json and node_modules live
 * @param latestPackages Package name and version to "install" for "*" deps
 */
function mockYarnInstall(
  outdir: string,
  latestPackages: Record<string, string>
) {
  const pkgJson = readJsonSync(join(outdir, "package.json"));
  const yarnLock: Record<string, string> = {};
  const depRanges: Record<string, string[]> = {};
  const depVersions: Record<string, string[]> = {};
  const depTypes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "bundledDependencies",
    "optionalDependencies",
  ];
  for (const depType of depTypes) {
    // Look up the ranges for each dependency
    for (const [depName, depVer] of Object.entries(pkgJson[depType] ?? {})) {
      // init arrays if undefined
      depRanges[depName] = depRanges[depName] ?? [];
      depVersions[depName] = depVersions[depName] ?? [];
      if (depVer === "*") {
        if (!latestPackages[depName]) {
          throw new Error(
            `No latest package defined for dependency ${depName}`
          );
        }
        depRanges[depName].push("*");
        depVersions[depName].push(latestPackages[depName]);
      } else {
        const ver = minVersion(`${depVer}`);
        if (!ver) {
          throw new Error(
            `unable to determine min version for ${depName}@${depVer}`
          );
        }
        // If we're given a latest package, no dependency can require higher
        if (
          latestPackages[depName] &&
          semver.validRange(`${ver}`) &&
          semver.gt(`${ver}`, latestPackages[depName])
        ) {
          throw new Error(
            `${depType} requirement ${depName}@${depVer} exceeds provided "latest" version ${latestPackages[depName]}`
          );
        }
        depRanges[depName].push(`${depVer}`);
        // Also take the min version as a valid install version
        depVersions[depName].push(ver);
      }
    }
  }
  // Resolve version to install that satisfies all ranges for dep
  for (const dep of Object.keys(depRanges)) {
    let installVersion: string | null;
    if (!semver.validRange(depVersions[dep][0])) {
      // if a dependency is "file:..." or something else, just install that
      installVersion = depVersions[dep][0];
    } else {
      installVersion = semver.maxSatisfying(
        depVersions[dep],
        depRanges[dep].join(" || ")
      );
    }
    if (!installVersion) {
      throw new Error(`No version given satisfies all constraints on ${dep}`);
    }
    mkdirSync(join(outdir, `node_modules/${dep}`), { recursive: true });
    writeFileSync(
      join(outdir, `node_modules/${dep}/package.json`),
      JSON.stringify({
        name: `${dep}`,
        version: `${installVersion}`,
      })
    );
    // Not accurate to yaml.lock v1 format, but close enough.
    yarnLock[
      `${depRanges[dep].map((range) => `${dep}@${range}`).join(", ")}`
    ] = `version "${installVersion}"`;
  }
  // Use double quoted keys just to make output more predictable
  writeFileSync(
    join(outdir, "yarn.lock"),
    YAML.stringify(yarnLock, { defaultKeyType: "QUOTE_DOUBLE" })
  );
}

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test("all bugs field present", () => {
  const project = new TestProject();

  new NodePackage(project, {
    bugsEmail: "bugs@foobar.local",
    bugsUrl: "bugs.foobar.local",
  });

  expect(synthSnapshot(project)["package.json"].bugs).toMatchSnapshot();
});

test("no bugs field present", () => {
  const project = new TestProject();

  new NodePackage(project, {});

  const snps = synthSnapshot(project);

  expect(snps["package.json"].bugs).toMatchSnapshot();

  expect(snps["package.json"].bugs).toStrictEqual(undefined);
});

test("single bugs field present", () => {
  const project = new TestProject();

  const _email = "bugs@foobar.local";

  new NodePackage(project, {
    bugsEmail: _email,
  });

  const snps = synthSnapshot(project);

  expect(snps["package.json"].bugs).toMatchSnapshot();

  expect(snps["package.json"].bugs.url).toStrictEqual(undefined);
  expect(snps["package.json"].bugs.email).toStrictEqual(_email);
});

test('lockfile updated (install twice) after "*"s are resolved', () => {
  const execMock = jest
    .spyOn(util, "exec")
    .mockImplementation((command, options) => {
      expect(command.startsWith("yarn install")).toBeTruthy();
      mockYarnInstall(options.cwd, { ms: "2.1.3" });
    });

  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project);

  pkg.addDeps("ms");

  project.synth();

  const yarnLockPath = join(project.outdir, "yarn.lock");
  const yarnLock: string | undefined = readFileSync(yarnLockPath, "utf8");

  expect(yarnLock).toStrictEqual('"ms@^2.1.3": version "2.1.3"\n');
  expect(execMock).toBeCalledTimes(2);
});

test("install only once if all versions are resolved", () => {
  const execMock = jest.spyOn(util, "exec").mockReturnValueOnce();
  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project);

  pkg.addDeps("ms@^2");

  project.synth();

  expect(execMock).toBeCalledTimes(1);
});

test("no install if package.json did not change at all", () => {
  const execMock = jest.spyOn(util, "exec").mockReturnValueOnce();
  const outdir = mkdtemp({ cleanup: false });

  const orig = {
    name: "test",
    scripts: {
      build: "npx projen build",
      compile: "npx projen compile",
      default: "npx projen default",
      eject: "npx projen eject",
      package: "npx projen package",
      "post-compile": "npx projen post-compile",
      "pre-compile": "npx projen pre-compile",
      test: "npx projen test",
    },
    dependencies: {
      ms: "^2",
    },
    main: "lib/index.js",
    license: "Apache-2.0",
    version: "0.0.0",
    "//": '~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".',
  };

  writeFileSync(
    join(outdir, "package.json"),
    JSON.stringify(orig, undefined, 2)
  );
  mkdirSync(join(outdir, "node_modules")); // <-- also causes an "install"

  const project = new Project({ name: "test", outdir });
  project.addExcludeFromCleanup("package.json");
  const pkg = new NodePackage(project);

  pkg.addDeps("ms@^2");

  project.synth();
  expect(execMock).not.toBeCalled();
});

test('"*" peer dependencies are pinned in devDependencies', () => {
  // Post-synth dependency version resolution uses installed package from node_modules folder
  // Mock install command to add this folder with a fixed dependency version,
  // mimicking yarn installing the latest package for "*"
  jest.spyOn(util, "exec").mockImplementation((command, options) => {
    expect(command.startsWith("yarn install")).toBeTruthy();
    mockYarnInstall(options.cwd, { ms: "1.2.3" });
  });

  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project, {
    peerDependencyOptions: {
      pinnedDevDependency: true,
    },
  });

  pkg.addPeerDeps("ms");

  project.synth();

  const pkgFile = readJsonSync(join(project.outdir, "package.json"));

  expect(pkgFile.peerDependencies).toStrictEqual({ ms: "^1.2.3" });
  expect(pkgFile.devDependencies).toStrictEqual({ ms: "1.2.3" });
});

test("manually set devDependencies are not changed when a peerDependency is added", () => {
  // Post-synth dependency version resolution uses installed package from node_modules folder
  // Mock install command to add this folder with a fixed dependency version,
  // mimicking yarn installing the latest package for "*"
  jest.spyOn(util, "exec").mockImplementation((command, options) => {
    expect(command.startsWith("yarn install")).toBeTruthy();
    mockYarnInstall(options.cwd, { ms: "1.3.4" });
  });

  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project, {
    peerDependencyOptions: {
      pinnedDevDependency: true,
    },
  });

  const orig = {
    name: "test",
    devDependencies: {
      ms: "^1.3.0",
    },
    main: "lib/index.js",
    license: "Apache-2.0",
    version: "0.0.0",
    "//": '~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".',
  };

  writeFileSync(
    join(project.outdir, "package.json"),
    JSON.stringify(orig, undefined, 2)
  );

  pkg.addPeerDeps("ms");

  project.synth();

  const pkgFile = readJsonSync(join(project.outdir, "package.json"));

  expect(pkgFile.peerDependencies).toStrictEqual({ ms: "^1.3.4" });
  expect(pkgFile.devDependencies).toStrictEqual({ ms: "^1.3.0" });
});

test("devDependencies are not pinned by peerDependencies if a regular (runtime) dependency also exists", () => {
  // Post-synth dependency version resolution uses installed package from node_modules folder
  // Mock install command to add this folder with a fixed dependency version,
  // mimicking yarn installing the latest package for "*"
  jest.spyOn(util, "exec").mockImplementation((command, options) => {
    expect(command.startsWith("yarn install")).toBeTruthy();
    mockYarnInstall(options.cwd, { ms: "1.3.8" });
  });

  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project, {
    peerDependencyOptions: {
      pinnedDevDependency: true,
    },
  });

  pkg.addDeps("ms");
  pkg.addPeerDeps("ms");

  project.synth();

  const pkgFile = readJsonSync(join(project.outdir, "package.json"));

  expect(pkgFile.peerDependencies).toStrictEqual({ ms: "^1.3.8" });
  expect(pkgFile.dependencies).toStrictEqual({ ms: "^1.3.8" });
  expect(pkgFile.devDependencies).toBeUndefined();
});

test("devDependencies are not pinned by peerDependencies if pinnedDevDependency is false", () => {
  // Post-synth dependency version resolution uses installed package from node_modules folder
  // Mock install command to add this folder with a fixed dependency version,
  // mimicking yarn installing the latest package for "*"
  jest.spyOn(util, "exec").mockImplementation((command, options) => {
    expect(command.startsWith("yarn install")).toBeTruthy();
    mockYarnInstall(options.cwd, { ms: "1.4.0" });
  });

  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project, {
    peerDependencyOptions: {
      pinnedDevDependency: false,
    },
  });

  pkg.addPeerDeps("ms");

  project.synth();

  const pkgFile = readJsonSync(join(project.outdir, "package.json"));

  expect(pkgFile.peerDependencies).toStrictEqual({ ms: "^1.4.0" });
  expect(pkgFile.devDependencies).toBeUndefined();
});

test("file path dependencies are respected", () => {
  // Post-synth dependency version resolution uses installed package from node_modules folder
  // Mock install command to add this folder with a fixed dependency version,
  // mimicking yarn installing the latest package for "*"
  jest.spyOn(util, "exec").mockImplementation((command, options) => {
    expect(command.startsWith("yarn install")).toBeTruthy();
    mockYarnInstall(options.cwd, { ms: "file:../ms" });
  });

  const project = new Project({ name: "test" });
  const pkg = new NodePackage(project, {
    peerDependencyOptions: {
      pinnedDevDependency: false,
    },
  });

  pkg.addPeerDeps("ms@file:../ms");

  project.synth();

  const pkgFile = readJsonSync(join(project.outdir, "package.json"));

  expect(pkgFile.peerDependencies).toStrictEqual({ ms: "file:../ms" });
  expect(pkgFile.devDependencies).toBeUndefined();
});

test("local dependencies can be specified using 'file:' prefix", () => {
  // Post-synth dependency version resolution uses installed package from node_modules folder
  // Mock install command to add this folder with a fixed dependency version,
  // mimicking yarn installing the latest package for "*"
  jest.spyOn(util, "exec");
  const localDepPath = mkdtemp({ cleanup: false });
  const localPackage = {
    name: "local-dep",
    version: "0.0.0",
  };

  writeFileSync(
    join(localDepPath, "package.json"),
    JSON.stringify(localPackage, undefined, 2)
  );

  const project = new TestProject();
  const pkg = new NodePackage(project);
  pkg.addPeerDeps(`file:${localDepPath}`);

  project.synth();

  const pkgFile = readJsonSync(join(project.outdir, "package.json"));

  expect(pkgFile.peerDependencies).toStrictEqual({ "local-dep": localDepPath });
});
