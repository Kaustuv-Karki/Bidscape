import Bid from "../models/bids.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const postBids = async (req, res, next) => {
  const { username, amount } = req.body;
  const newBid = new Bid({
    username: username,
    amount: amount,
  });
  try {
    await newBid.save();
    res.status(201).json({ message: "Bid posted successfully" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
