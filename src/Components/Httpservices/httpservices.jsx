
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
        throw new Error(`Server error: ${error}`); 
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