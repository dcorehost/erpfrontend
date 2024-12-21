import React, { useState } from "react";
import styles from "./SalesManagement.module.css";

const SalesManagement = () => {
  const [sales, setSales] = useState([]); // Stores all sales records
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    saleDate: "",
    customerName: "",
    customerId: "", // Added customer ID
  });
  const [invoice, setInvoice] = useState(null); // Holds invoice data for display
  const [editingIndex, setEditingIndex] = useState(null); // To track which sale is being edited

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new sale or update an existing sale
  const handleSave = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // Update existing sale
      const updatedSales = [...sales];
      updatedSales[editingIndex] = form;
      setSales(updatedSales);
    } else {
      // Add new sale
      setSales([...sales, form]);
    }

    // Clear the form
    setForm({
      productName: "",
      quantity: "",
      price: "",
      saleDate: "",
      customerName: "",
      customerId: "", // Clear customer ID field
    });
    setEditingIndex(null); // Reset editing state
  };

  // Edit a sale
  const handleEdit = (index) => {
    const saleToEdit = sales[index];
    setForm({ ...saleToEdit });
    setEditingIndex(index);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({
      productName: "",
      quantity: "",
      price: "",
      saleDate: "",
      customerName: "",
      customerId: "", // Clear customer ID field
    });
    setEditingIndex(null); // Reset editing state
  };

  // Delete a sale
  const handleDelete = (index) => {
    setSales(sales.filter((_, i) => i !== index));
  };

  // Generate an invoice for all products bought by a single customer
  const generateInvoice = () => {
    // Group sales by customerId
    const groupedSales = sales.reduce((acc, sale) => {
      const customerId = sale.customerId;
      if (!acc[customerId]) {
        acc[customerId] = {
          customerId: sale.customerId,
          customerName: sale.customerName,
          products: [],
          totalAmount: 0,
        };
      }
      const totalAmount = sale.quantity * sale.price;
      acc[customerId].products.push({
        productName: sale.productName,
        quantity: sale.quantity,
        price: sale.price,
        totalAmount,
      });
      acc[customerId].totalAmount += totalAmount;
      return acc;
    }, {});

    // Get the invoice data for each customer
    const customerInvoice = Object.values(groupedSales).map((customer) => ({
      customerId: customer.customerId,
      customerName: customer.customerName,
      products: customer.products,
      totalAmount: customer.totalAmount,
    }));

    // Set the invoice for display
    setInvoice(customerInvoice); // Set the invoice
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sales Management</h1>

      {/* Form Section */}
      <form onSubmit={handleSave} className={styles.form}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="datetime-local"
          name="saleDate"
          value={form.saleDate}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={form.customerId}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {editingIndex !== null ? "Save Changes" : "Add Sale"}
        </button>
        {editingIndex !== null && (
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      {/* Sales Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Sale Date</th>
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
                <td>${sale.price}</td>
                <td>{new Date(sale.saleDate).toLocaleString()}</td>
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
      </div>

      {/* Invoice Section */}
      {invoice && (
        <div className={styles.invoice}>
          <h2>Invoice</h2>
          {invoice.map((customerInvoice, idx) => (
            <div key={idx}>
              <h3>Customer ID: {customerInvoice.customerId}</h3>
              <p><strong>Customer Name:</strong> {customerInvoice.customerName}</p>
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
                  {customerInvoice.products.map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.productName}</td>
                      <td>{product.quantity}</td>
                      <td>${product.price}</td>
                      <td>${product.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p><strong>Total Amount:</strong> ${customerInvoice.totalAmount}</p>
            </div>
          ))}
        </div>
      )}

      {/* Generate Invoice Button */}
      <button onClick={generateInvoice} className={styles.button}>
        Generate Invoice for All Sales
      </button>
    </div>
  );
};

export default SalesManagement;
