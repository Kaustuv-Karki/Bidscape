import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import bidRoutes from "./routes/bids.route.js";
import projectRoutes from "./routes/project.route.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/project", projectRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
