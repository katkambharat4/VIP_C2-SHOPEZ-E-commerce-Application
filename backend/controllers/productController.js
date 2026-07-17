
const Product = require("../models/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADD PRODUCT (ADMIN)
const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, countInStock } =
      req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      countInStock,
    });

    res.status(201).json({
      msg: "Product created",
      product,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getProducts, addProduct };