const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    console.log("Authorization Header:", req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      console.log("Received Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("User Found:", req.user);
      

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (err) {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Session expired. Please login again.",
    });
  }

  return res.status(401).json({
    message: "Invalid token",
  });
}
};

module.exports = protect;