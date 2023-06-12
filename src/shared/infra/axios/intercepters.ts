import axios from "axios";

export const Axios = axios.create();

Axios.interceptors.request.use(
  async (config) => {
    // CODE HERE
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
