// import connectionCloudinary from "../middleware/imageMiddleware.js";
// import { v2 as cloudinary } from "cloudinary";
// import "dotenv/config";
// const { CLOUDINARY_FOLDER_NAME } = process.env;

// export async function UploadImageNew(req, res) {
//   const file = req.file;

//   try {
//     if (!file) {
//       res
//         .json({ message: "Image Failed to Upload", success: false })
//         .status(403);
//     }
//     await connectionCloudinary();
//     const response = await cloudinary.uploader
//       .upload(req.file.path, {
//         resource_type: "auto",
//         folder: CLOUDINARY_FOLDER_NAME || process.env.CLOUDINARY_FOLDER_NAME,
//       })
//       .then((resp) => resp)
//       .catch((error) => {
//         console.log(error);
//       });
//     const result = await response.secure_url;
//     const data = response;
//     return res
//       .json({
//         message: "Image  Uploaded SuccessFully",
//         success: true,
//         data: data,
//         url: result,
//       })
//       .status(201);
//     // await cloudinary.uploader
//     //   .upload(req.file.path, {
//     //     resource_type: "auto",
//     //     folder: CLOUDINARY_FOLDER_NAME || process.env.CLOUDINARY_FOLDER_NAME,
//     //   })
//     //   .then((result) => {
//     //     console.log({ result: result });
//     //     return result;
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //     throw new Error("Cloudinary upload Failed");
//     //   });
//   } catch (error) {
//     console.log(error);
//   }
// }


import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import connectionCloudinary from "../middleware/imageMiddleware.js";

const { CLOUDINARY_FOLDER_NAME } = process.env;

export async function UploadImageNew(req, res) {
  const file = req.file;
  console.log("Incoming file: ", file);

  try {
    // 1. Guard check: stop execution if no file exists
    if (!file) {
      return res
        .status(400) // 400 Bad Request is better than 403 Forbidden for missing payloads
        .json({ message: "No image file provided.", success: false });
    }

    // Connect to Cloudinary
    await connectionCloudinary();

    // 2. Clean async/await pattern without mixed .then() blocks
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
      folder: CLOUDINARY_FOLDER_NAME || "clear_cut_ai",
    });

    // 3. Confirm Cloudinary provided a secure URL
    if (!response || !response.secure_url) {
      return res
        .status(500)
        .json({ message: "Cloudinary failed to return a secure URL.", success: false });
    }

    const result = response.secure_url;
    console.log("Cloudinary Upload Success: ", result);

    // 4. Correct chaining: status code MUST come before .json()
    return res.status(201).json({
      message: "Image Uploaded Successfully",
      success: true,
      data: response,
      url: result,
    });

  } catch (error) {
    console.error("Server Upload Controller Error:", error);
    
    // 5. CRITICAL: Always respond to the frontend on failure so it doesn't freeze or throw CORS errors
    return res.status(500).json({
      message: error.message || "Internal Server Error during upload.",
      success: false,
    });
  }
}
