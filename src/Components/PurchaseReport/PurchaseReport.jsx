import React from "react";
import styles from "./PurchaseReport.module.css";

const PurchaseReport = ({ purchases }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchase Report</h1>

      {/* Purchase Table */}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseReport;
