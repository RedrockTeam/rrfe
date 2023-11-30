import prompt from "prompts";
import { chooseTemplate } from "./chooseTemplate";
import path from "path";
import fs from "fs";
import { copy, toValidPackageName } from "./fs";
import { cyan, green } from "picocolors";

let result: prompt.Answers<
  "projectName" | "framework" | "language" | "styles" | "isUseLint" | "template"
>;
const cwd = process.cwd();
const defaultTargetDir = "redrock-project";
export async function init(
  project: string,
  questions: prompt.PromptObject<string>[]
) {
  try {
    result = await prompt(
      [
        {
          type: "text",
          name: "projectName",
          message: "Project name:",
          initial: project || defaultTargetDir,
        },
        ...questions,
      ],
      {
        onCancel: () => {
          throw new Error("Operation cancelled");
        },
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }
  const { projectName } = result;
  const root = path.join(cwd, projectName);
  fs.mkdirSync(root, { recursive: true });

  const renameFiles: Record<string, string> = {
    _gitignore: ".gitignore",
  };

  // 处理模板
  const templateType = chooseTemplate(result);
  const templateDir = path.resolve(__dirname, `../template/${templateType}`);
  const files = fs.readdirSync(templateDir);

  //写入操作
  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  //特殊处理package.json
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );

  pkg.name = toValidPackageName(projectName);

  write("package.json", JSON.stringify(pkg, null, 2) + "\n");
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  console.log(`⚡ ${green("complete work")} 🚀`);
  console.log(`Your project ${cyan(projectName)}`);
}
