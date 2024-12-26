

import React, { useState } from "react";
import styles from "./PurchaseManagement.module.css";

const PurchaseManagement = () => {
  const [purchases, setPurchases] = useState([]); // Stores all purchase records
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    purchaseDate: "",
    supplierName: "",
    supplierId: "",
  });
  const [addingIndex, setAddingIndex] = useState(null); // To track which purchase is being edited

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new purchase or update an existing purchase
  const handleSave = (e) => {
    e.preventDefault();

    if (addingIndex !== null) {
      // Update existing purchase
      const updatedPurchases = [...purchases];
      updatedPurchases[addingIndex].products.push({
        productName: form.productName,
        quantity: form.quantity,
        price: form.price,
        purchaseDate: form.purchaseDate,
        supplierName: form.supplierName,
        supplierId: form.supplierId,
      });
      setPurchases(updatedPurchases);
    } else {
      // Add new purchase
      setPurchases([
        ...purchases,
        {
          products: [
            {
              productName: form.productName,
              quantity: form.quantity,
              price: form.price,
              purchaseDate: form.purchaseDate,
              supplierName: form.supplierName,
              supplierId: form.supplierId,
            },
          ],
        },
      ]);
    }

    // Clear the form
    setForm({
      productName: "",
      quantity: "",
      price: "",
      purchaseDate: "",
      supplierName: "",
      supplierId: "",
    });
    setAddingIndex(null); // Reset editing state
  };

  // Add  a new purchase
  const handleAddProduct = (index) => {
    const purchaseToAdd = purchases[index];
    setForm({ ...purchaseToAdd.products[0] });
    setAddingIndex(index);
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({
      productName: "",
      quantity: "",
      price: "",
      purchaseDate: "",
      supplierName: "",
      supplierId: "",
    });
    setAddingIndex(null); // Reset editing state
  };

  // Delete a purchase
  const handleDelete = (index) => {
    setPurchases(purchases.filter((_, i) => i !== index));
  };

  // Generate Invoice
  const generateInvoice = (purchaseIndex) => {
    const purchase = purchases[purchaseIndex];
    let invoiceContent = `<h2>Invoice</h2>`;
    invoiceContent += `<p>Supplier Name: ${purchase.products[0].supplierName}</p>`;
    invoiceContent += `<p>Supplier ID: ${purchase.products[0].supplierId}</p>`;
    invoiceContent += `<table border="1" style="width:100%; border-collapse: collapse;">`;
    invoiceContent += `<tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr>`;
    
    let totalAmount = 0;
    purchase.products.forEach((product) => {
      const total = product.quantity * product.price;
      totalAmount += total;
      invoiceContent += `<tr>
                          <td>${product.productName}</td>
                          <td>${product.quantity}</td>
                          <td>${product.price}</td>
                          <td>${total}</td>
                        </tr>`;
    });

    invoiceContent += `</table>`;
    invoiceContent += `<p><strong>Total Amount: ₹${totalAmount}</strong></p>`;

    const blob = new Blob([invoiceContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Invoice_${purchaseIndex + 1}.html`;
    link.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchase Management</h1>

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
          name="purchaseDate"
          value={form.purchaseDate}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="supplierId"
          placeholder="Supplier ID"
          value={form.supplierId}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {addingIndex !== null ? "Save Changes" : "Add Product"}
        </button>
        {addingIndex !== null && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Purchases Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Purchase Date</th>
              <th>Supplier Name</th>
              <th>Supplier ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, purchaseIndex) => (
              <tr key={purchaseIndex}>
                <td>
                  {purchase.products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <span>{product.productName}</span>
                    </div>
                  ))}
                </td>
                <td>
                  {purchase.products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <span>{product.quantity}</span>
                    </div>
                  ))}
                </td>
                <td>
                  {purchase.products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <span>₹{product.price}</span>
                    </div>
                  ))}
                </td>
                <td>
                  {purchase.products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <span>{new Date(product.purchaseDate).toLocaleString()}</span>
                    </div>
                  ))}
                </td>
                <td>
                  {purchase.products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <span>{product.supplierName}</span>
                    </div>
                  ))}
                </td>
                <td>
                  {purchase.products.map((product, productIndex) => (
                    <div key={productIndex}>
                      <span>{product.supplierId}</span>
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => handleAddProduct(purchaseIndex)}
                    className={styles.addButton}
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => handleDelete(purchaseIndex)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => generateInvoice(purchaseIndex)}
                    className={styles.invoiceButton}
                  >
                    Generate Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseManagement;
