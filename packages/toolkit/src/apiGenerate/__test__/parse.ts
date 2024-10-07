import { expect, test } from "vitest";

import exp from "node:constants";
import fs from "node:fs";
import path from "node:path";
import { ApiParser } from "../paser";
import { showMDASR } from "../remarkParse";

// 定义文件路径
const filePath = path.resolve(
	process.cwd(),
	"./src/apiGenerate/__test__/test.md",
);

// 异步读取文件内容
test("parse", () => {
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.error("读取文件失败:", err);
			return;
		}

		const target = showMDASR(data);
		const regForJson = /"[^"]*":\s*"[^"]*"/g;

		const testCases = [
			{ path: "login" },
			{ path: "account" },
			{ path: "login.用户注册" },
			{ path: "login.退出" },
			{ path: "account.用户" },
			{ path: "login.用户注册.method", value: "POST" },
			{ path: "login.用户注册.url", value: "/user/register" },
			{ path: "login.退出.method", value: "POST" },
			{ path: "login.退出.url", value: "/user/register" },
			{ path: "account.用户.method", value: "POST" },
			{ path: "account.用户.url", value: "/user/register" },
		];

		const checkProperty = (path: string, value?: string) => {
			if (value) {
				expect(target).toHaveProperty(path, value);
			} else {
				expect(target).toHaveProperty(path);
			}
		};

		const checkJsonMatch = (path: string) => {
			expect(target[path.split(".")[0]][path.split(".")[1]].req).toMatch(
				regForJson,
			);
			expect(target[path.split(".")[0]][path.split(".")[1]].res).toMatch(
				regForJson,
			);
		};

		for (const { path, value } of testCases) {
			checkProperty(path, value);
		}

		for (const item of ["login.用户注册", "login.退出", "account.用户"]) {
			checkJsonMatch(item);
		}
	});
});
