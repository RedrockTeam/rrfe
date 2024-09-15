import cac from "cac";
import picocolors from "picocolors";

import config from "../../../../package.json";
import { apiGenerate } from "../apiGenerate";
import { entryTinyPng, tinifyImgs } from "../tinypng";

const { red, yellow } = picocolors;

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
	.option("--type [type]", "文档格式转译")
	.option("--mock [mock]", "是否开启mock")
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
