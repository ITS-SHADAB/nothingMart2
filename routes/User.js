const express = require('express');
const {
  loginUser,
  createUser,
  updateUser,
  existUser,
} = require('../controller/User');
const { isUser, auth } = require('../middleware/Auth');
const router = express.Router();

router.get('/me', isUser, existUser);
router.post('/login', loginUser);
router.post('/register', createUser);
router.put('/update', auth, updateUser);

module.exports = router;
