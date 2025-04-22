import React, { useState } from 'react';
import styles from './SystemSetting.module.css';

const SystemSetting = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    timezone: 'UTC',
    language: 'English',
    currency: 'USD',
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setSettings(prev => ({ ...prev, logo: files[0] }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('System Settings Saved:', settings);
    // You would typically call an API here
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>System Settings</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Timezone</label>
          <select name="timezone" value={settings.timezone} onChange={handleChange}>
            <option value="UTC">UTC</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Default Language</label>
          <select name="language" value={settings.language} onChange={handleChange}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Default Currency</label>
          <select name="currency" value={settings.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Upload Logo</label>
          <input type="file" name="logo" onChange={handleChange} />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default SystemSetting;
