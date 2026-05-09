import multer from "multer";

import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
// import Image from "../model/ImageModel.js";
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_FOLDER_NAME,
  CLOUDINARY_API_SECRET,
} = process.env;

const connectionCloudinary = () => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET,
    // api_secret: CLOUDINARY_API_SECRET,
  });
};

export default connectionCloudinary;

// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads"); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

export const upload = multer({ storage: storage });

// export const upload = multer({ dest: "uploads/" });

export const ImageUpload = async (buffer) => {
  console.log({ buffer: buffer });
  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: CLOUDINARY_FOLDER_NAME || process.env.CLOUDINARY_FOLDER_NAME,
      },
      (err, result) => {
        console.log({ err: err });
        if (err) {
          console.error("Cloudinary uploader error:" + err);
          // return res.status(500).json({
          //   message: "Cloudinary upload Failed",
          //   success: false,
          // });

          throw new Error("Cloudinary upload Failed");
        }

        console.log(result);
        // console.log(result.url);

        return result;
        // {
        //   message: "Image uploaded successfully",
        //   data: {
        //     url: result.url,
        //     secure_url: result.secure_url,
        //   },
        //   success: true,
        // };
      },
    );
    console.log({ buffer: buffer });
    stream.end(buffer);

    // const stream = cloudinary.uploader.upload_stream(
    //   {
    //     resource_type: "auto",
    //     folder: "nelly_J",
    //   },
    //   (err, result) => {
    //     console.log(err);

    //     if (err) {
    //       console.log(err);
    //       console.error("Cloudinary uploader error:" + err);
    //       res.status(500).json({
    //         message: "Cloudinary upload Failed",
    //         success: false,
    //       });
    //     }

    //     console.log(result);

    //     res.status(200).json({
    //       message: "Image uploaded successfully",
    //       data: result,
    //       success: true,
    //     });
    //   }
    // );

    // stream.end(file.buffer || req.file.buffer);
  } catch (error) {
    // res.status(500).json({ message: "Server error during upload" });
    throw new Error("Server error during upload");
  }
};
export const ImageUpload2 = async (path) => {
  await connectionCloudinary();
  console.log({ buffer: path });
  await cloudinary.uploader
    .upload(path, {
      resource_type: "auto",
      folder: CLOUDINARY_FOLDER_NAME || process.env.CLOUDINARY_FOLDER_NAME,
    })
    .then((result) => {
      console.log({ result: result });

      return result;
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Cloudinary upload Failed");
    });
};

// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({
//         cloud_name: 'dj6jck4c4',
//         api_key: '916486912171299',
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });

//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });

//     console.log(uploadResult);

//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });

//     console.log(optimizeUrl);

//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });

//     console.log(autoCropUrl);
// })();
