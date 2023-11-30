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
  const { framework, language, styles, template } = result;
  let templateType = framework + "-" + language + "-" + styles;

  // if (isUseTailwind) {
  //   templateType += "-tw";
  // } else {
  //   templateType += "";
  // }

  // templateType += "-" + template;
  console.log(templateType);
  return `${templateType}`;
}
