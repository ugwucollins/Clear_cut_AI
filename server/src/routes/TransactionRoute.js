import express from "express";
import {
  deleteTransaction,
  createTransaction,
  getAllTransaction,
  getTransactionById,
  getTransactionDetails,
  updateTransaction,
  updateTransactionStatus,
  verifyTransaction,
  deleteTransactionRef,
} from "../controller/transactionHandler.js";
import { protectedAuth } from "../middleware/authMiddleware.js";
import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";

const transactionRouter = express.Router();

transactionRouter.get("/transaction", getAllTransaction);

transactionRouter.get(
  "/transaction/get/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  getTransactionById,
);

transactionRouter.get("/transaction/get", protectedAuth, getTransactionDetails);

transactionRouter.post("/transaction/create", protectedAuth, createTransaction);

transactionRouter.put(
  "/transaction/update/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.USER),
  updateTransaction,
);
transactionRouter.put(
  "/transaction/verify",
  protectedAuth,
  protectedRoleAuth(ROLES.USER),
  verifyTransaction,
);

transactionRouter.put(
  "/transaction/update/status/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  updateTransactionStatus,
);
transactionRouter.delete(
  "/transaction/delete/ref",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN, ROLES.USER),
  deleteTransactionRef,
);

transactionRouter.delete(
  "/transaction/delete/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN, ROLES.USER),
  deleteTransaction,
);

export default transactionRouter;
