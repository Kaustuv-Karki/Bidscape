import express from "express";
import {
  register,
  login,
  deleteUser,
  logout,
  getUserProfile,
} from "../controllers/user.controller.js";
import { verifyTokenAndAuthorization } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/profile/:id", verifyTokenAndAuthorization, getUserProfile);

export default router;
