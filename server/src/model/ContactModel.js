import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      ref: "users",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["view", "seen", "done"],
      required: true,
      default: "view",
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

const ContactModel = mongoose.model("contacts", ContactSchema);
export default ContactModel;
