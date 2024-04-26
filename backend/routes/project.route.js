import express from "express";
import { createProject } from "../controllers/project.controller.js";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyTokenAndAdmin, createProject);

export default router;
