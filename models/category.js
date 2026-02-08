// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  subs: [{ name: String }]
});

export default mongoose.model("Category", categorySchema);
