

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  image: String,
  name: String,
  
  price: Number,

  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
