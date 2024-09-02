import { execSync } from "child_process";
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import picocolors from "picocolors";
import prompt from "prompts";
import { fileURLToPath } from "url";

import { chooseTemplate } from "./chooseTemplate";
import {
  assembleTemplate,
  copy,
  toValidPackageName,
  updateBaseUrl,
  updateCi,
  updateTailwind,
} from "./fs";
import { blue } from "picocolors";
import { initGit } from "./git";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { cyan, green, magenta, red, yellow } = picocolors;

export type IResPrompt = prompt.Answers<
  | "projectName"
  | "framework"
  | "language"
  | "styles"
  | "template"
  | "repoName"
  | "toolChain"
>;

let result: IResPrompt;

const cwd = process.cwd();
const defaultTargetDir = "redrock-project";

export async function init(project: string) {
  try {
    const skipSelect = (_, res) =>
      res.toolChain === "biome" || res?.framework === "vue" ? null : "select";

    result = (await prompt(
      [
        {
          type: "text",
          name: "projectName",
          message: "Project name:",
          initial: project || defaultTargetDir,
        },
        {
          type: "text",
          name: "repoName",
          message: "Repo name",
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
        {
          type: "select",
          name: "toolChain",
          message: "Select a toolChain:",
          choices: [
            {
              title: yellow("biome(尝鲜版)"),
              value: "biome",
            },
            { title: magenta("eslint + prettier"), value: "eslint + prettier" },
          ],
        },
        {
          type: skipSelect,
          name: "framework",
          message: "Select a framework:",
          choices: [
            {
              title: blue("react"),
              value: "react",
            },
            { title: green("vue"), value: "vue" },
          ],
        },
        {
          type: skipSelect,
          name: "language",
          message: `Select a Language:`,
          choices: [
            {
              title: blue("typescript"),
              value: "ts",
            },
            { title: yellow("javascript"), value: "js" },
          ],
        },
        {
          type: skipSelect,
          name: "styles",
          message: `Select a Styles Frameworks`,
          choices: [
            {
              title: blue("tailwind"),
              value: "tailwind",
            },
            { title: green("less"), value: "less" },
            {
              title: yellow("css"),
              value: "css",
            },
          ],
        },
      ],
      {
        onCancel: () => {
          throw new Error("Operation cancelled");
        },
      }
    )) as any as IResPrompt;
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  if (result?.framework === "vue") {
    const { status } = spawn.sync(
      "pnpm",
      ["create", "vue@latest", result.projectName],
      {
        stdio: "inherit",
      }
    );

    process.exit(status ?? 0);
  }

  const { projectName, repoName } = result;
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

  //处理package.json
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );

  pkg.name = toValidPackageName(projectName);

  write("package.json", JSON.stringify(pkg, null, 2) + "\n");
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  // 组装操作
  if (result.toolChain !== "biome") {
    assembleTemplate(templateDir, result);
  }
  if (result.styles === "tailwind") {
    updateTailwind(projectName);
  }

  //处理vite的base-url 和 ci 的REPO_NAME

  updateBaseUrl(root, repoName);
  updateCi(projectName, repoName);

  initGit(projectName);

  console.log(`⚡ ${green("complete work")} 🚀`);
  console.log(`you can run the following command to start your project`);
  console.log(`
  ${green("cd " + projectName)}
  ${green("code .")}
  ${green("pnpm i")}
  ${green("pnpm dev")}
  `);
}
