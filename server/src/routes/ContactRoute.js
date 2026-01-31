import express from "express";
import { protectedAuth } from "../middleware/authMiddleware.js";

import {
  createContact,
  deleteContact,
  getAllContact,
  getContactById,
  getContactDetails,
  updateContact,
  updateContactStatus,
} from "../controller/contactHandler.js";

const contactRouter = express.Router();

contactRouter.get("/contact", protectedAuth, getAllContact);
contactRouter.get("/contact/get/:id", protectedAuth, getContactById);
contactRouter.post("/contact/create", createContact);
contactRouter.get("/contact/get", protectedAuth, getContactDetails);
contactRouter.patch("/contact/update", protectedAuth, updateContact);
contactRouter.put("/contact/update", protectedAuth, updateContact);
contactRouter.put("/contact/update/status", protectedAuth, updateContactStatus);
contactRouter.delete("/contact/delete", protectedAuth, deleteContact);

export default contactRouter;
