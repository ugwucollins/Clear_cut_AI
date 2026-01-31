import express from "express";
import {
  Login,
  LogOut,
  Register,
  verifyUser,
} from "../controller/authHandler.js";
import { protectedAuth } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/auth/logout", LogOut);
authRouter.get("/auth/verify/user", protectedAuth, verifyUser);
authRouter.post("/auth/verify/user", protectedAuth, verifyUser);

export default authRouter;
