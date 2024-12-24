import React, { useEffect, useState } from "react";
import styles from "./EnquiryDtails.module.css";

const EnquiryDetails = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    // Fetch enquiries from localStorage
    const storedEnquiries = JSON.parse(localStorage.getItem("enquiries")) || [];
    setEnquiries(storedEnquiries);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submitted Enquiries</h1>

      {/* Check if there are enquiries */}
      {enquiries.length > 0 ? (
        <>
          <p className={styles.successMessage}></p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, index) => (
                <tr key={index}>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.mobile}</td>
                  <td>{enquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No enquiries submitted yet.</p>
      )}
    </div>
  );
};

export default EnquiryDetails;
