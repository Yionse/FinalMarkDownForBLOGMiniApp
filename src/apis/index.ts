import axios from "taro-axios";
const BASE_URL = "https://blog.end.zhangtc.online";

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

export const post = <T>(url: string, data?: any): T => {
  return httpInstance.post<T>(url, data) as T;
};

export const get = <T>(url: string, data?: any): T => {
  return httpInstance.get<T>(url, { params: data }) as T;
};
