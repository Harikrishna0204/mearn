const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // ✅ Extract token from "Bearer TOKEN"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    req.user = decoded.id;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};