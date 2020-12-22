import { app } from "../main";
import axios from "axios";

// Request interceptor
axios.interceptors.request.use((request) => request);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    if (status >= 500) {
      app.config.globalProperties.$toast.add({
        severity: "error",
        summary: "Error",
        detail: "Server Error",
        life: 3000,
      });
    }

    return Promise.reject(error);
  }
);
