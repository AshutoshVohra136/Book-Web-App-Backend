const mongoose = require("mongoose");
const deliveryPartnerSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partnerName: {
      type: String,
      required: true,
    },
    partnerEmail: {
      type: String,
      required: true,
      unique: true,
    },
    partnerPassword: {
      type: String,
      required: true,
    },
    partnerPhone: {
      type: String,
      required: true,
    },
    partnerVehicle: {
      type: String,
      required: true,
    },

    partnerAreaCode: {
      type: Number,
      required: true,
    },
    partnerCity: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
