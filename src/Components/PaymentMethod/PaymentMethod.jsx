import React, { useState } from "react";
import styles from "./PaymentMethods.module.css";

const PaymentMethods = () => {
  const [methods, setMethods] = useState([
    { id: 1, type: "Bank Transfer", accountNumber: "123456789", isPrimary: true },
    { id: 2, type: "PayPal", email: "user@example.com", isPrimary: false },
    { id: 3, type: "Credit Card", cardNumber: "**** **** **** 1234", isPrimary: false },
  ]);

  const [newMethod, setNewMethod] = useState({ type: "", details: "" });
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setMethods(methods.filter(method => method.id !== deleteId));
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleAdd = () => {
    const newId = methods.length ? Math.max(methods.map(m => m.id)) + 1 : 1;
    setMethods([...methods, { ...newMethod, id: newId }]);
    setNewMethod({ type: "", details: "" });
  };

  const handleEdit = (id) => {
    const methodToEdit = methods.find(method => method.id === id);
    setNewMethod({ type: methodToEdit.type, details: methodToEdit.accountNumber || methodToEdit.email || methodToEdit.cardNumber });
    setEditingId(id);
  };

  const saveEdit = () => {
    setMethods(methods.map(method => (method.id === editingId ? { ...method, type: newMethod.type, accountNumber: newMethod.details } : method)));
    setEditingId(null);
    setNewMethod({ type: "", details: "" });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Payment Methods</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Payment Type</th>
            <th>Details</th>
            <th>Primary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map(method => (
            <tr key={method.id} className={styles.tableRow}>
              <td>{method.type}</td>
              <td>{method.type === "Credit Card" ? method.cardNumber : method.accountNumber || method.email}</td>
              <td>{method.isPrimary ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(method.id)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(method.id)} className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.addMethod}>
        <h2>Add Payment Method</h2>
        <input
          type="text"
          placeholder="Payment Type"
          value={newMethod.type}
          onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Details (Account/Email/Card Number)"
          value={newMethod.details}
          onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
        />
        <button onClick={editingId ? saveEdit : handleAdd} className={styles.addButton}>
          {editingId ? "Save" : "Add"}
        </button>
      </div>

      {showConfirm && (
        <div className={styles.confirmModal}>
          <p>Are you sure you want to delete this payment method?</p>
          <button onClick={confirmDelete} className={styles.confirmButton}>Yes</button>
          <button onClick={cancelDelete} className={styles.cancelButton}>No</button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
