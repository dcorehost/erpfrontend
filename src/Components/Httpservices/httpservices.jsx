
import axios from "axios";
import auth from "../Httpservices/Auth";

// Base API URL
const baseApiUrl = "http://localhost:8000/erpbackend";
// const baseApiUrl = "https://amediagencyonline.com/erp";

// Set up Axios instance with Authorization header
const axiosInstance = axios.create({
  baseURL: baseApiUrl,
});

// Add authorization token to the headers if the user is authenticated
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = auth.getAuthData();
    if (authData && authData.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET request
function get(url) {
  return axiosInstance.get(url);
}

// POST request
function post(url, body) {
  return axiosInstance.post(url, body);
}

// PUT request
function put(url, body) {
  return axiosInstance.put(url, body);
}

// DELETE request
function deletReq(url) {
  return axiosInstance.delete(url);
}

export default {
  get,
  post,
  put,
  deletReq,
};
