const jwt = require("jsonwebtoken");
const { blacklistModel } = require("../models/balcklist.schema");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Extract token from Authorization header
  const token = authHeader.split(" ")[1];
  console.log(token);
  // Check if token exists
  if (!token) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  // Check if token is blacklisted
  const blackList = await blacklistModel.findOne({ token });
  if (blackList) {
    return res.status(401).json({ msg: "User is already logged out. Please login again." });
  }

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Attach decoded user information to request object
    req.userId = decoded.id;
    req.user = decoded;
    next();
  });
};

module.exports = {
  auth,
};
