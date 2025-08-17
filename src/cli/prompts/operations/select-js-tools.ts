import { NodePackageManager } from "../../../javascript";
import { InteractiveCliPrompt } from "../core/interactive-cli-prompt";

type Linter = "eslint" | "none";

type Formatter = "prettier" | "none";

type TestTool = "jest" | "none";

export const selectJsTools =
  (interactiveCliPrompt: InteractiveCliPrompt) =>
  async (args: {
    projectTypeName: string;
    defaultProjectName: string;
  }): Promise<
    | {
        projectName: string;
        linter: Linter;
        formatter: Formatter;
        testTool: TestTool;
        packageManager: NodePackageManager;
      }
    | undefined
  > => {
    const { projectTypeName, defaultProjectName } = args;

    const projectType = projectTypeName.toLowerCase();
    if (
      !projectType.includes("typescript") &&
      !projectType.includes("javascript")
    ) {
      return undefined;
    }

    const projectName = await interactiveCliPrompt.inputText({
      message: "Project name",
      placeholder: defaultProjectName,
    });

    const packageManager = await interactiveCliPrompt.selectItem({
      message: "Choose a package manager",
      items: Object.entries(NodePackageManager).map(([_, val]) => ({
        label: val,
        value: val,
      })),
    });

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
      projectName,
      packageManager,
      linter,
      formatter,
      testTool,
    };
  };
