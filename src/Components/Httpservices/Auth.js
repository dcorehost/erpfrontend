

const auth = {
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token; 
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default auth;