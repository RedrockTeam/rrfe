<p align="center">
    <h1 align="center">@redrockfe/rrfe 🚀</h1>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/utils-redrock-red?labelColor=gray&style=flat" alt="cli" />
    <img src="https://img.shields.io/badge/template-vite-green?labelColor=gray&style=flat" alt="template" />
    <img src="https://img.shields.io/badge/md-apiTransform-blue?labelColor=gray&style=flat" alt="apiTransform" />
    <a href="https://www.npmjs.com/package/@redrockfe/rrfe"><img src=https://img.shields.io/npm/v/@redrockfe/rrfe.svg  alt="npm package"></a>
</p>

## feature

- 💡 由 vite 构建的多种模板
- ⚡️ 快速启动
- 📦 开箱即用，集成多种工具链 eslint,prettier,husky
- 🛠️ 使用tinypng进行批量图片压缩
- 🚀 根据特定格式的md自动生成ts和网路请求 


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

### 根据模板生成ts和api

```shell
rrfe api
```

需要把 api.md 或者 api.mdx 放在根目录下然后会自动解析生成ts和api请求

关键参数一定要写对

- 切分文件使用"## Page:xxx"来进行分割
- 读取url "### URL："
- 请求方式 "### 请求参数：" 然后写相应的json代码块
- 请求参数 "### 返回参数：" 然后写相应的json代码块

推荐用法使用mdx的snippet
直接复制如下代码即可在用户代码片段的mdx里即可

``` json
"rrfeApi": {
  "prefix": "rrfemd",
  "body": [
    "",
    "## ${1}",
    "",
    "",
    "## 简要描述：",
    "",
    "",
    "",
    "### URL",
    "",
    "${2}",
    "",
    "### 请求方式：",
    "",
    "${3}",
    "",
    "### 请求参数：",
    "",
    "``` json",
    "{",
    "${4}",
    "}",
    "```",
    "### 请求参数说明：",
    "",
    "",
    "### 返回参数：",
    "",
    "``` json",
    "{",
    "${5}",
    "}",
    "```",
    "",
    "### 返回参数说明"
  ],
  "description": "rrfe api md"
}
```
然后鼠标输入rrfeApi就会自动生成按tab即可快速输入

目前处于mvp版后续会进行继续迭代，提供更加丰富的选项