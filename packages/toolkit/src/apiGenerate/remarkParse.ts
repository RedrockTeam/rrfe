import fs from "node:fs";
import path from "node:path";
import type { Root } from "mdast";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import type { Node } from "unist";
import between from "unist-util-find-all-between";
import { visit } from "unist-util-visit";
type apiOptions = "method" | "url" | "req" | "res";
type apiTitle = "pageTitle" | "functionTitle";
type apiNameMap = Record<string, Record<apiOptions, string>>;
type IResult = Record<string, apiNameMap | object>;
interface MdAstNode extends Node {
	depth: number;
	children: MdAstNode;
	value: string;
}
function inspectAst() {
	return (tree) => {
		console.log(JSON.stringify(tree, null, 1));
	};
}

// 对mdast切割,不同层级tree
function divideMdast(tree: Root, level: "1" | "2" | "3"): MdAstNode[][] {
	const dividedNumberArray: Array<number> = [0];
	if (level === "1") return [tree.children] as MdAstNode[][]; //如果是一级标题，直接返回
	visit(tree, "heading", (node, index) => {
		if (level === "2")
			if (node.depth === 1) dividedNumberArray.push(index as number);
		if (level === "3")
			if (node.depth === 2) dividedNumberArray.push(index as number);
	});

	dividedNumberArray.push(tree.children.length + 1);

	const processArray = dividedNumberArray.map((i, index, array) => {
		return [i, array[index + 1] ? array[index + 1] : i];
	});
	// 通过切割数组，切割mdast
	const dividedMdast = processArray.map((item) => {
		const mdNode = between(tree, item[0], item[1]);
		return mdNode;
	});

	return dividedMdast as MdAstNode[][];
}
// 解析mdast
function parseMd(option: apiOptions | apiTitle, tree: Root, json: IResult) {
	let dividedTree: MdAstNode[][];
	let callback: (
		arg0: number,
	) => (node: MdAstNode, nodeIndex: number, arr: MdAstNode[]) => void;
	switch (option) {
		case "pageTitle":
			dividedTree = divideMdast(tree, "1");
			callback = (treeIndex) => {
				return (node) => {
					if (node.depth === 1) {
						json[node.children[0].value] = {};
					}
				};
			};
			break;
		case "functionTitle":
			dividedTree = divideMdast(tree, "2");
			callback = (treeIndex) => {
				return (node) => {
					Object.keys(json).forEach((key, index) => {
						if (node.depth === 2 && treeIndex === index + 1) {
							json[key][node.children[0].value] = {};
						}
					});
				};
			};
			break;
		case "method":
			dividedTree = divideMdast(tree, "3");
			callback = (treeIndex) => {
				return (node, nodeIndex, arr) => {
					const index = 0;
					for (const [key1, value] of Object.entries(json)) {
						for (const key2 of Object.keys(value)) {
							if (node.type === "heading") {
								if (
									node.children[0].value === "请求方式" &&
									treeIndex === index + 1
								) {
									json[key1][key2].method =
										arr[nodeIndex + 1].children[0].value;
								}
							}
						}
					}
				};
			};
			break;
		case "url":
			dividedTree = divideMdast(tree, "3");
			callback = (treeIndex) => {
				return (node, nodeIndex, arr) => {
					const index = 0;
					for (const [key1, value] of Object.entries(json)) {
						for (const key2 of Object.keys(value)) {
							if (node.type === "heading") {
								if (
									node.children[0].value === "URL" &&
									treeIndex === index + 1
								) {
									json[key1][key2].url = arr[nodeIndex + 1].children[0].value;
								}
							}
						}
					}
				};
			};
			break;
		case "req":
			dividedTree = divideMdast(tree, "3");
			callback = (treeIndex) => {
				return (node, nodeIndex, arr) => {
					const index = 0;
					for (const [key1, value] of Object.entries(json)) {
						for (const key2 of Object.keys(value)) {
							if (node.type === "heading") {
								if (
									node.children[0].value === "请求参数" &&
									treeIndex === index + 1
								) {
									json[key1][key2].req = arr[nodeIndex + 1].value;
								}
							}
						}
					}
				};
			};
			break;
		case "res":
			dividedTree = divideMdast(tree, "3");
			callback = (treeIndex) => {
				return (node, nodeIndex, arr) => {
					const index = 0;
					for (const [key1, value] of Object.entries(json)) {
						for (const key2 of Object.keys(value)) {
							if (node.type === "heading") {
								if (
									node.children[0].value === "返回参数" &&
									treeIndex === index + 1
								) {
									json[key1][key2].res = arr[nodeIndex + 1].value;
								}
							}
						}
					}
				};
			};
			break;
	}
	dividedTree.forEach((item, index) => {
		item.forEach(callback(index));
	});
}

//插件
function remarkGenerateApi(
	options: Array<apiTitle | apiOptions>,
	json: IResult,
) {
	return (tree: Root) => {
		for (const option of options) {
			parseMd(option, tree, json);
		}
		return tree;
	};
}
export function showMDASR(data: string) {
	const finalJson = {};
	// 创建处理器
	const processor = unified()
		.use(remarkParse)
		.use(remarkStringify)
		.use(
			remarkGenerateApi,
			["pageTitle", "functionTitle", "method", "url", "req", "res"],
			finalJson,
		);
	//处理缩进
	const mdData = data.replace(/\n\s+/g, "\n");
	// 使用解析器解析文件内容
	processor.process(mdData);
	console.log("finalJson", finalJson);
	return finalJson;
}
