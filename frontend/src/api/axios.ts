import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for 401 - auto refresh token
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: AxiosError) => {
    const originalRequest = err.config as RetryRequestConfig;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`${BASE_URL}/refresh`, { withCredentials: true });
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

