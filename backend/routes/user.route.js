import express from "express";
import {
  register,
  login,
  deleteUser,
  logout,
} from "../controllers/user.controller.js";
import { verifyTokenAndAuthorization } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteUser);

export default router;
