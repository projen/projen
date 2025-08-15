export type SelectItemValue = string | number | boolean;

export interface InteractiveCliPrompt {
  inputText: (args: {
    message: string;
    placeholder?: string;
    defaultVal?: string;
  }) => Promise<string>;
  selectItem: <T extends SelectItemValue>(args: {
    message: string;
    items: {
      label: string;
      value: T;
    }[];
  }) => Promise<T>;
}
