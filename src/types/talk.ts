export interface ISessionDeleteReq {
  session_id: string;
}

export interface ISessionDeleteRes {
  data: SessionResData ;
  info: string;
  status: number;
}

interface SessionResData  {
}

export interface IHistoryGetReq {
  session_id: string;
}

export interface IHistoryGetRes {
  data: HistoryResDatum[] ;
  info: string;
  status: number;
}

interface HistoryResDatum  {
  content: string;
  created_at: string;
  metadata: HistoryResMetadata ;
  role: string;
  token_count: number;
  uuid: string;
}

interface HistoryResMetadata  {
  system: HistoryResSystem ;
}

interface HistoryResSystem  {
  entities: HistoryResEntity[] ;
  intent?: string;
}

interface HistoryResEntity  {
  Label: string;
  Matches: HistoryResMatch[] ;
  Name: string;
}

interface HistoryResMatch  {
  End: number;
  Start: number;
  Text: string;
}

export interface IChatPostReq {
  session_id: string;
  category: string;
  content: string;
}

export interface IChatPostRes {
  data: ChatResData ;
  info: string;
  status: number;
}

interface ChatResData  {
  answer: string;
}

