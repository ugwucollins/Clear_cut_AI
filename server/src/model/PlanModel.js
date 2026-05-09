import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId || String,
      ref: "users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
      enum: ["Basic", "Advance", "Pro", "Business"],
    },
    list: {
      type: [String] || Array || String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    amount: {
      type: Number || String,
      required: true,
      default: 4,
    },
    value: {
      type: Number || String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "passed"],
      required: true,
      default: "active",
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

const PlanModel = mongoose.model("plans", PlanSchema);
export default PlanModel;
