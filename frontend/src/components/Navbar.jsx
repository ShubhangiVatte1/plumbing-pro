

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2>🔧 PlumbingPro</h2>

//       <ul>
//   <li><a href="#home">Home</a></li>
//   <li><a href="#services">Services</a></li>
//   <li><a href="#about">About</a></li>
//   <li><a href="#contact">Contact</a></li>
// </ul>

      
// <div className="nav-buttons">
// {/* Call Button */} 
// <a href="tel:+919021414082"> 
//     <button className="call-btn"> 
//         📞 Call Now 
//         </button> </a> 
// {/* WhatsApp Button */}
//  <a href="https://wa.me/919021414082?text=Hi%20I%20need%20plumbing%20service" target="_blank" rel="noopener noreferrer" >
//   <button className="whatsapp-btn"> 💬 WhatsApp </button> </a>
   
//   {/* <button
//     className="call-btn"
//     onClick={() => window.location.href = "tel:+919168262783"}
//   >
//     📞 Call Now
//   </button>

//   <button
//     className="whatsapp-btn"
//     onClick={() =>
//       window.open("https://wa.me/919168262783", "_blank")
//     }
//   >
//     💬 WhatsApp
//   </button> */}

// </div>
//     </nav>
//   );
// }
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🔧 Plumbex</h2>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-buttons">

        {/* Call Button */}
        <a href="tel:+919021414082">
          <button className="call-btn">📞 Call Now</button>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919021414082?text=Hi%20I%20need%20plumbing%20service"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="whatsapp-btn">💬 WhatsApp</button>
        </a>

        {/* ✅ NEW LOGIN BUTTON */}
        {/* <button className="login-btn" onClick={openLogin}>
          🔐 Login / Signup
        </button> */}

      </div>
    </nav>
  );
}