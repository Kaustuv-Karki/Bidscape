import Project from "../models/project.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createProject = async (req, res, next) => {
  const {
    title,
    description,
    budget,
    deadline,
    skills,
    tags,
    images,
    email,
    userId,
  } = req.body;
  try {
    const newProject = new Project({
      title,
      description,
      budget,
      deadline,
      skills,
      tags,
      images,
      email,
      userId,
    });
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", newProject });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};