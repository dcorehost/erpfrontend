
import React, { useState } from "react";
import axios from "axios"; 
import styles from "./SignIn.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

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

    
    if (!formData.username || !formData.email || !formData.password) {
      setLoading(false);
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/erpbackend/login-in-user",
        formData
      );

      if (response.data.success) {

        
        console.log("Login successful:", response.data);
        alert("Sign-in successful!");

        
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

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Log In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email/Phone
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
      <div className={styles.linksContainer}>
        <a href="/forgot-password" className={styles.link}>
          Forgot Password?
        </a>
        <p className={styles.text}>
          Don’t have an account?{" "}
          <a href="/signup" className={styles.link}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
