import { IResPrompt } from "./init";

export function chooseTemplate(result: IResPrompt) {
  if (result.toolChain === "biome") {
    return "biome";
  } else {
    const { framework, language, styles } = result;
    const templateType = framework + "-" + language + "-" + styles;
    return `${templateType}`;
  }
}
