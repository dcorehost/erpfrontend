// // RedirectBasedOnUser.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Auth from "./Components/Services/Auth";

// const RedirectBasedOnUser = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isAuthenticated = Auth.isAuthenticated();
//     const typeOfUser = Auth.getUserType();

//     if (!isAuthenticated) {
//       navigate("/login");
//     } else {
//       switch (typeOfUser) {
//         case "Admin":
//           navigate("/admin-dashboard");
//           break;
//         case "superadmin":
//           navigate("/superadmin-dashboard");
//           break;
//         case "Client":
//           navigate("/client-dashboard");
//           break;
//         default:
//           navigate("/user-dashboard");
//           break;
//       }
//     }
//   }, [navigate]);

//   return null; 
// };

// export default RedirectBasedOnUser;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Components/Services/Auth";

const RedirectBasedOnUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Auth.isAuthenticated();
    const userType = Auth.getUserType()?.toLowerCase();

    if (!isAuthenticated) {
      navigate("/login"); // Assuming '/login' is your sign-in route
    } else {
      switch (userType) {
        case "superadmin":
          navigate("/superadmin-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "client":
          navigate("/client-dashboard");
          break;
        case "user":
          navigate("/user-dashboard");
          break;
        default:
          navigate("/dashboard"); // Fallback route
          break;
      }
    }
  }, [navigate]);

  return null;
};

export default RedirectBasedOnUser;