import connectionCloudinary from "../middleware/imageMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
const { CLOUDINARY_FOLDER_NAME } = process.env;

export async function UploadImageNew(req, res) {
  const file = req.file;
  console.log({ file: file });

  try {
    if (!file) {
      res
        .json({ message: "Image Failed to Upload", success: false })
        .status(403);
    }
    await connectionCloudinary();
    const response = await cloudinary.uploader
      .upload(req.file.path, {
        resource_type: "auto",
        folder: CLOUDINARY_FOLDER_NAME || process.env.CLOUDINARY_FOLDER_NAME,
      })
      .then((resp) => resp)
      .catch((error) => {
        console.log(error);
      });
    const result = await response.secure_url;
    const data = response;
    console.log({ result: result });
    return res
      .json({
        message: "Image  Uploaded SuccessFully",
        success: true,
        data: data,
        url: result,
      })
      .status(201);
    // await cloudinary.uploader
    //   .upload(req.file.path, {
    //     resource_type: "auto",
    //     folder: CLOUDINARY_FOLDER_NAME || process.env.CLOUDINARY_FOLDER_NAME,
    //   })
    //   .then((result) => {
    //     console.log({ result: result });
    //     return result;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     throw new Error("Cloudinary upload Failed");
    //   });
  } catch (error) {
    console.log(error);
  }
}
