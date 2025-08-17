import { consola } from "consola";
import { CliError } from "../../util";

export type SelectItemValue = string | number | boolean;

export interface InteractiveCliPrompt {
  inputText: (args: {
    message: string;
    placeholder?: string;
  }) => Promise<string>;
  selectItem: <T extends SelectItemValue>(args: {
    message: string;
    items: {
      label: string;
      value: T;
    }[];
  }) => Promise<T>;
}

export const interactiveCliPrompt: InteractiveCliPrompt = {
  async inputText(args) {
    return consola.prompt(args.message, {
      type: "text",
      placeholder: args.placeholder,
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

export const interactiveCliPromptForTest: InteractiveCliPrompt = {
  async inputText(_args) {
    return Promise.resolve("sample");
  },
  async selectItem<T extends SelectItemValue>(args: {
    message: string;
    items: { label: string; value: T }[];
  }): Promise<T> {
    return Promise.resolve(args.items[0].value as T);
  },
};
