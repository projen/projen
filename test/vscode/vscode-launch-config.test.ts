import { InternalConsoleOptions } from "../../src/vscode";
import { synthSnapshot, TestProject } from "../util";

const VSCODE_DEBUGGER_FILE = ".vscode/launch.json";

test("empty launch configuration", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  project.vscode?.launchConfiguration;

  // THEN
  expect(synthSnapshot(project)[VSCODE_DEBUGGER_FILE]).toStrictEqual({
    "//": expect.anything(),
    version: "0.2.0",
    configurations: [],
  });
});

test("adding a launch configuration entry", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  const launchConfig = project.vscode?.launchConfiguration;
  launchConfig?.addConfiguration({
    type: "node",
    request: "launch",
    name: "CDK Debugger",
    skipFiles: ["<node_internals>/**"],
    runtimeArgs: ["-r", "./node_modules/ts-node/register/transpile-only"],
    args: ["${workspaceFolder}/src/main.ts"],
  });

  // THEN
  expect(synthSnapshot(project)[VSCODE_DEBUGGER_FILE]).toStrictEqual({
    "//": expect.anything(),
    version: "0.2.0",
    configurations: [
      {
        type: "node",
        request: "launch",
        name: "CDK Debugger",
        skipFiles: ["<node_internals>/**"],
        runtimeArgs: ["-r", "./node_modules/ts-node/register/transpile-only"],
        args: ["${workspaceFolder}/src/main.ts"],
      },
    ],
  });
});

test("adding multiple launch configuration entries", () => {
  // GIVEN
  const project = new TestProject();

  // WHEN
  const launchConfig = project.vscode?.launchConfiguration;
  launchConfig?.addConfiguration({
    type: "node",
    request: "launch",
    name: "CDK Debugger",
    skipFiles: ["<node_internals>/**"],
    runtimeArgs: ["-r", "./node_modules/ts-node/register/transpile-only"],
    args: ["${workspaceFolder}/src/main.ts"],
  });

  launchConfig?.addConfiguration({
    type: "node",
    request: "launch",
    name: "Launch Program",
    skipFiles: ["<node_internals>/**"],
    program: "${workspaceFolder}/lib/index.js",
    preLaunchTask: "tsc: build - tsconfig.json",
    outFiles: ["${workspaceFolder}/lib/**/*.js"],
    internalConsoleOptions: InternalConsoleOptions.OPEN_ON_SESSION_START,
  });

  launchConfig?.addConfiguration({
    type: "pwa-chrome",
    request: "launch",
    name: "Launch Chrome against localhost",
    url: "http://localhost:8080",
    webRoot: "${workspaceFolder}",
    debugServer: 4711,
  });

  // THEN
  expect(synthSnapshot(project)[VSCODE_DEBUGGER_FILE]).toStrictEqual({
    "//": expect.anything(),
    version: "0.2.0",
    configurations: [
      {
        type: "node",
        request: "launch",
        name: "CDK Debugger",
        skipFiles: ["<node_internals>/**"],
        runtimeArgs: ["-r", "./node_modules/ts-node/register/transpile-only"],
        args: ["${workspaceFolder}/src/main.ts"],
      },
      {
        type: "node",
        request: "launch",
        name: "Launch Program",
        skipFiles: ["<node_internals>/**"],
        program: "${workspaceFolder}/lib/index.js",
        preLaunchTask: "tsc: build - tsconfig.json",
        outFiles: ["${workspaceFolder}/lib/**/*.js"],
        internalConsoleOptions: "openOnSessionStart",
      },
      {
        type: "pwa-chrome",
        request: "launch",
        name: "Launch Chrome against localhost",
        url: "http://localhost:8080",
        webRoot: "${workspaceFolder}",
        debugServer: 4711,
      },
    ],
  });
});
