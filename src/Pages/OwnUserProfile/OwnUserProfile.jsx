

// import { useState, useRef } from 'react';
// import styles from './OwnUserProfile.module.css';

// const OwnUserProfile = () => {
//   const [formData, setFormData] = useState({
//     employeeid: 'emp123',
//     username: 'surjeet',
//     email: 'surjeet@gmail.com',
//     displayname: 'Surjeet Kumar',
//     adGender: '',
//     phone: '',
//     dateOfBirth: '',
//     pincode: '',
//     password: '',
//     confirmPassword: '',
//     language: '',
//     deduction: [],
//     designation: 'MERN Stack Developer',
//     profilePhoto: null,
//     adCountry: '',

//     dohState: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const [showDisplayNamePopup, setShowDisplayNamePopup] = useState(false);
//   const [newDisplayName, setNewDisplayName] = useState('');
//   const [showPincodePopup, setShowPincodePopup] = useState(false);
//   const [newPincode, setNewPincode] = useState('');
//   const [showEmailPopup, setShowEmailPopup] = useState(false);
//   const [newEmail, setNewEmail] = useState('');
//   const [showCountryPopup, setShowCountryPopup] = useState(false);
//   const [newCountry, setNewCountry] = useState('');
//   const [showStatePopup, setShowStatePopup] = useState(false);
//   const [newState, setNewState] = useState('');
//   const [showPasswordPopup, setShowPasswordPopup] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [newConfirmPassword, setNewConfirmPassword] = useState('');
//   const [showPhonePopup, setShowPhonePopup] = useState(false);
//   const [newPhone, setNewPhone] = useState('');
//   const [showLanguagePopup, setShowLanguagePopup] = useState(false);
//   const [newLanguage, setNewLanguage] = useState('');
//   const [showDeductionPopup, setShowDeductionPopup] = useState(false);
//   const [newDeduction, setNewDeduction] = useState([]); 


//   const fileInputRef = useRef(null);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, profilePhoto: file }));
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewUrl(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setFormData(prev => ({ ...prev, profilePhoto: null }));
//     setPreviewUrl(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };



//   const handleUpdateDisplayName = () => {
//     setFormData(prev => ({ ...prev, displayname: newDisplayName }));
//     setShowDisplayNamePopup(false);
//     setNewDisplayName('');
//   };

//   const handleUpdatePincode = () => {
//     setFormData(prev => ({ ...prev, pincode: newPincode }));
//     setShowPincodePopup(false);
//     setNewPincode('');
//   };

//   const handleUpdateEmail = () => {
//     setFormData(prev => ({ ...prev, email: newEmail }));
//     setShowEmailPopup(false);
//     setNewEmail('');
//   };

//   const handleUpdateCountry = () => {
//     setFormData(prev => ({ ...prev, adCountry: newCountry }));
//     setShowCountryPopup(false);
//     setNewCountry('');
//   };

//   const handleUpdateState = () => {
//     setFormData(prev => ({ ...prev, dohState: newState }));
//     setShowStatePopup(false);
//     setNewState('');
//   };

//   const handleUpdateDeduction = () => {
//     setFormData(prev => ({ ...prev, deduction: newDeduction }));
//     setShowDeductionPopup(false);
//     setNewDeduction('');
//   };

//   const handleUpdatePassword = () => {
//     if (newPassword === newConfirmPassword) {
//       setFormData(prev => ({ ...prev, password: newPassword, confirmPassword: newConfirmPassword }));
//       setShowPasswordPopup(false);
//       setNewPassword('');
//       setNewConfirmPassword('');
//     } else {
//       alert("Passwords do not match!"); // Basic error handling
//     }
//   };

//   const handleUpdatePhone = () => {
//     setFormData(prev => ({ ...prev, phone: newPhone }));
//     setShowPhonePopup(false);
//     setNewPhone('');
//   };

//   const handleUpdateLanguage = () => {
//     setFormData(prev => ({ ...prev, language: newLanguage }));
//     setShowLanguagePopup(false);
//     setNewLanguage('');
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data Submitted:', formData);
//     alert('Profile Updated!');
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.header}>User Profile </h1>

