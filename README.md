# RedRockFE-cli

## 开发测试指南

输入命令进入开发模式

```shell
pnpm start
pnpm link --global
```

### 新增模板测试

```shell
rrfe-cli create [name]
rrfe-cli test [name]
```

> 写完一个模板可以测试一下是否正常

## 使用指南

脚手架下载

> 建议 pnpm 下载

```shell
pnpm i @redrockfe/rrfe-cli -g
```

脚手架启动

```shell
rrfe-cli create [project]
```

## Done

包括但不仅限于以下功能：

- 使用 Vite 作为打包工具(未来可能有变化)
- 一键配置 tailwind，typescript，eslint，prettier
- 初始化 git 以及配置 husky
- 初始模板(目前只有 React)

> 以上内容均可以自定义

## TODO

- 一些错误处理
- 模板制作
