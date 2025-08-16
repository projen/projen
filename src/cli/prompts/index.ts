import { interactiveCliPrompt } from "./external/interactive-cli-prompt";
import { selectJsTools } from "./usecase/select-js-tools";

export const cliPrompts = {
  selectJsTools: selectJsTools(interactiveCliPrompt),
};
