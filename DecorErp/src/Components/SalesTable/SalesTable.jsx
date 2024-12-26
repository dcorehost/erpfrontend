import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import styles from "./SalesTable.module.css";

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    price: "",
    dateTime: "",
    customerName: "",
    customerId: "",
  });
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    // Fetch sales records from localStorage
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(storedSales);
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    const saleToEdit = sales[index];
    setFormData({
      productName: saleToEdit.productName,
      quantity: saleToEdit.quantity,
      price: saleToEdit.price,
      dateTime: saleToEdit.dateTime,
      customerName: saleToEdit.customerName,
      customerId: saleToEdit.customerId,
    });
  };

  const handleSaveEdit = () => {
    const updatedSales = sales.map((sale, idx) =>
      idx === editIndex ? { ...sale, ...formData } : sale
    );

    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
    setEditIndex(null);
  };

  const handleDelete = (indexToDelete) => {
    const updatedSales = sales.filter((_, index) => index !== indexToDelete);
    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));
  };

  const handleInvoice = (customerId) => {
    // Filter all sales for the given customerId
    const customerSales = sales.filter((sale) => sale.customerId === customerId);

    // Calculate total amount for the customer
    const totalAmount = customerSales.reduce(
      (total, sale) => total + sale.quantity * sale.price,
      0
    );

    // Set the invoice details to display on the page
    const newInvoiceDetails = {
      customerId,
      customerName: customerSales[0].customerName,
      totalAmount,
      products: customerSales,
    };

    setInvoiceDetails(newInvoiceDetails);

    // Create a PDF document using jsPDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Invoice for Customer", 20, 20);
    doc.setFontSize(12);

    doc.text(`Customer Name: ${newInvoiceDetails.customerName}`, 20, 30);
    doc.text(`Customer ID: ${customerId}`, 20, 40);

    doc.autoTable({
      startY: 50,
      head: [["Product Name", "Quantity", "Price", "Total"]],
      body: newInvoiceDetails.products.map((sale) => [
        sale.productName,
        sale.quantity,
        `$${sale.price}`,
        `$${(sale.quantity * sale.price).toFixed(2)}`,
      ]),
      foot: [
        ["", "", "Total Amount", `$${newInvoiceDetails.totalAmount.toFixed(2)}`],
      ],
    });

    // Save the PDF
    const invoiceFileName = `invoice_${customerId}.pdf`;
    doc.save(invoiceFileName);

    // Store invoice details in localStorage
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const newInvoice = {
      customerId,
      customerName: newInvoiceDetails.customerName,
      totalAmount,
      invoiceFileName,
    };
    storedInvoices.push(newInvoice);
    localStorage.setItem("invoices", JSON.stringify(storedInvoices));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sales Records</h1>

      {sales.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date and Time</th>
              <th>Customer Name</th>
              <th>Customer ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>{sale.price}</td>
                <td>{sale.dateTime}</td>
                <td>{sale.customerName}</td>
                <td>{sale.customerId}</td>
                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleInvoice(sale.customerId)}
                    className={styles.invoiceButton}
                  >
                    Invoice
                  </button>
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
        <p>No sales records found.</p>
      )}

      {editIndex !== null && (
        <div className={styles.editForm}>
          <h2>Edit Sale</h2>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            className={styles.input}
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className={styles.input}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className={styles.input}
          />
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            placeholder="Customer Name"
            className={styles.input}
          />
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            placeholder="Customer ID"
            className={styles.input}
          />
          <button
            onClick={handleSaveEdit}
            className={styles.saveButton}
          >
            Save Changes
          </button>
        </div>
      )}

      {invoiceDetails && (
        <div className={styles.invoiceDetails}>
          <h2>Invoice for Customer {invoiceDetails.customerName}</h2>
          <p>Customer ID: {invoiceDetails.customerId}</p>
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
              {invoiceDetails.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                  <td>${(product.quantity * product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                  Total Amount
                </td>
                <td style={{ fontWeight: "bold" }}>
                  ${invoiceDetails.totalAmount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesTable;
