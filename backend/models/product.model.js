

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 3,
      index: true
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },

    image: {
      type: String,
      required: true,
      match: [/^https?:\/\//, "Image must be a valid URL"]
    },

    stock: {
      type: Number,
      default: 0,
      min: 0
    },

    category: {
      type: String,
      enum: ["ELECTRONICS", "CLOTHING", "BOOKS", "OTHER"],
      default: "OTHER"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", ProductSchema);
