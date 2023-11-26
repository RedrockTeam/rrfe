import cac from "cac";
import { cyan, yellow, green, blue, red } from "picocolors";
import prompt from "prompts";
import path from "path";
import fs from "fs";
import { chooseTemplate } from "../util/chooseTemplate";

const questions: prompt.PromptObject<string>[] = [
  {
    type: "select",
    name: "framework",
    message: "Select a framework:",
    choices: [
      {
        title: blue("react"),
        value: "react",
      },
      { title: green("vue(选了也是react，希望大佬增加vue模板)"), value: "vue" },
      {
        title: red("svelte(选了也是react，希望大佬增加svelte模板)"),
        value: "svelte",
      },
    ],
  },
  // {
  //   type: "toggle",
  //   name: "isUseTs",
  //   message: `Do you want use ${blue("Typescript")}?`,
  //   initial: true,
  //   active: "yes",
  //   inactive: "no",
  // },
  // {
  //   type: "toggle",
  //   name: "isUseTailwind",
  //   message: `Do you want use ${cyan("Tailwind")}?`,
  //   initial: true,
  //   active: "yes",
  //   inactive: "no",
  // },
  // {
  //   type: "select",
  //   name: "template",
  //   message: "Select a template:",
  //   choices: [
  //     {
  //       title: `${cyan("backstage")}`,
  //       value: "backstage",
  //     },
  //     { title: `${green("h5")}`, value: "h5" },
  //     { title: `${yellow("base")}`, value: "base" },
  //   ],
  // },
];

const cli = cac();
const cwd = process.cwd();
const defaultTargetDir = "redrock-project";

let result: prompt.Answers<
  | "projectName"
  | "framework"
  | "isUseTs"
  | "isUseTailwind"
  | "isUseLint"
  | "template"
>;
async function init(project: string) {
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
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }
  const { projectName } = result;
  const root = path.join(cwd, projectName);
  fs.mkdirSync(root, { recursive: true });

  // 处理模板
  const templateType = chooseTemplate(result);
  const templateDir = path.resolve(__dirname, `../template/${templateType}`);
  const files = fs.readdirSync(templateDir);

  //写入操作
  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file);
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

cli
  .command("create [project]", "create the new project")
  .action(async (project) => {
    if (project) console.log(`Your project name is ${cyan(project)}`);
    await init(project);
  });

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

cli
  // Simply omit the command name, just brackets
  .command("[...files]", "help")
  .action((files) => {
    console.log(`can't find ${yellow(files)} command `);
  });

cli.help();

cli.version("0.1.1");

cli.parse();
