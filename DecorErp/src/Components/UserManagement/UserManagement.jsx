

// import React, { useState } from "react";
// import styles from "./UserManagement.module.css";

// const UserManagement = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", role: "Admin" },
//     { id: 2, name: "Jane Smith", role: "User" },
//     { id: 3, name: "Alice Johnson", role: "Manager" },
//   ]);

//   const [newUser, setNewUser] = useState({ name: "", role: "" });
//   const [editingUser, setEditingUser] = useState(null);
//   const [editedData, setEditedData] = useState({ name: "", role: "" });

//   const handleAddUser = () => {
//     if (newUser.name.trim() && newUser.role.trim()) {
//       const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
//       setUsers([...users, { id: newId, name: newUser.name, role: newUser.role }]);
//       setNewUser({ name: "", role: "" });
//     } else {
//       alert("Both Name and Role are required!");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user.id);
//     setEditedData({ name: user.name, role: user.role });
//   };

//   const handleSave = (id) => {
//     setUsers(
//       users.map((user) =>
//         user.id === id ? { ...user, name: editedData.name, role: editedData.role } : user
//       )
//     );
//     setEditingUser(null);
//     setEditedData({ name: "", role: "" });
//   };

//   const handleCancel = () => {
//     setEditingUser(null);
//     setEditedData({ name: "", role: "" });
//   };

//   const handleDelete = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>User Management</h1>
      
//       {/* Add User Section */}
//       <div className={styles.addUserSection}>
//         <input
//           type="text"
//           className={styles.input}
//           placeholder="Enter Name"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//         />
//         <input
//           type="text"
//           className={styles.input}
//           placeholder="Enter Role"
//           value={newUser.role}
//           onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//         />
//         <button className={styles.addButton} onClick={handleAddUser}>
//           Add User
//         </button>
//       </div>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th className={styles.tableHeader}>ID</th>
//             <th className={styles.tableHeader}>Name</th>
//             <th className={styles.tableHeader}>Role</th>
//             <th className={styles.tableHeader}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className={styles.tableRow}>
//               <td className={styles.tableCell}>{user.id}</td>
//               <td className={styles.tableCell}>
//                 {editingUser === user.id ? (
//                   <input
//                     type="text"
//                     className={styles.input}
//                     value={editedData.name}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, name: e.target.value })
//                     }
//                   />
//                 ) : (
//                   user.name
//                 )}
//               </td>
//               <td className={styles.tableCell}>
//                 {editingUser === user.id ? (
//                   <input
//                     type="text"
//                     className={styles.input}
//                     value={editedData.role}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, role: e.target.value })
//                     }
//                   />
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className={styles.tableCell}>
//                 {editingUser === user.id ? (
//                   <>
//                     <button
//                       className={styles.saveButton}
//                       onClick={() => handleSave(user.id)}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className={styles.cancelButton}
//                       onClick={handleCancel}
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className={styles.editButton}
//                       onClick={() => handleEdit(user)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className={styles.deleteButton}
//                       onClick={() => handleDelete(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;


import React, { useState } from "react";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Jha", role: "Admin", email: "rahul.jha@example.com" },
    { id: 2, name: "Surjeet Yadav", role: "User", email: "surjeet.yadav@example.com" },
    { id: 3, name: "Rajoo Yadav", role: "Manager", email: "rajoo.yadav@example.com" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", role: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", role: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.role.trim() && newUser.email.trim()) {
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      setUsers([...users, { id: newId, ...newUser }]);
      setNewUser({ name: "", role: "", email: "" });
    } else {
      alert("All fields are required!");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditedData({ name: user.name, role: user.role, email: user.email });
  };

  const handleSave = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...editedData } : user
      )
    );
    setEditingUser(null);
    setEditedData({ name: "", role: "", email: "" });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditedData({ name: "", role: "", email: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>

      {/* Add User Section */}
      <div className={styles.addUserSection}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Enter Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button className={styles.addButton} onClick={handleAddUser}>
          Add User
        </button>
      </div>

      {/* User Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Role</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.tableRow}>
              <td className={styles.tableCell}>{user.id}</td>
              <td className={styles.tableCell}>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    className={styles.input}
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className={styles.tableCell}>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    className={styles.input}
                    value={editedData.role}
                    onChange={(e) =>
                      setEditedData({ ...editedData, role: e.target.value })
                    }
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className={styles.tableCell}>
                {editingUser === user.id ? (
                  <>
                    <button
                      className={styles.saveButton}
                      onClick={() => handleSave(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewDetails(user)}
                    >
                      View Details
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Details Section */}
      {selectedUser && (
        <div className={styles.detailsSection}>
          <h2>User Details</h2>
          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Role:</strong> {selectedUser.role}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <button className={styles.closeButton} onClick={() => setSelectedUser(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;