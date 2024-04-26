import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import bidRoutes from "./routes/bids.route.js";
import adminRoutes from "./routes/admin.route.js";
import projectRoutes from "./routes/project.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
