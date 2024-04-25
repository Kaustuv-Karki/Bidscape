import express from "express";
import { createProject } from "../controllers/project.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", createProject);

export default router;
