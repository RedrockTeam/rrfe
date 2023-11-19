import prompt from "prompts";

export function chooseTemplate(
  result: prompt.Answers<
    | "projectName"
    | "framework"
    | "isUseTs"
    | "isUseTailwind"
    | "isUseLint"
    | "template"
  >
) {
  const { framework, isUseTs, isUseTailwind, isUseLint, template } = result;
  let templateType = framework;
  if (isUseTs) {
    templateType += "-ts";
  } else {
    templateType += "-js";
  }

  if (isUseTailwind) {
    templateType += "-tw";
  } else {
    templateType += "-css";
  }

  templateType += "-" + template;
  console.log(templateType);
  return `${templateType}`;
}
