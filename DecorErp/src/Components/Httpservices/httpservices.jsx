// //httpservices.jsx
// import axios from "axios";

// // const baseApiUrl = "https://rrgames.de.r.appspot.com/rrgames";
// const baseApiUrl = "https://amediagencyonline.com/erp";

// function get(url) {
//   return axios.get(baseApiUrl + url);
// }

// function post(url, body) {
//   return axios.post(baseApiUrl + url, body);
// }

// function put(url, body) {
//   return axios.put(baseApiUrl + url, body);
// }

// function deletReq(url) {
//   return axios.delete(baseApiUrl + url);
// }

// export default {
//   get,
//   post,
//   put,
//   deletReq,
// };


import axios from "axios";
import auth from "../Httpservices/Auth";

// Base API URL
const baseApiUrl = "https://amediagencyonline.com/erp";

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
