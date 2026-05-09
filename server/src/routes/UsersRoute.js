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
import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";

const usersRouter = express.Router();

usersRouter.get(
  "/users",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  getAllUsers,
);
usersRouter.get("/users/get/:id", protectedAuth, getUserById);
usersRouter.get("/users/get", protectedAuth, getUserDetails);

usersRouter.patch(
  "/users/update",
  protectedAuth,
  protectedRoleAuth(ROLES.USER, ROLES.ADMIN),
  updateUser,
);
usersRouter.put(
  "/users/update",
  protectedAuth,
  protectedRoleAuth(ROLES.USER, ROLES.ADMIN),
  updateUser,
);
usersRouter.put(
  "/users/update/password",
  protectedAuth,
  protectedRoleAuth(ROLES.USER, ROLES.ADMIN),
  updateUserPassword,
);

usersRouter.put(
  "/users/update/status/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  updateUserStatus,
);

usersRouter.delete(
  "/users/delete/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  deleteUser,
);

export default usersRouter;
