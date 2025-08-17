import { consola } from "consola";
import { interactiveCliPrompt } from "../src/cli/prompts/external/interactive-cli-prompt";
import { selectJsTools } from "../src/cli/prompts/usecase/select-js-tools";

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

  test("prompts user for linter, formatter, and test tool choices", async () => {
    // GIVEN
    mockedConsola.prompt
      .mockResolvedValueOnce("eslint")
      .mockResolvedValueOnce("prettier")
      .mockResolvedValueOnce("jest");

    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools(
      "projen.javascript.NodeProject"
    );

    // THEN
    expect(result).toEqual({
      linter: "eslint",
      formatter: "prettier",
      testTool: "jest",
    });
    expect(mockedConsola.prompt).toHaveBeenCalledTimes(3);
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(1, "Choose a linter", {
      type: "select",
      options: [
        { label: "ESLint", value: "eslint" },
        { label: "None", value: "none" },
      ],
    });
    expect(mockedConsola.prompt).toHaveBeenNthCalledWith(
      2,
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
      3,
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
      .mockResolvedValueOnce("none") // linter selection
      .mockResolvedValueOnce("none") // formatter selection
      .mockResolvedValueOnce("none"); // test tool selection

    const cliPrompts = {
      selectJsTools: selectJsTools(interactiveCliPrompt),
    };

    // WHEN
    const result = await cliPrompts.selectJsTools(
      "projen.typescript.TypeScriptProject"
    );

    // THEN
    expect(result).toEqual({
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
    const result = await cliPrompts.selectJsTools(
      "projen.python.PythonProject"
    );

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
      cliPrompts.selectJsTools("projen.javascript.NodeProject")
    ).rejects.toThrow("No item selected.");
  });
});
