import { IS_TEST_RUN } from "../../common";
import {
  interactiveCliPrompt,
  interactiveCliPromptForTest,
} from "./external/interactive-cli-prompt";
import { selectJsTools } from "./usecase/select-js-tools";

export const cliPrompts = {
  selectJsTools: selectJsTools(
    IS_TEST_RUN ? interactiveCliPromptForTest : interactiveCliPrompt
  ),
};
