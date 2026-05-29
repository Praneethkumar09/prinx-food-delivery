const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    items: {
      type: Array,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ replaces createdAt automatically
  }
);

module.exports =
  mongoose.models.Order || mongoose.model("Order", orderSchema);