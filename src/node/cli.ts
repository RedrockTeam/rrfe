import cac from "cac";
import { blue, cyan, green, red, yellow } from "picocolors";
import prompt from "prompts";

import config from "../../package.json";
import { init } from "../util/init";
import { test } from "../util/test";
import { entryTinyPng, tinifyImgs } from "../util/tinypng";

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
  {
    type: "select",
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
    type: "select",
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

cli
  .command("create [project]", "create the new project")
  .action(async (project) => {
    if (project) console.log(`Your project name is ${cyan(project)}`);
    await init(project, questions);
  });

cli.command("tinypng [root]", "tiny your png").action(async (root) => {
  const entry = entryTinyPng(root);
  if (!entry) {
    console.log(`${red("cann't find the ./assets/img folder")}`);
    return;
  }
  tinifyImgs(entry);
});

cli.command("test [folder]", "test the new template").action(async (folder) => {
  if (folder) console.log(`Waiting....`);
  await test(folder);
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
