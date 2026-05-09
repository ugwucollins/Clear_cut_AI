import express from "express";
import {
  Forget_Password,
  Login,
  LogOut,
  Register,
  RegisterAd,
  Reset_Password,
  verifyUser,
} from "../controller/authHandler.js";
import { protectedAuth } from "../middleware/authMiddleware.js";
import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post(
  "/register/ad",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  RegisterAd,
);
authRouter.post("/login", Login);
authRouter.post("/auth/logout", protectedAuth, LogOut);
authRouter.post("/auth/forget_password", Forget_Password);
authRouter.post("/auth/reset_password/:id/:token", Reset_Password);
authRouter.get("/auth/verify/user", protectedAuth, verifyUser);
authRouter.post("/auth/verify/user", protectedAuth, verifyUser);

export default authRouter;
