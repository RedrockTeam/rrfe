import fs from "fs";
import path from "path";
import { red, yellow } from "picocolors";
import { green } from "picocolors";

import {
  deleteTemplate,
  getTemplate,
  indexTemplate,
  postTemplate,
  putTemplate,
} from "./apiTemplate";
import { jsonToObject, jsonToTs } from "./jsonToTs";
import apiFox from "./loader/apiFox";
import { ApiParser, IResult } from "./paser";
import { camelToIName } from "./utils";

const root = process.cwd();

export async function apiGenerate(options) {
  const apiPath = fs.existsSync(path.resolve(root, "api.md"))
    ? path.resolve(root, "api.md")
    : path.resolve(root, "api.mdx");

  let apiDocs = fs.readFileSync(apiPath, "utf-8");

  if (options.type?.toLocaleLowerCase() === "apifox") {
    apiDocs = apiFox(apiDocs);
  }

  const result = new ApiParser().parse(apiDocs);

  console.log(`${green("success:")} parse md`);
  // console.log(result);

  transformToTs(result);

  console.log(`${green("success:")} generate ts`);

  transformToApi(result);

  console.log(`${green("success:")} generate api`);

  transformToMock(result);
}

export function transformToTs(result: IResult) {
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
      apis[apiName].req &&
        fs.writeFileSync(
          path.resolve(typePath, `${page}.ts`),
          jsonToTs(apis[apiName].req, apiName, "req"),
          { flag: "a" }
        );

      fs.writeFileSync(
        path.resolve(typePath, `${page}.ts`),
        jsonToTs(apis[apiName].res, apiName, "res"),
        { flag: "a" }
      );
    });
  });
}

export function transformToApi(result: IResult, isUseTs: boolean = true) {
  const servicePath = path.resolve(root, "./src/service");

  if (fs.existsSync(servicePath)) {
    console.log(
      `exist ${yellow("service")} file,please ${red("delete")} it and go on`
    );
    return;
  }

  fs.mkdirSync(servicePath);

  if (isUseTs) {
    fs.writeFileSync(path.resolve(servicePath, "./index.ts"), indexTemplate());
  }

  Object.keys(result).map((page) => {
    const apis = result[page];
    let importTs = "";
    Object.keys(apis).map((apiName) => {
      const { method, req, url } = apis[apiName];
      const pagePath = path.resolve(servicePath, `${page}.ts`);
      if (!fs.existsSync(pagePath)) {
        fs.writeFileSync(
          pagePath,
          `import {  } from "../types/${page}.ts";
import { service } from "./index.ts";
   
`,
          {
            flag: "a",
          }
        );
      }
      const resolveReq = jsonToObject(req);

      const isHaveReq = !!Object.keys(resolveReq).length;
      if (method === "post") {
        fs.writeFileSync(pagePath, postTemplate(apiName, url), {
          flag: "a",
        });
      } else if (method === "delete") {
        fs.writeFileSync(pagePath, deleteTemplate(apiName, url), {
          flag: "a",
        });
      } else if (method === "put") {
        fs.writeFileSync(pagePath, putTemplate(apiName, url), {
          flag: "a",
        });
      } else {
        fs.writeFileSync(pagePath, getTemplate(resolveReq, apiName, url), {
          flag: "a",
        });
      }

      importTs = `${importTs}${importTs || isHaveReq ? "," : ""}${
        isHaveReq ? ` ${camelToIName(apiName)}Req ,` : ""
      } ${camelToIName(apiName)}Res`;
      if (importTs.startsWith(",")) {
        importTs = importTs.substring(1, importTs.length);
      }
      let data = fs.readFileSync(pagePath, "utf-8");
      data = data.replace(/\{[^}]*\}/, `{${importTs}}`);

      fs.writeFileSync(pagePath, data);
    });
  });
}

export function transformToMock(result: IResult) {
  const mockRes = {};
  Object.keys(result).map((page) => {
    const pageResult = result[page];
    Object.keys(pageResult).map((apiName) => {
      console.log(pageResult[apiName].url);
      mockRes[apiName] = JSON.parse(
        pageResult[apiName].res || "".replace(/,\s*([\]}])/g, "$1")
      );
    });
  });

  fs.writeFileSync(
    path.resolve(process.cwd(), "./db.json"),
    JSON.stringify(mockRes)
  );
}
