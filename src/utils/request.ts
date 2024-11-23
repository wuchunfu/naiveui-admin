import { getServiceEnvConfig } from "~/env.config";
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store";
import { ERROR_STATUS } from "@/constants/request";
import { usePageRouter } from "@/hooks";

const { url, proxy } = getServiceEnvConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export type ContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream';

// 配置新建一个 axios 实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: isHttpProxy ? proxy : url,
  // 超时
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
});

// 添加请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore();
    // 在发送请求之前做些什么 token
    if (token) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers.token = token || '';
      config.headers.Authorization = `Bearer ${ token }` || '';
      // config.headers.apifoxToken = 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2';
    } else {
      reLogin();
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?';
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof (value) !== "undefined") {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                let params = propName + '[' + key + ']';
                let subPart = encodeURIComponent(params) + '=';
                url += subPart + encodeURIComponent(value[key]) + '&';
              }
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  }, (error: any) => {
    console.log(error)
    let { response } = error;
    const msg = ERROR_STATUS[response.code] || '未知错误';
    window.$message?.error(msg);
    reLogin();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(async (res: AxiosResponse) => {
    // 对响应数据做点什么
    const data = res.data;
    if (data.code && data.code !== 200) {
      const msg = ERROR_STATUS[data.code] || '未知错误'
      window.$message?.error(msg);
      reLogin();
      return Promise.reject(msg);
    } else {
      return data;
    }
  }, (error: any) => {
    console.log(error)
    // 对响应错误做点什么
    let { response } = error;
    const msg = ERROR_STATUS[response.code] || '未知错误'
    window.$message?.error(msg);
    reLogin();
    return Promise.reject(error);
  }
);

const reLogin = () => {
  const useAuth = useAuthStore();
  useAuth.resetAuthStore();
  // 去登录页
  const router = usePageRouter(false);
  router.toLogin();
}

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestParam {
  url: string;
  method?: RequestMethod;
  params?: any;
  data?: any;
  config?: AxiosRequestConfig;
}

interface SuccessResult<T = any> {
  code: string | number;
  data: T;
  msg: null;
}

interface FailedResult {
  code: string | number;
  data: null;
  msg: string;
}

type RestResponse<T = any> = SuccessResult<T> | FailedResult;

/**
 * 异步promise请求
 * @param param - 请求参数
 * - url: 请求地址
 * - method: 请求方法 get post put delete (默认get)
 * - params: 请求参数
 * - data: 请求体信息
 * - axiosConfig: axios配置
 * @returns {Promise<RestResponse<T>>}
 */
async function asyncRequest<T>(param: RequestParam): Promise<RestResponse<T>> {
  const { url, method = 'get', params, data, config = {} } = param;
  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    params,
    data,
    ...config
  };
  return (await service(requestConfig)) as RestResponse<T>;
}

async function getRequest<T>(url: string, params?: object, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'get',
    url: url,
    params: params,
    config: config
  });
}

async function getRequestById<T>(url: string, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'get',
    url: url,
    config: config
  });
}

async function postRequest<T>(url: string, data?: object, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'post',
    url: url,
    data: data,
    config: config
  });
}

async function putRequest<T>(url: string, data?: object, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'put',
    url: url,
    data: data,
    config: config
  });
}

async function deleteRequest<T>(url: string, data?: object, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'delete',
    url: url,
    data: data,
    config: config
  });
}

async function deleteRequestById<T>(url: string, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'delete',
    url: url,
    config: config
  });
}

async function uploadFileRequest<T>(url: string, data?: object, config?: AxiosRequestConfig) {
  return asyncRequest<T>({
    method: 'post',
    url: url,
    data: data,
    config: config
  });
}

export {
  getRequest,
  getRequestById,
  postRequest,
  putRequest,
  deleteRequest,
  deleteRequestById,
};
