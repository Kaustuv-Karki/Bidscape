import express from "express";
import {
  verifyToken,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";
import { postBids } from "../controllers/bids.controller.js";

const router = express.Router();

// router.get("/get", getProjects);

export default router;
