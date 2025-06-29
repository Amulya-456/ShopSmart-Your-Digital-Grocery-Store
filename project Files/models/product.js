const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  countInStock: Number,
  rating: Number,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);