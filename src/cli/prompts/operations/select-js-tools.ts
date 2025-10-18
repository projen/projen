import { NodePackageManager } from "../../../javascript";
import { InteractiveCliPrompt } from "../core/interactive-cli-prompt";

type Linter = "eslint" | "biome";

type Formatter = "prettier" | "biome";

type TestTool = "jest";

export const selectJsTools =
  (interactiveCliPrompt: InteractiveCliPrompt) =>
  async (args: {
    projectTypeName: string;
    packageName?: string;
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
    const { projectTypeName, packageName } = args;

    const projectType = projectTypeName.toLowerCase();
    if (
      !projectType.includes("typescript") &&
      !projectType.includes("javascript")
    ) {
      return undefined;
    }

    const projectName = await interactiveCliPrompt.inputText({
      message: "Project name",
      placeholder: packageName ?? "my-project",
      defaultVal: packageName ?? "my-project",
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
        {
          label: "Biome",
          value: "biome",
        },
        { label: "None", value: undefined },
      ],
    });

    const formatter =
      linter === "biome"
        ? "biome"
        : await interactiveCliPrompt.selectItem({
            message: "Choose a formatter",
            items: [
              {
                label: "Prettier",
                value: "prettier",
              },
              { label: "None", value: undefined },
            ],
          });

    const testTool = await interactiveCliPrompt.selectItem({
      message: "Choose a test tool",
      items: [
        {
          label: "Jest",
          value: "jest",
        },
        { label: "None", value: undefined },
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
