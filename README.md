<p align="center">
    <h1 align="center">@redrockfe/rrfe 🚀</h1>
</p>
<p align="center">
    <img src="./assets/logo.png" alt="logo" width="50%"/>
</p>
<p align="center">
    <img src="https://img.shields.io/badge/utils-redrock-red?labelColor=gray&style=flat" alt="cli" />
    <img src="https://img.shields.io/badge/template-vite-green?labelColor=gray&style=flat" alt="template" />
    <img src="https://img.shields.io/badge/md-apiTransform-blue?labelColor=gray&style=flat" alt="apiTransform" />
    <a href="https://www.npmjs.com/package/@redrockfe/rrfe"><img src=https://img.shields.io/npm/v/@redrockfe/rrfe.svg  alt="npm package"></a>
</p>

## 特点

- 💡 由 vite 构建的多种模板
- ⚡️ 快速启动
- 📦 开箱即用，集成多种工具链 `eslint`,`prettier`,`husky`
- 🛠️ 使用 `tinypng` 进行批量图片压缩
- 🚀 根据特定格式的 md 自动生成 TS 接口类型和网络请求代码以及 Mock 数据

## 使用指南

### 安装

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

会按照 **./assets/imgs** 或 **./assets/img** 或 **./assets/imges** 或 **./assets/imge** 寻找文件位置

### 根据模板生成 TS 类型以及调用函数

```shell
rrfe api
```

可以自己选择**解析格式**

```shell
rrfe api --type=apifox
```

不使用**mock**

```shell
rrfe api --mock=false
```

#### 使用说明

需要把`api.md`或者`api.mdx`放在根目录下

自动解析生成 ts 和 api 请求,

同时也会自动生成基于`json-server`的数据`mock`的`routes.json`,`db.json`

关键参数一定要写对

- 切分文件:`## Page:xxx`
- 读取 URL: `### URL：`
- 请求方式: `### 请求参数：`
- 请求参数: `### 返回参数：`

> 注意请求方式以及返回参数使用 JSON 格式

推荐用法使用 mdx 的 snippet
直接复制如下代码即可在用户代码片段的 mdx 里即可

````json
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
````

然后鼠标输入 rrfeApi 就会自动生成按 tab 即可快速输入

目前处于 mvp 版后续会进行继续迭代，提供更加丰富的选项

#### 常见问题

JSON 格式错误

❌

```json
{
  "a": "test"
}
```

✔️

```
{

    "a":"test"

}
```

## TODO

- 提供更加丰富的配置
- 可能引入插件系统
- 完善边界情况
- 优化生成产物
- 完善单测
- 完善 logger
