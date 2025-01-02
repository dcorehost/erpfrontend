import React, { useState } from "react";
import styles from "./SalesManagement.module.css";

const SalesManagement = () => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    price: "",
    timeAndDate: "",
    customerName: "",
    customerId: "", // Changed from productId to customerId
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
      formData.timeAndDate &&
      formData.customerName &&
      formData.customerId // Changed from productId to customerId
    ) {
      const timestamp = new Date().toLocaleString(); // Add timestamp
      const salesRecord = { ...formData, timestamp }; // Include timestamp

      // Get existing records from localStorage
      const existingRecords = JSON.parse(localStorage.getItem("salesRecords")) || [];
      const updatedRecords = [...existingRecords, salesRecord];

      // Save updated records to localStorage
      localStorage.setItem("salesRecords", JSON.stringify(updatedRecords));

      alert("Sales record has been submitted successfully!");
      setFormData({
        productName: "",
        quantity: "",
        price: "",
        timeAndDate: "",
        customerName: "",
        customerId: "", // Reset customerId
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
          step="0.01"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="datetime-local"
          name="timeAndDate"
          placeholder="Time and Date"
          value={formData.timeAndDate}
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
          name="customerId" // Changed from productId to customerId
          placeholder="Customer Id"
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

export default SalesManagement;
