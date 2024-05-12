import Bid from "../models/bids.model.js";
import Project from "../models/project.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createProject = async (req, res, next) => {
  const { title, description, budget, deadline, skills, tags, images, email } =
    req.body;
  const userId = req.user.id;
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

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const getSpecificProject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const project = await Project.findById(id);
    if (!project) return next(errorHandler(404, "Project not found"));
    res.status(200).json(project);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const updateProject = async (req, res, next) => {
  const id = req.params.id;
  console.log("This is the id", id);
  try {
    const project = await Project.findById(id);
    if (!project) return next(errorHandler(404, "Project not found"));
    if (project.userId !== req.user.id)
      return next(
        errorHandler(
          403,
          `You are not allowed to update this project userID ${project.userId} req.user.id ${req.user.id}`
        )
      );
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProject);
    } catch (error) {
      return next(errorHandler(500, "Error occured"));
    }
  } catch (error) {
    return next(errorHandler(500, "Project not found"));
  }
};

export const getProjectByUser = async (req, res, next) => {
  const userId = req.user.id;
  console.log("This is the user id", userId);
  try {
    const project = await Project.find({ userId: userId });
    res.status(200).json(project);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const getBidsByProjectId = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const bid = await Bid.find({ projectId: projectId });
    res.status(200).json(bid);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
