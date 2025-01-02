import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./SalesDetails.module.css";

const SalesDetails = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    productName: "",
    quantity: "",
    price: "",
    timeAndDate: "",
    customerName: "",
    customerId: "",
  });

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("salesRecords")) || [];
    // Sort sales records by customerId
    const sortedSales = storedSales.sort((a, b) => a.customerId.localeCompare(b.customerId));
    setSalesRecords(sortedSales);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedSales = salesRecords.filter((_, index) => index !== indexToDelete);
    setSalesRecords(updatedSales);
    localStorage.setItem("salesRecords", JSON.stringify(updatedSales));
  };

  const handleEditClick = (record, index) => {
    setEditingIndex(index);
    setEditData(record);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSave = () => {
    const updatedSales = salesRecords.map((record, index) =>
      index === editingIndex ? editData : record
    );

    setSalesRecords(updatedSales);
    localStorage.setItem("salesRecords", JSON.stringify(updatedSales));
    setEditingIndex(null); // Exit edit mode
  };

  const generatePDF = async (customerId) => {
    // Aggregate all products by customerId
    const customerSales = salesRecords.filter((record) => record.customerId === customerId);

    if (customerSales.length > 0) {
      const pdf = new jsPDF();

      // Add Invoice header
      pdf.setFontSize(16);
      pdf.text(`Invoice for Customer: ${customerSales[0].customerName}`, 10, 10);
      pdf.setFontSize(12);
      pdf.text(`Customer ID: ${customerSales[0].customerId}`, 10, 20);

      // Add table headers
      pdf.text("Product Name", 10, 30);
      pdf.text("Quantity", 60, 30);
      pdf.text("Price", 110, 30);
      pdf.text("Total", 150, 30);

      // Add table rows
      let y = 40; // Start adding rows from y = 40
      customerSales.forEach((record) => {
        pdf.text(record.productName, 10, y);
        pdf.text(record.quantity.toString(), 60, y);
        pdf.text(`$${record.price}`, 110, y);
        pdf.text(`$${record.quantity * record.price}`, 150, y);
        y += 10; // Move to the next row
      });

      // Add Total amount
      const totalAmount = customerSales.reduce((total, record) => total + (record.quantity * record.price), 0);
      pdf.text(`Total Amount: $${totalAmount}`, 10, y + 10);

      // Save PDF
      pdf.save(`${customerSales[0].customerName}_invoice.pdf`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sales Report</h1>

      {editingIndex !== null && (
        <div className={styles.editForm}>
          <h2>Edit Record</h2>
          <input
            type="text"
            name="productName"
            value={editData.productName}
            onChange={handleEditChange}
            placeholder="Product Name"
            className={styles.input}
          />
          <input
            type="number"
            name="quantity"
            value={editData.quantity}
            onChange={handleEditChange}
            placeholder="Quantity"
            className={styles.input}
          />
          <input
            type="number"
            name="price"
            value={editData.price}
            onChange={handleEditChange}
            placeholder="Price"
            className={styles.input}
          />
          <input
            type="text"
            name="timeAndDate"
            value={editData.timeAndDate}
            onChange={handleEditChange}
            placeholder="Time and Date"
            className={styles.input}
          />
          <input
            type="text"
            name="customerName"
            value={editData.customerName}
            onChange={handleEditChange}
            placeholder="Customer Name"
            className={styles.input}
          />
          <input
            type="text"
            name="customerId"
            value={editData.customerId}
            onChange={handleEditChange}
            placeholder="Customer ID"
            className={styles.input}
          />
          <button onClick={handleEditSave} className={styles.button}>
            Save 
          </button>
        </div>
      )}

      {salesRecords.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Time and Date</th>
              <th>Customer Name</th>
              <th>Customer ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.productName}</td>
                <td>{record.quantity}</td>
                <td>${record.price}</td>
                <td>{record.timeAndDate}</td>
                <td>{record.customerName}</td>
                <td>{record.customerId}</td>
                <td>
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => handleEditClick(record, index)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => generatePDF(record.customerId)}
                      className={styles.invoiceButton}
                    >
                       Invoice 
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sales records submitted yet.</p>
      )}
    </div>
  );
};

export default SalesDetails;
