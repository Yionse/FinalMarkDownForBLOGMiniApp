import Taro from "@tarojs/taro";
import axios from "axios";
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
    Taro.showToast({
      title: "请求失败",
      icon: "error",
    });
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (res) => {
    const { code, result, msg } = res.data;
    if (code === 301) {
      Taro.showToast({
        title: "请求失败",
        icon: "error",
      });
    } else if (code === 200 && result.isShowMessage) {
      Taro.showToast({
        title: msg,
        icon: "success",
      });
    }
    return result;
  },
  (error) => {
    Taro.showToast({
      title: "请求失败",
      icon: "error",
    });
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

export const fetchFile = async (url: string, data: any, param?: any) => {
  const defaultConfig = {
    method: "POST",
    body: data,
    headers: {
      "X-Token": localStorage.getItem("BLOG_TOKEN") || "",
    },
    ...param,
  };
  try {
    const response = await fetch(BASE_URL + "/files" + url, defaultConfig);
    if (!response.ok) {
      throw new Error("请求失败");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
