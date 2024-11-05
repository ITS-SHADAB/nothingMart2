const express = require('express');
const {
  addToCart,
  increaseItem,
  decreaseItem,
  fetchCartByUser,
  deleteItem,
  clearCart,
} = require('../controller/Cart');
const { auth } = require('../middleware/Auth');
const router = express.Router();

router
  .post('/addCart', auth, addToCart)
  .post('/increase', auth, increaseItem)
  .post('/decrease', auth, decreaseItem)
  .post('/', auth, fetchCartByUser)
  .post('/removeItem', auth, deleteItem)
  .post('/clearCart', auth, clearCart);

module.exports = router;
