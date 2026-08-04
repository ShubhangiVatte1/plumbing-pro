// // // // // export default function ThankYou() {
// // // // //   return (
// // // // //     <div style={{ textAlign: "center", marginTop: "100px" }}>
// // // // //       <h1>🎉 Thank You!</h1>
// // // // //       <p>Your booking has been submitted successfully.</p>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import { useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import Lottie from "lottie-react";


// // // // export default function ThankYou() {
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     setTimeout(() => {
// // // //       navigate("/");
// // // //     }, 4000); // 4 seconds redirect
// // // //   }, [navigate]);

// // // //   return (
// // // //     <div className="thankyou-container">
// // // //       <div className="card">
     

// // // //         <h2>Booking Successful 🎉</h2>
// // // //         <p>Our team will contact you shortly.</p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import { useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // export default function ThankYou() {
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     setTimeout(() => {
// // //       navigate("/");
// // //     }, 3000);
// // //   }, [navigate]);

// // //   return (
// // //     <div style={{ textAlign: "center", marginTop: "100px" }}>
// // //       <h2>✅ Booking Successful</h2>
// // //       <p>Redirecting to home...</p>
// // //     </div>
// // //   );
// // // }
// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Lottie from "lottie-react";
// // import successAnimation from "../assets/success.json";

// // export default function ThankYou() {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const data = JSON.parse(localStorage.getItem("bookingData"));

// //     if (!data) return;

// //     // ✅ WhatsApp message
// //     const message = `New Booking:
// // Name: ${data.name}
// // Phone: ${data.phone}
// // Service: ${data.service}`;

// //     const whatsappURL = `https://wa.me/919021414082?text=${encodeURIComponent(
// //       message
// //     )}`;

// //     // ✅ Open WhatsApp after animation
// //     setTimeout(() => {
// //       window.open(whatsappURL, "_blank");
// //     }, 2000);

// //     // ✅ Optional: clear storage
// //     localStorage.removeItem("bookingData");
// //   }, []);

// //   return (
// //     <div style={{ textAlign: "center", marginTop: "50px" }}>
// //       <Lottie animationData={successAnimation} style={{ height: 200 }} />

// //       <h2>Booking Successful 🎉</h2>
// //       <p>We will contact you shortly...</p>
// //     </div>
// //   );
// // }
// import { useEffect } from "react";

// export default function ThankYou() {
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("bookingData"));

//     if (!data) return;

//     const message = `New Booking:
// Name: ${data.name}
// Phone: ${data.phone}
// Service: ${data.service}`;

//     const whatsappURL = `https://wa.me/919021414082?text=${encodeURIComponent(message)}`;

//     setTimeout(() => {
//       window.open(whatsappURL, "_blank");
//     }, 2000);

//     localStorage.removeItem("bookingData");
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
      
//       {/* ✅ VIDEO INSTEAD OF LOTTIE */}
//       <video
//         src={require("../assets/success.json.mp4")}
//         autoPlay
//         muted
//         loop
//         style={{ width: "250px" }}
//       />

//       <h2>Booking Successful 🎉</h2>
//       <p>We will contact you shortly...</p>
//     </div>
//   );
// }
import { useEffect } from "react";

export default function ThankYou() {
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookingData"));

    if (!data) return;

    const message = `New Booking:
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}`;

    const whatsappURL = `https://wa.me/919021414082?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
    }, 2000);

    localStorage.removeItem("bookingData");
  }, []);

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">

        <div className="checkmark">✔</div>

        <h2>Booking Confirmed 🎉</h2>
        <p>Your request has been received.</p>
        <p>We will contact you shortly.</p>

        <a href="/" className="home-btn">Back to Home</a>

      </div>
    </div>
  );
}