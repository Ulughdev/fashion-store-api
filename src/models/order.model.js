const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, // o'sha paytdagi nom
        price: { type: Number, required: true }, // o'sha paytdagi narx
        discountPrice: { type: Number, default: null },
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String },
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    stripePaymentId: {
      type: String,
      default: null,
    },

    subtotal: { type: Number, required: true }, // chegirmasiz narx
    discount: { type: Number, default: 0 }, // chegirma summasi
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true }, // yakuniy narx

    notes: { type: String, default: null }, // mijoz izohi
  },
  { timestamps: true },
);

// Yakuniy narxni hisoblash
orderSchema.methods.calculateTotal = function () {
  this.total = this.subtotal - this.discount + this.shippingCost;
};

module.exports = mongoose.model("Order", orderSchema);
