const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["men", "women", "unisex", "kids"],
      required: true,
    },
    season: {
      type: String,
      enum: ["spring", "summer", "autumn", "winter", "all-season"],
      required: true,
    },

    sizes: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL"],
          required: true,
        },
        stock: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],

    colors: [
      {
        name: { type: String, required: true }, // "Qizil"
        hex: { type: String, required: true }, // "#FF0000"
        images: [String],
        stock: { type: Number, default: 0, min: 0 },
      },
    ],

    material: {
      type: String,
      trim: true,
    },
    tags: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String, trim: true },
      },
    ],
    avgRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Search uchun index
productSchema.index({ name: "text", description: "text", brand: "text" });

// Rating o'rtachasini hisoblash
productSchema.methods.calculateAvgRating = function () {
  if (this.ratings.length === 0) {
    this.avgRating = 0;
    this.totalReviews = 0;
    return;
  }
  const sum = this.ratings.reduce((acc, r) => acc + r.rating, 0);
  this.avgRating = +(sum / this.ratings.length).toFixed(1);
  this.totalReviews = this.ratings.length;
};

module.exports = mongoose.model("Product", productSchema);
