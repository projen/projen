import { InteractiveCliPrompt } from "../core/interactive-cli-prompt";

type JsLinter = "eslint" | "biome" | "none";

export const selectJsTools =
  (interactiveCliPrompt: InteractiveCliPrompt) =>
  async (projectTypeName: string): Promise<{ linter: JsLinter } | null> => {
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
        { label: "Biome", value: "biome" },
        { label: "None", value: "none" },
      ],
    });

    return {
      linter,
    };
  };
