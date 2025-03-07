// import React, { useState } from "react";
// import styles from "./sign.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

// const sign = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     })); 
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted with data: ", formData);
//     // Add your form submission logic here (e.g., API call)
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Sign In</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="username" className={styles.label}>Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder=" Username"
//             value={formData.username}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.label}>Email/Phone</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//              placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="password" className={styles.label}>Password</label>
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//                placeholder="Passowrd"
//               value={formData.password}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className={styles.eyeButton}
//               aria-label="Toggle password visibility"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>
//         <button type="submit" className={styles.button}>Sign In</button>
//       </form>
//       <div className={styles.linksContainer}>
//         <a href="/forgot-password" className={styles.link}>Forgot Password?</a>
//         <p className={styles.text}>Don’t have an account? <a href="/signup" className={styles.link}></a></p>
//       </div>
//     </div>
//   );
// };

// export default sign;


// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for API calls
// import styles from "./sign.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const sign = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const [errorMessage, setErrorMessage] = useState(""); // State for API error messages

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Reset error message on form submission

//     try {
//       const response = await axios.post(
//         "https://amediagencyonline.com/erp/sign-in",
//         formData
//       );

//       if (response.data.success) {
//         // Handle successful sign
//         console.log("sign successful:", response.data);
//         alert("Sign-in successful!");
//         // Redirect or perform further actions here
//       } else {
//         // Handle API error response
//         setErrorMessage(response.data.message || "Sign-in failed!");
//       }
//     } catch (error) {
//       // Handle network or unexpected errors
//       console.error("Error signg in:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Sign In</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="username" className={styles.label}>
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.label}>
//             Email/Phone
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
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
//               value={formData.password}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className={styles.eyeButton}
//               aria-label="Toggle password visibility"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>
//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//         <button
//           type="submit"
//           className={styles.button}
//           disabled={loading}
//         >
//           {loading ? "signg In..." : "Sign In"}
//         </button>
//       </form>
//       <div className={styles.linksContainer}>
//         <a href="/forgot-password" className={styles.link}>
//           Forgot Password?
//         </a>
//         <p className={styles.text}>
//           Don’t have an account?{" "}
//           <a href="/signup" className={styles.link}>
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default sign;


// import React, { useState } from "react";
// import axios from "axios"; // Import Axios for API calls
// import styles from "./sign.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const sign = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
//   const [loading, setLoading] = useState(false); // State for loading indicator
//   const [errorMessage, setErrorMessage] = useState(""); // State for API error messages

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage(""); // Reset error message on form submission

//     // Simple client-side validation
//     if (!formData.username || !formData.email || !formData.password) {
//       setLoading(false);
//       setErrorMessage("All fields are required!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://amediagencyonline.com/erp/sign-in",
//         formData
//       );

//       if (response.data.success) {
//         // Handle successful sign
//         console.log("sign successful:", response.data);
//         alert("Sign-in successful!");
//         // Redirect or perform further actions here
//       } else {
//         // Handle API error response
//         setErrorMessage(response.data.message || "Sign-in failed!");
//       }
//     } catch (error) {
//       // Handle network or unexpected errors
//       console.error("Error signg in:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Log In</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           {/* <label htmlFor="username" className={styles.label}>
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           /> */}
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.label}>
//             Email/Phone
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
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
//               value={formData.password}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className={styles.eyeButton}
//               aria-label="Toggle password visibility"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>
//         {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
//         <button
//           type="submit"
//           className={styles.button}
//           disabled={loading}
//         >
//           {loading ? "signg In..." : "sign"}
//         </button>
//       </form>
//       <div className={styles.linksContainer}>
//         <a href="/forgot-password" className={styles.link}>
//           Forgot Password?
//         </a>
//         <p className={styles.text}>
//           Don’t have an account?{" "}
//           <a href="/signup" className={styles.link}>
//             Sign Up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default sign;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({
    identifier: "", // Either email or phone
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("typeOfUser");
    if (token && userType) {
      setIsAuthenticated(true);
      if (userType === "SuperAdmin") {
        navigate("/superadmin/dashboard");
      } else if (userType === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { identifier, password } = formData;
    
    if (!identifier || !password) {
      setLoading(false);
      setErrorMessage("Email or Phone and Password are required!");
      return;
    }

    const payload = {
      emailId: identifier.includes("@") ? identifier : undefined,
      phone: identifier.match(/^\d{10}$/) ? identifier : undefined,
      password,
    };

    try {
      const response = await axios.post(
        "https://amediagencyonline.com/erp/sign-in",
        payload
      );

      if (response.data.token) {
        console.log("Sign-in successful:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("typeOfUser", response.data.typeOfUser);
        setIsAuthenticated(true);

        // Redirect based on user type
        if (response.data.typeOfUser === "SuperAdmin") {
          navigate("/superadmin/dashboard");
        } else if (response.data.typeOfUser === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        setErrorMessage(response.data.message || "Sign-in failed!");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (isAuthenticated) {
    return null; // Prevent rendering sign-in form if already authenticated
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Log In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="identifier" className={styles.label}>
            Email or Phone
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter email or phone"
            value={formData.identifier}
            onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.eyeButton}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
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

export default SignIn;