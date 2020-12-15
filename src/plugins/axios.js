import axios from "axios";

// Request interceptor
axios.interceptors.request.use((request) => request);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
