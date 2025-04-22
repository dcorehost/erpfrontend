import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importing toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS for styling
import styles from './CreateHolidays.module.css';
import Auth from '../Services/Auth';

const CreateHoliday = () => {
  const [formData, setFormData] = useState({ startDate: '', endDate: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // To track the creation process

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Auth.getToken();

    // If not authenticated, show error toast
    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    // Optional: check if the user is a superadmin (this can be uncommented if needed)
    // const user = Auth.getUser();
    // if (user?.typeOfUser !== 'superadmin') {
    //   toast.error("You don't have permission to create holidays.");
    //   return;
    // }

    setLoading(true); // Start the loading spinner
    setIsCreating(true); // Show loading spinner in button

    try {
      const res = await axios.post(
        'http://209.74.89.83/erpbackend/create-holiday',
        {
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success toast after creation
      toast.success(res.data.message);
      setFormData({ startDate: '', endDate: '', description: '' });
      setIsCreating(false); // Hide spinner after submission
    } catch (err) {
      // Show error toast if something goes wrong
      const msg = err.response?.data?.message || 'Something went wrong';
      toast.error(msg);
      setIsCreating(false); // Hide spinner in case of error
    }

    setLoading(false); // End loading state
  };

  return (
    <div className={styles.holidayContainer}>
      <h2 className={styles.holidayTitle}>🎉 Create a Holiday</h2>
      <form className={styles.holidayForm} onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Holiday details..."
          required
        ></textarea>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading} // Disable the button when loading
        >
          {isCreating ? (
            <div className={styles.spinner}></div> // Spinner when creating holiday
          ) : (
            'Create Holiday'
          )}
        </button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default CreateHoliday;
