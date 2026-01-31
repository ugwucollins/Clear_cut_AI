import mongoose from "mongoose";
const { USERS_ROLE, ADMIN_ROLE } = process.env;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: String,
      required: true,
      enum: [ADMIN_ROLE, USERS_ROLE],
      default: USERS_ROLE,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String || Number,
    },
    coins: {
      type: Number,
      required: true,
      default: 4,
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

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
