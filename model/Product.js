const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, 'invlid price value'],
    max: [10000000, 'invlid value '],
    required: true,
  },
  stock: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

exports.Product = mongoose.model('Product', productSchema);
