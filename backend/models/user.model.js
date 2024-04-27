import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dkkgmzpqd/image/upload/v1628580007/avatar/avatar_cugq40.png",
    },
    passwordToken: { type: String },
    passwordTokenExp: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
