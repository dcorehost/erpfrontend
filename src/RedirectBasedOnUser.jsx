// RedirectBasedOnUser.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Components/Services/Auth";

const RedirectBasedOnUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = Auth.isAuthenticated();
    const typeOfUser = Auth.getUserType();

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      switch (typeOfUser) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "superadmin":
          navigate("/superadmin-dashboard");
          break;
        case "Client":
          navigate("/client-dashboard");
          break;
        default:
          navigate("/user-dashboard");
          break;
      }
    }
  }, [navigate]);

  return null; 
};

export default RedirectBasedOnUser;
