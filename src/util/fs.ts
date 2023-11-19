import fs from "fs";
import path from "path";

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

// export function copy(type: string, dest: string) {
//   const root = path.resolve(__dirname, `../template/${type}`);

// }

// const write = (file: string, content?: string) => {
//   const targetPath = path.join(root, renameFiles[file] ?? file)
//   if (content) {
//     fs.writeFileSync(targetPath, content)
//   } else {
//     copy(path.join(templateDir, file), targetPath)
//   }
// }

// function copy(src: string, dest: string) {
//   const stat = fs.statSync(src)
//   if (stat.isDirectory()) {
//     copyDir(src, dest)
//   } else {
//     fs.copyFileSync(src, dest)
//   }
// }

// function copyDir(srcDir: string, destDir: string) {
//   fs.mkdirSync(destDir, { recursive: true })
//   for (const file of fs.readdirSync(srcDir)) {
//     const srcFile = path.resolve(srcDir, file)
//     const destFile = path.resolve(destDir, file)
//     copy(srcFile, destFile)
//   }
// }