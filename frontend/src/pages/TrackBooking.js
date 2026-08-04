// import { useState } from "react";

// export default function TrackBooking() {
//   const [phone, setPhone] = useState("");
//   const [data, setData] = useState([]);

//   const searchBooking = async () => {
//     const res = await fetch(`http://localhost:5000/api/contact/${phone}`);
//     const result = await res.json();
//     setData(result);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Track Your Booking</h2>

//       <input
//         placeholder="Enter Mobile Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       <button onClick={searchBooking}>Search</button>

//       {data.map((item) => (
//         <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
//           <p><b>Name:</b> {item.name}</p>
//           <p><b>Service:</b> {item.service}</p>
//           <p><b>Status:</b> {item.status}</p>
//           <p><b>Plumber:</b> {item.plumber || "Not Assigned"}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useState } from "react";

export default function TrackBooking() {
  const [phone, setPhone] = useState("");
  const [data, setData] = useState([]);

  const searchBooking = async () => {
    if (phone.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/track/${phone}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("Error fetching data");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Track Your Booking</h2>

      <input
        placeholder="Enter Mobile Number"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value.replace(/\D/g, ""))
        }
        maxLength="10"
      />

      <button onClick={searchBooking}>Search</button>

      {data.length === 0 && <p>No bookings found</p>}

      {data.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10
          }}
        >
          <p><b>Name:</b> {item.name}</p>
          <p><b>Service:</b> {item.service}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={{ color: "blue" }}>{item.status}</span>
          </p>

          <p>
            <b>Payment:</b>{" "}
            {item.paymentStatus === "Paid" ? "✅ Paid" : "❌ Pending"}
          </p>

          <p>
            <b>Plumber:</b>{" "}
            {item.plumber || "Not Assigned"}
          </p>

          {/* 📍 GOOGLE MAP LINK */}
          {item.latitude && (
            <a
              href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 View Location
            </a>
          )}

          {/* ⭐ RATING */}
          {item.rating > 0 && (
            <p><b>Rating:</b> ⭐ {item.rating}</p>
          )}
        </div>
      ))}
    </div>
  );
}