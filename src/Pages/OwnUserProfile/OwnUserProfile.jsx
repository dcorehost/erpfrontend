
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './OwnUserProfile.module.css';
import Auth from '../../Components/Services/Auth';

const OwnUserProfile = () => {
  // State for each field's edit mode
  const [editStates, setEditStates] = useState({
    username: false,
    displayName: false,
    gender: false,
    dateOfBirth: false,
    language: false,
    deductionType: false,
    role: false,
    country: false,
    state: false,
    pincode: false,
    phone: false,
    emailId: false,
    profilePhoto: false
  });

  const [formData, setFormData] = useState({
    employeeId: '',
    username: '',
    displayName: '',
    gender: '',
    dateOfBirth: '',
    language: [],
    deductionType: [],
    role: '',
    country: '',
    state: '',
    pincode: '',
    phone: '',
    emailId: '',
    profilePhoto: null
  });

  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const fileInputRef = useRef(null);

  const API_BASE_URL = 'http://209.74.89.83/erpbackend/';

  // Create axios instance with authorization token
  const getAxiosInstance = () => {
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.get('get-user-detail');
        const userData = response.data.users;
        
        const userType = Auth.getUserType();
        setIsSuperAdmin(userType === 'Super Admin');

        const mappedData = {
          employeeId: userData.employeeId || '',
          username: userData.username || '',
          displayName: userData.displayName || '',
          gender: userData.gender || '',
          dateOfBirth: userData.dateOfBirth || '',
          language: userData.language || [],
          deductionType: userData.deductionType || [],
          role: userData.role || '',
          country: userData.address?.country || '',
          state: userData.address?.state || '',
          pincode: userData.address?.pincode || '',
          phone: userData.contact?.phone || '',
          emailId: userData.contact?.emailId || '',
          profilePhoto: userData.profilePhoto || null
        };

        setFormData(mappedData);
        setOriginalData(mappedData);

        if (userData.profilePhoto) {
          setPreviewUrl(userData.profilePhoto);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({
      ...prev,
      [name]: selectedValues
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData(prev => ({ ...prev, profilePhoto: file }));
      };
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

  const toggleFieldEdit = (fieldName) => {
    setEditStates(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const handleFieldSave = async (fieldName) => {
    if (JSON.stringify(formData[fieldName]) === JSON.stringify(originalData[fieldName])) {
      alert('No changes detected');
      toggleFieldEdit(fieldName);
      return;
    }

    try {
      const axiosInstance = getAxiosInstance();
      
      if (isSuperAdmin) {
        const formDataToSend = new FormData();
        if (fieldName === 'profilePhoto') {
          formDataToSend.append('profilePhoto', formData.profilePhoto);
          await axiosInstance.put('update-user-profile', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } else {
          await axiosInstance.put('update-user-profile', { [fieldName]: formData[fieldName] });
        }
        alert('Field updated successfully');
      } else {
        // Create update payload with only the changed field
        const updatePayload = { [fieldName]: formData[fieldName] };
        
        // Only include username if it's the field being updated
        if (fieldName === 'username') {
          updatePayload.username = formData.username;
        }
        
        await axiosInstance.put('request-profile-update', updatePayload);
        setRequestSent(true);
        alert('Profile update request sent successfully');
      }
      
      setOriginalData(prev => ({ ...prev, [fieldName]: formData[fieldName] }));
      toggleFieldEdit(fieldName);
    } catch (err) {
      console.error('Error updating field:', err);
      alert('Failed to update field');
    }
  };

  const handleFieldCancel = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: originalData[fieldName]
    }));
    toggleFieldEdit(fieldName);
    
    if (fieldName === 'profilePhoto' && originalData.profilePhoto) {
      setPreviewUrl(originalData.profilePhoto);
    } else if (fieldName === 'profilePhoto') {
      setPreviewUrl(null);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>
            <i className={`${styles.profileIcon} fas fa-user-circle`}></i>
            User Profile
          </h1>
          {requestSent && (
            <div className={styles.notification}>
              <i className="fas fa-check-circle"></i>
              Your profile update request has been sent successfully.
            </div>
          )}
        </div>

        <div className={styles.profileSections}>
          {/* Profile Photo Section */}
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <i className={`${styles.sectionIcon} fas fa-camera`}></i>
                Profile Photo
              </h2>
              {!editStates.profilePhoto ? (
                <button 
                  onClick={() => toggleFieldEdit('profilePhoto')}
                  className={styles.editButton}
                >
                  <i className="fas fa-pencil-alt"></i> Edit
                </button>
              ) : (
                <div className={styles.fieldActions}>
                  <button
                    onClick={() => handleFieldSave('profilePhoto')}
                    className={styles.saveButton}
                  >
                    <i className="fas fa-check"></i> {isSuperAdmin ? 'Save' : 'Send'}
                  </button>
                  <button
                    onClick={() => handleFieldCancel('profilePhoto')}
                    className={styles.cancelButton}
                  >
                    <i className="fas fa-times"></i> Cancel
                  </button>
                </div>
              )}
            </div>
            
            <div className={styles.photoContainer}>
              <div className={styles.photoWrapper}>
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Profile" className={styles.profileImage} />
                    {editStates.profilePhoto && (
                      <button 
                        onClick={handleRemovePhoto} 
                        className={styles.removePhotoButton}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </>
                ) : (
                  <div className={styles.photoPlaceholder}>
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
              {editStates.profilePhoto && (
                <div className={styles.uploadContainer}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className={styles.fileInput}
                    id="profilePhotoUpload"
                  />
                  <label htmlFor="profilePhotoUpload" className={styles.uploadButton}>
                    <i className="fas fa-cloud-upload-alt"></i> Choose Photo
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Basic Information Section */}
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <i className={`${styles.sectionIcon} fas fa-id-card`}></i>
                Basic Information
              </h2>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Employee ID</label>
                <div className={styles.staticValue}>{formData.employeeId}</div>
              </div>
              
              <EditableField 
                fieldName="username"
                label="Username"
                type="text"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="emailId"
                label="Email"
                type="email"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
            </div>
          </div>

          {/* Personal Details Section */}
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <i className={`${styles.sectionIcon} fas fa-user-tie`}></i>
                Personal Details
              </h2>
            </div>
            
            <div className={styles.formGrid}>
              <EditableField 
                fieldName="displayName"
                label="Display Name"
                type="text"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="gender"
                label="Gender"
                type="select"
                options={[
                  { value: '', label: 'Select Gender' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' }
                ]}
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="dateOfBirth"
                label="Date of Birth"
                type="date"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <i className={`${styles.sectionIcon} fas fa-address-book`}></i>
                Contact Information
              </h2>
            </div>
            
            <div className={styles.formGrid}>
              <EditableField 
                fieldName="phone"
                label="Phone"
                type="tel"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
            </div>
          </div>

          {/* Location Information Section */}
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <i className={`${styles.sectionIcon} fas fa-map-marker-alt`}></i>
                Location Information
              </h2>
            </div>
            
            <div className={styles.formGrid}>
              <EditableField 
                fieldName="country"
                label="Country"
                type="select"
                options={[
                  { value: '', label: 'Select Country' },
                  { value: 'USA', label: 'United States' },
                  { value: 'GBR', label: 'United Kingdom' },
                  { value: 'IND', label: 'India' },
                  { value: 'CAN', label: 'Canada' },
                  { value: 'AUS', label: 'Australia' }
                ]}
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="state"
                label="State/Province"
                type="text"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="pincode"
                label="ZIP/Postal Code"
                type="text"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className={styles.profileSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <i className={`${styles.sectionIcon} fas fa-cog`}></i>
                Preferences
              </h2>
            </div>
            
            <div className={styles.formGrid}>
              <EditableField 
                fieldName="language"
                label="Language"
                type="select"
                options={[
                  { value: '', label: 'Select Language' },
                  { value: 'English', label: 'English' },
                  { value: 'Hindi', label: 'Hindi' },
                  { value: 'Spanish', label: 'Spanish' }
                ]}
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="deductionType"
                label="Deduction Type"
                type="select"
                options={[
                  { value: '', label: 'Select Deduction' },
                  { value: 'Health Insurance', label: 'Health Insurance' },
                  { value: 'Tax', label: 'Tax' },
                  { value: 'Retirement', label: 'Retirement' }
                ]}
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
              
              <EditableField 
                fieldName="role"
                label="Role"
                type="text"
                formData={formData}
                editStates={editStates}
                toggleFieldEdit={toggleFieldEdit}
                handleInputChange={handleInputChange}
                handleFieldSave={handleFieldSave}
                handleFieldCancel={handleFieldCancel}
                isSuperAdmin={isSuperAdmin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable EditableField component
const EditableField = ({
  fieldName,
  label,
  type = 'text',
  options = [],
  formData,
  editStates,
  toggleFieldEdit,
  handleInputChange,
  handleFieldSave,
  handleFieldCancel,
  isSuperAdmin
}) => (
  <div className={styles.formGroup}>
    <div className={styles.fieldHeader}>
      <label className={styles.inputLabel}>{label}</label>
      {!editStates[fieldName] ? (
        <button 
          onClick={() => toggleFieldEdit(fieldName)}
          className={styles.editButton}
        >
          <i className="fas fa-pencil-alt"></i> Edit
        </button>
      ) : (
        <div className={styles.fieldActions}>
          <button
            onClick={() => handleFieldSave(fieldName)}
            className={styles.saveButton}
          >
            <i className="fas fa-check"></i> {isSuperAdmin ? 'Save' : 'Send'}
          </button>
          <button
            onClick={() => handleFieldCancel(fieldName)}
            className={styles.cancelButton}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      )}
    </div>
    
    {editStates[fieldName] ? (
      type === 'select' ? (
        <select
          name={fieldName}
          className={styles.formInput}
          value={formData[fieldName]}
          onChange={handleInputChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={fieldName}
          className={styles.formInput}
          value={formData[fieldName]}
          onChange={handleInputChange}
        />
      )
  //   ) : (
  //     <div className={styles.staticValue}>
  //       {Array.isArray(formData[fieldName]) 
  //         ? formData[fieldName].join(', ') || 'Not specified'
  //         : formData[fieldName] || 'Not specified'}
  //     </div>
  //   )}
  // </div>
) : (
  <div className={styles.staticValue}>
    {!Array.isArray(formData[fieldName])
      ? formData[fieldName] || 'N/A'
      : formData[fieldName].join(', ') || 'N/A'}
  </div>
)}
</div>
);



export default OwnUserProfile;