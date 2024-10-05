import axios, { AxiosResponse } from 'axios';
import cookiesStore from './cookiesStore';
import ErrorCode from '../utils/errorCode';
import showError from '../utils/showError';
import DEFINE_ROUTERS from '../constants/routers-mapper';

const API_URL: string | undefined = import.meta.env.VITE_BASE_URL;

const axiosRequest = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

axiosRequest.defaults.headers.put['Content-Type'] = 'application/json';
axiosRequest.defaults.headers.common['Authorization'] = cookiesStore.get(
  'access_token',
)
  ? 'Bearer ' + cookiesStore.get('access_token')
  : '';

const onFulFillResponse = (
  value: AxiosResponse<any, any>,
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
  return value;
};

const onRejectResponse = (error: any) => {
  const { config, data, status } = error.response;

  if (status === ErrorCode[401] || data.status === ErrorCode[403]) {
    cookiesStore.remove('access_token');
    axiosRequest.defaults.headers.common['Authorization'] = '';
    location.href = DEFINE_ROUTERS.auth.login;
    showError(data, config);
  }
  if (status === 400) {
    showError(data, config);
  }
  if (!error.response || error.response.status >= 500) {
    console.log('🚀 ~ onRejectResponse ~ error.response:', error.response);
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

axiosRequest.interceptors.response.use(onFulFillResponse, onRejectResponse);

export default axiosRequest;
