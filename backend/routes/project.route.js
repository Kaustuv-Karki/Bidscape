import express from "express";
import {
  createProject,
  getProjects,
  getSpecificProject,
  updateProject,
  getBidsByProjectId,
} from "../controllers/project.controller.js";
import { verifyToken, verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyTokenAndAdmin, createProject);
router.get("/get", getProjects);
router.get("/get/:id", getSpecificProject);
router.put("/update/:id", verifyTokenAndAdmin, updateProject);
router.get("/bid/:projectId", verifyToken, getBidsByProjectId);

export default router;
