const mongoose = require("mongoose");
const orderModel = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderPrice: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderModel);
