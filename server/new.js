import { rembg } from "@remove-background-ai/rembg.js";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// API_KEY will be loaded from the .env file
const BG_API_KEY_R = process.env.BG_API_KEY_R;

async function removebg() {
  // log upload and download progress
  const onDownloadProgress = (event) => {
    console.log("Download progress:", event);
  };

  const onUploadProgress = (event) => {
    console.log(
      "✅🎉 background removed and saved under path=",
      event.outputImagePath,
    );
    console.log("Upload progress:", event);
  };

  await rembg({
    apiKey: BG_API_KEY_R,
    inputImage: "test.jpg", //inputImage can be one of these: string | Buffer | { base64: string };
    onDownloadProgress,
    onUploadProgress,
  }).then(({ outputImagePath, cleanup }) => {
    console.log(
      "✅🎉 background removed and saved under path=",
      outputImagePath,
    );
    console.log(outputImagePath);
    // if called, it will cleanup (remove from disk) your removed background image
    // cleanup();
    console.log(cleanup());
  });
}

removebg();

// import {RemoveBackground} from("remove-bg-node");
// const rm = new RemoveBackground();

// async function processImage() {
//   const currentPath = "test.jpg";
//   const savePath = "/output_folder";

//   await rm.asyncRemoveBackground(currentPath, savePath);
//   // A file with the same name will be generated in the save directory
// }

// processImage();
