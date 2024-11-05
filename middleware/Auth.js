const jwt = require('jsonwebtoken');

// General authentication middleware
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // Use environment variable directly
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

// User-level authentication middleware
function isUser(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    // No token provided, proceed without authentication
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // Use environment variable directly
    req.user = decoded;
    next();
  } catch (ex) {
    // Invalid token, respond with error
    return res.status(400).json({ message: 'Invalid token.' });
  }
}

// Admin-only authentication middleware
function adminAuth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // Use environment variable directly
    req.user = decoded;

    // Check if the user is an admin
    if (req.user.role !== 'admin')
      return res.status(403).send('Access denied. Admins only.');

    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = { auth, adminAuth, isUser };
