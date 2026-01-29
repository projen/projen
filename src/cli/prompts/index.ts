import { IS_TEST_RUN } from "../../common";
import {
  interactiveCliPrompt,
  interactiveCliPromptForTest,
} from "./core/interactive-cli-prompt";
import { selectJsTools } from "./operations/select-js-tools";

export const cliPrompts = {
  selectJsTools: selectJsTools(
    IS_TEST_RUN ? interactiveCliPromptForTest : interactiveCliPrompt
  ),
};
