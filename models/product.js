  import mongoose from "mongoose";
  import slugify from "slugify";

  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      slug: {
        type: String,
        unique: true,
        index: true
      },

      price: {
        type: Number,
        required: true
      },

      oldPrice: Number,

      description: String,

      category: {
        type: String,
        required: true
      },

      insta: String,
      youtube: String,

      image: {
        type: String,
        required: true
      },

      stock: {
        type: Boolean,
        default: true
      }
    },
    { timestamps: true }
  );

  // ✅ MONGOOSE PRE SAVE HOOK (CORRECT)
  productSchema.pre("save", async function () {
    if (!this.isModified("name")) return;

    let baseSlug = slugify(this.name, {
      lower: true,
      strict: true
    });

    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Product.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  });

  export default mongoose.model("Product", productSchema);
