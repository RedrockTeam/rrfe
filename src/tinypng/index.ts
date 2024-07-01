import fs from "fs";
import path from "path";
import picocolors from "picocolors";
import tinify from "tinify";

const { cyan, green } = picocolors;

export function entryTinyPng(root?: string) {
  const cwd = root || process.cwd();
  const assetsPaths: string[] = ["image", "images", "img", "imgs"];
  let resolvedPath: string;
  for (const assetsPath of assetsPaths) {
    resolvedPath = path.resolve(cwd, `./assets/${assetsPath}`);
    if (fs.existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }
}

function getFileList(filePath, filesList) {
  readFile(filePath, filesList);
  return filesList;
}

function readFile(filePath, filesList) {
  const imgsInclude = [".png", ".jpg", ".webp"];
  const files = fs.readdirSync(filePath);

  files.forEach((file) => {
    const fPath = path.join(filePath, file);
    const states = fs.statSync(fPath);

    // 获取文件后缀
    if (states.isFile()) {
      const extname = path.extname(file);
      if (imgsInclude.includes(extname)) {
        filesList.push({ path: fPath, name: file });
      }
    } else {
      readFile(fPath, filesList);
    }
  });
}

export function tinifyImgs(filePath) {
  const keys = "n7ghJ9cdwTdCqw2ZCckW1jSbfVY31gkB";
  tinify.key = keys;
  const filesList: { path: string; name: string }[] = [];

  getFileList(filePath, filesList);

  filesList.map(async (item) => {
    console.log(`deal with ${cyan(item.name)}`);
    console.time(`✅ complete with ${green(item.name)}`);
    const source = tinify.fromFile(item.path);
    await source.toFile(item.path);
    console.timeEnd(`✅ complete with ${green(item.name)}`);
  });
}
