import { useEffect } from "react"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import httpServices from "../Services/Httpservices";
import Auth from "../Services/Auth.js";
import logo from "../../assets/logo.jpeg"

const Login = () => {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const isPhoneNumber = /^\d{10}$/.test(identifier);

      const response = await httpServices.post( "http://209.74.89.83/erpbackend/log-in", {
        [isPhoneNumber ? "phone" : "emailId"]: identifier, 
        password,
      }      );

      console.log("Login API Response:", response);


      if (response.status === 200) {
        const { token, typeOfUser, username } = response.data || {};

        console.log("Received Token:", token);
        console.log("User Type:", typeOfUser);

        localStorage.setItem("identifier", identifier); 
        console.log("identifier",identifier)


        if (!token) {
          setError("Invalid response from server. Please try again.");
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("typeOfUser", typeOfUser);
        console.log("typeOfuser",typeOfUser)
        localStorage.setItem("identifier", identifier); 
        console.log("identifier", identifier);
        


        Auth.login({ token, username, typeOfUser, identifier});

        setTimeout(() => {
        const storedType = localStorage.getItem("typeOfUser");
        console.log("Redirecting user type:", storedType);

        if (storedType === "Admin") {
          console.log("Redirecting to Admin Sidebar...");
          window.location.href = "/admin-sidebar"; 
        } else if (storedType === "User") {
          console.log("Redirecting to User Sidebar...");
          window.location.href = "/user-sidebar";
        } else if (storedType === "superadmin") {
          console.log("Redirecting to SuperAdmin Sidebar...");
          window.location.href = "/superadmin-sidebar";
        } else if (storedType === "Client") {
          console.log("Redirecting to Client Sidebar...");
          window.location.href = "/client-sidebar"; 
        }
      }, 500);


      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Log In</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="identifier" className={styles.label}>
            Email or Phone
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter email or phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className={styles.input}
            required
          /> 
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeButton}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className={styles.linksContainer}>
        <a href="/forgot-password" className={styles.link}>
          Forgot Password?
        </a>
        <p className={styles.text}>
          Don’t have an account? <a href="/signup" className={styles.link}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}; 

export default Login;



// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styles from "./SignIn.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Auth from "../Services/Auth.js";
// import logo from "../../assets/logo.jpeg";

// const Login = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const isPhoneNumber = /^\d{10}$/.test(identifier);

//       // Make the API request using axios
//       const response = await axios.post(
//         "http://209.74.89.83/erpbackend/log-in", // Your API URL
//         {
//           [isPhoneNumber ? "phone" : "emailId"]: identifier,
//           password,
//         }
//       );

//       console.log("Login API Response:", response);

//       if (response.status === 200) {
//         const { token, typeOfUser, username } = response.data || {};

//         console.log("Received Token:", token);
//         console.log("User Type:", typeOfUser);

//         if (!token) {
//           setError("Invalid response from server. Please try again.");
//           return;
//         }

//         // Store login details in localStorage
//         localStorage.setItem("token", token);
//         localStorage.setItem("typeOfUser", typeOfUser);
//         localStorage.setItem("identifier", identifier);

//         // Set up authentication state in your app
//         Auth.login({ token, username, typeOfUser, identifier });

//         // Directly navigate to the appropriate sidebar
//         const storedType = localStorage.getItem("typeOfUser");
//         console.log("Redirecting user type:", storedType);

//         // Redirection based on user type
//         if (storedType === "Admin") {
//           navigate("/admin-sidebar");
//         } else if (storedType === "User") {
//           navigate("/user-sidebar");
//         } else if (storedType === "superadmin") {
//           navigate("/superadmin-sidebar");
//         } else if (storedType === "Client") {
//           navigate("/client-sidebar");
//         }
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (error) {
//       console.error("Login request failed:", error);
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Log In</h2>
//       <form onSubmit={handleLogin} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="identifier" className={styles.label}>
//             Email or Phone
//           </label>
//           <input
//             type="text"
//             id="identifier"
//             name="identifier"
//             placeholder="Enter email or phone"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="password" className={styles.label}>
//             Password
//           </label>
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={styles.input}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={styles.eyeButton}
//               aria-label="Toggle password visibility"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>
//         {error && <p className={styles.error}>{error}</p>}
//         <button type="submit" className={styles.button} disabled={isLoading}>
//           {isLoading ? "Signing In..." : "Sign In"}
//         </button>
//       </form>
//       <div className={styles.linksContainer}>
//         <a href="/forgot-password" className={styles.link}>
//           Forgot Password?
//         </a>
//         <p className={styles.text}>
//           Don’t have an account? <a href="/signup" className={styles.link}>Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
 