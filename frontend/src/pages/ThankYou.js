
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