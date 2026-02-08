import express from "express";
import Category from "../models/category.js";

const router = express.Router();

/* ================= ADD CATEGORY (ADMIN) ================= */
router.post("/add", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL CATEGORIES ================= */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
