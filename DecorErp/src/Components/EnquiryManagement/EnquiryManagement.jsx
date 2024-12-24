import React, { useState } from "react";
import styles from "./EnquiryManagement.module.css";

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setEnquiries([...enquiries, formData]);
      setFormData({ name: "", email: "", message: "" });
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

      {/* Display Enquiries */}
      <div className={styles.enquiries}>
        <h2>Submitted Enquiries</h2>
        {enquiries.length > 0 ? (
          <ul className={styles.list}>
            {enquiries.map((enquiry, index) => (
              <li key={index} className={styles.listItem}>
                <strong>{enquiry.name}</strong> ({enquiry.email}): {enquiry.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No enquiries yet.</p>
        )}
      </div>
    </div>
  );
};

export default EnquiryManagement;
