import prompt from "prompts";

import { IResPrompt } from "./init";

export function chooseTemplate(result: IResPrompt) {
  if (result.toolChain === "biome") {
    return "biome";
  } else {
    const { framework, language, styles } = result as prompt.Answers<
      | "projectName"
      | "framework"
      | "language"
      | "styles"
      | "template"
      | "REPO_NAME"
      | "toolChain"
    >;
    const templateType = framework + "-" + language + "-" + styles;
    return `${templateType}`;
  }
}
