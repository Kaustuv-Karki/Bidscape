import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return next(errorHandler(401, "Unauthorized"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id, req.params.id);
    if (req.user.id === req.params.id) next();
    else next(errorHandler(403, "Forbidden Unauthorized"));
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else next(errorHandler(403, "Only Admin can access this route"));
  });
};
