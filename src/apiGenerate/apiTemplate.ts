import { camelToIName, toCapitalize } from "./utils";

export function indexTemplate() {
  return `import axios from "axios";

const BASE_URL = "";
  
export const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});`;
}

export function getTSTemplate(
  req: Record<string, string>,
  apiName: string,
  url: string = ""
) {
  let params = "";
  let resolveUrl = url + "?";
  Object.keys(req).map((item) => {
    params = params + item + ",";
    resolveUrl = resolveUrl + item + "=" + "${" + item + "}" + "&";
  });

  resolveUrl.substring(0, resolveUrl.length - 1);
  params.substring(0, resolveUrl.length - 1);

  return `export const get${toCapitalize(
    apiName
  )} = async ({${params}}:${camelToIName(apiName)}Req): Promise<${camelToIName(
    apiName
  )}Res> => {
    const res = await service.get(\`${resolveUrl}\`);
    return res;
};
`;
}

export function postTSTemplate(apiName: string, url: string = "") {
  return `export const post${toCapitalize(
    apiName
  )} = async (params:${camelToIName(apiName)}Req): Promise<${camelToIName(
    apiName
  )}Res> => {
    const res = await service.post(\`${url}\`,params);
    return res;
};
`;
}
