import {
  interactiveCliPrompt,
  interactiveCliPromptForCI,
} from "./external/interactive-cli-prompt";
import { selectJsTools } from "./usecase/select-js-tools";

export const cliPrompts = {
  selectJsTools: selectJsTools(
    process.env.CI ? interactiveCliPromptForCI : interactiveCliPrompt
  ),
};
