import { join } from "path";
import {
  BundleLogLevel,
  Bundler,
  BundlerOptions,
  NodeProject,
  RunBundleTask,
  SourceMapMode,
} from "../../src/javascript";
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
    tsconfigPath: "tsconfig.dev.json",
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
        exec: 'esbuild --bundle ./src/foo/world.ts --target="node18" --platform="node" --outfile="assets/foo/world/index.js" --tsconfig="tsconfig.dev.json" --external:aws-sdk --external:request --sourcemap',
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

test("sourcemaps can be set to EXTERNAL", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node12",
    sourceMapMode: SourceMapMode.EXTERNAL,
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  expect(tasks["bundle:hello"]).toStrictEqual({
    description: "Create a JavaScript bundle from ./src/hello.ts",
    name: "bundle:hello",
    steps: [
      {
        exec: 'esbuild --bundle ./src/hello.ts --target="node12" --platform="node" --outfile="assets/hello/index.js" --sourcemap=external',
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

test("format can be set to esm", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node18",
    sourcemap: false,
    format: "esm",
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  const bundleCommand = tasks["bundle:hello"].steps[0].exec;
  const watchCommand = tasks["bundle:hello:watch"].steps[0].exec;
  expect(bundleCommand).toContain("--format=esm");
  expect(watchCommand).toContain("--format=esm");
});

test("define, minify, sourcesContent, logLevel, keepNames, metafile, banner, footer, mainFields, inject", () => {
  const p = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
  });

  p.bundler.addBundle("./src/hello.ts", {
    platform: "node",
    target: "node18",
    sourcemap: true,
    format: "esm",
    define: {
      "process.env.NODE_ENV": "production",
    },
    minify: true,
    sourcesContent: true,
    logLevel: BundleLogLevel.INFO,
    keepNames: true,
    metafile: true,
    banner: '/* "banner" */',
    footer: "/* 'footer' */",
    mainFields: ["module", "main"],
    inject: ["./inject.js"],
    esbuildArgs: {
      "--log-limit": "0",
      "--true": true,
      "--true-string": "true",
      "--empty-string": "",
    },
  });

  const snapshot = Testing.synth(p);
  const tasks = snapshot[".projen/tasks.json"].tasks;

  const bundleCommand = tasks["bundle:hello"].steps[0].exec;
  const watchCommand = tasks["bundle:hello:watch"].steps[0].exec;

  for (const command of [bundleCommand, watchCommand]) {
    expect(command).toMatch(/ --define:process.env.NODE_ENV="production"( |$)/);
    expect(command).toMatch(/ --minify( |$)/);
    expect(command).toMatch(/ --sourcemap( |$)/);
    expect(command).toMatch(/ --sources-content=true( |$)/);
    expect(command).toMatch(/ --log-level=info( |$)/);
    expect(command).toMatch(/ --keep-names( |$)/);
    expect(command).toMatch(
      `--metafile=${join(p.bundler.bundledir, "hello", "index.meta.json")}`,
    );
    expect(command).toMatch('--banner:js="/* \\"banner\\" */"');
    expect(command).toMatch("--footer:js=\"/* 'footer' */\"");
    expect(command).toMatch(/ --main-fields=module,main( |$)/);
    expect(command).toContain("--inject:./inject.js");
    expect(command).toMatch(/ --log-limit="0"( |$)/);
    expect(command).toMatch(/--true( |$)/);
    expect(command).toMatch(/ --true-string="true"( |$)/);
    expect(command).toMatch(/--empty-string( |$)/);
  }
});

test.each([
  [
    {
      runBundleTask: RunBundleTask.PRE_COMPILE,
    },
    true,
    false,
  ],

  [
    {
      runBundleTask: RunBundleTask.POST_COMPILE,
    },
    false,
    true,
  ],

  [
    {
      runBundleTask: RunBundleTask.MANUAL,
    },
    false,
    false,
  ],

  // DEFAULT: `addToPreCompile` was true by default
  [{}, true, false],

  // `addToPreCompile` set to false - same as RunBundleTask.MANUAL
  [
    {
      addToPreCompile: false,
    },
    false,
    false,
  ],
])(
  "runBundleTask works as expected with options %p",
  (bundlerOptions: BundlerOptions, expectPre: boolean, expectPost: boolean) => {
    const p = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
      bundlerOptions,
    });

    p.bundler.addBundle("./lib/hello.js", {
      platform: "node",
      target: "node18",
      sourcemap: false,
      format: "esm",
    });

    const snapshot = Testing.synth(p);
    const tasks = snapshot[".projen/tasks.json"].tasks;

    const preCompilationSteps = tasks["pre-compile"].steps;
    const postCompilationSteps = tasks["post-compile"].steps;

    if (expectPre) {
      expect(preCompilationSteps).toContainEqual({ spawn: "bundle" });
    } else {
      expect(preCompilationSteps).toBeUndefined();
    }

    if (expectPost) {
      expect(postCompilationSteps).toContainEqual({ spawn: "bundle" });
    } else {
      expect(postCompilationSteps).toBeUndefined();
    }
  },
);

test.each([true, false])(
  "executable: %p works as expected",
  (executable: boolean) => {
    const p = new NodeProject({
      name: "test",
      defaultReleaseBranch: "main",
    });

    p.bundler.addBundle("./lib/hello.js", {
      platform: "node",
      target: "node18",
      sourcemap: false,
      format: "esm",
      executable,
      outfile: "hello.js",
    });

    const snapshot = Testing.synth(p);

    const tasks = snapshot[".projen/tasks.json"].tasks;

    const bundleTask = tasks["bundle:lib/hello"];
    if (executable) {
      expect(bundleTask.steps).toContainEqual({
        exec: expect.stringContaining("chmod +x"),
      });
    } else {
      expect(bundleTask.steps).not.toContainEqual({
        exec: expect.stringContaining("chmod +x"),
      });
    }
  },
);
