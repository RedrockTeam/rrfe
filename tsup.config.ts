import { defineConfig } from "tsup";

export default defineConfig({
  outDir: "build",
  entry: {
    index: "src/create/node/cli.ts",
  },
  // 产物格式，cjs 格式
  format: ["esm"],
  // 目标语法
  target: "es2020",

  // tsup的坑
  banner: ({ format }) => {
    if (format === "esm") {
      return {
        js: `import {createRequire as __createRequire} from 'module';var require=__createRequire(import.meta.url);`,
      };
    }
  },
  // 没有拆包的需求，关闭拆包能力
  splitting: false,
});
