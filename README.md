<p align="center">
    <h1 align="center">@redrockfe/rrfe 🚀</h1>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/cli-redrock-red?labelColor=gray&style=flat" alt="cli" />
    <img src="https://img.shields.io/badge/template-vite-green?labelColor=gray&style=flat" alt="template" />
    <a href="https://www.npmjs.com/package/@redrockfe/rrfe-cli"><img src=https://img.shields.io/npm/v/@redrockfe/rrfe-cli.svg  alt="npm package"></a>
</p>

## feature

- 💡 由 vite 构建的多种模板
- ⚡️ 快速启动
- 📦 开箱即用，集成多种工具链 eslint,prettier,husky
- 🛠️ 使用tinypng进行批量图片压缩
  


## 使用指南

脚手架下载，任意一个包管理器都可以，个人比较喜欢 pnpm

```shell
pnpm i @redrockfe/rrfe -g
```

### 创建新项目

```shell
rrfe create [project]
```
### 压缩图片

```shell
rrfe tinypng [root]
```

会按照 ./assets/imgs 或 ./assets/img 或 ./assets/imges 或 ./assets/imge 寻找文件位置
