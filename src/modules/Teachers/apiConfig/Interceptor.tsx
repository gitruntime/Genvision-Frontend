import axios from "axios";
import Cookies from 'universal-cookie';


const cookies = new Cookies;
// Axios instance
const api = axios.create({
  baseURL: "http://thousi.localhost:3000/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper functions to get and set tokens
const getAccessToken = () => cookies.get("accessToken");
const getRefreshToken = () => cookies.get("refreshToken");

const setAccessToken = (token: string) => {
  cookies.set("accessToken", token);
};

const removeTokens = () => {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
};

// Request interceptor to add access token to headers
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token expiry and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 error (Unauthorized) - Token expired
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          // Send the refresh token to get a new access token
          const { data } = await api.post("/auth/refresh", { refreshToken });
          const newAccessToken = data.accessToken;
          setAccessToken(newAccessToken);

          // Retry the failed request with the new access token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          removeTokens();
          // Redirect to login page or show an error message
          window.location.href = "/login"; // Or handle redirection as needed
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
