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

export async function ImageBlob(blobUrl: any, type: string) {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    const formData = new FormData();
    // It is best practice to pass a filename so the backend detects the extension correctly
    formData.append("image", blob, `clear_cut_ai_${type}.png`);

    // Axios automatically handles 'Content-Type' and boundaries for FormData
    const res = await ApiUrl.post("/image/new", formData);

    // res.data is already parsed; do not await it
    const data = res.data;

    return data;
  } catch (error: any) {
    // Extract the deep error message safely using optional chaining
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);

    // Return null or throw the error so the calling function knows it failed
    return null;
  }
}
