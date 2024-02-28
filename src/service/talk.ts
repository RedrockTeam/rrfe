import {
  IChatPostReq,
  IChatPostRes,
  IHistoryGetReq,
  IHistoryGetRes,
  ISessionDeleteReq,
  ISessionDeleteRes,
} from "../types/talk.ts";
import { service } from "./index.ts";

export const postSession = async (
  params: ISessionDeleteReq
): Promise<ISessionDeleteRes> => {
  const res = await service.post(`/session`, params);
  return res;
};
export const getHistory = async ({
  session_id,
}: IHistoryGetReq): Promise<IHistoryGetRes> => {
  const res = await service.get(`/history?session_id=${session_id}&`);
  return res;
};
export const postChat = async (params: IChatPostReq): Promise<IChatPostRes> => {
  const res = await service.post(`/chat`, params);
  return res;
};
