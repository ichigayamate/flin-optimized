const jwt = require("jsonwebtoken");

export function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET);
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
