import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../model/UserModel.js";
const { USERS_ROLE, ADMIN_ROLE } = process.env;

// Define role constants

export const ROLES = {
  USER: USERS_ROLE,
  ADMIN: ADMIN_ROLE,
};

export const protectedRoleAuth = (...allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Please login/ user not found",
        success: false,
      });
    }

    try {
      const user = await UserModel.findById({ _id: userId });

      if (!user) {
        return res.status(401).json({
          message: "User account not found",
          success: false,
        });
      }

      const isAllowed =
        user.role.includes(allowedRoles) || allowedRoles.includes(user.role);

      if (!isAllowed) {
        res.status(403).json({
          message: "User not Allowed/ Access denied",
          success: false,
        });
      }

      next();
    } catch (error) {
      res.status(501).json({
        message: "Access denied / Internal Server Error",
        success: false,
      });
    }
  };
};
