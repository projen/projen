import { NodePackageManager } from "../../../javascript";
import { InteractiveCliPrompt } from "../core/interactive-cli-prompt";

type Linter = "eslint";

type Formatter = "prettier";

type TestTool = "jest";

export const selectJsTools =
  (interactiveCliPrompt: InteractiveCliPrompt) =>
  async (args: {
    projectTypeName: string;
    projectOptions?: {
      packageName?: string;
      linter?: "eslint";
      formatter?: "prettier";
      testTool?: "jest";
      packageManager?: NodePackageManager;
    };
  }): Promise<
    | {
        projectName: string;
        linter: Linter | undefined;
        formatter: Formatter | undefined;
        testTool: TestTool | undefined;
        packageManager: NodePackageManager;
      }
    | undefined
  > => {
    const { projectTypeName, projectOptions } = args;

    const projectType = projectTypeName.toLowerCase();
    if (
      !projectType.includes("typescript") &&
      !projectType.includes("javascript")
    ) {
      return undefined;
    }

    const projectName = await interactiveCliPrompt.inputText({
      message: "Project name",
      placeholder: projectOptions?.packageName ?? "my-project",
    });

    const packageManager =
      projectOptions?.packageManager ??
      (await interactiveCliPrompt.selectItem({
        message: "Choose a package manager",
        items: Object.entries(NodePackageManager).map(([_, val]) => ({
          label: val,
          value: val,
        })),
      }));

    const linter =
      projectOptions?.linter ??
      (await interactiveCliPrompt.selectItem({
        message: "Choose a linter",
        items: [
          {
            label: "ESLint",
            value: "eslint",
          },
          { label: "None", value: undefined },
        ],
      }));

    const formatter =
      projectOptions?.formatter ??
      (await interactiveCliPrompt.selectItem({
        message: "Choose a formatter",
        items: [
          {
            label: "Prettier",
            value: "prettier",
          },
          { label: "None", value: undefined },
        ],
      }));

    const testTool =
      projectOptions?.testTool ??
      (await interactiveCliPrompt.selectItem({
        message: "Choose a test tool",
        items: [
          {
            label: "Jest",
            value: "jest",
          },
          { label: "None", value: undefined },
        ],
      }));

    return {
      projectName,
      packageManager,
      linter,
      formatter,
      testTool,
    };
  };
