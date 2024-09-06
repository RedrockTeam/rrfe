import type { IResPrompt } from "./init";

export function chooseTemplate(result: IResPrompt) {
	if (result.toolChain === "biome") {
		return "biome";
	}
	const { framework, language, styles } = result;
	const templateType = `${framework}-${language}-${styles}`;
	return templateType;
}
