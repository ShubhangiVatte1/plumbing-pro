// import express from "express";
// import Contact from "../models/Contact.js";

// const router = express.Router();

// // ✅ CREATE BOOKING
// router.post("/", async (req, res) => {
//   try {
//     const newContact = new Contact(req.body);
//     await newContact.save();

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Error saving data" });
//   }
// });

// // ✅ GET ALL BOOKINGS (ADMIN)
// router.get("/", async (req, res) => {
//   try {
//     const data = await Contact.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data" });
//   }
// });

// // ✅ DELETE BOOKING
// router.delete("/:id", async (req, res) => {
//   try {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// export default router;
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");


// ✅ CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const newBooking = new Contact(req.body);
    await newBooking.save();

    res.json({ success: true, data: newBooking });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


// ✅ GET BOOKINGS BY PHONE (TRACKING)
router.get("/:phone", async (req, res) => {
  try {
    const data = await Contact.find({ phone: req.params.phone }).sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json([]);
  }
});


// ✅ ADMIN: GET ALL BOOKINGS
router.get("/admin/all", async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json(data);
});


// ✅ ADMIN: UPDATE STATUS
router.put("/admin/update/:id", async (req, res) => {
  const { status, plumber } = req.body;

  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    { status, plumber },
    { new: true }
  );

  res.json(updated);
});


// ✅ ADMIN: STATS
router.get("/admin/stats", async (req, res) => {
  const total = await Contact.countDocuments();
  const pending = await Contact.countDocuments({ status: "Pending" });
  const completed = await Contact.countDocuments({ status: "Completed" });

  res.json({ total, pending, completed });
});

module.exports = router;