import cac from "cac";
import { cyan, yellow, green, blue, red } from "picocolors";
import prompt from "prompts";
import { init } from "../util/init";
import { test } from "../util/test";
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

cli.version("0.3.0");

cli.parse();
