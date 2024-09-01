import cac from "cac";
import { cyan } from "picocolors";

import config from "../../package.json";
import { init } from "../init";

const cli = cac();

cli.command("[project]", "create the new project").action(async (project) => {
  if (project) console.log(`Your project name is ${cyan(project)}`);
  await init(project);
});

cli.help();

cli.version(config.version);

cli.parse();
