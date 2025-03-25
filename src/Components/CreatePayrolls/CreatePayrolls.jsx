import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./CreatePayrolls.module.css";
import Auth from "../Services/Auth";

const CreatePayroll = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: "",
    grossSalary: ""
  });
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Auth.getToken();
      if (!token) throw new Error("Please login to access this page");

      const response = await axios.post(
        "http://209.74.89.83/erpbackend/create-payroll",
        { ...formData, grossSalary: Number(formData.grossSalary) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showAlert("success", response.data.message);
      setFormData({ employeeId: "", month: "", year: "", grossSalary: "" });
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to create payroll";
      showAlert("error", message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Payroll</h2>
      
      {alert.show && (
        <div className={`${styles.alert} ${styles[alert.type]}`}>
          {alert.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
          <span>{alert.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label><FaUser /> Employee ID</label>
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="EMP-001"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label><FaCalendarAlt /> Month</label>
            <select 
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={new Date(0, i).toLocaleString('default', { month: 'long' })}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label><FaCalendarAlt /> Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              max="2100"
              placeholder="2024"
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label><FaMoneyBillWave /> Gross Salary</label>
          <div className={styles.currencyInput}>
            <input
              type="number"
              name="grossSalary"
              value={formData.grossSalary}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Generate Payroll
        </button>
      </form>
    </div>
  );
};

export default CreatePayroll;
