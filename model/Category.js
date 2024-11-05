const mongoose = require('mongoose');
exports.Category = mongoose.model(
  'category',
  new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
  })
);
