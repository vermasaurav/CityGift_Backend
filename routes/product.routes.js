import express from "express";
import Product from "../models/product.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Product with same name already exists"
      });
    }

    res.status(500).json({
      message: "Product not saved",
      error: error.message
    });
  }
});

/* ================= ADD PRODUCT ================= */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      description:req.body.description,
      category: req.body.category,
      youtube:req.body.youtube,
      insta:req.body.insta,
      subcategory: req.body.subcategory,
      stock: req.body.stock === "true",
      image: req.file.filename
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});




/* ================= GET PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* ================= UPDATE PRODUCT ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});

export default router;
