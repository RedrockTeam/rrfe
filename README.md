<p align="center">
    <h1 align="center">@redrockfe/rrfe-cli 🚀</h1>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/cli-redrock-red?labelColor=gray&style=flat" alt="cli" />
    <img src="https://img.shields.io/badge/template-vite-green?labelColor=gray&style=flat" alt="template" />
    <a href="https://www.npmjs.com/package/@redrockfe/rrfe-cli"><img src=https://img.shields.io/npm/v/@redrockfe/rrfe-cli.svg  alt="npm package"></a>
</p>

## feature

- 💡 实验 vite 构建
- ⚡️ 快速启动
- 🛠️ 集成多种工具链 eslint,prettier,husky
- 📦 开箱即用

### tinypng

进行压缩图片

```shell
rrfe tinypng [root]
```

会照 ./assets/imgs 或 ./assets/img 或 ./assets/imges 或 ./assets/imge 寻找文件位置


## 使用指南

脚手架下载，任意一个包管理器都可以，个人比较喜欢 pnpm

```shell
pnpm i @redrockfe/rrfe -g
```

### 创建新项目

```shell
rrfe-cli create [project]
```
### 压缩图片

```shell
rrfe tinypng [root]
```

## Done

包括但不仅限于以下功能：

- 使用 Vite 作为打包工具(未来可能有变化)
- 一键配置 tailwind，typescript，eslint，prettier
- 初始化 git 以及配置 husky
- 初始模板(目前只有 React)
- 压缩图片
> 以上内容均可以自定义

## TODO

- 一些错误处理
- 模板制作
