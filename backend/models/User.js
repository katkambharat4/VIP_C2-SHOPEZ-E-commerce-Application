


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // 🔐 IMPORTANT
  role: {
    type: String,
    default: "user", // "admin"
  },
});

module.exports = mongoose.model("User", userSchema);