//       <form onSubmit={handleSubmit}>
//         {/* Profile Header Section */}
//         <div className={styles.section}>
//           <div className={styles.profileHeader}>
//             <div className={styles.photoSection}>
//               <h2 className={styles.sectionTitle}>Profile Photo</h2>
//               <div className={styles.photoContainer}>
//                 <div
//                   className={styles.photoPreview}
//                   onClick={() => fileInputRef.current && fileInputRef.current.click()}
//                 >
//                   {previewUrl ? (
//                     <>
//                       <img
//                         src={previewUrl}
//                         alt="Profile preview"
//                         className={styles.profileImage}
//                       />
//                       <button
//                         type="button"
//                         className={styles.removePhotoButton}
//                         onClick={handleRemovePhoto}
//                       >
//                         ×
//                       </button>
//                     </>
//                   ) : (
//                     <div className={styles.uploadPrompt}>
//                       <span className={styles.uploadIcon}>📷</span>
//                       <p>Click to upload photo</p>
//                     </div>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*"
//                   onChange={handlePhotoUpload}
//                   className={styles.fileInput}
//                 />
//               </div>
//             </div>

//             <div className={styles.userInfoSection}>
//               <div className={styles.formGroup}>
//                 <div className={styles.staticText}>
//                   <strong>Employee ID:</strong> {formData.employeeid}
//                 </div>
//               </div>
//               <div className={styles.formGroup}>
//                 <div className={styles.staticText}>
//                   <strong>Username:</strong> {formData.username}
//                 </div>
//               </div>
//               <div className={styles.formGroup}>
//                 <div className={styles.staticText}>
//                   <strong>Email ID:</strong> {formData.email}
//                 </div>
//               </div>
//               <div className={styles.formGroup}>
//                 <div className={styles.staticText}>
//                   <strong>Designation:</strong> {formData.designation}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Personal Information Section */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Personal Details</h2>
//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>username</label>
//               <input
//                 type="text"
//                 name="username"
//                 className={styles.input}
//                 placeholder="Enter username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//               />
//             </div>


//             <div className={styles.formGroup}>
//               <label className={styles.label}>Designation</label>
//               <input
//                 type="text"
//                 name="designation"
//                 className={styles.input}
//                 placeholder="Enter designation"
//                 value={formData.designation}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Employee ID</label>
//               <input
//                 type="text"
//                 name="employeeid"
//                 className={styles.input}
//                 placeholder="Enter employee ID"
//                 value={formData.employeeid}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>Email</label>
//                 <a
//                   href="#update-email"
//                   className={styles.updateLink}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowEmailPopup(true);
//                   }}
//                 >
//                   Update
//                 </a>
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 className={styles.input}
//                 placeholder="Enter email"
//                 value={formData.email}
//                 readOnly
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>Display Name</label>
//                 <a
//                   href="#update-displayname"
//                   className={styles.updateLink}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDisplayNamePopup(true);
//                   }}
//                 >
//                   Update displayname
//                 </a>
//               </div>
//               <input
//                 type="text"
//                 name="displayname"
//                 className={styles.input}
//                 placeholder="Enter displayname"
//                 value={formData.displayname}
//                 readOnly
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Gender</label>
//               <select
//                 name="adGender"
//                 className={styles.select}
//                 value={formData.adGender}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>Phone</label>
//                 <a
//                   href="#update-phone"
//                   className={styles.updateLink}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowPhonePopup(true);
//                   }}
//                 >
//                   Update
//                 </a>
//               </div>
//               <input
//                 type="text"
//                 name="phone"
//                 className={styles.input}
//                 placeholder="Enter phone number"
//                 value={formData.phone}
//                 readOnly
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label className={styles.label}>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 className={styles.input}
//                 value={formData.dateOfBirth}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Location Details</h2>
//           <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//             <div className={styles.labelContainer}>
//               <label className={styles.label}>Country</label>
//               <button
//                 type="button"
//                 className={styles.updateButton}
//                 onClick={() => setShowCountryPopup(true)}
//               >
//                 Update
//               </button>
//             </div>
//             <select
//               name="adCountry"
//               className={styles.select}
//               value={formData.adCountry}
//               readOnly
//             >
//               <option value="">Select Country</option>
//               <option value="">Select Country</option>
//                 <option value="USA">United States of America</option>
//                 <option value="GBR">United Kingdom of Great Britain and Northern Ireland</option>
//                 <option value="IND">India</option>
//                 {/* Add more country codes and full names as needed */}
//                 <option value="CAN">Canada</option>
//                 <option value="AUS">Australia</option>
//                 <option value="DEU">Germany</option>
//                 <option value="FRA">France</option>
//                 <option value="JPN">Japan</option>
//                 <option value="CHN">China</option>
//                 <option value="BRA">Brazil</option>
//               {/* Add more country codes and full names as needed */}
//             </select>
//           </div>
//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>State</label>
//                 <a
//                   href="#update-state"
//                   className={styles.updateLink}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowStatePopup(true);
//                   }}
//                 >
//                   Update
//                 </a>
//               </div>
//               <input
//                 type="text"
//                 name="dohState"
//                 className={styles.input}
//                 placeholder="Enter state"
//                 value={formData.dohState}
//                 readOnly
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>PIN Code</label>
//                 <a
//                   href="#update-pincode"
//                   className={styles.updateLink}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowPincodePopup(true);
//                   }}
//                 >
//                   Update
//                 </a>
//               </div>
//               <input
//                 type="text"
//                 name="pincode"
//                 className={styles.input}
//                 placeholder="Enter pincode"
//                 value={formData.pincode}
//                 readOnly
//               />
//             </div>
//           </div>
//         </div>

