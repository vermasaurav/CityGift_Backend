import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import configRoutes from "./routes/config.routes.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: "*", // testing ke liye
}));


app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/config", configRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected bhi"))
  .catch(err => console.log(err));

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
