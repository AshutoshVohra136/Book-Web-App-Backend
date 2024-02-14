const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, default: null, required: true },
    categoryDescription: { type: String, default: null, required: true },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Category", categorySchema);
