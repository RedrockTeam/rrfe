import cac from "cac";
import picocolors from "picocolors";
import prompt from "prompts";

import config from "../../package.json";
import { init } from "../init";

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

cli
  .command("create [project]", "create the new project")
  .action(async (project) => {
    if (project) console.log(`Your project name is ${cyan(project)}`);
    await init(project, questions);
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
