import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data: ", formData);
    // Add your form submission logic here (e.g., API call)
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder=" Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email/Phone</label>
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
          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
               placeholder="Passowrd"
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
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
      <div className={styles.linksContainer}>
        <a href="/forgot-password" className={styles.link}>Forgot Password?</a>
        <p className={styles.text}>Don’t have an account? <a href="/signup" className={styles.link}></a></p>
      </div>
    </div>
  );
};

export default SignIn;
