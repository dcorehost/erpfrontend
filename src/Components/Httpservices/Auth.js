// // auth.js

// const auth = {
//     sign: (data) => {
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


// auth.js
const auth = {
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token; // Return true if token exists, false otherwise
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  logout: () => {
    localStorage.removeItem("token");
    // Redirect to login page or perform other cleanup
  },
};

export default auth;