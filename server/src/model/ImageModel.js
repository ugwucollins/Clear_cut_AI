import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId || String,
      ref: "users",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    oldImage: {
      type: String,
      required: true,
    },
    newImage: {
      type: String,
      required: true,
    },
    result: {
      type: String || Object,
      // required: true,
    },

    status: {
      type: String,
      enum: ["pending", "failed", "completed"],
      required: true,
      default: "pending",
    },
    time: {
      type: String || Number,
      required: true,
      default: "1.2",
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: true,
      default: "private",
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
  },
);

const ImageModel = mongoose.model("generatedImg", ImageSchema);
export default ImageModel;
