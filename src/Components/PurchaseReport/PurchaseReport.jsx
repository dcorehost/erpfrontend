
import React from "react";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./PurchaseReport.module.css";

const PurchaseReport = () => {
  const location = useLocation();
  const purchases = location.state?.purchases || [];

  const handleEdit = (purchaseIndex, productIndex) => {
    alert(`Edit Purchase ${purchaseIndex + 1}, Product ${productIndex + 1}`);
  };

  const handleDelete = (purchaseIndex, productIndex) => {
    alert(`Delete Purchase ${purchaseIndex + 1}, Product ${productIndex + 1}`);
  };

  const generateInvoice = (purchaseIndex, productIndex) => {
    const purchase = purchases[purchaseIndex];
    const product = purchase.products[productIndex];
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Invoice", 105, 20, { align: "center" });

    // Set the font size and create the table
    doc.setFontSize(12);

    // Add table headers
    const headers = ["Product Name", "Quantity", "Price", "Purchase Date", "Supplier Name", "Supplier ID"];
    const data = [
      [
        product.productName,
        product.quantity,
        `₹${product.price}`, // Correct price format with rupee symbol
        new Date(product.purchaseDate).toLocaleString(),
        product.supplierName,
        product.supplierId,
      ]
    ];

    // Table positioning
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30, // Positioning table below the title
      margin: { top: 10 },
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [22, 160, 133], // Greenish header background
        textColor: [255, 255, 255], // White text color for headers
      },
    });

    // Add total amount at the bottom
    const total = product.quantity * product.price;
    doc.setFontSize(14);
    doc.text(`Total: ₹${total}`, 20, doc.lastAutoTable.finalY + 10); // Position below the table

    // Save the document as PDF
    doc.save(`Invoice_${product.productName}.pdf`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchase Report</h1>
      <Link to="/purchase-management" className={styles.backLink}>
        Back to Purchase Management
      </Link>
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
            {purchases.map((purchase, purchaseIndex) =>
              purchase.products.map((product, productIndex) => (
                <tr key={`${purchaseIndex}-${productIndex}`}>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price}</td>
                  <td>{new Date(product.purchaseDate).toLocaleString()}</td>
                  <td>{product.supplierName}</td>
                  <td>{product.supplierId}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(purchaseIndex, productIndex)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(purchaseIndex, productIndex)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => generateInvoice(purchaseIndex, productIndex)}
                      className={styles.invoiceButton}
                    >
                      Generate Invoice
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseReport;

// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import styles from "./PurchaseReport.module.css";

// const PurchaseReport = () => {
//   const location = useLocation();
//   const purchases = location.state?.purchases || [];

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Purchase Report</h1>
//       <Link to="/purchase-management" className={styles.backLink}>Back to Purchase Management</Link>
//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Purchase Date</th>
//               <th>Supplier Name</th>
//               <th>Supplier ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchases.map((purchase, purchaseIndex) => (
//               purchase.products.map((product, productIndex) => (
//                 <tr key={`${purchaseIndex}-${productIndex}`}>
//                   <td>{product.productName}</td>
//                   <td>{product.quantity}</td>
//                   <td>₹{product.price}</td>
//                   <td>{new Date(product.purchaseDate).toLocaleString()}</td>
//                   <td>{product.supplierName}</td>
//                   <td>{product.supplierId}</td>
//                 </tr>
//               ))
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PurchaseReport;










