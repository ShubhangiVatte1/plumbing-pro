
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Services from "./components/Services";
// import About from "./components/About";
// import WhyChoose from "./components/WhyChoose";
// import Testimonials from "./components/Testimonials";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";

// import Booking from "./components/Booking";
// import ThankYou from "./pages/ThankYou";

// import "./App.css";

// function Home() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Services />
//       <About />
//       <WhyChoose />
//       <Testimonials />
//       <Contact />
//       <Footer />
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Home Page */}
//         <Route path="/" element={<Home />} />

//         {/* Booking Page */}
//         <Route path="/booking" element={<Booking />} />

//         {/* Thank You Page */}
//         <Route path="/thank-you" element={<ThankYou />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import WhyChoose from "./components/WhyChoose";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Booking from "./components/Booking";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin"; 
import AdminLogin from "./pages/AdminLogin";
import TrackBooking from "./pages/TrackBooking";

import "./App.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <WhyChoose />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Booking Page */}
        <Route path="/booking" element={<Booking />} />

        {/* Thank You Page */}
        <Route path="/thank-you" element={<ThankYou />} />

        {/* ✅ ADMIN PAGE */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/track" element={<TrackBooking />} />
      </Routes>
    </Router>
  );
}

export default App;