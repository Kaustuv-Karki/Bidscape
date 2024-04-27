import express from "express";
import {
  register,
  login,
  deleteUser,
  logout,
  getUserProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/profile/:id", verifyTokenAndAuthorization, getUserProfile);
router.put("/forgotPassword", forgotPassword);
router.post("/resetPassword/:resetToken", resetPassword);

export default router;
