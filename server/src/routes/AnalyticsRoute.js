import express from "express";
import { protectedAuth } from "../middleware/authMiddleware.js";

import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";
import {
  createAnalytics,
  deleteAnalytics,
  getAllAnalytics,
  getAnalyticsById,
  getAnalyticsDetails,
  updateAnalytics,
  updateAnalyticStatus,
} from "../controller/analyticsHandler.js";

const AnalyticsRouter = express.Router();

AnalyticsRouter.get(
  "/Analytics",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  getAllAnalytics,
);
AnalyticsRouter.get("/Analytics/get/:id", protectedAuth, getAnalyticsById);
AnalyticsRouter.get("/Analytics/get", protectedAuth, getAnalyticsDetails);

AnalyticsRouter.patch(
  "/Analytics/update",
  protectedAuth,
  protectedRoleAuth(ROLES.USER),
  updateAnalytics,
);
AnalyticsRouter.put(
  "/Analytics/update",
  protectedAuth,
  protectedRoleAuth(ROLES.USER),
  updateAnalytics,
);
AnalyticsRouter.post(
  "/Analytics/create",
  protectedAuth,
  protectedRoleAuth(ROLES.USER),
  createAnalytics,
);

AnalyticsRouter.put(
  "/Analytics/update/status/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  updateAnalyticStatus,
);
AnalyticsRouter.delete(
  "/Analytics/delete/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  deleteAnalytics,
);

export default AnalyticsRouter;
