import { InteractiveCliPrompt } from "../core/interactive-cli-prompt";

type Linter = "eslint" | "none";

type Formatter = "prettier" | "none";

type TestTool = "jest" | "none";

export const selectJsTools =
  (interactiveCliPrompt: InteractiveCliPrompt) =>
  async (
    projectTypeName: string
  ): Promise<{
    linter: Linter;
    formatter: Formatter;
    testTool: TestTool;
  } | null> => {
    const projectType = projectTypeName.split(".")[0];
    if (!["typescript", "javascript"].includes(projectType)) {
      return null;
    }

    const linter = await interactiveCliPrompt.selectItem({
      message: "Choose a linter",
      items: [
        {
          label: "ESLint",
          value: "eslint",
        },
        { label: "None", value: "none" },
      ],
    });

    const formatter = await interactiveCliPrompt.selectItem({
      message: "Choose a formatter",
      items: [
        {
          label: "Prettier",
          value: "prettier",
        },
        { label: "None", value: "none" },
      ],
    });

    const testTool = await interactiveCliPrompt.selectItem({
      message: "Choose a test tool",
      items: [
        {
          label: "Jest",
          value: "jest",
        },
        { label: "None", value: "none" },
      ],
    });

    return {
      linter,
      formatter,
      testTool,
    };
  };
