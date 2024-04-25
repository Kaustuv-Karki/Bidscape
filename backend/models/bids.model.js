import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  username: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
