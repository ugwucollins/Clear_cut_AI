// import { toast } from "react-toastify";
// import { ApiUrl } from "./ApiUrl";

// export async function ImageBlob(blobUrl: any, type: string) {
//   try {
//     const response = await fetch(blobUrl);
//     const blob = await response.blob();

//     const formData = new FormData();
//     // formData.append("image", file, "clear_cut_ai.png");
//     formData.append("image", blob);
//     // formData.append("image", blob, `clear_cut_ai_${type}.png`);
//     console.log(type);

//     const res = await ApiUrl.post("/image/new", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     const data = res.data;
//     if (data.success) return data;
//     return data || res.data;
//   } catch (error: any) {
//     toast.error(error.response.data.message || error.message);
//     return null;
//   }
// }


import { toast } from "react-toastify";
import { ApiUrl } from "./ApiUrl";

// Helper utility to compress image blobs using HTML5 Canvas
function compressImageBlob(blob: Blob, quality = 0.7): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement("canvas");

      // Scale down max dimensions if the image is massive
      let width = img.width;
      let height = img.height;
      const MAX_WIDTH = 2000;
      const MAX_HEIGHT = 2000;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(blob); // Fallback to original if canvas fails

      ctx.drawImage(img, 0, 0, width, height);

      // Convert back to a highly compressed jpeg/png blob
      canvas.toBlob(
        (compressedBlob) => {
          if (compressedBlob) {
            resolve(compressedBlob);
          } else {
            resolve(blob); // Fallback
          }
        },
        "image/jpeg", // JPEG yields significantly better compression ratios for photos
        quality
      );
    };

    img.onerror = (err) => reject(err);
  });
}


// export async function ImageBlob(blobUrl: any, type: string) {
//   try {
//     const response = await fetch(blobUrl);
//     const blob = await response.blob();

//     const formData = new FormData();
//     // It is best practice to pass a filename so the backend detects the extension correctly
//     formData.append("image", blob, `clear_cut_ai_${type}.png`);

//     // Axios automatically handles 'Content-Type' and boundaries for FormData
//     const res = await ApiUrl.post("/image/new", formData);

//     // res.data is already parsed; do not await it
//     const data = res.data;

//     return data;
//   } catch (error: any) {
//     // Extract the deep error message safely using optional chaining
//     const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
//     toast.error(errorMessage);

//     // Return null or throw the error so the calling function knows it failed
//     return null;
//   }
// }

export async function ImageBlob(blobUrl: any, type: string) {
  try {
    const response = await fetch(blobUrl);
    let blob = await response.blob();

    // Vercel limit is 4.5MB. If it's over 3MB, auto-compress it!
    const sizeInMB = blob.size / (1024 * 1024);
    console.log(`Original image (${type}) size: ${sizeInMB.toFixed(2)} MB`);

    if (sizeInMB > 3.0) {
      console.log(`Compressing massive image (${type}) to avoid Vercel 413 error...`);
      try {
        blob = await compressImageBlob(blob, 0.65);
        console.log(`New compressed size: ${(blob.size / (1024 * 1024)).toFixed(2)} MB`);
      } catch (compressionError) {
        console.error("Compression utility failed, trying original file...", compressionError);
      }
    }

    const formData = new FormData();
    // Use .jpg if compressed, or retain .png if it matches your pipeline requirements
    formData.append("image", blob, `clear_cut_ai_${type}.jpg`);

    const res = await ApiUrl.post("/image/new", formData);
    return res.data;

  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Upload failed.";
    toast.error(errorMessage);
    return null;
  }
}

