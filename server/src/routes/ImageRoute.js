import express from "express";
import {
  deleteImage,
  getAllImage,
  getImageById,
  getImageDetails,
  removeImage,
  updateImage,
  updateImageStatus,
  updateImageType,
} from "../controller/imageHandler.js";
import { UploadImageNew } from "../controller/upload.js";
import { protectedAuth } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/imageMiddleware.js";
import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";

const imageRouter = express.Router();

imageRouter.get("/image",protectedAuth, getAllImage);

imageRouter.get(
  "/image/get/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  getImageById,
);

imageRouter.get("/image/get", protectedAuth, getImageDetails);

imageRouter.post(
  "/image/create",
  upload.single("image"),
  protectedAuth,
  removeImage,
);
imageRouter.post(
  "/image/new",
  upload.single("image"),
  protectedAuth,
  UploadImageNew,
);

imageRouter.put(
  "/image/update/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.USER),
  updateImage,
);

imageRouter.put(
  "/image/update/status/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  updateImageStatus,
);
imageRouter.put(
  "/image/update/type/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.USER, ROLES.ADMIN),
  updateImageType,
);
imageRouter.patch(
  "/image/update/type/:id",
  protectedAuth,
  protectedRoleAuth(ROLES.USER, ROLES.ADMIN),
  updateImageType,
);

imageRouter.delete(
  "/image/delete",
  protectedAuth,
  protectedRoleAuth(ROLES.ADMIN),
  deleteImage,
);

export default imageRouter;
