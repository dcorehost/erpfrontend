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


// import axios from "axios";
// import auth from "../Httpservices/Auth";

// // Base API URL
// const baseApiUrl = "https://amediagencyonline.com/erp";

// // Set up Axios instance with Authorization header
// const axiosInstance = axios.create({
//   baseURL: baseApiUrl,
// });

// // Add authorization token to the headers if the user is authenticated
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const authData = auth.getAuthData();
//     if (authData && authData.token) {
//       config.headers.Authorization = `Bearer ${authData.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // GET request
// function get(url) {
//   return axiosInstance.get(url);
// }

// // POST request
// function post(url, body) {
//   return axiosInstance.post(url, body);
// }

// // PUT request
// function put(url, body) {
//   return axiosInstance.put(url, body);
// }

// // DELETE request
// function deletReq(url) {
//   return axiosInstance.delete(url);
// }

// export default {
//   get,
//   post,
//   put,
//   deletReq,
// };


// httpServices.js

import { useState } from "react";

// httpServices.js
// httpServices.js
// httpServices.js
import auth from "../Httpservices/Auth"; // Import the auth service

const BASE_URL = "http://209.74.89.83/erpbackend";

const httpServices = {
  // GET method
  get: async (endpoint, signal = null) => {
    try {
      const token = auth.getToken(); // Get the token from auth.js
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
        signal,
      });

      // Log the request and response for debugging
      console.log("Request URL:", `${BASE_URL}${endpoint}`);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Server error: ${error}`); // Include server error message
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData); // Log the response data
      return responseData;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw new Error(`Network error: ${error.message}`); // Include detailed error message
    }
  },

  // POST method
  post: async (endpoint, body, signal = null) => {
    try {
      const token = auth.getToken(); // Get the token from auth.js
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify(body),
        signal,
      });

      // Log the request and response for debugging
      console.log("Request URL:", `${BASE_URL}${endpoint}`);
      console.log("Request Body:", body);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Server error: ${error}`); // Include server error message
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData); // Log the response data
      return responseData;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw new Error(`Network error: ${error.message}`); // Include detailed error message
    }
  },

  // PATCH method
  patch: async (endpoint, body, signal = null) => {
    try {
      const token = auth.getToken(); // Get the token from auth.js
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify(body),
        signal,
      });

      // Log the request and response for debugging
      console.log("Request URL:", `${BASE_URL}${endpoint}`);
      console.log("Request Body:", body);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Server error: ${error}`); // Include server error message
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData); // Log the response data
      return responseData;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw new Error(`Network error: ${error.message}`); // Include detailed error message
    }
  },
};

export default httpServices;