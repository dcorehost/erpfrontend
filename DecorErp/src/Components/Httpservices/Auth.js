// // auth.js

// const auth = {
//     login: (data) => {
//       try {
//         // Convert data to string and store in localStorage
//         localStorage.setItem("authData", JSON.stringify(data));
//         console.log("Data saved in localStorage:", data); // Debugging log
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//       }
//     },
//     logout: () => {
//       // Remove auth data from localStorage
//       localStorage.removeItem("authData");
//     },
//     isAuthenticated: () => {
//       // Check if authData exists in localStorage
//       return localStorage.getItem("authData") !== null;
//     },
//     getAuthData: () => {
//       // Retrieve auth data from localStorage
//       const authData = localStorage.getItem("authData");
//       return authData ? JSON.parse(authData) : null;
//     },
//   };
  
//   export default auth;


const auth = {
  login: (data) => {
    try {
      // Store authentication data in localStorage
      localStorage.setItem("authData", JSON.stringify(data));
      console.log("Data saved in localStorage:", data); // Debugging log
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  logout: () => {
    try {
      // Remove authentication data from localStorage
      localStorage.removeItem("authData");
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  isAuthenticated: () => {
    try {
      // Check if authData exists in localStorage
      return localStorage.getItem("authData") !== null;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return false;
    }
  },

  getAuthData: () => {
    try {
      // Retrieve auth data from localStorage
      const authData = localStorage.getItem("authData");
      return authData ? JSON.parse(authData) : null;
    } catch (error) {
      console.error("Error retrieving auth data:", error);
      return null;
    }
  },
};

export default auth;
