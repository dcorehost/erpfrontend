


import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import styles from './CreateHolidays.module.css';
import Auth from '../Services/Auth';

const CreateHoliday = () => {
  const [formData, setFormData] = useState({ startDate: '', endDate: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Auth.getToken();

    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        'http://209.74.89.83/erpbackend/create-holiday',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      setFormData({ startDate: '', endDate: '', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.holidayContainer}>
      <h2 className={styles.holidayTitle}> Create a Holiday</h2>
      <form className={styles.holidayForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Holiday details..."
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <span className={styles.spinner}></span> : 'Create Holiday'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateHoliday;
