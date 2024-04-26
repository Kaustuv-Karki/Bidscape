import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
    isAdmin,
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
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 10),
      })
      .status(200)
      .json({ message: "Login Successful", validUser, token });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const userExists = await User.findById(id);
  if (!userExists) return next(errorHandler(404, "User not found"));
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
  next();
};

export const logout = async (req, res, next) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout Successful" });
};
