# @redrockfe/rrfe Contributing Guide

## 开发测试指南

输入命令进入开发模式

```shell
pnpm link --global
pnpm start
```

start 用于打包
link 用于给你全局加一个软连接
然进入 test 文件夹进行

```shell
pnpm i
```

测试

### changelog

进行一定的记录

```shell
pnpm changeset
```

将 changelog 消耗掉并生成版本

```shell
pnpm version:changeset
```

发表到 npm

```shell
pnpm publish
```

### 新增模板测试

```shell
rrfe create [name]
rrfe test [name]
```

**写完一个模板可以测试一下是否正常**
