import ImageModel from "../model/ImageModel.js";
import fs from "fs";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
// import Image from "../model/ImageModel.js";
// Load environment variables from .env file
dotenv.config();

// API_KEY will be loaded from the .env file
const BG_API_KEY_R = process.env.BG_API_KEY_R2;
// import fs from "node:fs";

import { month, year } from "../connection/TimeExporter.js";
// import { Rembg } from "@xixiyahaha/rembg-node";
// import sharp from "sharp";
import UserModel from "../model/UserModel.js";
import connectionCloudinary, {
  ImageUpload,
} from "../middleware/imageMiddleware.js";
import ActiveUserModel, { status } from "../model/AnalyticsModel.js";
// import axios from "axios";

export const getAllImage = async (req, res) => {
  try {
    const allImage = await ImageModel.find({})
      .populate("createdBy", "-password -role -phoneNumber")
      .sort({ createdAt: -1 });

    if (allImage.length === 0) {
      return res.status(404).json({
        message: "Image collection is Empty",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Image fetched Successfully",
      success: true,
      data: allImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingImage = await ImageModel.findById({ _id: id })
      .populate("createdBy", "-password -role -phoneNumber")
      .sort({ createdAt: -1 });

    if (!existingImage) {
      return res.status(404).json({
        message: "Image Id Not Found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Image fetched Successfully",
      success: true,
      data: existingImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const getImageDetails = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(404).json({
        message: "User Not Found ",
        success: false,
      });
    }
    const existingUser = await ImageModel.find({ createdBy: userId })
      .populate("createdBy", "-password -role -phoneNumber")
      .sort({ createdAt: -1 });

    if (!existingUser) {
      return res.status(404).json({
        message: "Image Not Found ",
        success: false,
      });
    }

    const user = existingUser;

    return res.status(200).json({
      message: "Users image fetched Successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const removeImage = async (req, res) => {
  connectionCloudinary();

  const userId = req.userId;
  const file = req.file;
  let status = "pending";

  const { img, imgImage, time } = req.body;

  try {
    if (!userId) {
      return res
        .status(404)
        .json({ message: "No file uploaded", success: false });
    }

    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User does not Exist",
        success: false,
      });
    }

    if (user.coins === 0 || user.coins < 2) {
      return res.status(404).json({
        message: "insufficant credit balance",
        success: false,
        url: "/price",
      });
    }

    const data = {
      newImage: img,
      imageUrl: imgImage,
      result: img,
      createdBy: userId,
      status: status,
      time: time,
      oldImage: imgImage,
      year: year,
      month: month,
    };

    const generatedImage = await ImageModel.create(data);
    const image = generatedImage.save();

    await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        coins: user.coins - 2,
      },
      {
        new: true,
      },
    );

    const anaData = {
      userEmail: user.email,
      activeUser: user._id,
      status: status.Removed,
      month: month,
      year: year,
    };

    const actUser = await ActiveUserModel.create(anaData);
    await actUser.save();

    status = "completed";
    const ImageUpdateDate = {
      status: status,
      newImage: img,
      imageUrl: imgImage,
      result: img,
      oldImage: imgImage,
    };

    const updateImageId = await ImageModel.findById({
      _id: generatedImage._id,
    });

    if (updateImageId) {
      const updateImage = await ImageModel.findByIdAndUpdate(
        { _id: updateImageId._id },
        ImageUpdateDate,
        {
          new: true,
        },
      );
      await updateImage.save();
    }

    return res.status(200).json({
      message: "Image background removed Successfully",
      success: true,
      result: img,
      data: {
        image: image,
        resultImage: img,
        credit: user.coins - 2,
      },
    });

    // .catch((err) => {
    //   console.log(err);
    //   res.status(404).json({
    //     message: err.message || "Failed to remove Image Background",
    //     success: false,
    //   });
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};
// const createImage = async (imagePath) => {
//   try {
//     const formData = new FormData();
//     formData.append("size", "auto");
//     formData.append("image_file", fs.createReadStream(imagePath));

//     const response = await fetch("https://api.remove.bg/v1.0/removebg", {
//       method: "POST",
//       headers: { "X-Api-Key": BG_API_KEY_R },
//       body: formData,
//     });

//     const result = await response.arrayBuffer();
//     console.log({ result: result });

//     return result;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to create image");
//   }
// };

// export const removeImage = async (req, res) => {
//   const userId = req.userId;
//   const file = req.file;

//   try {
//     if (!file) {
//       return res
//         .status(404)
//         .json({ message: "No file uploaded", success: false });
//     }

//     const user = await UserModel.findById({ _id: userId });

//     if (!user) {
//       return res.status(404).json({
//         message: "User does not Exist",
//         success: false,
//       });
//     }

//     if (user.coins === 0 || user.coins < 2) {
//       return res.status(404).json({
//         message: "insufficant credit balance",
//         success: false,
//         url: "/price",
//       });
//     }

//     console.log({ path: file.path });

//     const inputPath = file.path;
//     const fileBlob = await fs.openAsBlob(inputPath);
//     console.log({ fileBlob: fileBlob });

//     const rbgResultData = await createImage(fileBlob);
//     const result = await createImage(inputPath);
//     const resultOutput = `uploads/no-bg-${req.file.filename}.png`;
//     const resultOutput2 = `uploads/${req.file.filename}.png`;
//     // fs.writeFileSync("no-bg.png", Buffer.from(rbgResultData));
//     fs.writeFileSync(resultOutput, Buffer.from(result));
//     fs.unlinkSync(inputPath);

//     // // const inputPaths = "/path/to/" + file.filename;
//     // const fileBlob = await fs.openAsBlob(inputPath);
//     // const rbgResultData = await createImage(fileBlob);
//     // fs.writeFileSync("no-bg.png", Buffer.from(rbgResultData));

//     const data = {
//       newImage: rbgResultData,
//       imageUrl: file.path,
//       result: rbgResultData,
//       createdBy: userId,
//       year: year,
//       month: month,
//     };

//     const generatedImage = await ImageModel.create(data);
//     const image = generatedImage.save();

//     console.log(image);
//     console.log(resultOutput);
//     console.log(resultOutput2);
//     console.log(generatedImage);
//     await UserModel.findByIdAndUpdate(
//       { _id: userId },
//       {
//         coins: user.coins - 2,
//       },
//       {
//         new: true,
//       },
//     );
//     // res.set({ "Content-Type": "image/png" });

//     // res.sendFile(resultOutput, { root: "." });

//     return res.status(200).json({
//       message: "Image Created Successfully",
//       success: true,
//       data: {
//         image: image,
//         resultImage: result,
//         result: resultOutput,
//         credit: user.coins - 2,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal Server Error" || error,
//       success: false,
//     });
//   }
// };

export const updateImage = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const { status } = req.body;

  try {
    const existingImage = await ImageModel.findOne({ createdBy: userId });
    if (!existingImage) {
      return res.status(404).json({
        message: "Image Not Found",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const updateImage = await ImageModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      message: "Image has been Public Successfully",
      success: true,
      data: updateImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const updateImageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingUser = await ImageModel.findById({ _id: id });

    if (!existingUser) {
      return res.status(404).json({
        message: "Image Id Not Found ",
        success: false,
      });
    }

    const data = {
      status: status,
    };

    const Image = await ImageModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    return res.status(200).json({
      message: "Image status updated Successfully",
      success: true,
      data: Image,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};
export const updateImageType = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const existingImage = await ImageModel.findById({ _id: id });

    if (!existingImage) {
      return res.status(404).json({
        message: "Image Id Not Found ",
        success: false,
      });
    }

    const data = {
      type: type,
    };

    const Image = await ImageModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    await Image.save();
    return res.status(200).json({
      message: "Image public updated Successfully",
      success: true,
      data: Image,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const existingImage = await ImageModel.findById({ _id: id });

    if (!existingImage) {
      return res.status(404).json({
        message: "Image Not Found ",
        success: false,
      });
    }

    const Image = await ImageModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      message: "Image deleted Successfully",
      success: true,
      data: Image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
    });
  }
};
