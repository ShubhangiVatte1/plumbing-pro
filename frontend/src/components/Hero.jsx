// export default function Hero({ setShowBooking }) {
//   return (
//     <section id="home" className="hero">

//       <div className="left">

//         <h1>
//           Professional Plumbing Services
//         </h1>

//         <p>
//           Fast, Affordable & Reliable Plumbing Solutions.
//         </p>

//         <button onClick={() => setShowBooking(true)}>
//           Book Service
//         </button>

//       </div>

//       <div className="right">

//         <img
//           src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
//           alt="Plumber"
//         />

//       </div>

//     </section>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      <div className="left">
        <h1>Professional Plumbing Services</h1>

        <p>Fast, Affordable & Reliable Plumbing Solutions.</p>

        <button onClick={() => navigate("/booking")}>
          Book Service
        </button>
         
      </div>

      <div className="right">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          alt="Plumber"
        />
      </div>
    </section>
  );
}