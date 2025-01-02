import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import styles from "./SalesDetails.module.css";

const SalesDetails = () => {
  const [salesRecords, setSalesRecords] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
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
    setSalesRecords(storedSales);
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

  const generatePDF = async (record) => {
    const element = document.getElementById("invoice");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${record.customerName}_invoice.pdf`);
  };

  const handleGenerateInvoice = (customerId) => {
    // Aggregate all products by customerId
    const customerSales = salesRecords.filter((record) => record.customerId === customerId);

    if (customerSales.length > 0) {
      setInvoiceData({ customerSales });
      setTimeout(() => generatePDF(customerSales[0]), 500);
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
            Save Changes
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
                      onClick={() => handleGenerateInvoice(record.customerId)}
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

      {invoiceData && (
        <div id="invoice" className={styles.invoiceContainer}>
          <h2 className={styles.heading}>Invoice</h2>

          <div className={styles.invoiceHeader}>
            <h3>Customer ID: {invoiceData.customerSales[0].customerId}</h3>
            <h3>Customer Name: {invoiceData.customerSales[0].customerName}</h3>
          </div>

          <table className={styles.invoiceTable}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.customerSales.map((record, index) => (
                <tr key={index}>
                  <td>{record.productName}</td>
                  <td>{record.quantity}</td>
                  <td>${record.price}</td>
                  <td>${record.quantity * record.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.invoiceFooter}>
            <p>
              <strong>Total Amount: </strong>
              ${invoiceData.customerSales.reduce((total, record) => total + (record.quantity * record.price), 0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDetails;
