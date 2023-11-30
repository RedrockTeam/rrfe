import { execSync } from "child_process";
import path from "path";

export async function test(targetFolder: string) {
  // 构建目标文件夹的绝对路径
  const absolutePath = path.resolve(targetFolder);

  // 切换到目标文件夹并执行 pnpm 安装和启动开发脚本
  try {
    // 切换到目标文件夹
    process.chdir(absolutePath);

    // 安装依赖
    execSync("pnpm i", { stdio: "inherit" });

    // 启动开发脚本
    execSync("pnpm dev", { stdio: "inherit" });
  } catch (error) {
    console.error(`error: ${error.message}`);
    process.exit(1);
  }
}
