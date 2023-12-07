import fs from "fs";
import path from "path";

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
export function updateCI(path: string, REPO_NAME: string) {
  // 读取YAML文件
  try {
    let fileContent = fs.readFileSync(path, "utf8");

    // 使用正则表达式进行替换
    fileContent = fileContent.replace(
      /REPO_NAME: \[\]/g,
      `REPO_NAME: ${REPO_NAME}`
    );

    // 将更新后的内容写回文件
    fs.writeFileSync(path, fileContent, "utf8");
  } catch (e) {
    console.error("读取或更新CI/CD文件时出错：", e.message);
  }
}

export function updateBaseUrl(path: string, REPO_NAME: string) {
  try {
    let fileContent = fs.readFileSync(path, "utf8");

    // 使用正则表达式进行替换
    fileContent = fileContent.replace(/base: \[\]/g, `base: '/${REPO_NAME}/'`);

    // 将更新后的内容写回文件
    fs.writeFileSync(path, fileContent, "utf8");
  } catch (e) {
    console.error("读取或更新CI/CD文件时出错：", e.message);
  }
}
