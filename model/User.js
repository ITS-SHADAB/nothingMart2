const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true },
  address: { type: [mongoose.Schema.Types.Mixed] }, // Adjust according to your address structure
  role: { type: String, default: 'user' }, // Default role set to 'user'
});

// Method to generate authentication token
userSchema.methods.genrateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      address: this.address,
    },
    process.env.JWT_PRIVATE_KEY, // Use environment variable directly
    { expiresIn: '240h' } // Token expiration set to 10 days
  );
  return token;
};

// Export the User model

exports.User = mongoose.model('User', userSchema);
