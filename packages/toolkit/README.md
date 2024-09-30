# @rrfe/toolkit

<p align="left">
    <img src="https://img.shields.io/badge/utils-redrock-red?labelColor=gray&style=flat" alt="cli" />
    <img src="https://img.shields.io/badge/md-apiTransform-blue?labelColor=gray&style=flat" alt="apiTransform" />
    <a href="https://www.npmjs.com/package/@rrfe/toolkit"><img src=https://img.shields.io/npm/v/@rrfe/toolkit.svg  alt="npm package"></a>
</p>

## 快速开始

安装这个工具

```shell
pnpm i @rrfe/toolkit -g
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

- 接口名称: `# 账户功能`
- 接口功能  `## 用户登录`
- 读取 URL:  `### URL`
- 读取接口方法: `### 请求方式`
- 请求方式:  `### 请求参数`
- 请求参数:  `### 返回参数`

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
  "a": "test",
}
```

✔️

```
{
  "a": "test"
}
```