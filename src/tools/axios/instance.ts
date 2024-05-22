import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';



const instance: AxiosInstance = axios.create({
  baseURL: process.env.FAST_API_BACKEND,
  timeout: 10000, 
});


instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    //console.log('Request sent:', config);
    return config;
  },
  function (error: any): Promise<never> {
    //console.error('Request error:', error);
    return Promise.reject(error);
  }
);


instance.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
    //console.log('Response received:', response);
    return response;
  },
  function (error: any): Promise<never> {
    //console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default instance;