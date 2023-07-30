import { BASE_URL } from "@/app/config/constants";
import axios, { AxiosHeaders, type AxiosRequestConfig } from "axios";

const http = axios.create();

http.defaults.baseURL = BASE_URL;

const ApiService = {
  removeHeader() {
    axios.defaults.headers.common = {};
  },
  setHeader() {
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "auth_token"
    )}`;
  },
  get(resource: string) {
    console.log(axios.defaults.baseURL);
    return axios.get(resource);
  },

  post(resource: string, data?: unknown, headers?: AxiosHeaders) {
    return axios.post(resource, data, {
      headers: headers,
    });
  },
  formData(resource: string, data: unknown) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  token(resource: string, data: any) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  },
  put(resource: string, data: unknown) {
    return axios.put(resource, data);
  },

  delete(resource: string) {
    return axios.delete(resource);
  },
  print(resource: string) {
    return axios.get(resource, {
      responseType: "blob",
    });
  },
  printTemp(resource: string, data: unknown) {
    return axios.post(resource, data, {
      responseType: "blob",
    });
  },
  blobAndJson(resource: any, data: any) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });
  },
  customRequest(data: AxiosRequestConfig<any>) {
    return axios(data);
  },
  mount401Interceptor() {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.request.status == 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
        if (error.request.status == 403) {
          window.location.href = "/error/403";
        }
        throw error;
      }
    );
  },
};

export default ApiService;
