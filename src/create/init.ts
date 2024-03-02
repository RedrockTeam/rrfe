import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { cyan, green } from "picocolors";
import { red } from "picocolors";
import prompt from "prompts";
import { fileURLToPath } from "url";

import { chooseTemplate } from "./chooseTemplate";
import { copy, toValidPackageName, updateBaseUrl, updateCI } from "./fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

let result: prompt.Answers<
  | "projectName"
  | "framework"
  | "language"
  | "styles"
  | "isUseLint"
  | "template"
  | "REPO_NAME"
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
        {
          type: "text",
          name: "REPO_NAME",
          message: "REPO_NAME:",
          initial: (prev) => {
            if (fs.existsSync(path.join(cwd, prev))) {
              console.log(
                `there is a folder name ${red(prev)} ,please delete by yourself`
              );
              process.exit(1);
            }

            return prev;
          },
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
  const { REPO_NAME } = result;
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
  //处理ci文件

  updateCI(root, REPO_NAME);

  //处理vite的base-url
  updateBaseUrl(root, REPO_NAME);

  //进行一次git提交

  process.chdir(`./${projectName}`);
  execSync("git init", { stdio: "ignore" });
  execSync("git add .", { stdio: "ignore" });
  execSync('git commit -m "feat: redrock-project init"', { stdio: "ignore" });

  console.log(`⚡ ${green("complete work")} 🚀`);
  console.log(`Your project ${cyan(projectName)}`);
}
