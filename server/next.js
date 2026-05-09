import fs from "node:fs";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// API_KEY will be loaded from the .env file
const BG_API_KEY_R = process.env.BG_API_KEY_R2;

async function removeBg(blob) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": BG_API_KEY_R },
    body: formData,
  });

  if (response.ok) {
    return await response.blob();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

const inputPath = "/path/to/file.jpg";
const fileBlob = await fs.openAsBlob(inputPath);
const rbgResultData = await removeBg(fileBlob);
fs.writeFileSync("no-bg.png", Buffer.from(rbgResultData));

// const image = Buffer.from(result);
//     const newImage = image.toString("base64");
//     const resultImage = `data:${req.file.mimetype};base64,${newImage}`;
//     console.log(newImage);
//     console.log({ newImage: resultImage });

//     const data = {
//       newImage: resultImage || newImage,
//       imageUrl: imagePath,
//       createdBy: userId,
//       year: year,
//       month: month,
//     };

//     const generatedImage = await ImageModel.create(data);
//     const Image = generatedImage.save();

//     await UserModel.findByIdAndUpdate(
//       { _id: userId },
//       {
//         coins: user.coins - 2,
//       },
//       {
//         new: true,
//       },
//     );

//     return res.status(200).json({
//       message: "Image Created Successfully",
//       success: true,
//       data: {
//         Image: Image,
//         resultImage: newImage,
//         credit: user.coins - 2,
//       },
//     });
