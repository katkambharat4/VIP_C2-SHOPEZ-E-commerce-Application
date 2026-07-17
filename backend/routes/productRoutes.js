



  const express = require("express");
  const router = express.Router();

  const protect = require("../middleware/authMiddleware");
  

  const Product = require("../models/Product");

  // 📦 GET ALL PRODUCTS (PUBLIC)
  router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // ➕ ADD PRODUCT (ADMIN ONLY)
router.post("/", protect, async (req, res) => {
    try {
      const { name, price, description, image, category, countInStock } =
        req.body;

      const product = new Product({
        name,
        price,
        description,
        image, // 🖼️ IMPORTANT
        category,
        countInStock,
      });

      const savedProduct = await product.save();

      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  module.exports = router;
