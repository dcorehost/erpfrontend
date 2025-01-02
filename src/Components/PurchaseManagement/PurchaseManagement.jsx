
import React, { useState } from "react";
import styles from "./PurchaseManagement.module.css";

const PurchaseManagement = () => {
  const [purchases, setPurchases] = useState([]); // Stores the purchase data
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    purchaseDate: "",
    supplierName: "",
    supplierId: "",
  });
  const [notification, setNotification] = useState(""); // State for notification
  const [editingIndex, setEditingIndex] = useState(null); // To track editing purchase

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newPurchase = {
      productName: form.productName,
      quantity: form.quantity,
      price: form.price,
      purchaseDate: form.purchaseDate,
      supplierName: form.supplierName,
      supplierId: form.supplierId,
    };

    if (editingIndex !== null) {
      // If editing, update the existing purchase
      const updatedPurchases = [...purchases];
      updatedPurchases[editingIndex] = newPurchase;
      setPurchases(updatedPurchases);
      setEditingIndex(null); // Reset the editing state
    } else {
      // Add new purchase
      const updatedPurchases = [...purchases, newPurchase];
      setPurchases(updatedPurchases);
    }

    // Show notification
    setNotification("Purchase added successfully!");

    // Clear the form
    setForm({
      productName: "",
      quantity: "",
      price: "",
      purchaseDate: "",
      supplierName: "",
      supplierId: "",
    });

    // Show notification for 3 seconds
    setTimeout(() => setNotification(""), 3000); // Hide notification after 3 seconds
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const purchaseToEdit = purchases[index];
    setForm({
      productName: purchaseToEdit.productName,
      quantity: purchaseToEdit.quantity,
      price: purchaseToEdit.price,
      purchaseDate: purchaseToEdit.purchaseDate,
      supplierName: purchaseToEdit.supplierName,
      supplierId: purchaseToEdit.supplierId,
    });
  };

  const handleDelete = (index) => {
    const updatedPurchases = purchases.filter((_, i) => i !== index);
    setPurchases(updatedPurchases);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchase Management</h1>

      {/* Notification */}
      {notification && <div className={styles.notification}>{notification}</div>}

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
          {editingIndex !== null ? "Save Changes" : "Add Product"}
        </button>
      </form>

      {/* Purchases Table */}
      {purchases.length > 0 && (
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
              {purchases.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.productName}</td>
                  <td>{purchase.quantity}</td>
                  <td>₹{purchase.price}</td>
                  <td>{new Date(purchase.purchaseDate).toLocaleString()}</td>
                  <td>{purchase.supplierName}</td>
                  <td>{purchase.supplierId}</td>
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
      )}
    </div>
  );
};

export default PurchaseManagement;





