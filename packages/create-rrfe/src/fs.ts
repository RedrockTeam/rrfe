import fs, { write } from "node:fs";
import path from "node:path";

import type { IResPrompt } from "./init";
import { DEFAULT_CONFIG_FILES } from "./node/constant";

export function isEmpty(path: string) {
	const files = fs.readdirSync(path);
	return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function copy(src: string, dest: string) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		copyDir(src, dest);
	} else {
		fs.copyFileSync(src, dest);
	}
}

export function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, file);
		copy(srcFile, destFile);
	}
}

export function toValidPackageName(projectName: string) {
	return projectName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/^[._]/, "")
		.replace(/[^a-z\d\-~]+/g, "-");
}

export function updateBaseUrl(root: string, REPO_NAME: string) {
	try {
		let vitePath = "";
		for (const filename of DEFAULT_CONFIG_FILES) {
			const filePath = path.resolve(root, filename);
			if (!fs.existsSync(filePath)) continue;

			vitePath = filePath;
			break;
		}
		let fileContent = fs.readFileSync(vitePath, "utf8");

		// 使用正则表达式进行替换
		fileContent = fileContent.replace(
			/base: '\/\/'/g,
			`base: '/${REPO_NAME}/'`,
		);
		// 将更新后的内容写回文件
		fs.writeFileSync(vitePath, fileContent, "utf8");
	} catch (e) {
		console.error("读取或更新vite.config文件时出错：", e.message);
	}
}

export function assembleTemplate(templateDir: string, result: IResPrompt) {
	const configPath = path.resolve(templateDir, "../baseConfig");
	const diffConfig = ["index.html", ".eslintrc.cjs"];
	const files = fs.readdirSync(configPath);
	for (const file of files) {
		const targetPath = path.join(process.cwd(), result.projectName, file);
		let sourcePath = path.join(configPath, file);

		if (file === "tsconfig") {
			if (result.language === "ts") {
				fs.readdirSync(sourcePath).map((item) => {
					copy(
						path.join(sourcePath, item),
						path.join(process.cwd(), result.projectName, item),
					);
				});
			}
			continue;
		}

		if (diffConfig.includes(file)) {
			sourcePath = path.join(sourcePath, result.language, file);
		}

		copy(sourcePath, targetPath);
	}
}

export function updateTailwind(projectName: string) {
	const prettierPath = path.resolve(process.cwd(), projectName, ".prettierrc");
	const prettier = JSON.parse(fs.readFileSync(prettierPath, "utf-8"));

	prettier.plugins = ["prettier-plugin-tailwindcss"];
	fs.writeFileSync(prettierPath, `${JSON.stringify(prettier, null, 2)}\n`);
}

export function updateCi(projectName: string, repoName: string) {
	const ciPath = path.resolve(process.cwd(), projectName, ".gitea/workflows");
	fs.readdirSync(ciPath).map((item) => {
		const resolvedPath = path.resolve(ciPath, item);
		let fileContent = fs.readFileSync(resolvedPath, "utf8");

		fileContent = fileContent.replace(
			/REPO_NAME:\s*repo-name/g,
			`REPO_NAME: ${repoName}`,
		);
		fs.writeFileSync(resolvedPath, fileContent, "utf8");
	});
}
