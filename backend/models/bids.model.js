import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    bidderId: { type: String, required: true },
    projectId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
