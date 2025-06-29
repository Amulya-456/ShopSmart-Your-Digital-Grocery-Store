const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String
});

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  paymentMethod: String,
  items: [itemSchema],
  total: Number,
  placedAt: Date,
  status: String
});

module.exports = mongoose.model('Order', orderSchema);