
import { useState } from "react";

export default function Contact() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ✅ Validation */
    if (phone.length !== 10) {
      alert("Enter valid phone number");
      return;
    }

    /* ✅ STEP 1: SAVE DATA TO BACKEND */
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          message,
          service: "General"
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Saved to database ✅");
      }
    } catch (error) {
      console.log(error);
      alert("Error saving data");
    }

    /* ✅ STEP 2: OPEN WHATSAPP */
    const ownerNumber = "919021414082";

    const text = `Hi, I am ${name}%0A📞 Phone: ${phone}%0A🛠️ Issue: ${message}`;

    const url = `https://wa.me/${ownerNumber}?text=${text}`;

    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          maxLength="10"
          required
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">
          Send Request
        </button>

      </form>
    </section>
  );
}