//         {/* Security Section */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Security Settings</h2>
//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>Password</label>
//                 <a
//                   href="#update-password"
//                   className={styles.updateLink}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowPasswordPopup(true);
//                   }}
//                 >
//                   Update
//                 </a>
//               </div>
//               <div className={styles.passwordContainer}>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   className={styles.input}
//                   placeholder="Enter password"
//                   value={formData.password}
//                   readOnly
//                 //onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className={styles.toggleButton}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? 'Hide' : 'Show'}
//                 </button>
//               </div>
//             </div>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Confirm Password</label>
//               <div className={styles.passwordContainer}>
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   className={styles.input}
//                   placeholder="Confirm password"
//                   value={formData.confirmPassword}
//                   readOnly
//                 //onChange={handleInputChange}
//                 />
//                 <button
//                   type="button"
//                   className={styles.toggleButton}
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? 'Hide' : 'Show'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Preferences Section */}
//         <div className={styles.section}>
//           <h2 className={styles.sectionTitle}>Preferences</h2>
//           <div className={styles.formRow}>
//           <div className={styles.formGroup}>
//           <div className={styles.labelContainer}>
//             <label className={styles.label}>Language</label>
//             <button
//               type="button"
//               className={styles.updateLink}
//               onClick={() => setShowLanguagePopup(true)}
//             >
//               Update
//             </button>
//           </div>
//           <select
//             name="language"
//             className={styles.select}
//             value={formData.language}
//             readOnly
//           >
//             <option value="">Select Language</option>
//             <option value="en">English</option>
//             <option value="es">Spanish</option>
//             <option value="de">German</option>
//           </select>
//         </div>
      

//             <div className={styles.formGroup}>
//               <div className={styles.labelContainer}>
//                 <label className={styles.label}>Deduction</label>
//                 <button
//                   type="button"
//                   className={styles.updateLink}
//                   onClick={() => setShowDeductionPopup(true)}
//                 >
//                   Update
//                 </button>
//               </div>
//               <select
//                 name="deduction"
//                 className={styles.select}
//                 value={formData.deduction}
//                 readOnly
//               >
//                 <option value="">Select Deduction</option>
//                 <option value="healthInsurance">Health Insurance</option>
//                 <option value="providentFund">Provident Fund</option>
//               </select>
//             </div>
//           </div>
//         </div>


