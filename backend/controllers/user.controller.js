import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", validUser, token });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
