

import { useState } from "react";
import auth from "../Httpservices/Auth"; 

const BASE_URL = "http://209.74.89.83/erpbackend";

const httpServices = {
  // GET method
  get: async (endpoint, signal = null) => {
    try {
      const token = auth.getToken(); 
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        signal,
      });

      
      console.log("Request URL:", `${BASE_URL}${endpoint}`);
      console.log("Response Status:", response.status);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Server error: ${error}`); 
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData); 
      return responseData;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw new Error(`Network error: ${error.message}`); 
    }
  },

  // POST method
  post: async (endpoint, body, signal = null) => {
    try {
      const token = auth.getToken(); 
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
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
      console.log("Response Data:", responseData); 
      return responseData;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw new Error(`Network error: ${error.message}`); 
    }
  },

  // PATCH method
  patch: async (endpoint, body, signal = null) => {
    try {
      const token = auth.getToken(); 
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
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
      console.log("Response Data:", responseData); 
      return responseData;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw new Error(`Network error: ${error.message}`); 
    }
  },
};

export default httpServices;