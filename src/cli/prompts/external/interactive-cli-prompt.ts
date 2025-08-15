import { consola } from "consola";
import { CliError } from "../../util";
import { InteractiveCliPrompt, SelectItemValue } from "../core/interactive-cli-prompt";

export const interactiveCliPrompt: InteractiveCliPrompt = {
  async inputText(args) {
    return await consola.prompt(args.message, {
      type: "text",
      placeholder: args.placeholder,
      default: args.defaultVal,
    });
  },
  async selectItem<T extends SelectItemValue>(args: {
    message: string;
    items: { label: string; value: T }[];
    defaultVal?: SelectItemValue;
  }): Promise<T> {
    const res = await consola.prompt(args.message, {
      type: "select",
      options: args.items.map((item) => ({
        label: item.label,
        value: String(item.value),
      })),
    });

    const selected = args.items.find((item) => String(item.value) === res);
    if (!selected) throw new CliError("No item selected.");
    return selected.value;
  },
};
