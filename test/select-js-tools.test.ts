import { consola } from "consola";
import { interactiveCliPrompt } from "../src/cli/prompts/core/interactive-cli-prompt";
import { selectJsTools } from "../src/cli/prompts/operations/select-js-tools";
import { NodePackageManager } from "../src/javascript";

jest.mock("consola", () => ({
  consola: {
    prompt: jest.fn(),
  },
}));

describe("selectJsTools", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedConsola = consola as jest.Mocked<typeof consola>;

  test("prompts user for project name, package manager, linter, formatter, and test tool choices", async () => {
    // GIVEN
    mockedConsola.prompt
      .mockResolvedValueOnce("sample") // project name
      .mockResolvedValueOnce("npm") // package manager
      .mockResolvedValueOnce("eslint") // linter
      .mockResolvedValueOnce("prettier") // formatter
      .mockResolvedValueOnce("jest"); // test tool

    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools({
      projectTypeName: "projen.javascript.NodeProject",
      defaultProjectName: "my-js-project",
    });

    // THEN
    expect(result).toEqual({
      projectName: "sample",
      packageManager: "npm",
      linter: "eslint",
      formatter: "prettier",
      testTool: "jest",
    });
    expect(mockedConsola.prompt).toHaveBeenCalledTimes(5);
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(1, "Project name", {
      type: "text",
      placeholder: "my-js-project",
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      2,
      "Choose a package manager",
      {
        type: "select",
        options: [
          { label: NodePackageManager.YARN, value: NodePackageManager.YARN },
          { label: NodePackageManager.YARN2, value: NodePackageManager.YARN2 },
          {
            label: NodePackageManager.YARN_CLASSIC,
            value: NodePackageManager.YARN_CLASSIC,
          },
          {
            label: NodePackageManager.YARN_BERRY,
            value: NodePackageManager.YARN_BERRY,
          },
          { label: NodePackageManager.NPM, value: NodePackageManager.NPM },
          { label: NodePackageManager.PNPM, value: NodePackageManager.PNPM },
          { label: NodePackageManager.BUN, value: NodePackageManager.BUN },
        ],
      }
    );
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(3, "Choose a linter", {
      type: "select",
      options: [
        { label: "ESLint", value: "eslint" },
        { label: "None", value: "none" },
      ],
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      4,
      "Choose a formatter",
      {
        type: "select",
        options: [
          { label: "Prettier", value: "prettier" },
          { label: "None", value: "none" },
        ],
      }
    );
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      5,
      "Choose a test tool",
      {
        type: "select",
        options: [
          { label: "Jest", value: "jest" },
          { label: "None", value: "none" },
        ],
      }
    );
  });

  test("handles user selecting 'none' for all tools", async () => {
    // GIVEN
    mockedConsola.prompt
      .mockResolvedValueOnce("sample") // project name
      .mockResolvedValueOnce("npm") // package manager
      .mockResolvedValueOnce("none") // linter selection
      .mockResolvedValueOnce("none") // formatter selection
      .mockResolvedValueOnce("none"); // test tool selection

    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools({
      projectTypeName: "projen.typescript.TypeScriptProject",
      defaultProjectName: "my-js-project",
    });

    // THEN
    expect(result).toEqual({
      projectName: "sample",
      packageManager: "npm",
      linter: "none",
      formatter: "none",
      testTool: "none",
    });
  });

  test("returns undefined for non-JS project types", async () => {
    // GIVEN
    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools({
      projectTypeName: "projen.python.PythonProject",
      defaultProjectName: "my-python-project",
    });

    // THEN
    expect(result).toBeUndefined();
  });

  test("throws error when user cancels prompt", async () => {
    // GIVEN
    mockedConsola.prompt.mockResolvedValueOnce(null as any);

    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    // THEN
    await expect(
      cliPrompts.selectJsTools({
        projectTypeName: "projen.javascript.NodeProject",
        defaultProjectName: "my-js-project",
      })
    ).rejects.toThrow("No item selected.");
  });
});