//         {/* Display Name Update Popup */}
//         {showDisplayNamePopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update Display Name</h3>
//               <input
//                 type="text"
//                 className={styles.input}
//                 placeholder="New display name"
//                 value={newDisplayName}
//                 onChange={(e) => setNewDisplayName(e.target.value)}
//               />
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowDisplayNamePopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdateDisplayName}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* PIN Code Update Popup */}
//         {showPincodePopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update PIN Code</h3>
//               <input
//                 type="text"
//                 className={styles.input}
//                 placeholder="New PIN Code"
//                 value={newPincode}
//                 onChange={(e) => setNewPincode(e.target.value)}
//               />
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowPincodePopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdatePincode}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Email Update Popup */}
//         {showEmailPopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update Email ID</h3>
//               <input
//                 type="email"
//                 className={styles.input}
//                 placeholder="New email ID"
//                 value={newEmail}
//                 onChange={(e) => setNewEmail(e.target.value)}
//               />
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowEmailPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdateEmail}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Country Update Popup */}
//         {showCountryPopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update Country</h3>
//               <select
//                 className={styles.select}
//                 value={newCountry}
//                 onChange={(e) => setNewCountry(e.target.value)}
//               >
//                 <option value="">Select Country</option>
//                 <option value="USA">United States of America</option>
//                 <option value="GBR">United Kingdom of Great Britain and Northern Ireland</option>
//                 <option value="IND">India</option>
//                 {/* Add more country codes and full names as needed */}
//                 <option value="CAN">Canada</option>
//                 <option value="AUS">Australia</option>
//                 <option value="DEU">Germany</option>
//                 <option value="FRA">France</option>
//                 <option value="JPN">Japan</option>
//                 <option value="CHN">China</option>
//                 <option value="BRA">Brazil</option>
//                 {/* ... and so on ... */}
//               </select>
//               <div className={styles.popupButtons}>
//                 <button
//                   type="button"
//                   className={styles.cancelButton}
//                   onClick={() => setShowCountryPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className={styles.saveButton}
//                   onClick={handleUpdateCountry}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* State Update Popup */}
//         {showStatePopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update State</h3>
//               <input
//                 type="text"
//                 className={styles.input}
//                 placeholder="New State"
//                 value={newState}
//                 onChange={(e) => setNewState(e.target.value)}
//               />
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowStatePopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdateState}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Password Update Popup */}
//         {showPasswordPopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update Password</h3>
//               <input
//                 type="password"
//                 className={styles.input}
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <input
//                 type="password"
//                 className={styles.input}
//                 placeholder="Confirm New Password"
//                 value={newConfirmPassword}
//                 onChange={(e) => setNewConfirmPassword(e.target.value)}
//               />
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowPasswordPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdatePassword}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Phone Update Popup */}
//         {showPhonePopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update Phone Number</h3>
//               <input
//                 type="text"
//                 className={styles.input}
//                 placeholder="New Phone Number"
//                 value={newPhone}
//                 onChange={(e) => setNewPhone(e.target.value)}
//               />
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowPhonePopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdatePhone}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Language Update Popup */}
//         {showLanguagePopup && (
//         <div className={styles.popupOverlay}>
//           <div className={styles.popupContent}>
//             <h3>Update Language</h3>
//             <select
//               className={styles.select}
//               value={newLanguage}
//               onChange={(e) => setNewLanguage(e.target.value)}
//             >
//               <option value="">Select Language</option>
//               <option value="en">English</option>
//               <option value="es">Spanish</option>
//               <option value="de">German</option>
//             </select>
//             <div className={styles.popupButtons}>
//               <button
//                 className={styles.cancelButton}
//                 onClick={() => setShowLanguagePopup(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={styles.saveButton}
//                 onClick={handleUpdateLanguage}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}


//         {showDeductionPopup && (
//           <div className={styles.popupOverlay}>
//             <div className={styles.popupContent}>
//               <h3>Update Deduction</h3>
//               <select
//                 className={styles.select}
//                 value={newDeduction}
//                 onChange={(e) => setNewDeduction(e.target.value)}
//               >
//                 <option value="">Select Deduction</option>
//                 <option value="healthInsurance">Health Insurance</option>
//                 <option value="providentFund">Provident Fund</option>
//               </select>
//               <div className={styles.popupButtons}>
//                 <button
//                   className={styles.cancelButton}
//                   onClick={() => setShowDeductionPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={styles.saveButton}
//                   onClick={handleUpdateDeduction}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <button type="submit" className={styles.submitButton}>
//           Save Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OwnUserProfile;



