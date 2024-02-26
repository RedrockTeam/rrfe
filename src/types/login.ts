export interface IRegisterReq {
  username: string;
  name: string;
  password: string;
}

export interface IRegisterRes {
  error_code: number;
  data: RegisterData
}

interface RegisterData{
  uid: string;
  username: string;
  name: string;
  groupid: number;
  reg_time: string;
  last_login_time: string;
}

