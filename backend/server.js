// require("dotenv").config();
// console.log("MONGO_URI =", process.env.MONGO_URI);
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Razorpay = require("razorpay");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// const path = require("path");

// const app = express();

// /* ================== MIDDLEWARE ================== */
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// /* ================== DATABASE ================== */
// // mongoose.connect("mongodb://127.0.0.1:27017/serviceApp")
// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//   console.log("❌ MONGO_URI not found in environment variables");
//   process.exit(1);
// }

// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ DB Error:", err));

// /* ================== FILE UPLOAD ================== */
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// /* ================== SCHEMA ================== */
// const LeadSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   email: String,
//   address: String,
//   message: String,
//   service: String,

//   latitude: String,
//   longitude: String,

//   status: {
//     type: String,
//     default: "Pending"
//   },

//   plumber: {
//     type: String,
//     default: ""
//   },

//   paymentStatus: {
//     type: String,
//     default: "Pending"
//   },

//   rating: {
//     type: Number,
//     default: 0
//   },

//   beforeImage: String,
//   afterImage: String

// }, { timestamps: true });

// const Lead = mongoose.model("Lead", LeadSchema);

// /* ================== EMAIL (FIXED) ================== */
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "shubhangivatte2000@gmail.com",
//     pass: "njtdwporjydimnaq", // 🔥 put your app password here
//   },
// });

// /* ================== RAZORPAY ================== */
// const razorpay = new Razorpay({
//   key_id: "rzp_test_TLGDRJzAFuwR02",
//   key_secret: "PReFS8SsuUdl017abSdWlH2K",
// });

// /* ================== CREATE ORDER ================== */
// app.post("/create-order", async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // paisa
//       currency: "INR",
//       receipt: "receipt_order_1",
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error creating order");
//   }
// });

// /* ================== CREATE BOOKING ================== */
// app.post("/api/contact", async (req, res) => {
//   try {
//     const newLead = new Lead(req.body);
//     await newLead.save();

//     /* 📩 EMAIL */
//     try {
//       // ADMIN EMAIL
//       await transporter.sendMail({
//         from: "yourgmail@gmail.com",
//         to: "admin@gmail.com",
//         subject: "🚨 New Booking",
//         text: `
// Name: ${req.body.name}
// Phone: ${req.body.phone}
// Service: ${req.body.service}
//         `,
//       });

//       // CUSTOMER EMAIL
//       if (req.body.email) {
//         await transporter.sendMail({
//           from: "yourgmail@gmail.com",
//           to: req.body.email,
//           subject: "✅ Booking Confirmed",
//           text: "Your plumbing service has been booked successfully.",
//         });
//       }

//       console.log("✅ Email sent");

//     } catch (err) {
//       console.log("❌ Email failed:", err.message);
//     }

//     res.json({ success: true, leadId: newLead._id });

//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// });

// /* ================== TRACK ================== */
// app.get("/api/track/:phone", async (req, res) => {
//   try {
//     const data = await Lead.find({ phone: req.params.phone }).sort({ createdAt: -1 });
//     res.json(data);
//   } catch {
//     res.status(500).json([]);
//   }
// });

// /* ================== ADMIN ================== */
// app.get("/api/leads", async (req, res) => {
//   const leads = await Lead.find().sort({ createdAt: -1 });
//   res.json(leads);
// });

// app.post("/api/update-status", async (req, res) => {
//   const { id, status, plumber } = req.body;

//   await Lead.findByIdAndUpdate(id, {
//     status,
//     plumber
//   });

//   res.json({ success: true });
// });

// /* ================== PAYMENT ================== */
// app.post("/api/payment-success", async (req, res) => {
//   const { leadId } = req.body;

//   await Lead.findByIdAndUpdate(leadId, {
//     paymentStatus: "Paid"
//   });

//   res.json({ success: true });
// });

// /* ================== RATING ================== */
// app.post("/api/rate/:id", async (req, res) => {
//   await Lead.findByIdAndUpdate(req.params.id, {
//     rating: req.body.rating
//   });

//   res.json({ success: true });
// });

