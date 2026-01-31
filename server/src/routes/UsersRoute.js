import express from "express";
import { protectedAuth } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserDetails,
  updateUser,
  updateUserPassword,
  updateUserStatus,
} from "../controller/userHandler.js";

const usersRouter = express.Router();

usersRouter.get("/users", protectedAuth, getAllUsers);
usersRouter.get("/users/get/:id", protectedAuth, getUserById);
usersRouter.get("/users/get", protectedAuth, getUserDetails);
usersRouter.patch("/users/update", protectedAuth, updateUser);
usersRouter.put("/users/update", protectedAuth, updateUser);
usersRouter.put("/users/update/password", protectedAuth, updateUserPassword);
usersRouter.put("/users/update/status", protectedAuth, updateUserStatus);
usersRouter.delete("/users/delete", protectedAuth, deleteUser);

export default usersRouter;
