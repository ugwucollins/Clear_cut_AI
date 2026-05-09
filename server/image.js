// async function imageUpload(blob, callback) {
//   const reader = new FileReader();
//   try {
//     reader.onload = function () {
//       const buffer = Buffer.from(reader.result);
//       callback(buffer);
//       console.log({ buffer: buffer });
//     };
//     reader.readAsArrayBuffer(blob);
//   } catch (error) {
//     console.log(error);
//     console.log({ error: error });
//   }

// import { ImageUpload } from "./src/middleware/imageMiddleware.js";

// }
async function imageUploadA(blobUrl) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const file = new File([blob], "image.png", { type: blob.type });
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData);
}
// async function imageUpload(blob) {
//   try {
//     const res = blob;
//     console.log({ res: res });
//     const buffer = Buffer.from(res);
//     // const newResult = await ImageUpload(buffer);

//     console.log(buffer);
//     console.log(newResult);
//   } catch (error) {
//     console.log(error);
//     console.log({ error: error });
//   }
// }
// async function imageUpload(blob) {
//   try {
//     const res = await fetch(blob);
//     const blo = await res.blob();
//     const arrayBlob = await blo.arrayBuffer();
//     console.log({ arrayBlob: arrayBlob });
//     const buffer = Buffer.from(arrayBlob);

//     console.log({ buffer: buffer });
//   } catch (error) {
//     console.log(error);
//     console.log({ error: error });
//   }
// }

const blobUrl =
  "blob:http://localhost:5173/5adacaa5-0560-4158-bc40-1c9cf59327a6";

imageUploadA(blobUrl);
