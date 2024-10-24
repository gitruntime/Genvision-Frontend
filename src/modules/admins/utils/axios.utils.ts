import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const ENV = import.meta.env;

const createAxiosInstance = (): AxiosInstance => {
  const currentHost = window.location.hostname;
  const hostParts = currentHost.split('.');
  let subdomain: string;

  // Check if the hostname contains a subdomain
  if (hostParts.length >= 2) {
    subdomain = hostParts[0]; 
  } else {
    subdomain = '';
  }

  // Set the base URL dynamically based on the subdomain
  const baseURL = `${ENV.USE_BACKEND_SSL ? 'https:' : 'http:'}//${subdomain}.${ENV.BACKEND_HOST}/api`;

  // Create an Axios instance with the base URL
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Function to refresh the access token
  const refreshToken = async (): Promise<string | undefined> => {
    try {
      const token = localStorage.getItem('refreshToken');
      const response: AxiosResponse = await axios.post(`${baseURL}/admin/auth/refresh`, {
        refreshToken: token,
      });
      // Update the tokens in localStorage
      localStorage.setItem('authToken', response.data?.data?.accessToken);
      localStorage.setItem('refreshToken', response.data?.data?.refreshToken);
      return response.data?.data?.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle token refresh failure, redirect to login if necessary
      window.location.href = '/admin/auth/login';
      throw error;
    }
  };

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // Attach the access token to the request if available
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle token expiration and refresh
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Return the response data if the request is successful
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      // Check if the response indicates an unauthorized error
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Flag to avoid infinite retry loop
        try {
          // Attempt to refresh the access token
          const newAccessToken = await refreshToken();
          // Update the Authorization header with the new token
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refreshing the token fails, handle the error
          console.error('Token refresh failed:', refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Export the Axios instance
export const axiosInstance = createAxiosInstance();
