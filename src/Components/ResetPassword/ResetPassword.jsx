import React, { useState } from "react";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className={styles.container}>
      {/* <h1>Reset Your Password</h1> */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter  email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
           Reset Password
        </button>
      </form>
      <a href="/sign" className={styles.backLink}>
        Back to sign
      </a>
    </div>
  );
};

export default ResetPassword;
