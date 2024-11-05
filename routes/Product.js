const express = require('express');
const {
  allProduct,
  createProduct,
  fetchProductById,
  updateProduct,
} = require('../controller/Product');
const { adminAuth } = require('../middleware/Auth');
const router = express.Router();

router.get('/', allProduct);
router.post('/', adminAuth, createProduct);
router.get('/:id', fetchProductById);
router.put('/:id', adminAuth, updateProduct);

module.exports = router;
