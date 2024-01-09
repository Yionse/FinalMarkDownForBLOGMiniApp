import axios from "taro-axios";
const BASE_URL = "http://www.zhangtc.online:9876";

const httpInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (res) => {
    const { result } = res.data;
    return result;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type ClientError = {
  code: number;
  msg: string;
};

export const post = (url: string, data?: any) => {
  return httpInstance.post(url, data);
};

export const get = (url: string, data?: any): any => {
  return httpInstance.get<any>(url, { params: data });
};
