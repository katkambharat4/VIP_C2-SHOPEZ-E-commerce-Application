const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");

console.log("Order Routes Loaded");

router.post("/", protect, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    const order = new Order({
      user: req.user.id,
      products,
      totalPrice,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("products.product");

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ==============================
// UPDATE ORDER STATUS (ADMIN)
// ==============================
router.put("/:id/status", protect, async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }


    order.status = status;

    await order.save();


    res.json({
      message: "Status Updated",
      order,
    });


  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});

module.exports = router;