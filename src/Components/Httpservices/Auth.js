

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