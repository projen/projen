import { Bundler, NodeProject } from "../../src/javascript";
import { renderBundleName } from "../../src/javascript/util";
import { Testing } from "../../src/testing";

test("node projects have a bundler", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  expect(Bundler.of(p)).not.toBeUndefined();
  expect(p.bundler).toEqual(Bundler.of(p));
  expect(p.deps.all.find((d) => d.name === "esbuild")).toBeUndefined(); // no "esbuild" dependency
});

test("There is no bundle task by default", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  expect(p.tasks.tryFind("bundle")).toBeUndefined();
});

test("bundler.addBundle() defines a bundle", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  const hello = p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node16",
  });

  const world = p.bundler.addBundle("./src/foo/world.ts", {
    platform: "node",
    target: "node18",
    externals: ["aws-sdk", "request"],
    sourcemap: true,
  });

  // THEN
  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  expect(hello.outfile).toStrictEqual("assets/hello/index.js");
  expect(world.outfile).toStrictEqual("assets/foo/world/index.js");

  // aggregated "bundle" task spawns all bundle tasks
  expect(tasks.bundle).toStrictEqual({
    description: "Prepare assets",
    name: "bundle",
    steps: [{ spawn: "bundle:hello" }, { spawn: "bundle:foo/world" }],
  });

  // "compile" task spawns the aggregate "bundle" task
  expect(tasks["pre-compile"].steps).toStrictEqual([
    {
      spawn: "bundle",
    },
  ]);

  expect(tasks["bundle:hello"]).toStrictEqual({
    description: "Create a JavaScript bundle from ./src/hello.ts",
    name: "bundle:hello",
    steps: [
      {
        exec: 'esbuild --bundle ./src/hello.ts --target="node16" --platform="node" --outfile="assets/hello/index.js"',
      },
    ],
  });

  expect(tasks["bundle:foo/world"]).toStrictEqual({
    description: "Create a JavaScript bundle from ./src/foo/world.ts",
    name: "bundle:foo/world",
    steps: [
      {
        exec: 'esbuild --bundle ./src/foo/world.ts --target="node18" --platform="node" --outfile="assets/foo/world/index.js" --external:aws-sdk --external:request --sourcemap',
      },
    ],
  });
});

test("no specific esbuild version by default", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  p.bundler.addBundle("./src/index.ts", {
    platform: "node",
    target: "node12",
  });

  const snapshot = Testing.synth(p);
  const deps = snapshot[".projen/deps.json"].dependencies;

  expect(deps.find((d: any) => d.name === "esbuild")).toStrictEqual({
    name: "esbuild",
    type: "build",
  });
});

test('esbuildVersion can be used to specify version requirement for "esbuild"', () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    bundlerOptions: {
      esbuildVersion: "^3",
    },
  });

  p.bundler.addBundle("./src/index.ts", {
    platform: "node",
    target: "node12",
  });

  const snapshot = Testing.synth(p);
  const deps = snapshot[".projen/deps.json"].dependencies;

  expect(deps.find((d: any) => d.name === "esbuild")).toStrictEqual({
    name: "esbuild",
    type: "build",
    version: "^3",
  });
});

test("sourcemaps can be disabled", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node12",
    sourcemap: false,
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  expect(tasks["bundle:hello"]).toStrictEqual({
    description: "Create a JavaScript bundle from ./src/hello.ts",
    name: "bundle:hello",
    steps: [
      {
        exec: 'esbuild --bundle ./src/hello.ts --target="node12" --platform="node" --outfile="assets/hello/index.js"',
      },
    ],
  });
});

describe("bundle:watch", () => {
  test("a bundle:xyz:watch task is added by default", () => {
    const p = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });

    p.bundler.addBundle("./src/hello.ts", {
      platform: "node",
      target: "node12",
    });

    const snapshot = Testing.synth(p);
    const tasks = snapshot[".projen/tasks.json"].tasks;

    expect(tasks["bundle:hello:watch"]).toStrictEqual({
      description:
        "Continuously update the JavaScript bundle from ./src/hello.ts",
      name: "bundle:hello:watch",
      steps: [
        {
          exec: 'esbuild --bundle ./src/hello.ts --target="node12" --platform="node" --outfile="assets/hello/index.js" --watch',
        },
      ],
    });
  });

  test("watch can be disabled", () => {
    const p = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });

    p.bundler.addBundle("./src/index.ts", {
      platform: "node",
      target: "node12",
      watchTask: false,
    });

    const snapshot = Testing.synth(p);
    const tasks = snapshot[".projen/tasks.json"].tasks;

    expect(tasks["bundle:hello:watch"]).toBeUndefined();
  });
});

test("bundledir controls the root output directory", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    bundlerOptions: {
      assetsDir: "resources",
    },
  });

  const bundle = p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node12",
    watchTask: false,
  });

  expect(bundle.outfile).toStrictEqual("resources/hello/index.js");
});

test("renderBundleName", () => {
  expect(renderBundleName("src/foo.lambda.ts")).toBe("foo.lambda");
  expect(renderBundleName("nosrc/foo.lambda.ts")).toBe("nosrc/foo.lambda");
  expect(renderBundleName("src/bar/foo.lambda.ts")).toBe("bar/foo.lambda");
});

test("loaders can be configured via bundlerOptions", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    bundlerOptions: {
      esbuildVersion: "^3",
      loaders: {
        txt: "text", // Adds a loader for txt files
      },
    },
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node12",
    sourcemap: false,
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  const bundleCommand = tasks["bundle:hello"].steps[0].exec;
  const watchCommand = tasks["bundle:hello:watch"].steps[0].exec;
  expect(bundleCommand).toContain("--loader:.txt=text");
  expect(watchCommand).toContain("--loader:.txt=text");
});

test("loaders can be configured via addBundle", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    bundlerOptions: {
      esbuildVersion: "^3",
    },
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node12",
    sourcemap: false,
    loaders: {
      txt: "text", // Adds a loader for txt files
    },
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  const bundleCommand = tasks["bundle:hello"].steps[0].exec;
  const watchCommand = tasks["bundle:hello:watch"].steps[0].exec;
  expect(bundleCommand).toContain("--loader:.txt=text");
  expect(watchCommand).toContain("--loader:.txt=text");
});

test("loaders configured via addBundle overwrite bundlerOptions", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    bundlerOptions: {
      esbuildVersion: "^3",
      loaders: {
        txt: "some-loader",
      },
    },
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node12",
    sourcemap: false,
    loaders: {
      txt: "text",
    },
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  const bundleCommand = tasks["bundle:hello"].steps[0].exec;
  const watchCommand = tasks["bundle:hello:watch"].steps[0].exec;
  expect(bundleCommand).toContain("--loader:.txt=text");
  expect(bundleCommand).toContain("--loader:.txt=text");
  expect(watchCommand).not.toContain("--loader:.txt=some-loader");
  expect(watchCommand).not.toContain("--loader:.txt=some-loader");
});
