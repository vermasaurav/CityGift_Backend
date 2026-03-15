// import express from "express";
// import multer from "multer";
// import Flash from "../models/flashImage.js";


// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// /* GET FLASH IMAGES */
// router.get("/", async (req, res) => {
//   let flash = await Flash.findOne();

//   if (!flash) {
//     flash = await Flash.create({});
//   }
  
//   res.json(flash);
// });

// /* UPDATE FLASH IMAGES */
// router.post(
//   "/",
//   upload.fields([
//     { name: "image1" },
//     { name: "image2" },
//     { name: "image3" },
//     { name: "image4" }
//   ]),
//   async (req, res) => {
//     let flash = await Flash.findOne();

//     if (!flash) {
//       flash = await Flash.create({});
//     }

//     const updateData = {};

//     ["image1", "image2", "image3", "image4"].forEach((field) => {
//       if (req.files[field]) {
//         updateData[field] = req.files[field][0].filename;
//       }
//     });

//     const updated = await Flash.findByIdAndUpdate(
//       flash._id,
//       updateData,
//       { new: true }
//     );

//     res.json(updated);
//   }
// );

// export default router;





import express from "express";
import Flash from "../models/flashImage.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* GET FLASH IMAGES */
router.get("/", async (req, res) => {
  let flash = await Flash.findOne();

  if (!flash) {
    flash = await Flash.create({});
  }

  res.json(flash);
});

/* UPDATE FLASH IMAGES */
router.post(
  "/",
  upload.fields([
    { name: "image1" },
    { name: "image2" },
    { name: "image3" },
    { name: "image4" }
  ]),
  async (req, res) => {

    let flash = await Flash.findOne();

    if (!flash) {
      flash = await Flash.create({});
    }

    const updateData = {};

    ["image1", "image2", "image3", "image4"].forEach((field) => {
      if (req.files && req.files[field]) {
        updateData[field] = req.files[field][0].path; // ⭐ Cloudinary URL
      }
    });

    const updated = await Flash.findByIdAndUpdate(
      flash._id,
      updateData,
      { new: true }
    );

    res.json(updated);
  }
);

export default router;