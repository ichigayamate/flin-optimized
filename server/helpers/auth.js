const { UnauthorizedError } = require("../utils/error-handler");
const jwt = require("jsonwebtoken");

async function authenthication (req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) throw new UnauthorizedError("Invalid token");

    const token = header.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  authenthication,
};