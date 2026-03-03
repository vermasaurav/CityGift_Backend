import mongoose from "mongoose";

const flashSchema = new mongoose.Schema(
  {
    image1: String,
    image2: String,
    image3: String,
    image4: String
  },
  { timestamps: true }
);

export default mongoose.model("Flash", flashSchema);