import { useState, useRef } from 'react';
import styles from './OwnUserProfile.module.css';

const OwnUserProfile = () => {
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
  const [newDeduction, setNewDeduction] = useState('');
  const [updatingField, setUpdatingField] = useState(''); // To store the field being updated

  // New state to store pending updates
  const [pendingUpdates, setPendingUpdates] = useState({});

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

  // Modified handleUpdateDisplayName function to request update
  const handleRequestDisplayNameUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, displayname: newDisplayName }));
    console.log('Requesting Display Name Update:', newDisplayName, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newDisplayName}`);
    setShowDisplayNamePopup(false);
    setNewDisplayName('');
  };

  // Modified handleUpdatePincode function to request update
  const handleRequestPincodeUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, pincode: newPincode }));
    console.log('Requesting PIN Code Update:', newPincode, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newPincode}`);
    setShowPincodePopup(false);
    setNewPincode('');
  };

  // Modified handleUpdateEmail function to request update
  const handleRequestEmailUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, email: newEmail }));
    console.log('Requesting Email Update:', newEmail, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newEmail}`);
    setShowEmailPopup(false);
    setNewEmail('');
  };

  // Modified handleUpdateCountry function to request update
  const handleRequestCountryUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, adCountry: newCountry }));
    console.log('Requesting Country Update:', newCountry, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newCountry}`);
    setShowCountryPopup(false);
    setNewCountry('');
  };

  // Modified handleUpdateState function to request update
  const handleRequestStateUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, dohState: newState }));
    console.log('Requesting State Update:', newState, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newState}`);
    setShowStatePopup(false);
    setNewState('');
  };

  // Modified handleUpdateDeduction function to request update
  const handleRequestDeductionUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, deduction: newDeduction }));
    console.log('Requesting Deduction Update:', newDeduction, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newDeduction}`);
    setShowDeductionPopup(false);
    setNewDeduction('');
  };

  // Modified handleUpdatePassword function to request update
  const handleRequestPasswordUpdate = () => {
    if (newPassword === newConfirmPassword) {
      setPendingUpdates(prev => ({ ...prev, password: newPassword }));
      console.log('Requesting Password Update', "Field:", updatingField);
      alert(`Request sent to admin for updating ${updatingField} to: ${newPassword}`);
      setShowPasswordPopup(false);
      setNewPassword('');
      setNewConfirmPassword('');
    } else {
      alert("Passwords do not match!"); // Basic error handling
    }
  };

  // Modified handleUpdatePhone function to request update
  const handleRequestPhoneUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, phone: newPhone }));
    console.log('Requesting Phone Update:', newPhone, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newPhone}`);
    setShowPhonePopup(false);
    setNewPhone('');
  };

  // Modified handleUpdateLanguage function to request update
  const handleRequestLanguageUpdate = () => {
    setPendingUpdates(prev => ({ ...prev, language: newLanguage }));
    console.log('Requesting Language Update:', newLanguage, "Field:", updatingField);
    alert(`Request sent to admin for updating ${updatingField} to: ${newLanguage}`);
    setShowLanguagePopup(false);
    setNewLanguage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data (Initial):', formData);
    console.log('Pending Updates:', pendingUpdates);
    alert('Profile Update Request Sent (including pending changes)!');
    // In a real application, you would likely send both formData (for directly editable fields)
    // and pendingUpdates to the server.
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
                readOnly
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Email</label>
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEmailPopup(true);
                    setUpdatingField('email'); // Set the field name
                  }}
                >
                  Request Update
                </button>
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
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDisplayNamePopup(true);
                    setUpdatingField('display name'); // Set the field name
                  }}
                >
                  Request Update
                </button>
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
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPhonePopup(true);
                    setUpdatingField('phone number'); // Set the field name
                  }}
                >
                  Request Update
                </button>
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
                  onClick={() => {
                    setShowCountryPopup(true);
                    setUpdatingField('country'); // Set the field name
                  }}
                >
                  Request Update
                </button>
              </div>
              <select
                name="adCountry"
                className={styles.select}
                value={formData.adCountry}
                readOnly
              >
                <option value="">Select Country</option>
                <option value="USA">United States of America</option>
                <option value="GBR">United Kingdom</option>
                <option value="IND">India</option>
                <option value="CAN">Canada</option>
                <option value="AUS">Australia</option>
                <option value="DEU">Germany</option>
                <option value="FRA">France</option>
                <option value="JPN">Japan</option>
                <option value="CHN">China</option>
                <option value="BRA">Brazil</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>State</label>
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowStatePopup(true);
                    setUpdatingField('state'); // Set the field name
                  }}
                >
                  Request Update
                </button>
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
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPincodePopup(true);
                    setUpdatingField('pincode'); // Set the field name
                  }}
                >
                  Request Update
                </button>
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
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPasswordPopup(true);
                    setUpdatingField('password'); // Set the field name
                  }}
                >
                  Request Update
                </button>
              </div>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={styles.input}
                  placeholder="Enter password"
                  value={formData.password}
                  readOnly
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
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLanguagePopup(true);
                    setUpdatingField('language'); // Set the field name
                  }}
                >
                  Request Update
                </button>
              </div>
              <select
                name="language"
                className={styles.select}
                value={formData.language}
                readOnly
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.labelContainer}>
                <label className={styles.label}>Deduction</label>
                <button
                  type="button"
                  className={styles.updateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDeductionPopup(true);
                    setUpdatingField('deduction'); // Set the field name
                  }}
                >
                  Request Update
                </button>
              </div>
              <select
                name="deduction"
                className={styles.select}
                value={formData.deduction}
                readOnly
              >
                <option value="">Select Deduction</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            Update Profile
          </button>
        </div>
      </form>

      {/* Display Name Popup */}
      {showDisplayNamePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Display Name</h3>
            <input
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              placeholder="Enter new display name"
              className={styles.input}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleRequestDisplayNameUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowDisplayNamePopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIN Code Popup */}
      {showPincodePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update PIN Code</h3>
            <input
              type="text"
              value={newPincode}
              onChange={(e) => setNewPincode(e.target.value)}
              placeholder="Enter new PIN code"
              className={styles.input}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleRequestPincodeUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowPincodePopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Popup */}
      {showEmailPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Email</h3>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              className={styles.input}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleRequestEmailUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowEmailPopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Country Popup */}
      {showCountryPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Country</h3>
            <select
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Country</option>
              <option value="USA">United States of America</option>
              <option value="GBR">United Kingdom</option>
              <option value="IND">India</option>
              <option value="CAN">Canada</option>
              <option value="AUS">Australia</option>
              <option value="DEU">Germany</option>
              <option value="FRA">France</option>
              <option value="JPN">Japan</option>
              <option value="CHN">China</option>
              <option value="BRA">Brazil</option>
            </select>
            <div className={styles.popupButtons}>
              <button onClick={handleRequestCountryUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowCountryPopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* State Popup */}
      {showStatePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update State</h3>
            <input
              type="text"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              placeholder="Enter new state"
              className={styles.input}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleRequestStateUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowStatePopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Popup */}
      {showPasswordPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={styles.input}
            />
            <input
              type="password"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={styles.input}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleRequestPasswordUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowPasswordPopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone Popup */}
      {showPhonePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Phone Number</h3>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Enter new phone number"
              className={styles.input}
            />
            <div className={styles.popupButtons}>
              <button onClick={handleRequestPhoneUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowPhonePopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Popup */}
      {showLanguagePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Language</h3>
            <select
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="hindi">Hindi</option>
            </select>
            <div className={styles.popupButtons}>
              <button onClick={handleRequestLanguageUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowLanguagePopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deduction Popup */}
      {showDeductionPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Update Deduction</h3>
            <select
              value={newDeduction}
              onChange={(e) => setNewDeduction(e.target.value)}
              className={styles.select}
            >
                <option value="">Select Deduction</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
            <div className={styles.popupButtons}>
              <button onClick={handleRequestDeductionUpdate} className={styles.popupButton}>
                Confirm
              </button>
              <button onClick={() => setShowDeductionPopup(false)} className={styles.popupButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnUserProfile;
