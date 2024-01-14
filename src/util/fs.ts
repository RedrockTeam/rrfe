import fs from "fs";
import path from "path";
import { DEFAULT_CONFIG_FILES } from "../node/constant";

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
export function updateCI(root: string, REPO_NAME: string) {
  // 读取YAML文件
  try {
    const yamlPath = path.resolve(root, `.gitlab-ci.yml`);
    let fileContent = fs.readFileSync(yamlPath, "utf8");

    // 使用正则表达式进行替换
    fileContent = fileContent.replace(
      /REPO_NAME: \[\]/g,
      `REPO_NAME: ${REPO_NAME}`
    );
    // 将更新后的内容写回文件
    fs.writeFileSync(yamlPath, fileContent, "utf8");
  } catch (e) {
    console.error("读取或更新CI/CD文件时出错：", e.message);
  }
}

export function updateBaseUrl(root: string, REPO_NAME: string) {

  try {
    let vitePath: string = "";
    for (const filename of DEFAULT_CONFIG_FILES) {
      const filePath = path.resolve(root, filename);
      if (!fs.existsSync(filePath)) continue;

      vitePath = filePath;
      break;
    }
    let fileContent = fs.readFileSync(vitePath, "utf8");

    // 使用正则表达式进行替换
    fileContent = fileContent.replace(/base: '\/\/'/g, `base: '/${REPO_NAME}/'`);
    // 将更新后的内容写回文件
    fs.writeFileSync(vitePath, fileContent, "utf8");
  } catch (e) {
    console.error("读取或更新vite.config文件时出错：", e.message);
  }
}
