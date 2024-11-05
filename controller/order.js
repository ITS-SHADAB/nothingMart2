const { Order } = require('../model/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const order = new Order({ ...req.body, user });
    const savedOrder = await order.save();
    res.status(201).send(savedOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get an order by user
exports.getOrderById = async (req, res) => {
  try {
    const user = req.user.id;
    const allOrder = await Order.find({ user });
    if (!allOrder) return res.status(404).send('Order not found');
    const savedOrder = allOrder.map((oreder) => {
      let orderObj = oreder.toObject();
      orderObj.id = orderObj._id;
      delete orderObj._id;
      return orderObj;
    });

    res.status(200).send(savedOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all orders
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.deleteOne({ _id: orderId });
    if (order.deletedCount === 0)
      return res.status(404).send('Order not found');
    const allOrders = await Order.find();
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { orderId, ...updateData } = req.body;
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedOrder) return res.status(404).send('Order not found');
    const allOrders = await Order.find().populate('user');
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
