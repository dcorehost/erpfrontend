// import React, { useState } from 'react';
// import styles from './CreateUser.module.css';

// const CreateUser = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'employee',
//     phone: '',
//     department: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setIsSubmitting(true);
      
//       // Simulate API call
//       setTimeout(() => {
//         console.log('User created:', formData);
//         setIsSubmitting(false);
//         setSuccessMessage('User created successfully!');
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           role: 'employee',
//           phone: '',
//           department: ''
//         });
        
//         // Hide success message after 3 seconds
//         setTimeout(() => setSuccessMessage(''), 3000);
//       }, 1500);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Create New User</h2>
      
//       {successMessage && (
//         <div className={styles.successMessage}>{successMessage}</div>
//       )}
      
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             className={errors.username ? styles.errorInput : ''}
//           />
//           {errors.username && <span className={styles.error}>{errors.username}</span>}
//         </div>
        
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={errors.email ? styles.errorInput : ''}
//           />
//           {errors.email && <span className={styles.error}>{errors.email}</span>}
//         </div>
        
//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={errors.password ? styles.errorInput : ''}
//           />
//           {errors.password && <span className={styles.error}>{errors.password}</span>}
//         </div>
        
//         <div className={styles.formGroup}>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className={errors.confirmPassword ? styles.errorInput : ''}
//           />
//           {errors.confirmPassword && (
//             <span className={styles.error}>{errors.confirmPassword}</span>
//           )}
//         </div>
        
//         <div className={styles.formGroup}>
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className={errors.phone ? styles.errorInput : ''}
//           />
//           {errors.phone && <span className={styles.error}>{errors.phone}</span>}
//         </div>
        
//         <div className={styles.formGroup}>
//           <label htmlFor="role">Role</label>
//           <select
//             id="role"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//           >
//             <option value="employee">Employee</option>
//             <option value="manager">Manager</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
        
//         <div className={styles.formGroup}>
//           <label htmlFor="department">Department</label>
//           <input
//             type="text"
//             id="department"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//           />
//         </div>
        
//         <button
//           type="submit"
//           className={styles.submitButton}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Creating...' : 'Create User'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateUser;


import React, { useState } from 'react';
import styles from './CreateUser.module.css';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    department: '',
    position: '',
    role: 'employee',
    joiningDate: '',
    salary: '',
    emergencyContact: '',
    bloodGroup: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Personal Info Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.username.trim()) newErrors.username = 'Required';
    
    // Contact Info Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    // Account Security Validation
    if (!formData.password) {
      newErrors.password = 'Required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords don\'t match';
    }
    
    // Employment Details Validation
    if (!formData.department.trim()) newErrors.department = 'Required';
    if (!formData.position.trim()) newErrors.position = 'Required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('User created:', formData);
        setIsSubmitting(false);
        setSuccessMessage('User created successfully!');
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setSuccessMessage('');
          setFormData({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            dob: '',
            gender: 'male',
            address: '',
            city: '',
            state: '',
            country: 'India',
            pincode: '',
            department: '',
            position: '',
            role: 'employee',
            joiningDate: '',
            salary: '',
            emergencyContact: '',
            bloodGroup: '',
            panNumber: '',
            aadharNumber: ''
          });
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create New User</h1>
      
      {successMessage && (
        <div className={styles.successMessage}>
          <span>✓</span> {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3>Personal Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? styles.errorInput : ''}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? styles.errorInput : ''}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Username*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? styles.errorInput : ''}
              />
              {errors.username && <span className={styles.error}>{errors.username}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Contact Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.errorInput : ''}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Phone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? styles.errorInput : ''}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Emergency Contact</label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Account Security</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? styles.errorInput : ''}
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? styles.errorInput : ''}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Employment Details</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Department*</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? styles.errorInput : ''}
              />
              {errors.department && <span className={styles.error}>{errors.department}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Position*</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={errors.position ? styles.errorInput : ''}
              />
              {errors.position && <span className={styles.error}>{errors.position}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Role*</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Joining Date*</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className={errors.joiningDate ? styles.errorInput : ''}
              />
              {errors.joiningDate && <span className={styles.error}>{errors.joiningDate}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label>Salary (₹)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h3>Government IDs</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span> Creating User...
              </>
            ) : (
              'Create User'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;