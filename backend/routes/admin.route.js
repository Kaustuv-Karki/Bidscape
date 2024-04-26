import express from "express";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";
import { updateBid } from "../controllers/admin.controller.js";

const router = express.Router();

router.put("/update/:bidId", verifyTokenAndAdmin, updateBid);

export default router;
