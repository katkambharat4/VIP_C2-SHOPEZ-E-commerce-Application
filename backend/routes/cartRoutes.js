const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

console.log("Cart Routes Loaded");


router.post("/", protect, async (req, res) => {
  const { productId, name, price, image } = req.body;

  try {
    let item = await Cart.findOne({
      userId: req.user._id,
      productId,
    });

    if (item) {
  item.quantity += 1;
  item.image = image;
  item.name = name;
  item.price = price;
  await item.save();

    } else {
      item = await Cart.create({
        userId: req.user._id,
        productId,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", protect, async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user._id });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", protect, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/increase/:id", protect, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Not found" });

    item.quantity += 1;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/decrease/:id", protect, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) return res.status(404).json({ msg: "Not found" });

    item.quantity -= 1;

    if (item.quantity <= 0) {
      await Cart.findByIdAndDelete(req.params.id);
      return res.json({ msg: "removed" });
    }

    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;