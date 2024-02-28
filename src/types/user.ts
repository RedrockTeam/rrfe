export interface ILoginPostReq {
  username: string;
  password: string;
}

export interface ILoginPostRes {
  data: LoginResData ;
  info: string;
  status: number;
}

interface LoginResData  {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export interface IRegisterPostReq {
  username: string;
  password: string;
}

export interface IRegisterPostRes {
  data: RegisterResData ;
  info: string;
  status: number;
}

interface RegisterResData  {
}

export interface IRefreshPostReq {
  refresh_token: string;
}

export interface IRefreshPostRes {
  data: RefreshResData ;
  info: string;
  status: number;
}

interface RefreshResData  {
  access_token: string;
  user_id: number;
}

