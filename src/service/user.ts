import {
  ILoginPostReq,
  ILoginPostRes,
  IRefreshPostReq,
  IRefreshPostRes,
  IRegisterPostReq,
  IRegisterPostRes,
} from "../types/user.ts";
import { service } from "./index.ts";

export const postLogin = async (
  params: ILoginPostReq
): Promise<ILoginPostRes> => {
  const res = await service.post(`/user/login`, params);
  return res;
};
export const postRegister = async (
  params: IRegisterPostReq
): Promise<IRegisterPostRes> => {
  const res = await service.post(`/user/register`, params);
  return res;
};
export const postRefresh = async (
  params: IRefreshPostReq
): Promise<IRefreshPostRes> => {
  const res = await service.post(`/user/refresh`, params);
  return res;
};
