// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema(
//   {
//     name: String,
//     phone: String,
//     email: String,
//     address: String,
//     service: String,
//     message: String
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Contact", contactSchema);
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    service: String,
    message: String,

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Assigned", "Completed"],
      default: "Pending",
    },

    plumber: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);