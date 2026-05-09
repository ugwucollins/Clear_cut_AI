import express from "express";
import {
  deleteImage,
  getAllImage,
  getImageById,
  getImageDetails,
  updateImage,
  updateImageStatus,
  removeImage,
  updateImageType,
} from "../controller/imageHandler.js";
import { protectedAuth } from "../middleware/authMiddleware.js";
import { protectedRoleAuth, ROLES } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/imageMiddleware.js";
import { UploadImageNew } from "../controller/upload.js";

const imageRouter = express.Router();

imageRouter.get("/image", getAllImage);

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
  "/image",
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
