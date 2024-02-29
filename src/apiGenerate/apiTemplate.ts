import { camelToIName, toCapitalize } from "./utils";

export function indexTemplate() {
  return `import axios from "axios";

const BASE_URL = "";
  
export const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});`;
}

export function getTemplate(
  req: Record<string, string>,
  apiName: string,
  url: string = ""
) {
  let params = "";
  const isHaveReq = Object.keys(req).length;
  let resolveUrl = url + (isHaveReq ? "?" : "");

  Object.keys(req).map((item) => {
    params = params + item + ",";
    resolveUrl = resolveUrl + item + "=" + "${" + item + "}" + "&";
  });

  resolveUrl.substring(0, resolveUrl.length - 1);
  params.substring(0, resolveUrl.length - 1);

  return `export const get${toCapitalize(apiName)} = async (${
    isHaveReq
      ? `{ ${params} }: ${camelToIName(apiName)}Req `
      : ""
  }): Promise<${camelToIName(apiName)}Res> => {
    const res = await service.get(\`${resolveUrl}\`);
    return res;
};

`;
}

export function postTemplate(apiName: string, url: string = "") {
  return `export const post${toCapitalize(
    apiName
  )} = async ( params: ${camelToIName(
    apiName
  )}Req ): Promise<${camelToIName(apiName)}Res> => {
    const res = await service.post(\`${url}\`,params);
    return res;
};

`;
}

export function deleteTemplate(apiName: string, url: string = "") {
  return `export const delete${toCapitalize(
    apiName
  )} = async ( params: ${camelToIName(
    apiName
  )}Req ): Promise<${camelToIName(apiName)}Res> => {
    const res = await service.delete(\`${url}\`,params);
    return res;
};

`;
}
