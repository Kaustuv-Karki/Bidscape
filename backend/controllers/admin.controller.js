import Bid from "../models/bids.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const updateBid = async (req, res, next) => {
  const bidId = req.params.bidId;
  const bid = await Bid.findById(bidId);
  if (!bid) return next(errorHandler(404, "Bid not found"));
  const id = req.user.id;
  console.log(bid);
  if (bid.clientId !== id)
    return next(errorHandler(403, "You are not allowed to update this bid"));
  try {
    const updatedBid = await Bid.findByIdAndUpdate(
      bidId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBid);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
  next();
};
