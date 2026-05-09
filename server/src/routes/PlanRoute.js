import express from "express";
import {
  createPlan,
  deletePlan,
  getAllPlan,
  getPlanById,
  getPlanDetails,
  updatePlan,
  updatePlanStatus,
} from "../controller/planHandler.js";
import { protectedAuth } from "../middleware/authMiddleware.js";
import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";

const planRouter = express.Router();

planRouter.get("/plan", getAllPlan);
planRouter.get("/plan/get/:id", protectedAuth, getPlanById);
planRouter.post(
  "/plan/create",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  createPlan,
);
// protectedRoleAuth(ROLES.USER,ROLES.ADMIN),
planRouter.get("/plan/get", protectedAuth, getPlanDetails);
planRouter.patch("/plan/update/:id", protectedAuth, updatePlan);
planRouter.put(
  "/plan/update/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  updatePlan,
);
planRouter.put(
  "/plan/update/status/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  updatePlanStatus,
);
planRouter.delete(
  "/plan/delete/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  deletePlan,
);

export default planRouter;
