import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
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

export const getUserProfile = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return next(errorHandler(404, "User not found"));
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 12);
  console.log(resetToken);
  try {
    const value = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          passwordToken: hash,
          passwordTokenExp: Date.now() + 10 * 60 * 1000,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Password token made", value });
  } catch (error) {
    return next(errorHandler(500, "Error Occured"));
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body;
  const resetToken = req.params.resetToken;
  const user = await User.findOne({ email: email });
  if (!user) return next(errorHandler(500, "Email doesnot exist"));
  const checkToken = await bcrypt.compare(resetToken, user.passwordToken);
  if (checkToken) {
    var currentDateInMillis = Date.now();
    var expTimeInMillis = new Date(user.passwordTokenExp).getTime();
    if (currentDateInMillis < expTimeInMillis) {
      if (newPassword === confirmPassword) {
        const hashPassword = await bcrypt.hash(confirmPassword, 12);
        const updatedPassword = await User.findOneAndUpdate(
          { email: email },
          {
            $set: {
              password: hashPassword,
            },
          },
          { new: true }
        );
        res.status(200).json({ message: "Password Changed", updatedPassword });
      } else {
        res.status(500).json({
          message: "The new Password and the resetPassword dont match",
        });
      }
    } else {
      res
        .status(500)
        .json({ message: "You cannot change the password token expired" });
    }
  } else {
    res
      .status(500)
      .json({ message: "You are not able to change the password" });
  }
  next();
};
