import { TaskRuntime } from "../../src";
import {
  Eslint,
  EslintConfigFileFormat,
  NodeProject,
} from "../../src/javascript";
import { synthSnapshot } from "../util";

test("devdirs", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
  });

  // WHEN
  new Eslint(project, {
    devdirs: ["foo", "bar"],
    dirs: ["mysrc"],
    lintProjenRc: false,
  });

  // THEN
  expect(synthSnapshot(project)[".eslintrc.json"]).toMatchSnapshot();
});

describe("prettier", () => {
  test("snapshot", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    new Eslint(project, {
      dirs: ["mysrc"],
      prettier: true,
      lintProjenRc: false,
    });

    // THEN
    expect(synthSnapshot(project)[".eslintrc.json"]).toMatchSnapshot();
  });
});

describe("alias", () => {
  test("custom config", () => {
    // GIVEN
    const project = new NodeProject({
      name: "test",
      defaultReleaseBranch: "master",
    });

    // WHEN
    const eslint = new Eslint(project, {
      dirs: ["mysrc"],
      aliasMap: {
        "@src": "./src",
        "@foo": "./src/foo",
      },
      aliasExtensions: [".ts", ".js"],
      lintProjenRc: false,
    });

    // THEN
    expect(eslint.config.settings["import/resolver"].alias).toHaveProperty(
      "map",
      [
        ["@src", "./src"],
        ["@foo", "./src/foo"],
      ]
    );
    expect(eslint.config.settings["import/resolver"].alias).toHaveProperty(
      "extensions",
      [".ts", ".js"]
    );
  });
});

test("tsAlwaysTryTypes", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["mysrc"],
    tsAlwaysTryTypes: true,
    lintProjenRc: false,
  });

  // THEN
  expect(eslint.config.settings["import/resolver"].typescript).toHaveProperty(
    "alwaysTryTypes",
    true
  );
});

test("if the prettier is configured, eslint is configured accordingly", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".eslintrc.json"].extends).toContain(
    "plugin:prettier/recommended"
  );
});

test("can output yml instead of json", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    prettier: true,
  });

  // WHEN
  new Eslint(project, {
    dirs: ["src"],
    yaml: true,
    lintProjenRc: false,
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".eslintrc.yml"]).toBeDefined();
  expect(output[".eslintrc.json"]).toBeUndefined();
});

test("can output javascript ESM instead of json", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "main",
    prettier: true,
  });

  // WHEN
  new Eslint(project, {
    dirs: ["src"],
    fileFormat: EslintConfigFileFormat.JAVASCRIPT_FLAT_ESM,
    lintProjenRc: false,
  });

  // THEN
  const output = synthSnapshot(project);
  expect(output[".eslintrc.yml"]).toBeUndefined();
  expect(output[".eslintrc.json"]).toBeUndefined();
  expect(output[".eslintrc.mjs"]).toMatchInlineSnapshot(`
    "// ~~ Generated by projen. To modify, edit .projenrc.js and run "npx projen".
    import plugin_typescript_eslint from '@typescript-eslint';
    import plugin_import from 'import';
    export default {
      env: {
        jest: true,
        node: true,
      },
      root: true,
      plugins: {
        "@typescript-eslint": plugin_typescript_eslint,
        import: plugin_import,
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      extends: [
        "plugin:import/typescript",
        "plugin:prettier/recommended",
      ],
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [
            ".ts",
            ".tsx",
          ],
        },
        "import/resolver": {
          node: {},
          typescript: {
            project: "./tsconfig.json",
            alwaysTryTypes: true,
          },
        },
      },
      ignorePatterns: [
        "*.js",
        "*.d.ts",
        "node_modules/",
        "*.generated.ts",
        "coverage",
        "!.projenrc.js",
      ],
      rules: {
        "@typescript-eslint/no-require-imports": [
          "error",
        ],
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: [],
            optionalDependencies: false,
            peerDependencies: true,
          },
        ],
        "import/no-unresolved": [
          "error",
        ],
        "import/order": [
          "warn",
          {
            groups: [
              "builtin",
              "external",
            ],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
        ],
        "no-duplicate-imports": [
          "error",
        ],
        "no-shadow": [
          "off",
        ],
        "@typescript-eslint/no-shadow": [
          "error",
        ],
        "key-spacing": [
          "error",
        ],
        "no-multiple-empty-lines": [
          "error",
        ],
        "@typescript-eslint/no-floating-promises": [
          "error",
        ],
        "no-return-await": [
          "off",
        ],
        "@typescript-eslint/return-await": [
          "error",
        ],
        "no-trailing-spaces": [
          "error",
        ],
        "dot-notation": [
          "error",
        ],
        "no-bitwise": [
          "error",
        ],
        "@typescript-eslint/member-ordering": [
          "error",
          {
            default: [
              "public-static-field",
              "public-static-method",
              "protected-static-field",
              "protected-static-method",
              "private-static-field",
              "private-static-method",
              "field",
              "constructor",
              "method",
            ],
          },
        ],
      },
      overrides: [
        {
          files: [
            ".projenrc.js",
          ],
          rules: {
            "@typescript-eslint/no-require-imports": "off",
            "import/no-extraneous-dependencies": "off",
          },
        },
      ],
      "//": "~~ Generated by projen. To modify, edit .projenrc.js and run \\"npx projen\\".",
    };
    "
  `);
});

test("can override the parser", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });
  eslint.addOverride({
    files: ["*.json", "*.json5", "*.jsonc"],
    parser: "jsonc-eslint-parser",
  });
  const output = synthSnapshot(project);

  // THEN
  expect(output[".eslintrc.json"].overrides).toContainEqual({
    files: ["*.json", "*.json5", "*.jsonc"],
    parser: "jsonc-eslint-parser",
  });
});

test("creates a eslint task", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  // THEN
  const manifest = synthSnapshot(project)[TaskRuntime.MANIFEST_FILE];
  expect(eslint.eslintTask._renderSpec()).toMatchObject(manifest.tasks.eslint);
});

test("omit --ext when no extensions are specified", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
    fileExtensions: [],
  });

  // THEN
  const taskStep = eslint.eslintTask.steps[0];
  expect(taskStep.exec).not.toContain("--ext");
  expect(taskStep?.args ?? []).not.toContain(expect.stringContaining("--ext"));
});

test("add --ext when extensions are specified", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  // THEN
  const taskStep = eslint.eslintTask.steps[0];
  expect(taskStep.exec).toContain("--ext");
});

test("allow modification of the eslint task", () => {
  // GIVEN
  const project = new NodeProject({
    name: "test",
    defaultReleaseBranch: "master",
    prettier: true,
  });

  // WHEN
  const eslint = new Eslint(project, {
    dirs: ["src"],
    lintProjenRc: false,
  });

  const taskStep = eslint.eslintTask.steps[0];
  const newTestArg = "--foo";
  eslint.eslintTask.reset(taskStep.exec, { args: [newTestArg] });

  eslint.addLintPattern("bar");

  // THEN
  expect(eslint.eslintTask.steps[0].args).toContain(newTestArg);
});
