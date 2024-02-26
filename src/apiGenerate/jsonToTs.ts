import JsonToTS from "json-to-ts";

import { camelToIName, toCapitalize } from "./utils";

export function jsonToTs(
  resource: string = "",
  apiName: string,
  type: "req" | "res"
) {
  const interfaceReg = /interface\s+(\S+?)\s+/g;
  let res = JsonToTS(jsonToObject(resource)).join("\n\n");

  let match: RegExpExecArray | null;
  while ((match = interfaceReg.exec(res)) !== null) {
    const beforeTs = match[1];
    if (beforeTs !== "RootObject") {
      res = res.replace(
        new RegExp(`\\s+${beforeTs}[;|\\s]{1}`, "g"),
        " " + toCapitalize(apiName) + toCapitalize(type) + beforeTs
      );
    }
  }

  return `export ${res.replace(
    "RootObject",
    `${camelToIName(apiName)}${type === "req" ? "Req" : "Res"}`
  )}

`;
}

export function jsonToObject(resource: string = "{}") {
  return JSON.parse(resource.replace(/,\s*([\]}])/g, "$1"));
}
