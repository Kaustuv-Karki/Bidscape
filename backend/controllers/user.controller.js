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
    next(errorHandler(500, error.message));
  }
};
