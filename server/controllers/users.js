const User = require("../models/users");
const { BadRequestError, UnauthorizedError } = require("../utils/error-handler");
const { generateResponse } = require("../utils/response");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

class UsersController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    newUser.password = undefined;
    newUser.__v = undefined;
    generateResponse(res, newUser, 201, "User created successfully");
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) throw new BadRequestError("Email is required");
    if (!password) throw new BadRequestError("Password is required");

    const userData = await User.find({ email }).then((data) => data[0]);
    if (!userData) throw new UnauthorizedError("Incorrect email or password");

    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) throw new UnauthorizedError("Incorrect email or password");

    const token = generateToken({ id: userData._id, email: userData.email });
    generateResponse(res, {token});
  }

  static async getProfile(req, res) {
    const usersData = await User.findById(req.user._id, { _id: 1, name: 1, email: 1, createdAt: 1 });
    generateResponse(res, usersData);
  }
}

module.exports = UsersController;