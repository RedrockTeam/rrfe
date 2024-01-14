import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "build",
  entry: {
    index: "src/node/cli.ts",
  },
  // 产物格式，cjs 格式
  format: ["cjs"],
  // 目标语法
  target: "es2020",

  // 没有拆包的需求，关闭拆包能力
  splitting: false,
});
