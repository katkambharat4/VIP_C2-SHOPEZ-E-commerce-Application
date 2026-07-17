const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/users", require("./routes/userRoutes"));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
console.log("Loading Order Routes...");
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.send("ShopEZ API Running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});