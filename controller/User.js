const { User } = require('../model/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken'); // Ensure jwt is imported if needed
const config = require('config'); // Ensure config is imported for accessing private key

exports.existUser = async (req, res) => {
  if (req.user) {
    const id = req.user.id;
    const find = await User.findById(id);

    // User is authenticated
    return res.json(find);
  } else {
    // User is not authenticated, proceed without user info
    return res.json({ message: 'User not logged in' });
  }
};

exports.createUser = async (req, res) => {
  try {
    // Check if the user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    // Create a new user
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    const savedUser = await user.save();

    // Prepare user object for response
    let mUser = savedUser.toObject();
    delete mUser._id;
    delete mUser.__v;
    delete mUser.password;

    // Generate auth token
    const token = user.genrateAuthToken();

    // Set token in response headers
    res.header('x-auth-token', token).json(mUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json('user not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).json('invalid password');

    let mUser = user.toObject();
    delete mUser._id; // Remove _id from the response
    const token = user.genrateAuthToken();

    // Set token in response headers
    res.header('x-auth-token', token).json(mUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) return res.status(404).send('notFound');
    console.log(user);

    let updatedUser = user.toObject();
    delete updatedUser._id; // Remove _id from the response
    delete updatedUser.__v; // Optionally remove __v if not needed

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
