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
 * - `"default"` - Resolve the promise with the `default` value.
 * - `"undefined`" - Resolve the promise with `undefined`.
 */
type CancelOption = "default" | "undefined";

export interface InteractiveCliPrompt {
  inputText: <Cancel extends CancelOption>(args: {
    message: string;
    cancel: Cancel;
    /**
     * When specified "default" at `cancel` property, this property must be specified
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
     * When specified "default" at `cancel` property, DefaultValue must be provided
     */
    defaultVal: Cancel extends "default" ? DefaultValue : Default | undefined;
    /**
     * When Default is provided, withNoneOption cannot be provided
     */
    withNoneOption?: Default extends undefined ? boolean : never;
  }) => Promise<Item>;
}

export const interactiveCliPrompt: InteractiveCliPrompt = {
  async inputText(args): Promise<string> {
    return consola.prompt(args.message, {
      type: "text",
      placeholder: args.placeholder,
      default: args.defaultVal,
      cancel: args.cancel,
    }) as Promise<string>;
  },

  async selectItem<
    Item extends SelectItemValue,
    Cancel extends CancelOption,
    Default extends DefaultValue | undefined
  >(args: {
    message: string;
    items: SelectItem<Item>[];
    defaultVal: Cancel extends "default" ? DefaultValue : Default;
    withNoneOption?: Default extends undefined ? boolean : never;
    cancel: Cancel;
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

    const res = await consola.prompt(args.message, {
      cancel: args.cancel,
      type: "select",
      options: [...sortedOptions, ...noneOptions],
      initial: args.defaultVal ? String(args.defaultVal) : undefined,
    });

    const selected = args.items.find((item) => String(item.value) === res);
    if (selected) return selected.value;

    // When items not selected (User pressed Ctrl+C or selected "None" option)
    switch (args.cancel) {
      case "default":
        return (args.defaultVal ?? undefined) as Item;
      case "undefined":
        return undefined as Item;
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
