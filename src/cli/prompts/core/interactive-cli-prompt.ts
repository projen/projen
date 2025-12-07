import { consola } from "consola";

type DefaultValue = string | number | boolean;
type SelectItemValue = DefaultValue | undefined | null;

type SelectItem<T extends SelectItemValue> = {
  label: string;
  value: T;
};

/**
 * Specify how to handle a cancelled prompt (e.g. by pressing Ctrl+C).
 *
 * - `"exit"` - Exit the process with code 1.
 */
type CancelOption = "exit";

export interface InteractiveCliPrompt {
  inputText: <Cancel extends CancelOption>(args: {
    message: string;
    cancel: Cancel extends "undefined" ? never : Cancel;
    /**
     * When specified "default" at `cancel` property, this property must be provided
     */
    defaultVal: Cancel extends "default" ? string : string | undefined;
    placeholder?: string;
  }) => Promise<string>;
  selectItem: <
    Item extends SelectItemValue,
    Cancel extends CancelOption,
    Default extends DefaultValue | undefined
  >(args: {
    message: string;
    items: SelectItem<Item>[];
    cancel: Cancel;
    /**
     * When specified "default" at `cancel` property, this property must be provided
     */
    defaultVal: Cancel extends "default" ? DefaultValue : Default | undefined;
    /**
     * When provided `defaultVal` property, this property must not be provide
     */
    withNoneOption?: Default extends undefined ? boolean : never;
  }) => Promise<Item>;
}

export const interactiveCliPrompt: InteractiveCliPrompt = {
  async inputText(args): Promise<string> {
    try {
      return (await consola.prompt(args.message, {
        type: "text",
        placeholder: args.placeholder,
        default: args.defaultVal,
        cancel: args.cancel !== "exit" ? args.cancel : "reject", // specify how to handle a cancelled prompt (e.g. when user presses `Ctrl+C`)
      })) as string;
    } catch {
      switch (args.cancel) {
        case "exit": {
          // when user cancels the prompt, exit the process with code 1
          process.exit(1);
        }
      }
    }
  },

  async selectItem<
    Item extends SelectItemValue,
    Cancel extends CancelOption,
    Default extends DefaultValue | undefined
  >(args: {
    message: string;
    items: SelectItem<Item>[];
    cancel: Cancel;
    defaultVal: Cancel extends "default" ? DefaultValue : Default | undefined;
    withNoneOption?: Default extends undefined ? boolean : never;
  }): Promise<Item> {
    const sortedOptions = args.items
      .map((item) => ({
        label: item.label,
        value: String(item.value),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    const noneOptions = args.withNoneOption
      ? [
          {
            label: "None",
            value: "undefined",
          },
        ]
      : [];

    try {
      const res = await consola.prompt(args.message, {
        cancel: args.cancel === "exit" ? "reject" : args.cancel, // specify how to handle a cancelled prompt (e.g. when user presses `Ctrl+C`)
        type: "select",
        options: [...sortedOptions, ...noneOptions],
        initial: args.defaultVal ? String(args.defaultVal) : undefined,
      });
      // when user selects "None", return undefined, otherwise return the selected value
      return res === "undefined" ? (undefined as Item) : (res as Item);
    } catch {
      switch (args.cancel) {
        case "exit": {
          // when user cancels the prompt, exit the process with code 1
          process.exit(1);
        }
      }
    }
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
