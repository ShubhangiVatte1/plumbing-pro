// // // // import { useEffect, useState } from "react";

// // // // export default function Admin() {
// // // //   const [leads, setLeads] = useState([]);

// // // //   useEffect(() => {
// // // //     fetch("http://localhost:5000/api/leads")
// // // //       .then(res => res.json())
// // // //       .then(data => setLeads(data));
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       <h2>Admin Dashboard</h2>

// // // //       {leads.map((lead, i) => (
// // // //         <div key={i}>
// // // //           <p>{lead.name}</p>
// // // //           <p>{lead.phone}</p>
// // // //           <p>{lead.service}</p>
// // // //           <p>{lead.message}</p>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect, useState } from "react";

// // // export default function Admin() {
// // //   const [leads, setLeads] = useState([]);

// // //   // ✅ Fetch Data
// // //   const fetchLeads = async () => {
// // //     try {
// // //       const res = await fetch("http://localhost:5000/api/contact");
// // //       const data = await res.json();
// // //       setLeads(data);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };

// // //   // ✅ Delete Lead
// // //   const deleteLead = async (id) => {
// // //     await fetch(`http://localhost:5000/api/contact/${id}`, {
// // //       method: "DELETE"
// // //     });

// // //     fetchLeads(); // refresh
// // //   };

// // //   useEffect(() => {
// // //     fetchLeads();
// // //   }, []);

// // //   return (
// // //     <div className="admin">
// // //       <h2>Admin Dashboard</h2>

// // //       <table>
// // //         <thead>
// // //           <tr>
// // //             <th>Name</th>
// // //             <th>Phone</th>
// // //             <th>Service</th>
// // //             <th>Message</th>
// // //             <th>Action</th>
// // //           </tr>
// // //         </thead>

// // //         <tbody>
// // //           {leads.map((lead) => (
// // //             <tr key={lead._id}>
// // //               <td>{lead.name}</td>
// // //               <td>{lead.phone}</td>
// // //               <td>{lead.service}</td>
// // //               <td>{lead.message}</td>
// // //               <td>
// // //                 <button onClick={() => deleteLead(lead._id)}>
// // //                   Delete
// // //                 </button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function Admin() {
// //   const navigate = useNavigate();
// //   const [leads, setLeads] = useState([]);

// //   useEffect(() => {
// //     const auth = localStorage.getItem("adminAuth");

// //     if (!auth) {
// //       navigate("/admin-login");
// //     } else {
// //       fetchLeads();
// //     }
// //   }, []);

// //   const fetchLeads = async () => {
// //     const res = await fetch("http://localhost:5000/api/contact");
// //     const data = await res.json();
// //     setLeads(data);
// //   };

// //   return (
// //     <div>
// //       <h2>Admin Dashboard</h2>

// //       {leads.map((lead) => (
// //         <div key={lead._id}>
// //           <p>{lead.name}</p>
// //           <p>{lead.phone}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   const navigate = useNavigate(); // ✅ inside component

//   useEffect(() => {
//     const isAdmin = localStorage.getItem("isAdmin");

//     if (!isAdmin) {
//       navigate("/admin-login");
//     }
//   }, [navigate]); // ✅ dependency added

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//     </div>
//   );
// };

// export default Admin;
import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/contact/admin/all");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/contact/admin/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {data.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>{item.name} - {item.service}</p>
          <p>Status: {item.status}</p>

          <button onClick={() => updateStatus(item._id, "Accepted")}>Accept</button>
          <button onClick={() => updateStatus(item._id, "Assigned")}>Assign</button>
          <button onClick={() => updateStatus(item._id, "Completed")}>Complete</button>
        </div>
      ))}
    </div>
  );
}