
const Auth = {
    login: ({ token, username, typeOfUser, emailId ,phone }) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      localStorage.setItem("typeOfUser", typeOfUser);
      localStorage.setItem("emailId", emailId);
      localStorage.setItem("phone",phone);  
    },

    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("typeOfUser");
      localStorage.removeItem("emailId");
      localStorage.removeItem("phone");  
    },
  
    isAuthenticated: () => {
      return !!localStorage.getItem("authToken");
    },
  
    getUserType: () => {
      return localStorage.getItem("typeOfUser");
    },
  
    getAuthData: () => {
      return {
        token: localStorage.getItem("authToken"),
        username: localStorage.getItem("username"),
        typeOfUser: localStorage.getItem("typeOfUser"),
        emailId: localStorage.getItem("emailId"), 
        phone: localStorage.getItem("phone"), 
      };
    },
  
    getToken: () => {
      return localStorage.getItem("authToken");
    },
  };
  
  export default Auth;
  