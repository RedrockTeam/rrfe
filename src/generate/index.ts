import fs from "fs";
import path from "path";
import { red, yellow } from "picocolors";
import { green } from "picocolors";

import { jsonToTs } from "./jsonToTs";
import { ApiParser } from "./paser";

const root = process.cwd();

// export function transform(){

// }

export function transformToTs() {
  const apiDocs = fs.readFileSync(path.resolve(root, "api.md"), "utf-8");

  const result = new ApiParser().parse(apiDocs);
  console.log(`${green("success:")} parse md`);

  const typePath = path.resolve(root, "./src/types");

  if (fs.existsSync(typePath)) {
    console.log(
      `exist ${yellow("types")} file,please ${red("delete")} it and go on`
    );
    return;
  }

  fs.mkdirSync(typePath);

  Object.keys(result).map((page) => {
    const apis = result[page];
    Object.keys(apis).map((apiName) => {
      fs.writeFileSync(
        path.resolve(typePath, `${page}.ts`),
        jsonToTs(apis[apiName].req, apiName, "req"),
        { flag: "a" }
      );

      jsonToTs(apis[apiName].res, apiName, "res");
      fs.writeFileSync(
        path.resolve(typePath, `${page}.ts`),
        jsonToTs(apis[apiName].res, apiName, "res"),
        { flag: "a" }
      );
    });
  });
}

// export function transformToApi() {
//   const apiDocs = fs.readFileSync(path.resolve(root, "api.md"), "utf-8");

//   const result = new ApiParser().parse(apiDocs);
// }
