import fs from "fs";
import path from "path";
export default function apiFox(resource: string): string {
  const re = resource
    .replace(
      /\n(POST|GET|DELETE)\s+(\S+)\s+\n/g,
      `### URL：

$2

### 请求方式：

$1

###
`
    )
    .replace(/> 返回示例/g, "### 返回参数：");
  fs.writeFileSync(path.resolve(process.cwd(), "./api.transform.md"), re);

  return re;
}
