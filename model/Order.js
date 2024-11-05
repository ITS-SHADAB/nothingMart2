const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  arrCart: { type: [Schema.Types.Mixed], required: true },
  totalPrice: { type: Number, required: true },
  totalItem: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' },
  status: { type: String, default: 'pending' },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
  date: { type: Date, default: Date.now },
});

exports.Order = mongoose.model('order', orderSchema);
