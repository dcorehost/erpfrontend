import React, { useState } from "react";
import styles from "./SalesManagement.module.css"; // Importing CSS Module

const SalesManagement = () => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    price: "",
    dateTime: "",
    customerName: "",
    customerId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.productName &&
      formData.quantity &&
      formData.price &&
      formData.dateTime &&
      formData.customerName &&
      formData.customerId
    ) {
      const timestamp = new Date().toLocaleString(); // Add timestamp
      const salesWithStatus = { ...formData, timestamp, status: "Unseen" }; // Add status

      // Get existing sales records from localStorage
      const existingSales = JSON.parse(localStorage.getItem("sales")) || [];
      const updatedSales = [...existingSales, salesWithStatus];

      // Save updated sales records to localStorage
      localStorage.setItem("sales", JSON.stringify(updatedSales));

      alert("Your data has been submitted successfully!");
      setFormData({
        productName: "",
        quantity: "",
        price: "",
        dateTime: "",
        customerName: "",
        customerId: "",
      }); // Reset form
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sales Management</h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={formData.customerId}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SalesManagement; // Export the updated component
