import axios from "axios";

const BASE_URL = "";
  
export const service = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});