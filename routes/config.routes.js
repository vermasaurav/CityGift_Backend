import express from "express";
import SiteConfig from "../models/siteConfig.js";

const router = express.Router();

/* GET category order */
router.get("/category-order", async (req, res) => {
  let config = await SiteConfig.findOne();

  if (!config) {
    config = await SiteConfig.create({ categoryOrder: [] });
  }

  res.json(config);
});

/* SAVE category order */
router.post("/category-order", async (req, res) => {
  const { categoryOrder } = req.body;

  let config = await SiteConfig.findOne();

  if (!config) {
    config = await SiteConfig.create({ categoryOrder });
  } else {
    config.categoryOrder = categoryOrder;
    await config.save();
  }

  res.json({ success: true });
});

export default router;
