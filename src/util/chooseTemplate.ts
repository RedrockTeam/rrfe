import prompt from "prompts";

export function chooseTemplate(
  result: prompt.Answers<
    | "projectName"
    | "framework"
    | "language"
    | "styles"
    | "isUseLint"
    | "template"
  >
) {
  const { framework, language, styles } = result;
  const templateType = framework + "-" + language + "-" + styles;
  return `${templateType}`;
}
