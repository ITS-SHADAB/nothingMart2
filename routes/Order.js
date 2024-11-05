const express = require('express');
const {
  createOrder,
  getAllOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
} = require('../controller/order');
const { auth, adminAuth } = require('../middleware/Auth');
const router = express.Router();

router
  .post('/', auth, createOrder)
  .get('/', adminAuth, getAllOrder)
  .post('/id', auth, getOrderById)
  .delete('/', adminAuth, deleteOrder)
  .put('/', adminAuth, updateOrder);

module.exports = router;
