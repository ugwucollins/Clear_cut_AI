import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ref: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId || String,
      ref: "users",
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    credit: {
      type: Number,
      required: true,
    },
    coins: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      required: true,
      default: "unpaid",
    },

    plan: {
      type: String,
      enum: ["Basic", "Advance", "Pro", "Business"],
      required: true,
    },
    year: {
      type: String || Number,
      required: true,
    },
    month: {
      type: String || Number,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

const TransactionModel = mongoose.model("transactions", TransactionSchema);
export default TransactionModel;
