//  s-1
const mongoose = require("mongoose");

//  s-2
const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, default: null, required: true },

    bookTitle: { type: String, default: null, required: true },

    bookImage: { type: String, default: null },

    // bookStatus: { type: Boolean, default: true, required: true },

    bookPrice: { type: Number, default: 0 },

    bookDescription: { type: String, default: null, required: true },
    bookStock: { type: Number, default: 0 },
    bookCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//  s-3
module.exports = new mongoose.model("books", bookSchema);
