import React, { useState } from "react";
import styles from "./EnquiryManagement.module.css";

const EnquiryManagement = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.mobile && formData.message) {
      // Get existing enquiries from localStorage
      const existingEnquiries = JSON.parse(localStorage.getItem("enquiries")) || [];
      // Add the new enquiry to the list
      const updatedEnquiries = [...existingEnquiries, formData];
      // Save updated enquiries to localStorage
      localStorage.setItem("enquiries", JSON.stringify(updatedEnquiries));
      alert("Your data has been submitted successfully!");
      // Reset the form
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Enquiry Management</h1>

      {/* Enquiry Form */}
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleInputChange}
          className={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your enquiry"
          value={formData.message}
          onChange={handleInputChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnquiryManagement;
