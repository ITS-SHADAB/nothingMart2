const { Cart } = require('../model/Cart');

// Add item to cart or increase quantity if it already exists
exports.addToCart = async (req, res) => {
  try {
    const user = req.user.id;
    const { product } = req.body;

    let cartItem = await Cart.findOne({ user, product });
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new Cart({ user, product, quantity: 1 });
    }

    const result = await cartItem.save();
    res.status(201).send(result); // 201 for successful creation or update
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Fetch cart items for a specific user
exports.fetchCartByUser = async (req, res) => {
  const id = req.user.id;

  try {
    const cartItems = await Cart.find({ user: id }).populate('product');

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({
      error: 'An error occurred while fetching the cart items',
      details: err.message,
    });
  }
};

// Increase the quantity of a cart item
exports.increaseItem = async (req, res) => {
  try {
    const user = req.user.id;
    const { product } = req.body;
    let cartItem = await Cart.findOne({ user, product });
    if (!cartItem)
      return res.status(404).send({ error: 'Cart item not found' });

    cartItem.quantity += 1;
    await cartItem.save();

    const allCartItems = await Cart.find({ user }).populate('product');
    res.status(200).send(allCartItems); // 200 for successful update
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Decrease the quantity of a cart item, but not below 1
exports.decreaseItem = async (req, res) => {
  try {
    const user = req.user.id; // Take user ID from req.user.id
    const { product } = req.body;
    let cartItem = await Cart.findOne({ user, product });
    if (!cartItem)
      return res.status(404).send({ error: 'Cart item not found' });

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      return res.status(409).send({ error: 'Quantity cannot be less than 1' }); // 409 Conflict
    }

    const allCartItems = await Cart.find({ user }).populate('product');
    res.status(200).send(allCartItems);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a cart item
exports.deleteItem = async (req, res) => {
  try {
    const user = req.user.id; // Take user ID from req.user.id
    const { product } = req.body;
    const cartItem = await Cart.deleteOne({ user, product });

    if (cartItem.deletedCount === 0) {
      return res.status(404).send({ error: 'Cart item not found' });
    }

    const allCartItems = await Cart.find({ user }).populate('product');
    res.status(200).send(allCartItems);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Clear the entire cart for a user
exports.clearCart = async (req, res) => {
  try {
    const user = req.user.id; // Take user ID from req.user.id
    const result = await Cart.deleteMany({ user });

    if (result.deletedCount === 0)
      return res.status(404).send({ error: 'No items found for this user' });

    res.status(200).send([]); // Send an empty array for a cleared cart
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
