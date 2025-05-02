
// const Auth = {
//     login: ({ token, username, typeOfUser, emailId ,phone }) => {
//       localStorage.setItem("authToken", token);
//       localStorage.setItem("username", username);
//       localStorage.setItem("typeOfUser", typeOfUser);
//       localStorage.setItem("emailId", emailId);
//       localStorage.setItem("phone",phone);  
//     },

//     logout: () => {
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("username");
//       localStorage.removeItem("typeOfUser");
//       localStorage.removeItem("emailId");
//       localStorage.removeItem("phone");  
//     },
  
//     isAuthenticated: () => {
//       return !!localStorage.getItem("authToken");
//     },
  
//     getUserType: () => {
//       return localStorage.getItem("typeOfUser");
//     },
  
//     getAuthData: () => {
//       return {
//         token: localStorage.getItem("authToken"),
//         username: localStorage.getItem("username"),
//         typeOfUser: localStorage.getItem("typeOfUser"),
//         emailId: localStorage.getItem("emailId"), 
//         phone: localStorage.getItem("phone"), 
//       };
//     },
  
//     getUserDetails: () => {
//       return Auth.getAuthData();
//     },
    
//     getToken: () => {
//       return localStorage.getItem("authToken");
//     },
//   };
  
//   export default Auth;
  

const Auth = {
  login: ({ token, username, typeOfUser, emailId, phone }) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("typeOfUser", typeOfUser);
    localStorage.setItem("emailId", emailId);
    localStorage.setItem("phone", phone);
    // Store all user data together for easy retrieval
    localStorage.setItem("userData", JSON.stringify({
      token,
      username,
      typeOfUser,
      emailId,
      phone
    }));
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("typeOfUser");
    localStorage.removeItem("emailId");
    localStorage.removeItem("phone");
    localStorage.removeItem("userData");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  getUserType: () => {
    return localStorage.getItem("typeOfUser");
  },

  getAuthData: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  getUserDetails: () => {
    return Auth.getAuthData();
  },
  
  getToken: () => {
    return localStorage.getItem("authToken");
  },

  getUsername: () => {
    return localStorage.getItem("username");
  }
};

export default Auth;