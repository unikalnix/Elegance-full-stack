import mongoose from "mongoose";

// Define the schema for the product model
const productSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["category", "sale"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: [String]
    },
    color: {
      type: Map,
      of: String,
      required: true,
    },
    size: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    isNeww: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    originalPrice: {
      type: String,
    },
    category: {
      type: String,
      enum: ["men", "women", "kids", "accessories"],
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    details: {
      type: String,
      required: true,
    },
    sizing: {
      type: String,
    },
    care: {
      type: String,
    },
  },
  { timestamps: true }
);

// Virtual method to calculate discounted price
productSchema.virtual("discountedPrice").get(function () {
  if (this.discountPercentage && this.originalPrice) {
    const originalPrice = parseFloat(this.originalPrice.replace("$", ""));
    const discount = (this.discountPercentage / 100) * originalPrice;
    return (originalPrice - discount).toFixed(2);
  }
  return this.originalPrice;
});

const productModel = mongoose.models.products || mongoose.model("product", productSchema);
export default productModel;
