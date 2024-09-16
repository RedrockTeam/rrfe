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
	if (level === "1") return [tree.children] as MdAstNode[][];

	const targetDepth = level === "2" ? 1 : 2;
	const dividedNumberArray = [0];

	visit(tree, "heading", (node, index) => {
		if (node.depth === targetDepth) {
			dividedNumberArray.push(index as number);
		}
	});
	dividedNumberArray.push(tree.children.length);

	return dividedNumberArray.slice(0, -1).map((start, index) => {
		const end = dividedNumberArray[index + 1];
		return between(tree, start, end);
	}) as MdAstNode[][];
}

// 解析mdast
function parseMd(option: apiOptions | apiTitle, tree: Root, json: IResult) {
	const optionHandlers = {
		pageTitle: handlePageTitle,
		functionTitle: handleFunctionTitle,
		method: handleMethod,
		url: handleUrl,
		req: handleReq,
		res: handleRes,
	};

	const handler = optionHandlers[option];
	if (handler) {
		handler(tree, json);
	} else {
		console.error(`未知的选项: ${option}`);
	}
}

function handlePageTitle(tree: Root, json: IResult) {
	const dividedTree = divideMdast(tree, "1");
	for (const item of dividedTree) {
		for (const node of item) {
			if (node.depth === 1) {
				json[node.children[0].value] = {};
			}
		}
	}
}

function handleFunctionTitle(tree: Root, json: IResult) {
	const dividedTree = divideMdast(tree, "2");
	for (const [treeIndex, item] of dividedTree.entries()) {
		for (const node of item) {
			for (const [index, key] of Object.keys(json).entries()) {
				if (node.depth === 2 && treeIndex === index + 1) {
					json[key][node.children[0].value] = {};
				}
			}
		}
	}
}

function handleApiProperty(
	tree: Root,
	json: IResult,
	heading: string,
	property: string,
) {
	const dividedTree = divideMdast(tree, "3");
	dividedTree.forEach((item, treeIndex) => {
		item.forEach((node, nodeIndex, arr) => {
			if (
				node.type === "heading" &&
				node.children[0].value === heading &&
				treeIndex === 1
			) {
				for (const [key1, value] of Object.entries(json)) {
					for (const key2 of Object.keys(value)) {
						json[key1][key2][property] =
							arr[nodeIndex + 1].children?.[0]?.value ||
							arr[nodeIndex + 1].value;
					}
				}
			}
		});
	});
}

function handleMethod(tree: Root, json: IResult) {
	handleApiProperty(tree, json, "请求方式", "method");
}

function handleUrl(tree: Root, json: IResult) {
	handleApiProperty(tree, json, "URL", "url");
}

function handleReq(tree: Root, json: IResult) {
	handleApiProperty(tree, json, "请求参数", "req");
}

function handleRes(tree: Root, json: IResult) {
	handleApiProperty(tree, json, "返回参数", "res");
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
