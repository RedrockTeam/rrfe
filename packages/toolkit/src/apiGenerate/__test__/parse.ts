import { expect, test } from "vitest";

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
		expect(showMDASR(data)).toStrictEqual({
			login: {
				用户注册: {
					method: "POST",
					url: "/user/register",
					req:
						"{\r\n" +
						'"username": "12154545",\r\n' +
						'"name": "吴系挂",\r\n' +
						'"password": "1436864169"\r\n' +
						"}",
					res:
						"{\r\n" +
						'"error_code": 0,\r\n' +
						'"data": {\r\n' +
						'"uid": "1",\r\n' +
						'"username": "12154545",\r\n' +
						'"name": "吴系挂",\r\n' +
						'"groupid": 2 ,\r\n' +
						'"reg_time": "1436864169",\r\n' +
						'"last_login_time": "0",\r\n' +
						"}\r\n" +
						"}",
				},
				退出: {
					method: "POST",
					url: "/user/register",
					req:
						"{\r\n" +
						'"username": "12154545",\r\n' +
						'"name": "吴系挂",\r\n' +
						'"password": "1436864169"\r\n' +
						"}",
					res:
						"{\r\n" +
						'"error_code": 0,\r\n' +
						'"data": {\r\n' +
						'"uid": "1",\r\n' +
						'"username": "12154545",\r\n' +
						'"name": "吴系挂",\r\n' +
						'"groupid": 2 ,\r\n' +
						'"reg_time": "1436864169",\r\n' +
						'"last_login_time": "0",\r\n' +
						"}\r\n" +
						"}",
				},
			},
			acount: {
				用户: {
					method: "POST",
					url: "/user/register",
					req:
						"{\r\n" +
						'"username": "12154545",\r\n' +
						'"name": "吴系挂",\r\n' +
						'"password": "1436864169"\r\n' +
						"}",
					res:
						"{\r\n" +
						'"error_code": 0,\r\n' +
						'"data": {\r\n' +
						'"uid": "1",\r\n' +
						'"username": "12154545",\r\n' +
						'"name": "吴系挂",\r\n' +
						'"groupid": 2 ,\r\n' +
						'"reg_time": "1436864169",\r\n' +
						'"last_login_time": "0",\r\n' +
						"}\r\n" +
						"}",
				},
			},
		});
	});
});
