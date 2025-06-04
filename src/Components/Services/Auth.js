// const Auth = {
//   login: ({ token, email }) => {
//     // Store token and email in localStorage
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("email", email);

//     // Store user data together for easy retrieval
//     localStorage.setItem("userData", JSON.stringify({
//       token,
//       email
//     }));
//   },

//   logout: () => {
//     // Remove all auth-related data from localStorage
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userData");
//   },

//   isAuthenticated: () => {
//     // Check if token exists in localStorage
//     return !!localStorage.getItem("authToken");
//   },

//   getAuthData: () => {
//     // Get user data from localStorage
//     const userData = localStorage.getItem("userData");
//     return userData ? JSON.parse(userData) : null;
//   },

//   getToken: () => {
//     // Return the stored auth token
//     return localStorage.getItem("authToken");
//   },

//   getemail: () => {
//     // Return the stored email
//     return localStorage.getItem("email");
//   }
// };

// export default Auth;

// src/components/Services/Auth.js

// const Auth = {
//   login: ({ token, email, username, typeOfUser }) => {
//     const userData = {
//       token,
//       email,
//       username,
//       typeOfUser,
//     };

//     localStorage.setItem("authToken", token);
//     localStorage.setItem("email", email);
//     localStorage.setItem("userData", JSON.stringify(userData));
//   },

//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userData");
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem("authToken");
//   },

//   getToken: () => {
//     return localStorage.getItem("authToken");
//   },

//   getemail: () => {
//     return localStorage.getItem("email");
//   },

//   getAuthData: () => {
//     const userData = localStorage.getItem("userData");
//     return userData ? JSON.parse(userData) : null;
//   },

//   // ✅ Compatibility alias for old code
//   getUserDetails: function () {
//     return this.getAuthData();
//   },
// };

// export default Auth;


// const Auth = {
//   login: ({ token, email, username, typeOfUser, employeeId }) => {
//     const userData = {
//       token,
//       email,
//       username,
//       typeOfUser,
//       employeeId, // ✅ Store employeeId
//     };

//     localStorage.setItem("authToken", token);
//     localStorage.setItem("email", email);
//     localStorage.setItem("userData", JSON.stringify(userData));
//   },

//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userData");
//     localStorage.clear();
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem("authToken");
//   },

//   getToken: () => {
//     return localStorage.getItem("authToken");
//   },

//   getemail: () => {
//     return localStorage.getItem("email");
//   },

//   getAuthData: () => {
//     const userData = localStorage.getItem("userData");
//     return userData ? JSON.parse(userData) : null;
//   },

//   getUser: function () {
//     return this.getAuthData(); // ✅ alias
//   },

//   getUserDetails: function () {
//     return this.getAuthData(); // ✅ legacy alias
//   },
// };

// export default Auth;


// const Auth = {
//   login: ({ token, email, username, typeOfUser, employeeId }) => {
//     const userData = {
//       token,
//       email,
//       username,
//       typeOfUser,
//       employeeId, // ✅ Store employeeId
//     };

//     localStorage.setItem("authToken", token);
//     localStorage.setItem("email", email);
//     localStorage.setItem("userData", JSON.stringify(userData));
//   },

//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userData");
//     localStorage.clear();
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem("authToken");
//   },

//   getToken: () => {
//     return localStorage.getItem("authToken");
//   },

//   getemail: () => {
//     return localStorage.getItem("email");
//   },

//   getAuthData: () => {
//     const userData = localStorage.getItem("userData");
//     return userData ? JSON.parse(userData) : null;
//   },

//   getUser: function () {
//     return this.getAuthData();
//   },

//   getUserDetails: function () {
//     return this.getAuthData();
//   },

  
//   getUserType: function () {
//     const data = this.getAuthData();
//     return data?.typeOfUser || null;
//   },
// };

// export default Auth;
// const Auth = {
//   login: ({ token, email, username, typeOfUser, employeeId }) => {
//     const userData = {
//       token,
//       email,
//       username,
//       typeOfUser,
//       employeeId, // Store employeeId
//     };

//     localStorage.setItem("token", token); // Changed authToken to token for consistency with App.js
//     localStorage.setItem("email", email);
//     localStorage.setItem("typeOfUser", typeOfUser); // Store typeOfUser directly
//     localStorage.setItem("userData", JSON.stringify(userData));
//   },

//   logout: () => {
//     localStorage.removeItem("token"); // Changed authToken to token
//     localStorage.removeItem("email");
//     localStorage.removeItem("typeOfUser"); // Remove typeOfUser directly
//     localStorage.removeItem("userData");
//     // Removed localStorage.clear(); for more controlled logout
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem("token"); // Changed authToken to token
//   },

//   getToken: () => {
//     return localStorage.getItem("token"); // Changed authToken to token
//   },

//   getemail: () => {
//     return localStorage.getItem("email");
//   },

//   getAuthData: () => {
//     const userData = localStorage.getItem("userData");
//     return userData ? JSON.parse(userData) : null;
//   },

//   getUser: function () {
//     return this.getAuthData();
//   },

//   getUserDetails: function () {
//     return this.getAuthData();
//   },

//   getUserType: function () {
//     const data = this.getAuthData();
//     return data?.typeOfUser || null;
//   },
// };

// export default Auth;


const Auth = {
  login: ({ token, email, username, typeOfUser, employeeId }) => {
    const userData = {
      token,
      email,
      username,
      typeOfUser,
      employeeId,
    };

    // Store essential data for the current window's session
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("typeOfUser", typeOfUser);
    localStorage.setItem("userData", JSON.stringify(userData));
  },

  logout: () => {
    // Only remove items related to the current session in this specific localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("typeOfUser");
    localStorage.removeItem("userData");
    // Do NOT use localStorage.clear() here, as it would clear other tabs/windows too.
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getemail: () => {
    return localStorage.getItem("email");
  },

  getAuthData: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  getUser: function () {
    return this.getAuthData();
  },

  getUserDetails: function () {
    return this.getAuthData();
  },

  getUserType: function () {
    const data = this.getAuthData();
    return data?.typeOfUser || null;
  },
};

export default Auth;