// /* ================== UPLOAD ================== */
// app.post("/upload", upload.single("image"), (req, res) => {
//   res.json({ file: req.file.filename });
// });

// app.post("/api/upload-images", async (req, res) => {
//   const { id, beforeImage, afterImage } = req.body;

//   await Lead.findByIdAndUpdate(id, {
//     beforeImage,
//     afterImage
//   });

//   res.json({ success: true });
// });

// /* ================== DELETE ================== */
// app.delete("/api/leads/:id", async (req, res) => {
//   await Lead.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// /* ================== SERVER ================== */
// app.listen(5000, () =>
//   console.log("🚀 Server running on http://localhost:5000")
// );
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();

/* ================== DEBUG ENV ================== */
console.log("MONGO_URI =", process.env.MONGO_URI);

/* ================== MIDDLEWARE ================== */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ================== DATABASE ================== */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("❌ MONGO_URI not found in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.log("❌ DB Error:", err.message);
  });

/* ================== FILE UPLOAD ================== */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/* ================== SCHEMA ================== */
const LeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  message: String,
  service: String,
  latitude: String,
  longitude: String,
  status: { type: String, default: "Pending" },
  plumber: { type: String, default: "" },
  paymentStatus: { type: String, default: "Pending" },
  rating: { type: Number, default: 0 },
  beforeImage: String,
  afterImage: String
}, { timestamps: true });

const Lead = mongoose.model("Lead", LeadSchema);

/* ================== EMAIL ================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shubhangivatte2000@gmail.com",
    pass: "njtdwporjydimnaq", // your app password
  },
});

/* ================== RAZORPAY ================== */
const razorpay = new Razorpay({
  key_id: "rzp_test_TLGDRJzAFuwR02",
  key_secret: "PReFS8SsuUdl017abSdWlH2K",
});

/* ================== CREATE ORDER ================== */
app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt_order",
    });
    res.json(order);
  } catch (err) {
    console.log("Order Error:", err.message);
    res.status(500).send("Error creating order");
  }
});

/* ================== CREATE BOOKING ================== */
app.post("/api/contact", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();

    try {
      await transporter.sendMail({
        from: "yourgmail@gmail.com",
        to: "admin@gmail.com",
        subject: "🚨 New Booking",
        text: `Name: ${req.body.name}\nPhone: ${req.body.phone}\nService: ${req.body.service}`,
      });

      if (req.body.email) {
        await transporter.sendMail({
          from: "yourgmail@gmail.com",
          to: req.body.email,
          subject: "✅ Booking Confirmed",
          text: "Your plumbing service has been booked successfully.",
        });
      }

      console.log("✅ Email sent");

    } catch (err) {
      console.log("❌ Email error:", err.message);
    }

    res.json({ success: true, leadId: newLead._id });

  } catch (err) {
    console.log("❌ Save Error:", err.message);
    res.status(500).json({ success: false });
  }
});

/* ================== TRACK ================== */
app.get("/api/track/:phone", async (req, res) => {
  try {
    const data = await Lead.find({ phone: req.params.phone }).sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json([]);
  }
});

/* ================== ADMIN ================== */
app.get("/api/leads", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

app.post("/api/update-status", async (req, res) => {
  const { id, status, plumber } = req.body;
  await Lead.findByIdAndUpdate(id, { status, plumber });
  res.json({ success: true });
});

/* ================== PAYMENT ================== */
app.post("/api/payment-success", async (req, res) => {
  const { leadId } = req.body;
  await Lead.findByIdAndUpdate(leadId, { paymentStatus: "Paid" });
  res.json({ success: true });
});

/* ================== RATING ================== */
app.post("/api/rate/:id", async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, { rating: req.body.rating });
  res.json({ success: true });
});

/* ================== UPLOAD ================== */
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ file: req.file.filename });
});

app.post("/api/upload-images", async (req, res) => {
  const { id, beforeImage, afterImage } = req.body;
  await Lead.findByIdAndUpdate(id, { beforeImage, afterImage });
  res.json({ success: true });
});

/* ================== DELETE ================== */
app.delete("/api/leads/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* ================== SERVER ================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});