const express = require('express');
const { allCategory, createCategory } = require('../controller/Category');
const router = express.Router();

router.get('/', allCategory);
router.post('/', createCategory);

module.exports = router;
