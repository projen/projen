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
    mockedConsola.prompt
      .mockResolvedValueOnce("sample") // project name
      .mockResolvedValueOnce(NodePackageManager.NPM) // package manager
      .mockResolvedValueOnce("eslint") // linter
      .mockResolvedValueOnce("prettier") // formatter
      .mockResolvedValueOnce("jest"); // test tool

    // GIVEN
    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools({
      projectTypeName: "projen.javascript.NodeProject",
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
      placeholder: "my-project",
      default: "my-project",
      cancel: "reject",
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      2,
      "Choose a package manager",
      {
        type: "select",
        options: [
          { label: NodePackageManager.BUN, value: NodePackageManager.BUN },
          { label: NodePackageManager.NPM, value: NodePackageManager.NPM },
          { label: NodePackageManager.PNPM, value: NodePackageManager.PNPM },
          { label: NodePackageManager.YARN, value: NodePackageManager.YARN },
          {
            label: NodePackageManager.YARN_BERRY,
            value: NodePackageManager.YARN_BERRY,
          },
          {
            label: NodePackageManager.YARN_CLASSIC,
            value: NodePackageManager.YARN_CLASSIC,
          },
          { label: NodePackageManager.YARN2, value: NodePackageManager.YARN2 },
        ],
        cancel: "reject",
        initial: NodePackageManager.NPM,
      }
    );
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(3, "Choose a linter", {
      type: "select",
      options: [
        { label: "Biome", value: "biome" },
        { label: "ESLint", value: "eslint" },
        { label: "None", value: "undefined" },
      ],
      cancel: "reject",
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      4,
      "Choose a formatter",
      {
        type: "select",
        options: [
          { label: "Prettier", value: "prettier" },
          { label: "None", value: "undefined" },
        ],
        cancel: "reject",
      }
    );
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      5,
      "Choose a test tool",
      {
        type: "select",
        options: [
          { label: "Jest", value: "jest" },
          { label: "None", value: "undefined" },
        ],
        cancel: "reject",
      }
    );
  });

  test("when specified linter to biome, formatter will also be set biome ", async () => {
    mockedConsola.prompt
      .mockResolvedValueOnce("sample") // project name
      .mockResolvedValueOnce(NodePackageManager.NPM) // package manager
      .mockResolvedValueOnce("biome") // linter
      .mockResolvedValueOnce("jest"); // test tool

    // GIVEN
    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools({
      projectTypeName: "projen.javascript.NodeProject",
    });

    // THEN
    expect(result).toEqual({
      projectName: "sample",
      packageManager: "npm",
      linter: "biome",
      formatter: "biome",
      testTool: "jest",
    });
    expect(mockedConsola.prompt).toHaveBeenCalledTimes(4);
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(1, "Project name", {
      type: "text",
      placeholder: "my-project",
      default: "my-project",
      cancel: "reject",
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      2,
      "Choose a package manager",
      {
        type: "select",
        options: [
          { label: NodePackageManager.BUN, value: NodePackageManager.BUN },
          { label: NodePackageManager.NPM, value: NodePackageManager.NPM },
          { label: NodePackageManager.PNPM, value: NodePackageManager.PNPM },
          { label: NodePackageManager.YARN, value: NodePackageManager.YARN },
          {
            label: NodePackageManager.YARN_BERRY,
            value: NodePackageManager.YARN_BERRY,
          },
          {
            label: NodePackageManager.YARN_CLASSIC,
            value: NodePackageManager.YARN_CLASSIC,
          },
          { label: NodePackageManager.YARN2, value: NodePackageManager.YARN2 },
        ],
        cancel: "reject",
        initial: NodePackageManager.NPM,
      }
    );
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(3, "Choose a linter", {
      type: "select",
      options: [
        { label: "Biome", value: "biome" },
        { label: "ESLint", value: "eslint" },
        { label: "None", value: "undefined" },
      ],
      cancel: "reject",
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      4,
      "Choose a test tool",
      {
        type: "select",
        options: [
          { label: "Jest", value: "jest" },
          { label: "None", value: "undefined" },
        ],
        cancel: "reject",
      }
    );
  });

  test("handle items not selected (User pressed Ctrl+C or selected 'None') for all tools", async () => {
    mockedConsola.prompt
      .mockResolvedValueOnce("sample") // project name (default value)
      .mockResolvedValueOnce(NodePackageManager.NPM) // package manager (default value)
      .mockResolvedValueOnce("undefined") // linter selection
      .mockResolvedValueOnce("undefined") // formatter selection
      .mockResolvedValueOnce("undefined"); // test tool selection

    // GIVEN
    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools({
      projectTypeName: "projen.typescript.TypeScriptProject",
    });

    // THEN
    expect(result).toEqual({
      projectName: "sample",
      packageManager: "npm",
      linter: undefined,
      formatter: undefined,
      testTool: undefined,
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
    });

    // THEN
    expect(result).toBeUndefined();
  });

  describe("when user cancels the prompt, exit the process with code 1", () => {
    const mockExit = jest.spyOn(process, "exit");

    beforeEach(() => {
      mockExit.mockImplementation((code) => {
        throw new Error(`process.exit called with code ${code}`);
      });
    });

    test("when cancel input text", async () => {
      mockedConsola.prompt.mockRejectedValueOnce(new Error("Prompt cancelled")); // project name (simulate user cancelling the prompt)

      // GIVEN
      const cliPrompts = {
        selectJsTools: selectJsTools(interactiveCliPrompt),
      };

      // WHEN
      const promise = () =>
        cliPrompts.selectJsTools({
          projectTypeName: "projen.javascript.NodeProject",
        });

      // THEN
      await expect(promise()).rejects.toThrow(
        "process.exit called with code 1"
      );
      expect(mockExit).toHaveBeenCalledWith(1);

      mockExit.mockClear();
    });

    test("when cancel item selection", async () => {
      mockedConsola.prompt
        .mockResolvedValueOnce("sample") // project name
        .mockRejectedValueOnce(new Error("Prompt cancelled")); // package manager (simulate user cancelling the prompt)

      // GIVEN
      const cliPrompts = {
        selectJsTools: selectJsTools(interactiveCliPrompt),
      };

      // WHEN
      const promise = () =>
        cliPrompts.selectJsTools({
          projectTypeName: "projen.javascript.NodeProject",
        });

      // THEN
      await expect(promise()).rejects.toThrow(
        "process.exit called with code 1"
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });
});
