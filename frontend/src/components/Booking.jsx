
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Booking() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     service: "Leak Repair",
//     message: "",
//     latitude: "",
//     longitude: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* ================== 📍 GET LOCATION ================== */
//   const getLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setForm((prev) => ({
//           ...prev,
//           latitude: pos.coords.latitude,
//           longitude: pos.coords.longitude
//         }));

//         alert("Location captured ✅");
//       },
//       () => {
//         alert("Location permission denied ❌");
//       }
//     );
//   };

//   /* ================== 💳 LOAD RAZORPAY ================== */
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

// //   /* ================== 🚀 SUBMIT ================== */
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (form.phone.length !== 10) {
//     alert("Enter valid phone number");
//     return;
//   }

//   if (!form.latitude) {
//     alert("Please capture location first 📍");
//     return;
//   }

//   setLoading(true);

//   try {
//     /* ✅ 1. SAVE BOOKING */
//     const res = await fetch("http://localhost:5000/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();

//     if (!data.success) {
//       alert("Booking failed");
//       setLoading(false);
//       return;
//     }

//     const leadId = data.leadId;

//     /* ✅ 2. LOAD RAZORPAY */
//     const isLoaded = await loadRazorpay();
//     if (!isLoaded) {
//       alert("Razorpay SDK failed to load");
//       setLoading(false);
//       return;
//     }

//     /* ✅ 3. CREATE ORDER */
//     const orderRes = await fetch("http://localhost:5000/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ amount: 500 }) // ₹500
//     });

//     const orderData = await orderRes.json();

//     if (!orderData || !orderData.id) {
//       alert("Order creation failed ❌");
//       setLoading(false);
//       return;
//     }

//     /* ✅ 4. OPEN RAZORPAY */
//     const options = {
//       key: "rzp_test_TLGDRJzAFuwR02", // 🔴 PUT YOUR REAL KEY HERE

//       amount: orderData.amount, // must be in paise
//       currency: "INR",
//       name: "Plumbing Service",
//       description: "Booking Payment",
//       order_id: orderData.id,

//       handler: async function (response) {
//         console.log("Payment Success:", response);

//         /* ✅ 5. SAVE PAYMENT SUCCESS */
//         await fetch("http://localhost:5000/api/payment-success", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             leadId,
//             paymentId: response.razorpay_payment_id
//           })
//         });

//         localStorage.setItem("bookingData", JSON.stringify(form));

//         alert("Payment Successful ✅");

//         navigate("/thank-you");
//       },

//       prefill: {
//         name: form.name,
//         email: form.email,
//         contact: form.phone
//       },

//       notes: {
//         address: form.address
//       },

//       theme: {
//         color: "#3399cc"
//       }
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//   } catch (error) {
//     console.log(error);
//     alert("Something went wrong ❌");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <section className="booking-container">
//       <div className="booking-card">
//         <h2>Book Plumbing Service</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             name="phone"
//             placeholder="Mobile Number"
//             value={form.phone}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 phone: e.target.value.replace(/\D/g, "")
//               })
//             }
//             maxLength="10"
//             required
//           />

//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <input
//             name="address"
//             placeholder="Address"
//             value={form.address}
//             onChange={handleChange}
//           />

//           <select
//             name="service"
//             value={form.service}
//             onChange={handleChange}
//           >
//             <option>Leak Repair</option>
//             <option>Installation</option>
//             <option>Pipe Fix</option>
//           </select>

//           <textarea
//             name="message"
//             placeholder="Describe your problem"
//             value={form.message}
//             onChange={handleChange}
//           />

//           {/* 📍 LOCATION BUTTON */}
//           <button type="button" onClick={getLocation}>
//             📍 Capture Location
//           </button>

//           {/* SHOW LOCATION */}
//           {form.latitude && (
//   <iframe
//     title="User Location Map"
//     width="100%"
//     height="200"
//     style={{ border: 0, marginTop: "10px" }}
//     loading="lazy"
//     allowFullScreen
//     src={`https://www.google.com/maps?q=${form.latitude},${form.longitude}&output=embed`}
//   ></iframe>
// )}

//           <button type="submit" disabled={loading}>
//             {loading ? "Processing..." : "Book & Pay ₹500"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Booking() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "Leak Repair",
    message: "",
    latitude: "",
    longitude: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 📍 LOCATION */
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
        alert("Location captured ✅");
      },
      () => alert("Location denied ❌")
    );
  };

  /* 💳 LOAD RAZORPAY */
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* 🚀 SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      alert("Enter valid phone");
      return;
    }

    if (!form.latitude) {
      alert("Capture location first 📍");
      return;
    }

    setLoading(true);

    try {
      /* ✅ SAVE BOOKING */
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        alert("Booking failed ❌");
        return;
      }

      const leadId = data.leadId;

      /* ✅ LOAD RAZORPAY */
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Razorpay failed");
        return;
      }

      /* ✅ CREATE ORDER */
      const orderRes = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: 500 })
      });

      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert("Order failed ❌");
        return;
      }

      /* ✅ PAYMENT */
      const options = {
        key: "rzp_test_TLGDRJzAFuwR02",
        amount: orderData.amount,
        currency: "INR",
        name: "Plumbing Service",
        description: "Booking Payment",
        order_id: orderData.id,

        handler: async function (response) {
          await fetch(`${API}/api/payment-success`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              leadId,
              paymentId: response.razorpay_payment_id
            })
          });

          localStorage.setItem("bookingData", JSON.stringify(form));
          alert("Payment Successful ✅");
          navigate("/thank-you");
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },

        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} required />
      <input name="phone" onChange={handleChange} required />
      <button type="button" onClick={getLocation}>📍 Location</button>
      <button type="submit">
        {loading ? "Processing..." : "Book & Pay ₹500"}
      </button>
    </form>
  );
}import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Booking() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "Leak Repair",
    message: "",
    latitude: "",
    longitude: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 📍 LOCATION */
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
        alert("Location captured ✅");
      },
      () => alert("Location denied ❌")
    );
  };

  /* 💳 LOAD RAZORPAY */
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* 🚀 SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      alert("Enter valid phone");
      return;
    }

    if (!form.latitude) {
      alert("Capture location first 📍");
      return;
    }

    setLoading(true);

    try {
      /* ✅ SAVE BOOKING */
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!data.success) {
        alert("Booking failed ❌");
        return;
      }

      const leadId = data.leadId;

      /* ✅ LOAD RAZORPAY */
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Razorpay failed");
        return;
      }

      /* ✅ CREATE ORDER */
      const orderRes = await fetch(`${API}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: 500 })
      });

      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert("Order failed ❌");
        return;
      }

      /* ✅ PAYMENT */
      const options = {
        key: "rzp_test_TLGDRJzAFuwR02",
        amount: orderData.amount,
        currency: "INR",
        name: "Plumbing Service",
        description: "Booking Payment",
        order_id: orderData.id,

        handler: async function (response) {
          await fetch(`${API}/api/payment-success`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              leadId,
              paymentId: response.razorpay_payment_id
            })
          });

          localStorage.setItem("bookingData", JSON.stringify(form));
          alert("Payment Successful ✅");
          navigate("/thank-you");
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },

        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} required />
      <input name="phone" onChange={handleChange} required />
      <button type="button" onClick={getLocation}>📍 Location</button>
      <button type="submit">
        {loading ? "Processing..." : "Book & Pay ₹500"}
      </button>
    </form>
  );
}