const Auth = {
  login: ({ token, email }) => {
    // Store token and email in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("email", email);

    // Store user data together for easy retrieval
    localStorage.setItem("userData", JSON.stringify({
      token,
      email
    }));
  },

  logout: () => {
    // Remove all auth-related data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userData");
    localStorage.clear();
  },

  isAuthenticated: () => {
    // Check if token exists in localStorage
    return !!localStorage.getItem("authToken");
  },

  getAuthData: () => {
    // Get user data from localStorage
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  getToken: () => {
    // Return the stored auth token
    return localStorage.getItem("authToken");
  },

  getemail: () => {
    // Return the stored email
    return localStorage.getItem("email");
  }
};

export default Auth;
