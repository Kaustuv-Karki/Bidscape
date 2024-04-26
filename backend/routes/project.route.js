import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/project.controller.js";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyTokenAndAdmin, createProject);
router.get("/get", getProjects);

export default router;
