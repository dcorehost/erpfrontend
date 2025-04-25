

import { useState, useRef } from 'react';
import styles from './OwnSuperAdminProfile.module.css';

const OwnSuperAdminProfile = () => {
  const [formData, setFormData] = useState({
    employeeid: 'emp123',
    username: 'surjeet',
    email: 'surjeet@gmail.com',
    displayname: 'Surjeet Kumar',
    adGender: '',
    phone: '',
    dateOfBirth: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    language: '',
    deduction: [],
    designation: 'MERN Stack Developer',
    profilePhoto: null,
    adCountry: '',

    dohState: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [showDisplayNamePopup, setShowDisplayNamePopup] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [showPincodePopup, setShowPincodePopup] = useState(false);
  const [newPincode, setNewPincode] = useState('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [showCountryPopup, setShowCountryPopup] = useState(false);
  const [newCountry, setNewCountry] = useState('');
  const [showStatePopup, setShowStatePopup] = useState(false);
  const [newState, setNewState] = useState('');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [showDeductionPopup, setShowDeductionPopup] = useState(false);
  const [newDeduction, setNewDeduction] = useState([]); 


  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };



  const handleUpdateDisplayName = () => {
    setFormData(prev => ({ ...prev, displayname: newDisplayName }));
    setShowDisplayNamePopup(false);
    setNewDisplayName('');
  };

  const handleUpdatePincode = () => {
    setFormData(prev => ({ ...prev, pincode: newPincode }));
    setShowPincodePopup(false);
    setNewPincode('');
  };

  const handleUpdateEmail = () => {
    setFormData(prev => ({ ...prev, email: newEmail }));
    setShowEmailPopup(false);
    setNewEmail('');
  };

  const handleUpdateCountry = () => {
    setFormData(prev => ({ ...prev, adCountry: newCountry }));
    setShowCountryPopup(false);
    setNewCountry('');
  };

  const handleUpdateState = () => {
    setFormData(prev => ({ ...prev, dohState: newState }));
    setShowStatePopup(false);
    setNewState('');
  };

  const handleUpdateDeduction = () => {
    setFormData(prev => ({ ...prev, deduction: newDeduction }));
    setShowDeductionPopup(false);
    setNewDeduction('');
  };

  const handleUpdatePassword = () => {
    if (newPassword === newConfirmPassword) {
      setFormData(prev => ({ ...prev, password: newPassword, confirmPassword: newConfirmPassword }));
      setShowPasswordPopup(false);
      setNewPassword('');
      setNewConfirmPassword('');
    } else {
      alert("Passwords do not match!"); // Basic error handling
    }
  };

  const handleUpdatePhone = () => {
    setFormData(prev => ({ ...prev, phone: newPhone }));
    setShowPhonePopup(false);
    setNewPhone('');
  };

  const handleUpdateLanguage = () => {
    setFormData(prev => ({ ...prev, language: newLanguage }));
    setShowLanguagePopup(false);
    setNewLanguage('');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Profile Updated!');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>User Profile </h1>

      <form onSubmit={handleSubmit}>
        {/* Profile Header Section */}
        <div className={styles.section}>
          <div className={styles.profileHeader}>
            <div className={styles.photoSection}>
              <h2 className={styles.sectionTitle}>Profile Photo</h2>
              <div className={styles.photoContainer}>
                <div
                  className={styles.photoPreview}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className={styles.profileImage}
                      />
                      <button
                        type="button"
                        className={styles.removePhotoButton}
                        onClick={handleRemovePhoto}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <div className={styles.uploadPrompt}>
                      <span className={styles.uploadIcon}>📷</span>
                      <p>Click to upload photo</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className={styles.fileInput}
                />
              </div>
            </div>

            <div className={styles.userInfoSection}>
              <div className={styles.formGroup}>
                <div className={styles.staticText}>
                  <strong>Employee ID:</strong> {formData.employeeid}
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.staticText}>
                  <strong>Username:</strong> {formData.username}
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.staticText}>
                  <strong>Email ID:</strong> {formData.email}
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.staticText}>
                  <strong>Designation:</strong> {formData.designation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Details</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>username</label>
              <input
                type="text"
                name="username"
                className={styles.input}
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>


            <div className={styles.formGroup}>
              <label className={styles.label}>Designation</label>
              <input
                type="text"
                name="designation"
                className={styles.input}
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Employee ID</label>
              <input
                type="text"
                name="employeeid"
                className={styles.input}
                placeholder="Enter employee ID"
                value={formData.employeeid}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Email</label>
                <a
                  href="#update-email"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEmailPopup(true);
                  }}
                >
                  Update
                </a>
              </div>
              <input
                type="email"
                name="email"
                className={styles.input}
                placeholder="Enter email"
                value={formData.email}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Display Name</label>
                <a
                  href="#update-displayname"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDisplayNamePopup(true);
                  }}
                >
                  Update displayname
                </a>
              </div>
              <input
                type="text"
                name="displayname"
                className={styles.input}
                placeholder="Enter displayname"
                value={formData.displayname}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Gender</label>
              <select
                name="adGender"
                className={styles.select}
                value={formData.adGender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Phone</label>
                <a
                  href="#update-phone"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPhonePopup(true);
                  }}
                >
                  Update
                </a>
              </div>
              <input
                type="text"
                name="phone"
                className={styles.input}
                placeholder="Enter phone number"
                value={formData.phone}
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className={styles.input}
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Location Details</h2>
          <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>Country</label>
              <button
                type="button"
                className={styles.updateButton}
                onClick={() => setShowCountryPopup(true)}
              >
                Update
              </button>
            </div>
            <select
              name="adCountry"
              className={styles.select}
              value={formData.adCountry}
              readOnly
            >
              <option value="">Select Country</option>
              <option value="">Select Country</option>
                <option value="USA">United States of America</option>
                <option value="GBR">United Kingdom of Great Britain and Northern Ireland</option>
                <option value="IND">India</option>
                {/* Add more country codes and full names as needed */}
                <option value="CAN">Canada</option>
                <option value="AUS">Australia</option>
                <option value="DEU">Germany</option>
                <option value="FRA">France</option>
                <option value="JPN">Japan</option>
                <option value="CHN">China</option>
                <option value="BRA">Brazil</option>
              {/* Add more country codes and full names as needed */}
            </select>
          </div>
            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>State</label>
                <a
                  href="#update-state"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowStatePopup(true);
                  }}
                >
                  Update
                </a>
              </div>
              <input
                type="text"
                name="dohState"
                className={styles.input}
                placeholder="Enter state"
                value={formData.dohState}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>PIN Code</label>
                <a
                  href="#update-pincode"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPincodePopup(true);
                  }}
                >
                  Update
                </a>
              </div>
              <input
                type="text"
                name="pincode"
                className={styles.input}
                placeholder="Enter pincode"
                value={formData.pincode}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Security Settings</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Password</label>
                <a
                  href="#update-password"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPasswordPopup(true);
                  }}
                >
                  Update
                </a>
              </div>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={styles.input}
                  placeholder="Enter password"
                  value={formData.password}
                  readOnly
                //onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={styles.input}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  readOnly
                //onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Preferences</h2>
          <div className={styles.formRow}>
          <div className={styles.formGroup}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Language</label>
            <button
              type="button"
              className={styles.updateLink}
              onClick={() => setShowLanguagePopup(true)}
            >
              Update
            </button>
          </div>
          <select
            name="language"
            className={styles.select}
            value={formData.language}
            readOnly
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
          </select>
        </div>
      

            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Deduction</label>
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={() => setShowDeductionPopup(true)}
                >
                  Update
                </button>
              </div>
              <select
                name="deduction"
                className={styles.select}
                value={formData.deduction}
                readOnly
              >
                <option value="">Select Deduction</option>
                <option value="healthInsurance">Health Insurance</option>
                <option value="providentFund">Provident Fund</option>
              </select>
            </div>
          </div>
        </div>


        {/* Display Name Update Popup */}
        {showDisplayNamePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update Display Name</h3>
              <input
                type="text"
                className={styles.input}
                placeholder="New display name"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowDisplayNamePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdateDisplayName}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PIN Code Update Popup */}
        {showPincodePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update PIN Code</h3>
              <input
                type="text"
                className={styles.input}
                placeholder="New PIN Code"
                value={newPincode}
                onChange={(e) => setNewPincode(e.target.value)}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowPincodePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdatePincode}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Update Popup */}
        {showEmailPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update Email ID</h3>
              <input
                type="email"
                className={styles.input}
                placeholder="New email ID"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowEmailPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdateEmail}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Country Update Popup */}
        {showCountryPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update Country</h3>
              <select
                className={styles.select}
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                <option value="USA">United States of America</option>
                <option value="GBR">United Kingdom of Great Britain and Northern Ireland</option>
                <option value="IND">India</option>
                {/* Add more country codes and full names as needed */}
                <option value="CAN">Canada</option>
                <option value="AUS">Australia</option>
                <option value="DEU">Germany</option>
                <option value="FRA">France</option>
                <option value="JPN">Japan</option>
                <option value="CHN">China</option>
                <option value="BRA">Brazil</option>
                {/* ... and so on ... */}
              </select>
              <div className={styles.popupButtons}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowCountryPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={handleUpdateCountry}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State Update Popup */}
        {showStatePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update State</h3>
              <input
                type="text"
                className={styles.input}
                placeholder="New State"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowStatePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdateState}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Update Popup */}
        {showPasswordPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update Password</h3>
              <input
                type="password"
                className={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Confirm New Password"
                value={newConfirmPassword}
                onChange={(e) => setNewConfirmPassword(e.target.value)}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowPasswordPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdatePassword}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phone Update Popup */}
        {showPhonePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update Phone Number</h3>
              <input
                type="text"
                className={styles.input}
                placeholder="New Phone Number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowPhonePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdatePhone}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Language Update Popup */}
        {showLanguagePopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Update Language</h3>
            <select
              className={styles.select}
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
            </select>
            <div className={styles.popupButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowLanguagePopup(false)}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={handleUpdateLanguage}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


        {showDeductionPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Update Deduction</h3>
              <select
                className={styles.select}
                value={newDeduction}
                onChange={(e) => setNewDeduction(e.target.value)}
              >
                <option value="">Select Deduction</option>
                <option value="healthInsurance">Health Insurance</option>
                <option value="providentFund">Provident Fund</option>
              </select>
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowDeductionPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.saveButton}
                  onClick={handleUpdateDeduction}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default OwnSuperAdminProfile;
