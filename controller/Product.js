const { Product } = require('../model/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    const productResponsed = savedProduct.toJSON();
    productResponsed.id = productResponsed._id;
    delete productResponsed._id;
    delete productResponsed.__v;
    res.status(201).send(productResponsed);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.allProduct = async (req, res) => {
  try {
    const allProducts = await Product.find({ deleted: { $ne: true } });

    const productsWithId = allProducts.map((product) => {
      const productObject = product.toObject();
      productObject.id = productObject._id;
      delete productObject._id;
      return productObject;
    });

    res.status(200).send(productsWithId);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    const prod = product.toObject();
    prod.id = prod._id;
    delete prod._id;
    res.status(200).send(prod);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) return res.status(404).send('Product not found');

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await Product.deleteOne({ id });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// To do
// Pagination
// authentication and write cookies and encrypted password
//
