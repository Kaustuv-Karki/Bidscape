import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";
import {
  postBids,
  getBids,
  getBidsById,
} from "../controllers/bids.controller.js";

const router = express.Router();

router.post("/create/:id", verifyToken, postBids);
router.get("/get", verifyToken, getBids);
router.get("/get/:id", verifyToken, getBidsById);

export default router;
