import mongoose from "mongoose";
export const status = {
  Login: "login",
  Logout: "logout",
  BuyCoins: "buyCoins",
  Removed: "imageRemoved",
};

const ActiveUserSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      // unique: true,
    },
    activeUser: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["login", "logout", "buyCoins", "imageRemoved"],
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

const ActiveUserModel = mongoose.model("activeUsers", ActiveUserSchema);
export default ActiveUserModel;
