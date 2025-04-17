import React, { useState, useEffect } from "react";
import styles from "./OwnUserProfile.module.css";

const UserProfile = () => {
  return (
    <div className="user-profile">
      <h1 className="user-profile-heading">Your Profile</h1>
      <div className="profile-card">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value="John Doe" readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" value="john.doe@example.com" readOnly />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" value="Software Development" readOnly />
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input type="text" value="EMP00123" readOnly />
        </div>
        <div className="btn-container">
          <button>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
