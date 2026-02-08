import mongoose from "mongoose";

const siteConfigSchema = new mongoose.Schema({
  categoryOrder: {
    type: [String], // array of category names
    default: []
  }
});

export default mongoose.model("SiteConfig", siteConfigSchema);
