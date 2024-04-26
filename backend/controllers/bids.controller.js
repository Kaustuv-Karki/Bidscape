import Bid from "../models/bids.model.js";
import Project from "../models/project.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postBids = async (req, res, next) => {
  const projectId = req.params.id;
  const bidderId = req.user.id;
  const { amount, email, coverLetter } = req.body;
  const project = await Project.findById(projectId);
  if (!project) return next(errorHandler(404, "Project not found"));
  const clientId = project.userId;
  const newBid = new Bid({
    email,
    bidderId,
    projectId,
    amount,
    coverLetter,
    clientId,
  });
  try {
    const bid = await newBid.save();
    res.status(201).json({ message: "Bid created successfully", bid });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const getBids = async (req, res, next) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const getBidsById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const bid = await Bid.findById(id);
    res.status(200).json(bid);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};
