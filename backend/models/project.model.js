import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true },
    duration: { type: Number, required: true, default: 1 },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    skills: { type: [String], required: true },
    tags: { type: [String] },
    images: { type: [String] },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
