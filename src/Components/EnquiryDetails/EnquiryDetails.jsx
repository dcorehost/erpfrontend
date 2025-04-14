import React, { useEffect, useState } from "react";
import styles from "./EnquiryDtails.module.css";

const EnquiryDetails = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const storedEnquiries = JSON.parse(localStorage.getItem("enquiries")) || [];
    setEnquiries(storedEnquiries);
  }, []);

  const handleStatusChange = (index) => {
    const updatedEnquiries = enquiries.map((enquiry, idx) =>
      idx === index
        ? { ...enquiry, status: enquiry.status === "Seen" ? "Unseen" : "Seen" }
        : enquiry
    );

    setEnquiries(updatedEnquiries);
    localStorage.setItem("enquiries", JSON.stringify(updatedEnquiries)); 
  };

  const handleDelete = (indexToDelete) => {
    const updatedEnquiries = enquiries.filter((_, index) => index !== indexToDelete);
    setEnquiries(updatedEnquiries);
    localStorage.setItem("enquiries", JSON.stringify(updatedEnquiries)); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Submitted Enquiries</h1>

      {enquiries.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry, index) => (
              <tr key={index}>
                <td>{enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.mobile}</td>
                <td>{enquiry.message}</td>
                <td>{enquiry.timestamp}</td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      checked={enquiry.status === "Seen"}
                      onChange={() => handleStatusChange(index)}
                    />
                    {enquiry.status}
                  </label>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(index)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No enquiries submitted yet.</p>
      )}
    </div>
  );
};

export default EnquiryDetails;
