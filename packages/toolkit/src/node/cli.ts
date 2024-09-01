import cac from "cac";
import picocolors from "picocolors";
import prompt from "prompts";

import config from "../../../../package.json";
import { apiGenerate } from "../apiGenerate";
import { entryTinyPng, tinifyImgs } from "../tinypng";

const { blue, cyan, green, red, yellow } = picocolors;
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
      { title: green("vue"), value: "vue" },
    ],
  },
  {
    type: (_, { framework }) => (framework === "vue" ? null : "select"),
    name: "language",
    message: `Select a Language:`,
    choices: [
      {
        title: blue("TS"),
        value: "ts",
      },
      { title: yellow("JS"), value: "js" },
    ],
  },
  {
    type: (_, { framework }) => (framework === "vue" ? null : "select"),
    name: "styles",
    message: `Select a Styles Frameworks`,
    choices: [
      {
        title: blue("Tailwind"),
        value: "tailwind",
      },
      { title: green("less"), value: "less" },
      {
        title: yellow("css"),
        value: "css",
      },
    ],
  },
];

const cli = cac();

cli.command("tinypng [root]", "tiny your png").action(async (root) => {
  const entry = entryTinyPng(root);
  if (!entry) {
    console.log(`${red("cann't find the ./assets/img folder")}`);
    return;
  }
  tinifyImgs(entry);
});

// 生成api和ts
cli
  .command("api [root]")
  .option("--type [type]", `文档格式转译`)
  .option("--mock [mock]", `是否开启mock`)
  .action((_, options) => {
    apiGenerate(options);
  });

cli
  // Simply omit the command name, just brackets
  .command("[...files]", "error")
  .action((files) => {
    console.log(`can't find ${yellow(files)} command `);
  });

cli.help();

cli.version(config.version);

cli.parse();
