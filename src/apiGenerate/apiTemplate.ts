import { camelToIName, toCapitalize } from "./utils";

export function indexTemplate() {
  return `import axios from "axios";

const BASE_URL = "http://localhost:3000/";
  
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
    isHaveReq ? `{ ${params} }: ${camelToIName(apiName)}Req ` : ""
  }): Promise<${camelToIName(apiName)}Res> => {
    const res = await service.get(\`${resolveUrl}\`);
    return res.data;
};

`;
}

export function postTemplate(apiName: string, url: string = "") {
  return `export const post${toCapitalize(
    apiName
  )} = async ( payload: ${camelToIName(apiName)}Req ): Promise<${camelToIName(
    apiName
  )}Res> => {
    const res = await service.post(\`${url}\`,payload);
    return res.data;
};

`;
}

export function deleteTemplate(apiName: string, url: string = "") {
  return `export const delete${toCapitalize(
    apiName
  )} = async ( payload: AxiosRequestConfig<{ data: ${camelToIName(apiName)}Req}> ): Promise<${camelToIName(
    apiName
  )}Res> => {
    const res = await service.delete(\`${url}\`,{data:payload});
    return res.data;
};

`;
}

export function putTemplate(apiName: string, url: string = "") {
  return `export const put${toCapitalize(
    apiName
  )} = async ( payload: ${camelToIName(apiName)}Req ): Promise<${camelToIName(
    apiName
  )}Res> => {
    const res = await service.put(\`${url}\`, payload);
    return res.data;
};

`;
}
