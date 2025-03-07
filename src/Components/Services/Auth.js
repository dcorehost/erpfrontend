
const Auth = {
    login: ({ token, username, typeOfUser, emailId ,contact1 }) => {
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      localStorage.setItem("typeOfUser", typeOfUser);
      localStorage.setItem("emailId", emailId); 
    },
  
    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("typeOfUser");
      localStorage.removeItem("emailId"); 
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
      };
    },
  
    getToken: () => {
      return localStorage.getItem("authToken");
    },
  };
  
  export default Auth;
  