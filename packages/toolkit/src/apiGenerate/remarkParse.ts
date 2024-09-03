import path from "path";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import fs from "fs";
type apiOptions = "method" | "url" | "req" | "res";
type apiName = Record<string, Record<apiOptions, string>>;
type IResult = Record<string, apiName>;
function visitNode(
  tree,
  options: apiOptions,
  result: Record<apiOptions, string>
) {
  //options解析
  let type;
  let callback;
  switch (options) {
    case "method":
      type = "paragraph";
      callback = (node: any, index: number, parent) => {
        if (parent.children[index - 1].value === "请求方式") {
          result.method = node.parent[0].value;
          console.log(node.parent[0].value);
        }
      };
  }
  visit(tree, type, callback);
}
export function showMDASR() {
  const filePath = path.resolve(
    process.cwd(),
    "./src/apiGenerate/__test__/test.md"
  );
  // 创建处理器
  const processor = unified().use(remarkParse); // 解析 Markdown

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.error("Error reading file:", err);
    }
    //处理缩进
    const mdData = data.replace(/\n\s+/g, "\n");
    // 使用解析器解析文件内容
    const tree = processor.parse(mdData);
    console.log(processor.stringify(tree));
    console.log(JSON.stringify(tree, null, 2));
  });
}
