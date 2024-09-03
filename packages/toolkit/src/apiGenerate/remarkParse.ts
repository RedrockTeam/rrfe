import path from "path";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import fs from "fs";
export function showMDASR() {
  const filePath = path.resolve(
    process.cwd(),
    "./src/apiGenerate/__test__/test.md"
  );
  // 创建处理器
  const processor = unified().use(remarkParse).use(remarkStringify); // 解析 Markdown

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
